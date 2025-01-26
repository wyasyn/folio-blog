import { BlogCard } from "./Blogcard";

export default function BlogFetch() {
  return (
    <div className="custom-grid">
      {sampleData.map((data) => (
        <BlogCard key={data.image} {...data} />
      ))}
    </div>
  );
}

const sampleData = [
  {
    title: "How to create a beautiful and engaging website",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ligula vel ipsum tincidunt luctus. Nulla facilisi. Sed ac massa vel odio efficitur tincidunt.",
    link: "/blog/how-to-create-a-beautiful-and-engaging-website",
    image:
      "https://images.unsplash.com/photo-1481487196290-c152efe083f5?q=80&w=1862&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "How to build a successful startup",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ligula vel ipsum tincidunt luctus. Nulla facilisi. Sed ac massa vel odio efficitur tincidunt.",
    link: "/blog/how-to-build-a-successful-startup",
    image:
      "https://images.unsplash.com/photo-1519222970733-f546218fa6d7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
