import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationMenu({
  currentPage,
  totalPages,
  level,
}: {
  currentPage: number;
  totalPages: number;
  level?: string;
}) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const numberedPageItems = [];
  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <PaginationItem key={page}>
        <PaginationLink
          href={`${level && `/${level}`}/?page=${page}`}
          isActive={currentPage === page}
          className={currentPage === page ? "pointer-events-none" : ""}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    );
  }
  return (
    <Pagination className="my-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${level && `/${level}`}/?page=${currentPage - 1}`}
            className={currentPage === minPage ? "pointer-events-none" : ""}
          />
        </PaginationItem>
        {numberedPageItems}
        <PaginationItem>
          <PaginationNext
            href={`${level && `/${level}`}/?page=${currentPage + 1}`}
            className={currentPage === maxPage ? "pointer-events-none" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
