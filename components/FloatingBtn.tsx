import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function FloatingBtn({ link }: { link: string }) {
  return (
    <Link href={link}>
      <Button
        size="icon"
        className="fixed bottom-8 right-8 bg-primary text-black rounded-full aspect-square"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </Link>
  );
}
