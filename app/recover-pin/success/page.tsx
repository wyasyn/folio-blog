import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PIN Recovery Successful | Yasin Walum",
  description: "Your PIN recovery has been successful.",
};

export default function RecoverPinSuccessPage() {
  return (
    <div className="container mx-auto max-w-md py-12 text-center">
      <h1 className="text-2xl font-bold mb-6">PIN Recovery Successful</h1>
      <p className="mb-6">A new PIN has been sent to your email address.</p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
