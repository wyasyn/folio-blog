import { RecoverPinForm } from "@/components/recover-pin-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recover PIN | Yasin Walum",
  description: "Recover your PIN if you forgot it.",
};

export default function RecoverPinPage() {
  return (
    <div className=" mx-auto max-w-sm py-12">
      <h1 className="text-2xl font-bold mb-6">Recover PIN</h1>
      <RecoverPinForm />
    </div>
  );
}
