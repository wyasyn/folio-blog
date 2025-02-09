import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ChangePinSuccessPage() {
  return (
    <div className=" mx-auto max-w-sm py-12 text-center">
      <h1 className="text-2xl font-bold mb-6">PIN Changed Successfully</h1>
      <p className="mb-6">Your PIN has been updated.</p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
