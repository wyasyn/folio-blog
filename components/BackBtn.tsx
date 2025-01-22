"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackBtn() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className=" p-2 rounded-lg hover:bg-secondary duration-300 transition-all"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
}
