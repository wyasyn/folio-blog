"use client";

import { LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export default function NavLink({
  name,
  Icon,
  link,
}: {
  name: string;
  link: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}) {
  const pathname = usePathname();
  const isActive = pathname === link;
  return (
    <li>
      <Link href={link} className="relative group">
        <div
          className={`hover:text-foreground transition-all duration-300 ${
            isActive ? "text-foreground fill-current" : "text-muted-foreground"
          }`}
        >
          <Icon className="w-5 h-5" /> <span className="sr-only">{name}</span>
        </div>
        <span className="absolute -top-12 transition-all duration-200 bg-secondary p-1 rounded-md left-1/2 -translate-x-1/2 md:top-auto md:-bottom-12 invisible group-hover:visible">
          {name}
        </span>
      </Link>
    </li>
  );
}
