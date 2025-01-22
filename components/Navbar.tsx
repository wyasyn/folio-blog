"use client";
import { Contact, LayoutDashboard, Newspaper, User } from "lucide-react";
import NavLink from "./NavLink";
import Logo from "./Logo";
import ModeToggle from "./modeToggle";

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
    <header className="fixed bottom-4 left-0 z-50  md:top-4 md:bottom-auto w-full">
      <nav className="container flex items-center justify-between gap-4">
        <Logo />
        <ul className="flex items-center justify-center gap-6 bg-secondary/75 backdrop-blur-sm p-3 rounded-full border">
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
        <ModeToggle />
      </nav>
    </header>
  );
}
