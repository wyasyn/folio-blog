"use client";
import { Contact, LayoutDashboard, Newspaper, User } from "lucide-react";
import NavLink from "./NavLink";

export default function Navbar() {
  const navLinks = [
    {
      name: "About",
      icon: User,
      link: "/about",
    },
    {
      name: "Portfolio",
      icon: LayoutDashboard,
      link: "/portfolio",
    },
    {
      name: "Blog",
      icon: Newspaper,
      link: "/blog",
    },
    {
      name: "Contact",
      icon: Contact,
      link: "/contact",
    },
  ];
  return (
    <header className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-secondary/85 backdrop-blur-sm p-3 rounded-full border md:top-4 md:bottom-auto">
      <nav>
        <ul className="flex items-center justify-center gap-6">
          {navLinks.map((item) => {
            return (
              <NavLink
                key={item.name}
                name={item.name}
                Icon={item.icon}
                link={item.link}
              />
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
