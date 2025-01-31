"use client";

import { Briefcase, File, Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutBtn from "./logoutBtn";

const adminLinks = [
  {
    name: "Home",
    link: "/",
    icon: Home,
  },
  {
    name: "Dashboard",
    link: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    link: "/admin/project",
    icon: Briefcase,
  },
  {
    name: "Blog",
    link: "/admin/blog",
    icon: File,
  },
];

export default function AdminDashBar() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center justify-center gap-8 text-muted-foreground bg-secondary w-fit mx-auto p-3 rounded-full border">
        {adminLinks.map((link) => {
          const isActive =
            (link.link === "/" && pathname === "/") ||
            (link.link === "/admin" && pathname === "/admin") ||
            (link.link !== "/" &&
              link.link !== "/admin" &&
              pathname.startsWith(link.link));

          return (
            <li key={link.name} title={link.name}>
              <Link
                href={link.link}
                className={`${isActive ? "text-primary" : "text-muted-foreground"}`}
              >
                <link.icon className="w-5 h-5" />
              </Link>
            </li>
          );
        })}
        <LogoutBtn />
      </ul>
    </nav>
  );
}
