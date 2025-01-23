import { ClassValue, clsx } from "clsx";
import slugify from "slugify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const makeSlug = (str: string) => {
  const slug = slugify(str, { lower: true, strict: true });
  return slug;
};
