"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="grid place-items-center min-h-dvh">
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        <h2 className=" text-3xl md:text-7xl font-medium">
          Something went wrong!
        </h2>
        <Button
          variant="outline"
          className="my-4"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
