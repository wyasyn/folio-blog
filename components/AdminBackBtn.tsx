"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function AdminBackBtn() {
  const router = useRouter();
  return (
    <Button
      size="icon"
      className="fixed bottom-8 right-8 bg-primary text-black rounded-full aspect-square"
      onClick={() => router.back()}
    >
      <ChevronLeft className="w-6 h-6" />
    </Button>
  );
}
