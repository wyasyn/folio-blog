import NotFound from "@/app/not-found";
import BackBtn from "@/components/BackBtn";
import Categories from "@/components/CategoriesBadges";
import { getBlogPostBySlug } from "@/lib/actions/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Article, WithContext } from "schema-dts";
import CodeBlock from "@/components/CodeBlock";

type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  const { error, blogPost } = await getBlogPostBySlug(slug);
  if (error || !blogPost) NotFound();

  return {
    title: blogPost?.title,
    description: blogPost?.excerpt,
    openGraph: {
      title: blogPost?.title,
      description: blogPost?.excerpt,
      images: [{ url: blogPost?.image }],
    },
  };
}

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  const { error, blogPost } = await getBlogPostBySlug(slug);
  if (error || !blogPost) NotFound();

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
    <div>
      <div className="flex w-full items-center justify-end">
        <BackBtn />
      </div>

      <div className="prose dark:prose-invert">
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
