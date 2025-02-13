import { toolsAndTechnologies } from "@/lib/data";
import { InfiniteSlider } from "./core/infinite-scroll";

export function InfiniteSliderHoverSpeedSkills() {
  return (
    <InfiniteSlider durationOnHover={75} duration={100} gap={24}>
      {toolsAndTechnologies.map((tool, idx) => (
        <div
          key={idx}
          className={`flex group relative hover:shadow-sm duration-300 transition-all hover:shadow-primary shrink-0 bg-secondary p-4 rounded-xl items-center gap-3 ${
            idx % 2 === 0 ? "rotate-6" : "-rotate-6"
          }`}
        >
          <span className="absolute -top-12 border invisible group-hover:visible duration-300 transition-all bg-secondary p-2 left-1/2 -translate-x-1/2 rounded-lg shadow-sm shadow-primary">
            {tool.name}
          </span>
          <span
            className="text-muted-foreground text-5xl"
            aria-label={tool.name}
          >
            {tool.icon}
          </span>
        </div>
      ))}
    </InfiniteSlider>
  );
}
