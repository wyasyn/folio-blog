import AdminDashBar from "@/components/AdminDashBar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-8 flex flex-col gap-8">
      <AdminDashBar />
      <main className="max-w-[990px] mx-auto p-2 w-full">{children}</main>
    </div>
  );
}
