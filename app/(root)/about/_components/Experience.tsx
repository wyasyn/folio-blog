export default function Experience() {
  return (
    <div className="flex gap-10 sm:gap-[5rem] lg:gap-[4rem] flex-col sm:flex-row">
      <h2 className="text-2xl">Experiences</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
      </div>
    </div>
  );
}

const ExperienceCard = () => {
  return (
    <article className="border-l px-4 py-2">
      <h4 className="text-xl capitalize">Creative Labs</h4>
      <h5 className="text-foreground font-medium my-2">
        Sr. Web developer & Designer
      </h5>
      <span className="px-2 text-xs mb-4 block w-fit py-1 bg-secondary border rounded-xl">
        Jan 2024 - present
      </span>
      <p className="max-w-[30ch]">
        At Creative Labs, I lead a team of designers and developers to deliver
        high-quality digital products. My role involved overseeing the entire
        development process.
      </p>
    </article>
  );
};
