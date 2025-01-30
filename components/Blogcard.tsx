"use client";
import { calculateReadingTime } from "@/lib/utils";
import { Clock } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

export function BlogCard({
  title,
  categories,
  link,
  image,
  body,
}: {
  title: string;
  categories: {
    slug: string;
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
  link: string;
  image: string;
  body: string;
}) {
  const readingTime = calculateReadingTime(body);
  return (
    <Link
      href={link}
      className=" w-full hover:shadow-lg border rounded-xl duration-300 transition-all group"
    >
      <div>
        <div className="overflow-clip rounded-t-lg w-full aspect-[4/3]">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className=" object-cover w-full h-full group-hover:scale-110 duration-300 group-hover:rotate-12"
          />
        </div>
        <div className="p-4 bg-secondary rounded-b-lg">
          <div className="flex items-center gap-1 overflow-hidden mb-2 ">
            {categories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 shrink-0 text-xs rounded-full  border"
              >
                <span>{category.name}</span>
              </span>
            ))}
          </div>
          <h3 className="text-xl mb-5">
            {title.length > 50 ? title.slice(0, 50) + "..." : title}
          </h3>
          <div className="flex justify-end items-center">
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> {readingTime} min read
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
