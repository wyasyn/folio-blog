import AdminDashBar from "@/components/AdminDashBar";
import { AdminFooter } from "@/components/AminFooter";
import React from "react";
import { getCurrentUser } from "../login/_actions/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import NavButton from "./about/_components/nav-button";

export const metadata: Metadata = {
  title: "Admin ",
};

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <div className="p-8 flex flex-col gap-8 min-h-screen">
      <AdminDashBar />
      <main className="max-w-[990px] mx-auto p-2 w-full">{children}</main>
      <NavButton />
      <AdminFooter />
    </div>
  );
}
