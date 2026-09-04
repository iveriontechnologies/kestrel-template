/**
 * Marketplace screenshot capture.
 *
 * Drives a headless browser over the Chrome DevTools Protocol rather than the
 * `--screenshot` command-line flag. The flag cannot do this job: the browser
 * subtracts window chrome from the requested size (asking for 1440 gives a 1414
 * viewport) and enforces a minimum width around 496px, so a 390px mobile
 * capture comes out with the page rendered at 496 and cropped to 390. CDP sets
 * the viewport exactly.
 *
 * It also removes the two manual steps the flag needed:
 *   - Theme is seeded into localStorage before the page's own script runs, so
 *     light-mode shots no longer need `defaultTheme` flipped and a rebuild.
 *   - Reduced motion is emulated, so the scroll reveals are painted rather than
 *     caught mid-animation at opacity 0.
 *
 * Usage:
 *   npm run build && npx next start -p 3100     # in one terminal
 *   node marketing/capture.mjs                  # in another
 *
 * Set BROWSER to a Chrome or Edge binary if the default path is wrong.
 */

import { spawn } from "node:child_process";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "screenshots");
const ORIGIN = process.env.ORIGIN ?? "http://localhost:3100";
const PORT = 9333;

const BROWSER =
  process.env.BROWSER ??
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

/**
 * width/height are CSS pixels of the viewport.
 * `full: true` captures the entire scrollable page rather than one screenful.
 * `dpr` of 2 doubles the output resolution — worth it for the shots a buyer
 * looks at closely, wasteful on the very long ones.
 */
const SHOTS = [
  { file: "01-home-dark.png", path: "/", width: 1440, height: 900, theme: "dark", dpr: 2 },
  { file: "02-home-dark-full.png", path: "/", width: 1440, height: 900, theme: "dark", full: true },
  { file: "03-home-light.png", path: "/", width: 1440, height: 900, theme: "light", dpr: 2 },
  { file: "04-home-light-full.png", path: "/", width: 1440, height: 900, theme: "light", full: true },
  { file: "05-pricing-dark.png", path: "/pricing", width: 1440, height: 900, theme: "dark", full: true },
  { file: "06-pricing-light.png", path: "/pricing", width: 1440, height: 900, theme: "light", full: true },
  { file: "07-blog-dark.png", path: "/blog", width: 1440, height: 900, theme: "dark", full: true },
  { file: "08-post-dark.png", path: "/blog/retention-curves-lie", width: 1440, height: 900, theme: "dark", full: true },
  { file: "09-post-light.png", path: "/blog/retention-curves-lie", width: 1440, height: 900, theme: "light", full: true },
  { file: "10-changelog-dark.png", path: "/changelog", width: 1440, height: 900, theme: "dark", full: true },
  { file: "11-404-dark.png", path: "/no-such-page", width: 1440, height: 900, theme: "dark", dpr: 2 },
  { file: "12-mobile-home-dark.png", path: "/", width: 390, height: 844, theme: "dark", mobile: true, dpr: 2 },
  { file: "13-mobile-home-dark-full.png", path: "/", width: 390, height: 844, theme: "dark", mobile: true, full: true },
  { file: "14-mobile-pricing-dark.png", path: "/pricing", width: 390, height: 844, theme: "dark", mobile: true, dpr: 2 },
  { file: "15-mobile-home-light.png", path: "/", width: 390, height: 844, theme: "light", mobile: true, dpr: 2 },

  // The marketplace card. Rendered from thumbnail.html, which embeds the hero
  // shot above, so run this after the rest.
  {
    file: "thumbnail.png",
    url: new URL("thumbnail.html", import.meta.url).href,
    out: HERE,
    width: 1280,
    height: 720,
    theme: "dark",
    dpr: 2,
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Minimal CDP client. One in-flight command at a time is plenty here. */
class Session {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.listeners = new Map();
    ws.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      } else if (msg.method && this.listeners.has(msg.method)) {
        for (const fn of this.listeners.get(msg.method)) fn(msg.params);
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

  once(method) {
    return new Promise((resolve) => {
      const fns = this.listeners.get(method) ?? [];
      const fn = (params) => {
        this.listeners.set(method, fns.filter((f) => f !== fn));
        resolve(params);
      };
      this.listeners.set(method, [...fns, fn]);
    });
  }
}

async function connect() {
  // The browser needs a moment to open its debugging port.
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      const { webSocketDebuggerUrl } = await res.json();
      return webSocketDebuggerUrl;
    } catch {
      await sleep(250);
    }
  }
  throw new Error(`Browser never opened a debugging port on ${PORT}.`);
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const browser = spawn(
    BROWSER,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      "--no-first-run",
      // A browser extension injected a floating badge into the bottom-right of
      // every capture. A fresh profile is not enough to keep force-installed
      // ones out.
      "--disable-extensions",
      "--disable-component-extensions-with-background-pages",
      "--disable-features=Translate,MediaRouter",
      // thumbnail.html pulls in a local PNG and the Geist TTFs.
      "--allow-file-access-from-files",
      `--remote-debugging-port=${PORT}`,
      "--user-data-dir=" + join(HERE, ".capture-profile"),
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  try {
    const browserWsUrl = await connect();
    const browserWs = new WebSocket(browserWsUrl);
    await new Promise((r) => browserWs.addEventListener("open", r, { once: true }));
    const browserSession = new Session(browserWs);

    const { targetId } = await browserSession.send("Target.createTarget", {
      url: "about:blank",
    });
    const targets = await (
      await fetch(`http://127.0.0.1:${PORT}/json/list`)
    ).json();
    const target = targets.find((t) => t.id === targetId);

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r) => ws.addEventListener("open", r, { once: true }));
    const page = new Session(ws);

    await page.send("Page.enable");
    await page.send("Runtime.enable");

    for (const shot of SHOTS) {
      const dpr = shot.dpr ?? 1;

      await page.send("Emulation.setDeviceMetricsOverride", {
        width: shot.width,
        height: shot.height,
        deviceScaleFactor: dpr,
        mobile: Boolean(shot.mobile),
      });

      // The reveals start at opacity 0 and are flipped by an observer. Under
      // reduced motion the stylesheet forces them visible at first paint, with
      // no JavaScript involved — exactly what a still capture needs.
      await page.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: "reduce" }],
      });

      // Seeded before the page's own scripts run, so next-themes reads it on
      // its first pass and there is no flash and no rebuild needed.
      await page.send("Page.addScriptToEvaluateOnNewDocument", {
        source: `try { localStorage.setItem('theme', '${shot.theme}'); } catch (e) {}`,
      });

      const loaded = page.once("Page.loadEventFired");
      await page.send("Page.navigate", { url: shot.url ?? ORIGIN + shot.path });
      await loaded;
      // Fonts and the OG-quality paint settle a beat after load.
      await sleep(900);

      const params = { format: "png", captureBeyondViewport: Boolean(shot.full) };

      if (shot.full) {
        const { cssContentSize } = await page.send("Page.getLayoutMetrics");
        params.clip = {
          x: 0,
          y: 0,
          width: cssContentSize.width,
          height: cssContentSize.height,
          scale: 1,
        };
      }

      const { data } = await page.send("Page.captureScreenshot", params);
      await writeFile(join(shot.out ?? OUT, shot.file), Buffer.from(data, "base64"));

      const size = shot.full ? "full page" : `${shot.width}x${shot.height}`;
      console.log(
        `  ${shot.file.padEnd(34)} ${String(shot.width).padStart(4)}px  ${shot.theme.padEnd(5)} ${size}${dpr > 1 ? ` @${dpr}x` : ""}`,
      );
    }

    ws.close();
    browserWs.close();
  } finally {
    browser.kill();
    await rm(join(HERE, ".capture-profile"), { recursive: true, force: true }).catch(
      () => {},
    );
  }
}

main().catch((error) => {
  console.error("[capture]", error.message);
  process.exit(1);
});
