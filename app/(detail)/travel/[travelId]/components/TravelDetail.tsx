"use client";

import {
  TRAVEL_CATEGORY_DETAIL_MAP1,
  TRAVEL_CATEGORY_DETAIL_MAP2,
  TRAVEL_CATEGORY_DETAIL_MAP3,
} from "@/app/service/travel/travel_code/code.list";
import {
  CommonInfo,
  DetailImageInfo,
  DetailIntro,
} from "@/app/service/travel/travel_detail/detail.types";
import { ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import TravelOverview from "./detail.overview";
import TravelImageGallery from "./detail.image.gallery";

interface DetailProps {
  common: CommonInfo;
  intro: DetailIntro;
  image: DetailImageInfo[];
}

export default function TravelDetail({ common, intro, image }: DetailProps) {
  console.log("ddddddddddddddd:", image);

  return (
    <div className="flex flex-col justify-center items-center w-full mt-8">
      <section className="flex flex-col justify-center items-start gap-6 mb-8 w-full max-w-7xl px-4 sm:px-6">
        {/* 브레드크럼 내비게이션 */}
        <div className="flex justify-start items-center gap-2">
          <Link
            href={"/"}
            className="text-sm font-semibold text-[#647069] hover:text-[#EC5B3F]"
          >
            홈
          </Link>
          <ChevronRight className="w-4 h-4 text-[#647069]" />
          <Link
            href={"/travel"}
            className="text-sm font-semibold text-[#647069] hover:text-[#EC5B3F]"
          >
            여행지 찾기
          </Link>
          <ChevronRight className="w-4 h-4 text-[#647069]" />
          <span className="text-sm font-semibold text-[#17211B] hover:text-[#EC5B3F]">
            {common.title}
          </span>
        </div>

        {/* 카테고리, 제목, 주소 */}
        <div className="flex flex-col justify-between items-start gap-2 w-full sm:flex-row sm:items-end">
          <div className="">
            <p className="text-xs font-semibold text-[#EC5B3F]/90">
              {`${TRAVEL_CATEGORY_DETAIL_MAP1.get(common.lclsSystm1)} ▪ ${TRAVEL_CATEGORY_DETAIL_MAP2.get(common.lclsSystm2)} ▪ ${TRAVEL_CATEGORY_DETAIL_MAP3.get(common.lclsSystm3)}`}
            </p>
            <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-black text-[#17211B]">
              {common.title}
            </h1>
          </div>
          <p className="flex justify-start items-center gap-1 text-base font-normal">
            <MapPin className="w-4 h-4 text-[#EC5B3F]" />
            {common.addr1}
          </p>
        </div>

        {/* 이미지 */}
        <TravelImageGallery images={image} />
      </section>

      <section className="flex justify-center items-center w-full py-8 bg-white md:py12 lg:py-12">
        <div className="flex flex-col justify-start items-center w-full max-w-7xl px-4 sm:px-6  md:flex-row">
          <article className="flex-2 flex flex-col justify-center items-start gap-4 w-full">
            <p className="text-sm font-bold text-[#EC5B3F]">ABOUT THIS PLACE</p>
            <h2 className="text-3xl font-black text-[#17211B] sm:text-4xl">
              이곳의 이야기
            </h2>

            {/* <p className="text-sm leading-7 text-[#647069] sm:text-base sm:leading-8">
              {common.overview}
            </p> */}
            <TravelOverview overview={common.overview} />
          </article>

          <aside className="flex-1">map</aside>
        </div>
      </section>
    </div>
  );
}
