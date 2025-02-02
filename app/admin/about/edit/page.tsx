import { getAboutInfo } from "@/lib/actions/about";
import React from "react";
import AboutUpdateForm from "../_components/UpdateAbout";

export default async function EditPage() {
  const { data, success } = await getAboutInfo();
  if (success && data) {
    console.log(data);

    return <AboutUpdateForm initialData={data} id={data.id} />;
  } else {
    return <div>Error loading data</div>;
  }
}
