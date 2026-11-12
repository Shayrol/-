"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
}

export default function Pagination({
  currentPage,
  totalPage,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changePage = (page: number | string) => {
    if (Number(page) < 1 || Number(page) > totalPage) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));

    router.push(`${pathname}?${params.toString()}`);
  };

  // 페이지 번호 생성
  const getPages = () => {
    // 7페이지 이하라면 전부 표시
    if (totalPage <= 7) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    // 1 ~ 5페이지
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPage];
    }

    // 마지막 5페이지
    if (currentPage >= totalPage - 3) {
      return [
        1,
        "ellipsis",
        totalPage - 4,
        totalPage - 3,
        totalPage - 2,
        totalPage - 1,
        totalPage,
      ];
    }

    // 중간 페이지
    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      totalPage,
    ];
  };

  const pages = getPages();

  return (
    <ShadcnPagination>
      <PaginationContent className="gap-1">
        {/* 이전 */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();

              if (currentPage > 1) {
                changePage(currentPage - 1);
              }
            }}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {/* 페이지 번호 */}
        {pages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                className={page === currentPage ? "text-[#EC5B3F]" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  changePage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* 다음 */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();

              if (currentPage < totalPage) {
                changePage(currentPage + 1);
              }
            }}
            className={
              currentPage === totalPage ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
