import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import type { FaqItem, SectionCopy } from "@/types";

type Props = {
  copy: SectionCopy;
  items: FaqItem[];
  /** Rendered without the Section wrapper when reused on the pricing page. */
  bare?: boolean;
};

export function Faq({ copy, items, bare = false }: Props) {
  const content = (
    <>
      {bare ? null : (
        <Reveal>
          <SectionHeader
            eyebrow={copy.eyebrow}
            heading={copy.heading}
            lead={copy.lead}
          />
        </Reveal>
      )}

      {/* Constrained to prose width — full-width answers are unreadable. */}
      <Reveal>
        <Accordion
          // First item opens by default so the section never reads as an
          // undifferentiated stack of closed rows.
          defaultValue={[0]}
          className="mx-auto mt-12 w-full max-w-reading"
        >
          {items.map((item, index) => (
            <AccordionItem key={item.question} value={index}>
              <AccordionTrigger className="text-[16px] font-medium text-fg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] leading-[1.65] text-fg-secondary">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </>
  );

  if (bare) return content;

  return <Section>{content}</Section>;
}
