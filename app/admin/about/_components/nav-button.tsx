import { Image as ImageLucide, Pin } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NavButton() {
  return (
    <nav className="fixed top-1/2 right-12 bg-secondary rounded-full border p-3 flex flex-col gap-4 -translate-y-1/2">
      <Link
        href={`/admin/about/change-pin`}
        title="Change pin"
        className=" hover:text-foreground duration-300 transition-all hover:scale-110"
      >
        <Pin className="w-5 h-5" />
      </Link>
      <Link
        href={`/admin/images`}
        title="Add Images"
        className=" hover:text-foreground duration-300 transition-all hover:scale-110"
      >
        <ImageLucide className="w-5 h-5" />
      </Link>
    </nav>
  );
}
