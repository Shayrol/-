"use client";

import { CommonInfoResponse } from "@/app/service/travel/travel_detail/detail.types";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeaderBackButton({
  data,
}: {
  data: CommonInfoResponse;
}) {
  const router = useRouter();

  const travel = data.response.body.items.item[0];

  console.log(data.response.body.items.item[0]);

  return (
    <header className="sticky flex justify-center items-center top-0 z-50 w-full h-20 border-b bg-[#F6F5F0]">
      <div className="relative mx-auto flex h-14 w-full max-w-7xl items-center px-4 sm:h-16 sm:px-6">
        <button onClick={() => router.back()} className="cursor-pointer">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="absolute left-1/2 max-w-[70%] -translate-x-1/2 truncate text-lg font-semibold">
          {travel.title}
        </h2>
        {/* <div className=""></div> */}
      </div>
    </header>
  );
}
