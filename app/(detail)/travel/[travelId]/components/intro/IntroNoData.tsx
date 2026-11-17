"use client";

import { Info } from "lucide-react";

export default function IntroNoData() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full py-8 px-4 ">
      <div className="flex justify-center items-center w-11 h-11 rounded-full bg-[#EC5B3F]/10 text-[#EC5B3F]">
        <Info className="w-5 h-5" />
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-sm font-semibold text-[#17211B]">
          제공되는 정보가 없습니다.
        </p>
        <p className="text-xs sm:text-sm text-[#647069]">
          현재 등록된 이용 안내 정보가 없습니다.
        </p>
      </div>
    </div>
  );
}
