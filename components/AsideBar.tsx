import Image from "next/image";
import heroImg from "@/assets/hero.jpg";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  Github,
  Linkedin,
  Lock,
  LucideProps,
  Mail,
  Twitter,
} from "lucide-react";
const email = process.env.EMAIL;

export default function AsideBar() {
  const socials = [
    {
      name: "GitHub",
      icon: Github,
      link: "https://github.com/wyasyn",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      link: "https://www.linkedin.com/in/yasin-walum",
    },
    {
      name: "Twitter",
      icon: Twitter,
      link: "https://x.com/wyasyn",
    },
    {
      name: "Gmail",
      icon: Mail,
      link: `mailto:${email}`,
    },
  ];
  return (
    <aside className="border md:sticky md:top-24 bg-secondary p-4 rounded-lg min-w-[300px] md:max-w-[300px] md:max-h-[510px]">
      <div>
        <div>
          <Image
            src={heroImg}
            width={400}
            height={400}
            alt="Yasin Image"
            placeholder="blur"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl mt-4">I&apos;m Yasin Walum</h1>
          <p className="max-w-[40ch] my-4">
            Computer Scientist specializing in Web Development, AI, Machine
            Learning, Data Science, and Software Development.
          </p>
          <div className="flex items-center gap-4 pt-2">
            {socials.map((item) => (
              <SocialIcon key={item.name} link={item.link} Icon={item.icon} />
            ))}
            <Link href={`/admin`} className="hover:text-foreground">
              <Lock className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SocialIcon({
  link,
  Icon,
}: {
  link: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}) {
  return (
    <Link
      href={link}
      className="hover:text-foreground transition-all duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="w-4 h-4" />
    </Link>
  );
}
