import Image from "next/image";
import Link from "next/link";

export default function PortfolioCard({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <Link href={`/portfolio/${makeSlug(title)}`}>
      <article
        className={`relative overflow-clip rounded-lg w-full aspect-[4/3] border group `}
      >
        <Image
          src={image || "/placeholder-image.jpg"}
          fill
          className="object-cover object-center z-10 group-hover:scale-110 duration-300 transition-all"
          alt={title}
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end px-4 pb-8 md:pb-3 md:px-3 bg-gradient-to-t from-background via-transparent to-transparent">
          <h3 className=" font-sans truncate group-hover:text-primary capitalize duration-300">
            {title}
          </h3>
        </div>
      </article>
    </Link>
  );
}

const makeSlug = (title: string) => {
  return title.toLowerCase().replace(" ", "-");
};
