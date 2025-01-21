import PrimaryBtn from "@/components/PrimaryBtn";
import SecondaryBtn from "@/components/SecondaryBtn";
import SelectedWorks from "@/components/SelectedWorks";

export default function page() {
  return (
    <div>
      <div className="text-center md:text-start flex flex-col items-center md:items-start">
        <h2 className="text-3xl text-balance mb-4 capitalize">
          Building exceptional user experiences
        </h2>
        <p className="mb-4 text-pretty max-w-[40ch]">
          I specialize in transforming designs into functional, high performing
          web applications. Let&apos;s discuss your next project.
        </p>
        <div className="flex flex-col min-[341px]:flex-row items-center gap-4 justify-center md:justify-start">
          <SecondaryBtn text="Explore my work" link="/portfolio" />
          <PrimaryBtn text="Let's connect" link="/contact" />
        </div>
      </div>
      <SelectedWorks />
    </div>
  );
}
