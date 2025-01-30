import Image from "next/image";
import Experience from "./_components/Experience";
import laptopImage from "@/assets/original-635266f60586f8b46bcc4305c43727ce.png";
import Stats from "./_components/Stats";
import Faqs from "./_components/Faqs";

import { Person, WithContext } from "schema-dts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me ",
};

export default function page() {
  const jsonLd: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yasin Walum",
    description:
      "I am a passionate software engineer who loves building innovative solutions. I have a strong background in programming languages and frameworks.",
    image: [
      "https://res.cloudinary.com/dkdteb9m5/image/upload/v1731179025/personal%20finance/lj5hjqhmvaeqdsrfcwky.jpg",
    ],
    url: "https://ywalum.com",
    sameAs: [
      "https://github.com/wyasyn",
      "https://www.linkedin.com/in/yasin-walum",
    ],
    jobTitle: "Software Engineer",
    homeLocation: "Kampala, Uganda",

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
        <Experience />
        <div>
          <Image
            src={laptopImage.src}
            width={laptopImage.width}
            height={laptopImage.height}
            alt={laptopImage.src}
            placeholder="blur"
            blurDataURL={laptopImage.blurDataURL}
            className="object-cover w-full rounded-xl my-12"
          />
        </div>
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
