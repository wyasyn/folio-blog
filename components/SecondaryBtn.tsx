import { ArrowDown } from "lucide-react";
import Link from "next/link";

export default function SecondaryBtn({
  link,
  text,
}: {
  link: string;
  text: string;
}) {
  return (
    <Link href={link}>
      <button className="border rounded-lg min-w-[150px] px-5 py-2 flex items-center gap-2 hover:text-foreground duration-300 transition-all hover:border-foreground capitalize text-xs sm:text-sm">
        {text} <ArrowDown className="w-4 h-5" />
      </button>
    </Link>
  );
}
