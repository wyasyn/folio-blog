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

export function joinWithCommas(strings: string[]): string {
  return strings.join(", ");
}

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length; // Split content into words
  const wordsPerMinute = 200; // Average reading speed
  const readingTime = Math.ceil(words / wordsPerMinute); // Round up to the nearest minute
  return readingTime;
}

export function formatDateString(dateStr: string): string {
  if (!dateStr) return "Unknown Date"; // Handle empty string

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    console.error("Invalid date string:", dateStr);
    return "Invalid Date";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-US", options).replace("at", " |");
}
