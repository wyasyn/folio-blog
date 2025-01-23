import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination() {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <button className="hover:text-foreground duration-300 transition-all p-2 border rounded-lg hover:border-foreground">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center justify-center gap-2">
          <button className="hover:text-foreground duration-300 transition-all p-2 border rounded-lg hover:border-foreground">
            1
          </button>
          <button className="hover:text-foreground duration-300 transition-all p-2 border rounded-lg hover:border-foreground">
            2
          </button>
          <button className="hover:text-foreground duration-300 transition-all p-2 border rounded-lg hover:border-foreground">
            3
          </button>
        </div>
        <button className="hover:text-foreground duration-300 transition-all p-2 border rounded-lg hover:border-foreground">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
