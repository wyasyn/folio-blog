import { Skeleton } from "@/components/Skeleton";

export default function ImageLoading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-12">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className={`
            relative overflow-hidden rounded-lg bg-muted
            aspect-square
            ${index % 5 === 0 ? "col-span-2 row-span-2" : ""}
            ${index % 3 === 0 ? "md:col-span-2" : ""}
            ${index % 4 === 0 ? "lg:col-span-2" : ""}
          `}
        >
          <Skeleton className="h-full w-full" />
        </div>
      ))}
    </div>
  );
}
