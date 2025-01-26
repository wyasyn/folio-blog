"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import heroImg from "@/assets/hero.jpg";
import Link from "next/link";

export function BlogCard({
  title,
  description,
  link,
  image,
}: {
  title: string;
  description: string;
  link: string;
  image: string;
}) {
  return (
    <Link href={link} className=" w-full group/card">
      <div
        className={cn(
          " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
          " bg-cover bg-center bg-no-repeat"
        )}
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 bg-black opacity-40 group-hover/card:opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
          <Image
            height="100"
            width="100"
            alt="Avatar"
            src={heroImg}
            className="h-10 w-10 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-50 relative z-10">
              Yasin Walum
            </p>
            <p className="text-sm text-gray-400">2 min read</p>
          </div>
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl truncate md:text-2xl text-gray-50 relative z-10">
            {title}
          </h1>
          <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
            {description.length > 100
              ? description.slice(0, 100) + "..."
              : description}
          </p>
        </div>
      </div>
    </Link>
  );
}
