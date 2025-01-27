import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import BackBtn from "@/components/BackBtn";
import Categories from "@/components/CategoriesBadges";
import { getProjectBySlug } from "@/lib/actions/project";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const projectData = await getProjectBySlug(slug);
  if (!projectData || !projectData.project) notFound();

  const { project } = projectData;

  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const projectData = await getProjectBySlug(slug);
  if (!projectData || !projectData.project) notFound();

  const { project } = projectData;
  const categories = project.categories;

  return (
    <div>
      <div className="flex w-full items-center justify-end">
        <BackBtn />
      </div>
      <div className="prose dark:prose-invert">
        {project.body ? (
          <MDXRemote
            components={{
              Categories: (props) => (
                <Categories {...props} categories={categories} />
              ),
            }}
            source={project.body}
          />
        ) : (
          <p>No content available.</p>
        )}
      </div>
    </div>
  );
}
