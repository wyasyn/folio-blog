type Category = {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

type Project = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  image: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  categories: Category[];
};
