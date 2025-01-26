import AdminDashBar from "@/components/AdminDashBar";
import { AdminFooter } from "@/components/AminFooter";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-8 flex flex-col gap-8 min-h-screen">
      <AdminDashBar />
      <main className="max-w-[990px] mx-auto p-2 w-full">{children}</main>
      <AdminFooter />
    </div>
  );
}
