import Image from "next/image";
import Experience from "./_components/Experience";
import laptopImage from "@/assets/original-635266f60586f8b46bcc4305c43727ce.png";
import Stats from "./_components/Stats";
import Faqs from "./_components/Faqs";

export default function page() {
  return (
    <div id="about">
      <small className="uppercase text-primary">About me</small>
      <h2 className="capitalize text-3xl my-3">A glimpse into my world</h2>
      <p className="max-w-[30ch]">
        Learn more about who I am, what I do, and what inspires me.
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
    </div>
  );
}
