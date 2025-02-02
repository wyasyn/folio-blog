import Link from "next/link";
import { PlusCircle, FileText, User, Edit2 } from "lucide-react";

export function AdminFooter() {
  return (
    <footer className="bg-secondary  py-4 px-6 mt-auto">
      <div className="container mx-auto">
        <nav className="flex justify-center space-x-6">
          <Link
            href="/admin/project/create-project"
            className="flex items-center hover:text-foreground transition-colors duration-200"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            <span>Create Project</span>
          </Link>
          <Link
            href="/admin/blog/create-blog"
            className="flex items-center hover:text-foreground transition-colors duration-200"
          >
            <FileText className="mr-2 h-5 w-5" />
            <span>Create Blog Post</span>
          </Link>
          <Link
            href="/admin/about"
            className="flex items-center hover:text-foreground transition-colors duration-200"
          >
            <User className="mr-2 h-5 w-5" />
            <span>Add my info</span>
          </Link>
          <Link
            href="/admin/about/edit"
            className="flex items-center hover:text-foreground transition-colors duration-200"
          >
            <Edit2 className="mr-2 h-5 w-5" />
            <span>Edit my info</span>
          </Link>
        </nav>
        <div className="mt-4 text-center text-muted-foreground text-xs">
          <p>
            &copy; {new Date().getFullYear()} Yasin Walum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
