import { ChangePinForm } from "@/components/change-pin-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change PIN ",
  description: "Change your PIN ",
};

export default function ChangePinPage() {
  return (
    <div className=" mx-auto max-w-sm py-12">
      <h1 className="text-2xl font-bold mb-6">Change PIN</h1>
      <ChangePinForm />
    </div>
  );
}
