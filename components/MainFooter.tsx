import Link from "next/link";
import { Clock } from "./clock";

export default function MainFooter() {
  return (
    <div className=" mt-auto text-xs text-muted-foreground/50 py-4 w-full  flex items-center justify-between gap-5">
      <p>{new Date().getFullYear()} - Yasin Walum. All rights reserved.</p>{" "}
      <Clock />{" "}
      <Link
        className="ml-auto underline hover:text-foreground duration-300 transition-all"
        href="/policy"
      >
        Privacy Policy
      </Link>
    </div>
  );
}
