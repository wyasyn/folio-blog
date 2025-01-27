import { Skeleton } from "./Skeleton";

export default function LoadingUI() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col space-y-3" role="status">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
