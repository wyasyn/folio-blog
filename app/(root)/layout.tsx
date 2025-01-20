import AsideBar from "@/components/AsideBar";
import Navbar from "@/components/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col gap-3 md:flex-row container pt-6 md:pt-24">
      <Navbar />
      <AsideBar />
      <section className="border flex-1">{children}</section>
    </main>
  );
}
