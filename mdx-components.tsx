import React, { ComponentPropsWithoutRef } from "react";
import { Link } from "next-view-transitions";
import { highlight } from "sugar-high";
import Image, { ImageProps } from "next/image";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

interface Components {
  h1: React.FC<HeadingProps>;
  img: React.FC<ImageProps>;
  h2: React.FC<HeadingProps>;
  h3: React.FC<HeadingProps>;
  h4: React.FC<HeadingProps>;
  p: React.FC<ParagraphProps>;
  ol: React.FC<ListProps>;
  ul: React.FC<ListProps>;
  li: React.FC<ListItemProps>;
  em: React.FC<ComponentPropsWithoutRef<"em">>;
  strong: React.FC<ComponentPropsWithoutRef<"strong">>;
  a: React.FC<AnchorProps>;
  code: React.FC<ComponentPropsWithoutRef<"code">>;
  Table: React.FC<{ data: { headers: string[]; rows: string[][] } }>;
  blockquote: React.FC<BlockquoteProps>;
}

const components: Components = {
  h1: (props: HeadingProps) => (
    <h1 className="font-medium pt-12 mb-0 fade-in" {...props} />
  ),
  img: (props) => (
    <Image
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
      alt={props.alt as string}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="font-medium mt-8 mb-3" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className=" font-medium mt-8 mb-3" {...props} />
  ),
  h4: (props: HeadingProps) => <h4 className="font-medium" {...props} />,
  p: (props: ParagraphProps) => <p className=" leading-snug" {...props} />,
  ol: (props: ListProps) => (
    <ol className=" list-decimal pl-5 space-y-2" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className=" list-disc pl-5 space-y-1" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = "text-blue-500 hover:text-blue-700";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote className="ml-[0.075em] border-l-3  pl-4 border" {...props} />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
