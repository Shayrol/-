"use client";

import { TravelResponse } from "@/app/service/travel/travel_list/list.types";
import { useQuery } from "@tanstack/react-query";
import Pagination from "./list.pagenation";
import { CardImage } from "./list.card";
import CardImageSkeleton from "./list.card.skeleton";
import Link from "next/link";

interface TravelListProps {
  searchParams: {
    region?: string;
    sigungu?: string;
    category1?: string;
    category2?: string;
    keyword?: string;
    page?: string;
  };
}

// 데이터를 가져오는 fetch 함수
async function fetchTravels(
  params: TravelListProps["searchParams"],
): Promise<TravelResponse> {
  const queryParams = new URLSearchParams();
  if (params.region) queryParams.set("region", params.region);
  if (params.sigungu) queryParams.set("sigungu", params.sigungu);
  if (params.category1) queryParams.set("category1", params.category1);
  if (params.category2) queryParams.set("category2", params.category2);
  if (params.keyword) queryParams.set("keyword", params.keyword);
  if (params.page) queryParams.set("page", params.page);

  if (params.keyword) {
    const res = await fetch(`/api/travel/search?${queryParams.toString()}`);
    if (!res.ok) throw new Error("검색결과 여행 목록을 불러오지 못했습니다.");

    return res.json();
  } else {
    const res = await fetch(`/api/travel/list?${queryParams.toString()}`);
    if (!res.ok) throw new Error("여행 목록을 불러오지 못했습니다.");

    return res.json();
  }
}

export default function TravelList({ searchParams }: TravelListProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["travels", searchParams],
    queryFn: () => fetchTravels(searchParams),
    staleTime: 1000 * 60 * 10,
  });

  console.log("data: ", data);

  const currentPage = Number(searchParams.page || "1");

  const body = data?.response?.body;
  const totalCount = body?.totalCount ?? 0;
  const numOfRows = 30;
  const totalPage = Math.ceil(totalCount / numOfRows);

  // if (isLoading)
  //   return <div className="py-10 text-center">데이터를 불러오는 중...</div>;
  if (isError)
    return (
      <div className="py-10 text-center text-red-500">에러가 발생했습니다.</div>
    );

  const items = data?.response.body.items.item ?? [];

  return (
    <div className="mt-8">
      <div className="flex text-center gap-1 py-2">
        <h4 className="text-sm font-bold">검색결과</h4>
        <span className="text-sm">{totalCount.toLocaleString("ko-KR")}개</span>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 30 }).map((_, index) => (
            <CardImageSkeleton key={index} />
          ))
        ) : items.length > 0 ? (
          items.map((travel, index) => (
            <Link key={travel.contentid} href={`/travel/${travel.contentid}`}>
              <CardImage key={travel.contentid} travel={travel} index={index} />
            </Link>
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-gray-400">
            검색 결과가 없습니다.
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="w-full p-4">
          <Pagination totalPage={totalPage} currentPage={currentPage} />
        </div>
      )}
    </div>
  );
}
