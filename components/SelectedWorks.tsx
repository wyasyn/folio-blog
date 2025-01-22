import { sampleWorks } from "@/lib/sampleWorks";
import PortfolioCard from "./PortfolioCard";
import Link from "next/link";

export default function SelectedWorks() {
  return (
    <div className="mt-[5rem]">
      <h2 className="text-2xl mb-[2rem]">Selected Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleWorks.map((project, index) => (
          <PortfolioCard
            key={index}
            title={project.title}
            image={project.image.src}
          />
        ))}
      </div>
      <div className="flex items-center justify-end my-6 ">
        <Link
          href={`/portfolio`}
          className="px-4 py-2 border rounded-lg hover:bg-muted-foreground hover:text-background duration-300 transition-all"
        >
          See More
        </Link>
      </div>
    </div>
  );
}
