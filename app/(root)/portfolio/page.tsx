import SelectedWorks from "@/components/SelectedWorks";

export default function page() {
  return (
    <div id="portfolio">
      <small className="uppercase text-primary">Real world results</small>
      <h2 className="capitalize text-3xl my-3">featured Projects</h2>
      <p className="max-w-[30ch]">
        See how I transformed concepts into engaging digital experiences.
      </p>

      <SelectedWorks />
    </div>
  );
}
