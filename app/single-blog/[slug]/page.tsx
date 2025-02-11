import NotFound from "@/app/not-found";
import BackBtn from "@/components/BackBtn";
import Categories from "@/components/CategoriesBadges";
import { getBlogPostBySlug, getPaginatedBlogPosts } from "@/lib/actions/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Article, WithContext } from "schema-dts";
import CodeBlock from "@/components/CodeBlock";
import DateCard from "@/components/DateCard";
import { Metadata } from "next";
import MainFooter from "@/components/MainFooter";
import RelatedBlogs from "@/components/RelatedBlogs";
import { cache } from "react";

export const revalidate = 604800;

export async function generateStaticParams() {
  const { blogPosts } = await getPaginatedBlogPosts();

  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

type Params = Promise<{ slug: string }>;

const getCachedBlog = cache(async (slug: string) => {
  const { blogPost } = await getBlogPostBySlug(slug);
  if (!blogPost) NotFound();
  return blogPost;
});

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;
  const blogPost = await getCachedBlog(slug);

  return {
    title: blogPost?.title,
    description: blogPost?.excerpt,
    openGraph: {
      title: blogPost?.title,
      description: blogPost?.excerpt,
      images: blogPost?.image ? [{ url: blogPost.image }] : [],
    },
  };
}

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  const blogPost = await getCachedBlog(slug);

  const categories = blogPost?.categories;

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blogPost?.title,
    image: blogPost?.image ? [blogPost.image] : [],
    datePublished: blogPost?.createdAt
      ? new Date(blogPost.createdAt).toISOString()
      : "",
    dateModified: blogPost?.updatedAt
      ? new Date(blogPost.updatedAt).toISOString()
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
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex w-full items-center mb-8 mt-12">
        <BackBtn />
      </div>

      <div>
        <DateCard
          date={
            blogPost?.createdAt
              ? new Date(blogPost.createdAt).toISOString()
              : new Date().toISOString()
          }
          body={blogPost?.body || ""}
        />
        <div className="prose dark:prose-invert prose-img:rounded-lg">
          {blogPost?.body ? (
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
              source={blogPost.body}
            />
          ) : (
            <p>No content available.</p>
          )}
        </div>
      </div>

      {blogPost?.id && (
        <RelatedBlogs
          id={blogPost.id}
          categoryIds={blogPost.categories.map((category) => category.id)}
        />
      )}

      <MainFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
