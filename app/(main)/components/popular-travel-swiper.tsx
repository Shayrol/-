"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import { ArrowRight } from "lucide-react";
import { POPULAR_TRAVEL_LIST } from "../data/popular-travel.data";
import Image from "next/image";
import Link from "next/link";

export default function PopularTravelSwiper() {
  return (
    <Swiper
      spaceBetween={12}
      slidesPerView={1.3}
      grabCursor
      observer={true}
      observeParents={true}
      className="w-full"
      loop={true}
      breakpoints={{
        640: {
          slidesPerView: 2.2,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      }}
    >
      {POPULAR_TRAVEL_LIST.map((travel, index) => (
        <SwiperSlide
          key={travel.id}
          className="mr-5 !w-[calc((100%-12px*0.3)/1.3)] sm:!w-[calc((100%-16px*1.2)/2.2)] lg:!w-[calc((100%-20px*2)/3)] group cursor-pointer"
        >
          <Link
            href={`/travel/${travel.travelId}`}
            className="relative flex justify-center items-end p-6 aspect-4/3 w-full rounded-4xl overflow-hidden"
          >
            <Image
              src={travel.image}
              alt={travel.name}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="flex w-full justify-between items-center z-10">
              <span className="flex flex-col gap-2">
                <span className="text-sm font-medium text-white/75">
                  {String(index + 1).padStart(2, "0")}▪{travel.region}
                </span>

                <strong className="text-xl font-extrabold text-white">
                  {travel.name}
                </strong>
              </span>

              <span className="flex justify-center items-center w-10 h-10 duration-300 bg-white/10 border border-white/35 rounded-full group-hover:bg-white/40">
                <ArrowRight className="h-5 w-5 text-white" />
              </span>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
