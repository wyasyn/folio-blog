import PrimaryBtn from "@/components/PrimaryBtn";
import SecondaryBtn from "@/components/SecondaryBtn";
import SelectedWorks from "@/components/SelectedWorks";
import Skills from "@/components/Skills";

export default function page() {
  return (
    <div>
      <div className="text-center md:text-start flex flex-col items-center md:items-start">
        <h2 className="text-3xl text-balance mb-4 capitalize">
          Building exceptional user experiences
        </h2>
        <p className="mb-4 text-pretty max-w-[50ch]">
          I transform ideas into impactful digital experiences, delivering
          innovative solutions that elevate brands and captivate audiences
          around the world.
        </p>
        <div className="flex flex-col min-[341px]:flex-row items-center gap-4 justify-center md:justify-start">
          <SecondaryBtn text="Explore my work" link="/portfolio" />
          <PrimaryBtn text="Let's connect" link="/contact" />
        </div>
      </div>
      <SelectedWorks />
      <Skills />
    </div>
  );
}
