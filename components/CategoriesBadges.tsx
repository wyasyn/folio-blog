import Link from "next/link";
import React from "react";

const Categories = ({
  categories,
}: {
  categories: {
    slug: string;
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {categories.map((category, index) => (
        <Link
          href={`/category/${category.slug}`}
          key={index}
          className="px-3 py-1 text-xs rounded-full bg-secondary border 
          "
        >
          <span>{category.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
