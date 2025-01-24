import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex items-center justify-center text-center flex-col gap-3">
        <h2 className="text-2xl">Not Found</h2>
        <p>Could not find requested resource</p>
        <Link
          href="/"
          className="block p-3 py-2 rounded-lg bg-foreground text-background "
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
