"use client";

import { deleteProject } from "@/lib/actions/project";
import { useRouter } from "next/navigation";

export default function DeleteProjectBtn({ slug }: { slug: string }) {
  const router = useRouter();
  return (
    <button
      className="px-3 py-1 hover:bg-secondary duration-300 rounded-lg text-destructive"
      onClick={async () => {
        try {
          await deleteProject(slug);
          router.refresh();
        } catch (error) {
          console.log(error);
        }
      }}
    >
      Delete
    </button>
  );
}
