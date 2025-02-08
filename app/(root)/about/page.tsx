import Experience from "./_components/Experience";

import Stats from "./_components/Stats";
import Faqs from "./_components/Faqs";

import { Person, WithContext } from "schema-dts";
import { Metadata } from "next";
import { getAboutInfo } from "@/lib/actions/about";
import Skills from "./_components/Skills";
import Images from "./_components/Images";

export const metadata: Metadata = {
  title: "About Me ",
};

export default async function page() {
  const { data, success } = await getAboutInfo();

  if (!success || !data) {
    return (
      <div className="mx-auto py-14 bg-red-300 border border-red-700 rounded-lg text-red-700 px-8">
        No about data found!
      </div>
    );
  }
  const jsonLd: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    description: data.description,
    image: data.avatar ? [data.avatar] : [],
    url: "https://ywalum.com",
    sameAs: data.socialLinks.map((link) => link.url),
    jobTitle: data.title,
    homeLocation: data.location ? data.location : "",

    nationality: "Ugandan",

    gender: "Male",
  };
  return (
    <div id="about">
      <small className="uppercase text-primary">About me</small>
      <h2 className="capitalize text-4xl my-4">A Glimpse into My Journey</h2>
      <p className="max-w-[35ch]">
        Discover more about my experiences, the projects I’m passionate about,
        and the ideas that fuel my creativity.
      </p>

      <div className="my-[3rem]">
        <Skills
          skills={data.skills}
          education={data.educations}
          languages={data.languages}
          hobbies={data.hobbies}
        />
        {data.experiences.length > 0 && (
          <Experience experiences={data.experiences} />
        )}

        <Images />
        <Stats />
        <Faqs />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
