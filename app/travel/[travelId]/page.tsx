"use client";

import { TravelDetailResponse } from "@/app/service/travel/travel_detail/detail.types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

async function fetchTravel(travelId: string): Promise<TravelDetailResponse> {
  const res = await fetch(`/api/travel/${travelId}/`);
  if (!res.ok) {
    throw new Error("관광지 상세 데이터 불러오지 못했습니다.");
  }

  return res.json();
}

export default function TravelDetailPage() {
  const params = useParams();
  const travelId = params.travelId as string;

  const { data } = useQuery({
    queryKey: ["travel", travelId],
    queryFn: () => fetchTravel(travelId),
    staleTime: 1000 * 60 * 10,
    enabled: !!travelId,
  });

  console.log("data: ", data);
  console.log("travelId: ", travelId);

  const common = data?.common.response.body.items.item[0];

  return (
    <div>
      <div>상세 페이지</div>
      <h4>{common?.title}</h4>
      {common?.firstimage && (
        <Image
          alt="img"
          src={common.firstimage}
          width={300}
          height={100}
          sizes="100vw"
        />
      )}

      <p>{common?.overview}</p>
    </div>
  );
}
