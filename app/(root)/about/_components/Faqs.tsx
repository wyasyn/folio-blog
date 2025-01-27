import { FAQs } from "@/lib/stats";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faqs() {
  return (
    <div className="my-[5rem]">
      <h2 className="text-xl text-center mb-12">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="max-w-[500px] mx-auto">
        {FAQs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="font-sans">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
