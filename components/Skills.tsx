"use client";
import { motion } from "motion/react";
import { toolsAndTechnologies } from "@/lib/data";
import { useRef, useEffect, useState } from "react";

export default function MovingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      // Calculate the width of all items
      const scrollableWidth = containerRef.current.scrollWidth;
      const visibleWidth = containerRef.current.offsetWidth;
      setContainerWidth(scrollableWidth - visibleWidth);
    }
  }, []);

  return (
    <div
      className="relative mx-auto md:max-w-[400px] lg:max-w-[500px] xl:max-w-[670px] fade-mask"
      ref={containerRef}
    >
      <motion.div
        className="flex items-center gap-12 py-14"
        animate={{ x: [0, -containerWidth] }}
        whileHover={{
          transition: {
            duration: containerWidth / 200, // Adjust speed dynamically
          },
        }}
        transition={{
          repeat: Infinity,
          duration: containerWidth / 100, // Adjust speed dynamically
          ease: "linear",
        }}
        style={{ display: "flex", width: "fit-content" }}
      >
        {toolsAndTechnologies.concat(toolsAndTechnologies).map((tool, idx) => (
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
      </motion.div>
    </div>
  );
}
