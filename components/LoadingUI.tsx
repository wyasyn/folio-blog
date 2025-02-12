import { Skeleton } from "./Skeleton";

export default function LoadingUI() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
