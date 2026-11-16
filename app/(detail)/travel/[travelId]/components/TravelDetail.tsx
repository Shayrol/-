"use client";

import {
  TRAVEL_CATEGORY_DETAIL_MAP1,
  TRAVEL_CATEGORY_DETAIL_MAP2,
  TRAVEL_CATEGORY_DETAIL_MAP3,
} from "@/app/service/travel/travel_code/code.list";
import {
  CommonInfo,
  DetailImageInfo,
  TravelDetailIntro,
} from "@/app/service/travel/travel_detail/detail.types";
import { ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import TravelOverview from "./detail.overview";
import TravelImageGallery from "./detail.image.gallery";
import KakaoMap from "@/components/kakao/kakao.map";
import DetailIntroSection from "./detail.intro.section";

interface DetailProps {
  common: CommonInfo;
  intro: TravelDetailIntro;
  image: DetailImageInfo[];
}

export default function TravelDetail({ common, intro, image }: DetailProps) {
  console.log("TravelDetail-intro: ", intro);

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

      {/* 화장실, 주차요금, 입장료 등등의 정보 */}
      <section className="flex justify-center items-center w-full py-8 bg-white md:py-12 lg:py-12">
        <DetailIntroSection intro={intro} />
      </section>

      {/* 장소 설명 및 지도 */}
      <section className="flex justify-center items-center w-full py-8  md:py-12 lg:py-12">
        <div className="flex flex-col justify-start items-start gap-10 w-full max-w-7xl px-4 sm:px-6 md:flex-row">
          <article className="flex-1 flex flex-col justify-center items-start gap-4 w-full">
            <p className="text-sm font-bold text-[#EC5B3F]">ABOUT THIS PLACE</p>
            <h2 className="text-3xl font-black text-[#17211B] sm:text-4xl">
              이곳의 이야기
            </h2>

            {/* 여행지 소개 */}
            <TravelOverview overview={common.overview} />
          </article>

          <aside className="flex-1 flex flex-col w-full bg-[#DCD8CC] rounded-2xl">
            <div className="flex justify-between items-center py-[clamp(1rem,2cqw,1.5rem)] px-[clamp(1.5rem,2cqw,2rem)]">
              <div>
                <p className="text-xs font-bold text-[#EC5B3F]">LOCATION</p>
                <h2 className="text-xl font-extrabold text-[#17211B]">
                  위치 안내
                </h2>
              </div>
              <a
                href={`https://map.kakao.com/link/map/${common.title},${common.mapy},${common.mapx}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#647069] py-2 px-3 bg-white rounded-full"
              >
                큰 지도 보기
              </a>
            </div>
            <KakaoMap
              mapx={common.mapx}
              mapy={common.mapy}
              mlevel={common.mlevel}
              title={common.title}
              zipcode={common.zipcode}
              className="w-full h-[400px]"
            />

            <div className="flex flex-col gap-4 py-[clamp(1rem,2cqw,1.5rem)] px-[clamp(1.5rem,2cqw,2rem)]">
              <p className="flex justify-start items-center gap-2 text-sm font-semibold text-[#17211B]">
                <MapPin className="w-4 h-4 text-[#EC5B3F]" />
                {common.addr1 !== "" ? common.addr1 : "주소 정보가 없습니다."}
              </p>

              <p className="text-xs font-normal text-[#647069] px-6">
                위도 {Number(common.mapy).toFixed(3)} ▪ 경도{" "}
                {Number(common.mapx).toFixed(3)}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
