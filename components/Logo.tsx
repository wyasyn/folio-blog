"use client";
import { Mouse } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Logo() {
  const pathname = usePathname();
  const isActive = pathname === "/";
  return (
    <Link href="/">
      <button
        className={`p-2 border rounded-full bg-secondary/75 hover:text-foreground group backdrop-blur-sm ${
          isActive ? "text-foreground" : "text-muted-foreground"
        }`}
        title="Home"
      >
        <Mouse className="w-5 h-5 group-hover:scale-110 duration-300" />
      </button>
    </Link>
  );
}
