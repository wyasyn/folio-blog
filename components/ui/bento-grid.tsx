import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  link,
  title,
  description,
  image,
  index,
}: {
  link: string;
  title: string;
  description: string;
  image: string;
  index: number;
}) => {
  const isWide = index === 0 || index === 3;

  return (
    <Link
      href={link}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-secondary border justify-between flex flex-col space-y-4 group",
        isWide && "md:col-span-2"
      )}
    >
      <div className="flex flex-1 w-full h-full min-h-[6rem] relative overflow-clip rounded-xl   border">
        <Image
          src={image}
          alt={title}
          className="w-full h-full  object-cover group-hover:scale-105 duration-300 transition-all object-center"
          fill
        />
      </div>
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="font-sans font-bold mb-2 mt-2 truncate">{title}</div>
        <div className="font-sans font-normal text-xs">
          {description && description.toString().length > 100
            ? description?.toString().slice(0, 100) + "..."
            : description}
        </div>
      </div>
    </Link>
  );
};
