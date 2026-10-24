"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  totalCount: number;
  currentPage: number;
  itemPerPage: number;
  handleNextPage: () => void;
  handlePreviosPage: () => void;
  handleCurrentPage: (currentPage: number) => void;
}

export function Paginat({
  currentPage,
  itemPerPage,
  totalCount,
  handleNextPage,
  handlePreviosPage,
  handleCurrentPage,
}: Props) {
  const totalPages = Math.ceil(totalCount / itemPerPage);

  const isDisableNext = currentPage >= totalPages;
  const isDisablePrevious = currentPage <= 1;

  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pages = getPages();

  return (
    <Pagination dir="rtl">
      <PaginationContent>
        <PaginationItem
          onClick={handlePreviosPage}
          className={
            isDisablePrevious
              ? "pointer-events-none text-muted-foreground"
              : "pointer-events-auto"
          }
        >
          <PaginationPrevious text="قبلی" />
        </PaginationItem>
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return (
            <PaginationItem
              key={page}
              onClick={() => handleCurrentPage(page as number)}
            >
              <PaginationLink isActive={page === currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem
          onClick={handleNextPage}
          className={
            isDisableNext
              ? "pointer-events-none text-muted-foreground"
              : "pointer-events-auto"
          }
        >
          <PaginationNext text="بعدی" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
