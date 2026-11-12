"use client";

import {
  TRAVEL_CATEGORY_DETAIL_MAP1,
  TRAVEL_CATEGORY_DETAIL_MAP2,
  TRAVEL_CATEGORY_DETAIL_MAP3,
} from "@/app/service/travel/travel_code/code.list";
import { TravelItem } from "@/app/service/travel/travel_list/list.types";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageOff, MapPin } from "lucide-react";
import Image from "next/image";

interface CardImageProps {
  travel: TravelItem;
  index: number;
}

export function CardImage({ travel, index }: CardImageProps) {
  return (
    <Card className="group relative mx-auto w-full pt-0 cursor-pointer">
      <div className="relative aspect-video w-full overflow-hidden">
        {travel.firstimage ? (
          <Image
            src={travel.firstimage}
            alt="Event cover"
            fill
            loading={index < 6 ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="z-20 object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="relative aspect-video w-full overflow-hidden bg-[#F6F5F0]">
            <Image
              src="/images/travel/not-image.png"
              alt="여행지 이미지 없음"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover duration-300 group-hover:scale-110"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <CardHeader className="flex flex-col gap-1">
          <div className="w-full min-w-0">
            <CardTitle className="truncate">{travel.title}</CardTitle>
          </div>
          <CardAction>
            <p className="text-xs font-semibold text-[#EC5B3F]/90">
              {`${TRAVEL_CATEGORY_DETAIL_MAP1.get(travel.lclsSystm1)} ▪ ${TRAVEL_CATEGORY_DETAIL_MAP2.get(travel.lclsSystm2)} ▪ ${TRAVEL_CATEGORY_DETAIL_MAP3.get(travel.lclsSystm3)}`}
            </p>
          </CardAction>
        </CardHeader>
        <div className="w-full min-w-0 px-4">
          <CardDescription className="flex justify-start items-center gap-0.5 truncate">
            <MapPin className="w-3 h-3" />
            {travel.addr1 !== "" ? travel.addr1 : "주소 정보가 없습니다."}
          </CardDescription>
        </div>
      </div>
    </Card>
  );
}
