"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackBtn() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className=" py-2 pr-3 flex items-center gap-3 rounded-lg hover:bg-secondary duration-300 transition-all"
    >
      <ChevronLeft className="w-5 h-5" /> Back
    </button>
  );
}
