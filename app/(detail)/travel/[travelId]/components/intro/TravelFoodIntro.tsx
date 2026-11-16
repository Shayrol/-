"use client";

import { DetailFoodIntro } from "@/app/service/travel/travel_detail/detail.types";
import { CalendarDays, Car, Clock, Utensils } from "lucide-react";
import IntroInfoGrid from "./IntroGridItems";

interface Props {
  intro: DetailFoodIntro;
}

export default function TravelFoodIntro({ intro }: Props) {
  const items = [
    {
      label: "대표 메뉴",
      value: intro.firstmenu !== "" ? intro.firstmenu : "-",
      icon: <Utensils className="w-4 h-4" />,
    },
    {
      label: "영업시간",
      value: intro.opentimefood !== "" ? intro.opentimefood : "-",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      label: "주차시설",
      value: intro.parkingfood !== "" ? intro.parkingfood : "-",
      icon: <Car className="w-4 h-4" />,
    },
    {
      label: "휴무일",
      value: intro.restdatefood !== "" ? intro.restdatefood : "-",
      icon: <CalendarDays className="w-4 h-4" />,
    },
  ];
  return (
    <section className="flex justify-center items-center w-full max-w-7xl px-4 sm:px-6">
      {/* <p>음식</p> */}
      <IntroInfoGrid items={items} />
    </section>
  );
}
