"use client";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";

import { useRouter } from "next/navigation";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogOverlay>
        <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
