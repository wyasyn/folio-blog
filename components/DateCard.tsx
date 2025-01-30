import { calculateReadingTime, formatDateString } from "@/lib/utils";
import { CalendarDays } from "lucide-react";

export default function DateCard({
  date,
  body,
}: {
  date: string;
  body: string;
}) {
  const readingTime = calculateReadingTime(body);
  const formatDate = formatDateString(date);
  return (
    <div className="flex items-center justify-between gap-4 mb-3">
      <div className="flex items-center text-sm  gap-2">
        <CalendarDays className="w-5 h-5" />
        <span>{formatDate}</span>
      </div>
      <div>{readingTime} min read</div>
    </div>
  );
}
