"use client";

import { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import { DetailImageInfo } from "@/app/service/travel/travel_detail/detail.types";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "yet-another-react-lightbox/styles.css";

interface TravelImageGalleryProps {
  images: DetailImageInfo[];
}

export default function TravelImageGallery({
  images,
}: TravelImageGalleryProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = useMemo(
    () =>
      images?.map((image) => ({
        src: image.originimgurl || image.smallimageurl,
        alt: image.imgname || "관광지 이미지",
      })) ?? [],
    [images],
  );

  return (
    <section className="flex flex-col justify-center items-center w-full">
      <Swiper
        modules={[A11y]}
        slidesPerView={1}
        loop={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className="w-full max-w-5xl aspect-4/3 sm:aspect-video rounded-2xl overflow-hidden"
      >
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <SwiperSlide key={image.serialnum || index}>
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="relative w-full h-full cursor-zoom-in"
                aria-label={`${index + 1}번째 이미지 크게 보기`}
              >
                <Image
                  src={image.originimgurl || image.smallimageurl}
                  alt={image.imgname || "관광지 이미지"}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover"
                />
              </button>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <Image
              src="/images/travel/not-image.png"
              alt="여행지 이미지 없음"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
          </SwiperSlide>
        )}
      </Swiper>

      {/* 하단 컨트롤 */}
      <div className="flex justify-between items-center mt-4 w-full max-w-5xl">
        {/* 좌우 버튼 */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            // disabled={activeIndex === 0}
            className="flex justify-center items-center w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 hover:text-[#EC5B3F] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="이전 이미지"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            // disabled={activeIndex === images.length - 1}
            className="flex justify-center items-center w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 hover:text-[#EC5B3F] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="다음 이미지"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 페이지 숫자 */}
        <div className="text-sm font-medium text-gray-500 tabular-nums">
          <span className="text-[#EC5B3F] font-bold">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          {" / "}
          {String(images?.length ?? 1).padStart(2, "0")}
        </div>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={Math.max(0, lightboxIndex)}
        slides={slides}
        plugins={[Zoom, Fullscreen]}
        carousel={{
          finite: false,
          imageFit: "contain",
        }}
        on={{
          view: ({ index }) => setLightboxIndex(index),
        }}
        labels={{
          Next: "다음 이미지",
          Previous: "이전 이미지",
          Close: "닫기",
          "Enter Fullscreen": "전체 화면",
          "Exit Fullscreen": "전체 화면 종료",
        }}
      />
    </section>
  );
}
