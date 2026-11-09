"use client";

import { MapPin } from "lucide-react";

interface RegionTriggerProps {
  regionCode: string;
  regionName: string;
  sigunguCode: string;
  sigunguName: string;
}

export default function RegionTrigger({
  regionCode,
  regionName,
  sigunguCode,
  sigunguName,
}: RegionTriggerProps) {
  return (
    <div className="flex items-center justify-between h-10 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 cursor-pointer">
      <div className="flex min-w-0 items-center gap-2">
        <MapPin className="h-4 w-4 shrink-0 text-[#EC5B3F]" />

        <div className="flex min-w-0 items-center gap-1.5 text-sm">
          {regionCode ? (
            <>
              <span className="font-semibold text-[#EC5B3F]">{regionName}</span>

              <span className="text-gray-300 font-bold">/</span>

              <span className="truncate text-gray-600 font-medium">
                {sigunguCode ? sigunguName : "전체"}
              </span>
            </>
          ) : (
            <span className="text-gray-500 font-medium">전체 지역</span>
          )}
        </div>
      </div>

      <span className="shrink-0 text-xs text-gray-400">
        {regionCode ? "" : "지역을 선택해주세요"}
      </span>
    </div>
  );
}
