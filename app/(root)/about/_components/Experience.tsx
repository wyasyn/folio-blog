import { Experience as ExperienceValue } from "@prisma/client";

export default function Experience({
  experiences,
}: {
  experiences: ExperienceValue[];
}) {
  return (
    <div className="flex gap-10 sm:gap-[5rem] lg:gap-[4rem] flex-col sm:flex-row mb-12">
      <h2 className="text-2xl">Experiences</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            startDate={experience.startDate.toLocaleDateString()}
            endDate={experience.endDate?.toLocaleDateString() || "Present"}
            employer={experience.company}
            role={experience.position}
            description={experience.description ? experience.description : ""}
          />
        ))}
      </div>
    </div>
  );
}

const ExperienceCard = ({
  startDate,
  endDate,
  employer,
  role,
  description,
}: {
  startDate: string;
  endDate: string;
  employer: string;
  role: string;
  description: string;
}) => {
  return (
    <article className="border-l px-4 py-2">
      <h4 className="text-xl capitalize">{employer}</h4>
      <h5 className="text-foreground font-medium my-2">{role}</h5>
      <span className="px-2 text-xs mb-4 block w-fit py-1 bg-secondary border rounded-xl">
        {startDate} - {endDate}
      </span>
      <p className="max-w-[30ch]">{description}</p>
    </article>
  );
};
