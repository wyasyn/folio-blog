import { getAboutInfo } from "@/lib/actions/about";
import React from "react";
import AboutUpdateForm from "../_components/UpdateAbout";

export default async function EditPage() {
  const { data, success } = await getAboutInfo();
  if (success && data) {
    return <AboutUpdateForm initialData={data} id={data.id} />;
  } else {
    return <div className="my-12 mx-auto">Error loading data</div>;
  }
}
