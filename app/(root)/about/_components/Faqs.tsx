import { FAQs } from "@/lib/stats";
import FaqCard from "./FaqCard";

export default function Faqs() {
  return (
    <div className="my-[5rem]">
      <h2 className="text-xl text-center mb-12">Frequently Asked Questions</h2>
      <div className="max-w-[600px] mx-auto grid gap-3">
        {FAQs.map((faq, index) => (
          <FaqCard question={faq.question} answer={faq.answer} key={index} />
        ))}
      </div>
    </div>
  );
}
