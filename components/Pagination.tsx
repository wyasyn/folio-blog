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
  basePath = "/",
}: {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const getPageHref = (page: number) => {
    const path = basePath.endsWith("/") ? basePath : `${basePath}/`;
    return `${path}?page=${page}`;
  };

  const numberedPageItems = [];
  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <PaginationItem key={page}>
        <PaginationLink
          href={getPageHref(page)}
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
            href={getPageHref(currentPage - 1)}
            className={currentPage === minPage ? "pointer-events-none" : ""}
          />
        </PaginationItem>
        {numberedPageItems}
        <PaginationItem>
          <PaginationNext
            href={getPageHref(currentPage + 1)}
            className={currentPage === maxPage ? "pointer-events-none" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
