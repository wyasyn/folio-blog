"use client";
import { TextLoop } from "@/components/core/text-loop";

const mySkillAreas = [
  "Front-End Development",
  "Back-End Development",
  "Mobile Development",
  "Full-Stack Development",
  "Data Science",
  "UX/UI Design",
  "Artificial Intelligence",
  "Machine Learning",
  "Cybersecurity",
];

export function SkillsTextLoop() {
  return (
    <TextLoop
      className="overflow-y-clip"
      transition={{
        type: "spring",
        stiffness: 900,
        damping: 80,
        mass: 10,
      }}
      variants={{
        initial: {
          y: 20,
          rotateX: 90,
          opacity: 0,
          filter: "blur(4px)",
        },
        animate: {
          y: 0,
          rotateX: 0,
          opacity: 1,
          filter: "blur(0px)",
        },
        exit: {
          y: -20,
          rotateX: -90,
          opacity: 0,
          filter: "blur(4px)",
        },
      }}
    >
      {mySkillAreas.map((skill, index) => (
        <span key={index} className="text-foreground">
          {skill}
        </span>
      ))}
    </TextLoop>
  );
}
