"use client";

import { deleteBlogPost } from "@/lib/actions/posts";
import { useRouter } from "next/navigation";

export default function DeleteBlogBtn({ slug }: { slug: string }) {
  const router = useRouter();
  return (
    <button
      className="px-3 py-1 hover:bg-secondary duration-300 rounded-lg text-destructive"
      onClick={async () => {
        try {
          await deleteBlogPost(slug);
          router.refresh();
        } catch {
          console.error("Error deleting blog post");
        }
      }}
    >
      Delete
    </button>
  );
}
