"use client";

import { use } from "react";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = use(props.params);
  const searchParams = use(props.searchParams);
  const slug = params.slug;
  const query = searchParams.query;
}
