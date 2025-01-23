import { experiences } from "@/lib/data";

export default function Experience() {
  return (
    <div className="flex gap-10 sm:gap-[5rem] lg:gap-[4rem] flex-col sm:flex-row">
      <h2 className="text-2xl">Experiences</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={index}
            year={experience.year}
            employer={experience.employer}
            role={experience.role}
            description={experience.description}
          />
        ))}
      </div>
    </div>
  );
}

const ExperienceCard = ({
  year,
  employer,
  role,
  description,
}: {
  year: string;
  employer: string;
  role: string;
  description: string;
}) => {
  return (
    <article className="border-l px-4 py-2">
      <h4 className="text-xl capitalize">{employer}</h4>
      <h5 className="text-foreground font-medium my-2">{role}</h5>
      <span className="px-2 text-xs mb-4 block w-fit py-1 bg-secondary border rounded-xl">
        {year}
      </span>
      <p className="max-w-[30ch]">{description}</p>
    </article>
  );
};
