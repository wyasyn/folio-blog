import Link from "next/link";

export default function PrimaryBtn({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  return (
    <Link href={link}>
      <button className="capitalize min-w-[150px] bg-foreground text-background px-5 py-2 rounded-lg hover:bg-muted-foreground duration-300 transition-all text-xs sm:text-sm">
        {text}
      </button>
    </Link>
  );
}
