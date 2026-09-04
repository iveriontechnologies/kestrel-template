/**
 * Renders app/icon.svg to 16/32/48px PNGs over CDP and packs them into a
 * single favicon.ico. Run it after changing the mark, or the .ico and the .svg
 * drift apart.
 *
 *   node marketing/make-ico.mjs
 * Same headless browser the screenshots use, so this needs
 * nothing installed.
 *
 * PNG-compressed ICO (Vista onward, and every browser that still asks for
 * /favicon.ico). The point of the file is the clients that ignore the <link>
 * tag and request the well-known path — mostly Safari before 16 and link
 * preview bots — so it has to be a real .ico, not a PNG named one.
 */
import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const SIZES = [16, 32, 48];
const PORT = 9334;
const BROWSER =
  process.env.BROWSER ??
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

class Session {
  constructor(ws) {
    this.ws = ws; this.id = 0; this.pending = new Map();
    ws.addEventListener("message", (e) => {
      const m = JSON.parse(e.data);
      if (m.id && this.pending.has(m.id)) {
        const { resolve, reject } = this.pending.get(m.id);
        this.pending.delete(m.id);
        if (m.error) reject(new Error(m.error.message));
        else resolve(m.result);
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
}

/** ICO container. 6-byte header, then one 16-byte entry per image. */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);              // reserved
  header.writeUInt16LE(1, 2);              // type 1 = icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = [];
  for (const { size, data } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size === 256 ? 0 : size, 0); // width
    e.writeUInt8(size === 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2);                       // palette colours: 0 = truecolour
    e.writeUInt8(0, 3);                       // reserved
    e.writeUInt16LE(1, 4);                    // colour planes
    e.writeUInt16LE(32, 6);                   // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

async function main() {
  const svg = await readFile(join(REPO, "app/icon.svg"), "utf8");

  const browser = spawn(BROWSER, [
    "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
    "--no-first-run", "--disable-extensions",
    "--disable-component-extensions-with-background-pages",
    `--remote-debugging-port=${PORT}`,
    "--user-data-dir=" + join(dirname(fileURLToPath(import.meta.url)), ".ico-profile"),
    "about:blank",
  ], { stdio: "ignore" });

  try {
    let wsUrl;
    for (let i = 0; i < 40 && !wsUrl; i++) {
      try {
        const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
        wsUrl = (await r.json()).webSocketDebuggerUrl;
      } catch { await sleep(250); }
    }
    if (!wsUrl) throw new Error("no debugging port");

    const bws = new WebSocket(wsUrl);
    await new Promise((r) => bws.addEventListener("open", r, { once: true }));
    const bsess = new Session(bws);
    const { targetId } = await bsess.send("Target.createTarget", { url: "about:blank" });
    const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    const ws = new WebSocket(targets.find((t) => t.id === targetId).webSocketDebuggerUrl);
    await new Promise((r) => ws.addEventListener("open", r, { once: true }));
    const page = new Session(ws);
    await page.send("Page.enable");

    const images = [];
    for (const size of SIZES) {
      await page.send("Emulation.setDeviceMetricsOverride", {
        width: size, height: size, deviceScaleFactor: 1, mobile: false,
      });
      // The mark has rounded corners; without this the ICO ships them white.
      await page.send("Emulation.setDefaultBackgroundColorOverride", {
        color: { r: 0, g: 0, b: 0, a: 0 },
      });
      const html = `<style>html,body{margin:0;padding:0;background:transparent}svg{display:block}</style>${svg.replace('width="32" height="32"', `width="${size}" height="${size}"`)}`;
      await page.send("Page.navigate", { url: "data:text/html;charset=utf-8," + encodeURIComponent(html) });
      await sleep(400);
      const { data } = await page.send("Page.captureScreenshot", {
        format: "png", captureBeyondViewport: false,
      });
      const buf = Buffer.from(data, "base64");
      images.push({ size, data: buf });
      console.log(`  ${size}x${size}  ${buf.length} bytes`);
    }

    const ico = buildIco(images);
    await writeFile(join(REPO, "app/favicon.ico"), ico);
    console.log(`\n  app/favicon.ico  ${ico.length} bytes, ${images.length} sizes`);
    ws.close(); bws.close();
  } finally {
    browser.kill();
  }
}

main().catch((e) => { console.error("[ico]", e.message); process.exit(1); });
