"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogOverlay>
        <DialogContent className="sm:max-w-[425px] lg:max-w-[640px]">
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle>About Image</DialogTitle>
              <DialogDescription>
                My current image of {new Date().getFullYear()}
              </DialogDescription>
            </DialogHeader>
          </VisuallyHidden>

          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
