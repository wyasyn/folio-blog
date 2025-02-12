import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import BackBtn from "@/components/BackBtn";
import Categories from "@/components/CategoriesBadges";
import { getPaginatedProjects, getProjectBySlug } from "@/lib/actions/project";
import { Article, WithContext } from "schema-dts";
import CodeBlock from "@/components/CodeBlock";
import { cache } from "react";

export const revalidate = 86400;

export async function generateStaticParams() {
  const { projects } = await getPaginatedProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

type Params = {
  params: Promise<{ slug: string }>;
};

const getCashedProject = cache(async (slug: string) => {
  const { project } = await getProjectBySlug(slug);
  if (!project) notFound();
  return project;
});

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getCashedProject(slug);

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
  const project = await getCashedProject(slug);
  const categories = project.categories;

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project?.title,
    image: project?.image ? [project.image] : [],
    datePublished: project?.createdAt
      ? new Date(project.createdAt).toISOString()
      : "",
    dateModified: project?.updatedAt
      ? new Date(project.updatedAt).toISOString()
      : "",
    author: [
      {
        "@type": "Person",
        name: "Yasin Walum",
        url: "https://ywalum.com",
        sameAs: [
          "https://github.com/wyasyn",
          "https://www.linkedin.com/in/yasin-walum",
        ],
      },
    ],
  };

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
              code: ({ className, children }) => {
                const match = /language-(\w+)/.exec(className || "");
                return (
                  <CodeBlock
                    code={String(children).trim()}
                    language={match?.[1] || "plaintext"}
                  />
                );
              },
            }}
            source={project.body}
          />
        ) : (
          <p>No content available.</p>
        )}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
