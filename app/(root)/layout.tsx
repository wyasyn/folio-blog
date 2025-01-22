import AsideBar from "@/components/AsideBar";

import Navbar from "@/components/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col gap-3 md:flex-row container pt-6 md:pt-24">
      <Navbar />
      <AsideBar />
      <section className="border flex flex-col flex-1 gap-4  rounded-lg p-4 mb-[5rem]">
        <div>{children}</div>

        <p className=" mt-auto text-xs text-muted-foreground/50 py-4">
          {new Date().getFullYear()} - Yasin Walum. All rights reserved.
        </p>
      </section>
    </main>
  );
}
