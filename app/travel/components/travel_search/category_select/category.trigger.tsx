"use client";

import { Map } from "lucide-react";

interface RegionTriggerProps {
  category1: string;
  category1Name: string;
  category2: string;
  category2Name: string;
}

export default function CategoryTrigger({
  category1,
  category1Name,
  category2,
  category2Name,
}: RegionTriggerProps) {
  return (
    <div className="flex items-center justify-between h-10 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 cursor-pointer">
      <div className="flex min-w-0 items-center gap-2">
        <Map className="h-4 w-4 shrink-0 text-[#EC5B3F]" />

        <div className="flex min-w-0 items-center gap-1.5 text-sm">
          {category1 ? (
            <>
              <span className="font-semibold text-[#EC5B3F]">
                {category1Name}
              </span>

              <span className="text-gray-300 font-bold">/</span>

              <span className="truncate text-gray-600 font-medium">
                {category2 ? category2Name : "전체"}
              </span>
            </>
          ) : (
            <span className="text-gray-500 font-medium">전체 카테고리</span>
          )}
        </div>
      </div>

      <span className="shrink-0 text-xs text-gray-400">
        {category1 ? "" : "카테고리를 선택해주세요"}
      </span>
    </div>
  );
}
