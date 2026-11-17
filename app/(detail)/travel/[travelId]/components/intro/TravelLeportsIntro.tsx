// 레포츠 이용안내

"use client";

import { DetailLeportsIntro } from "@/app/service/travel/travel_detail/detail.types";
import { CalendarDays, Clock, Phone } from "lucide-react";
import IntroInfoGrid from "./IntroGridItems";

interface Props {
  intro: DetailLeportsIntro;
}

export default function TravelLeportsIntro({ intro }: Props) {
  const items = [
    {
      label: "휴무일",
      value: intro.restdateleports !== "" ? intro.restdateleports : "-",
      icon: <CalendarDays className="w-4 h-4" />,
      isHighlight: true,
    },
    {
      label: "영업시간",
      value: intro.usetimeleports !== "" ? intro.usetimeleports : "-",
      icon: <Clock className="w-4 h-4" />,
      isHighlight: true,
    },
    {
      label: "문의 및 안내",
      value: intro.infocenterleports !== "" ? intro.infocenterleports : "-",
      icon: <Phone className="w-4 h-4" />,
    },
  ];

  return (
    <section className="flex justify-center items-center w-full max-w-7xl px-4 sm:px-6">
      <IntroInfoGrid items={items} />
    </section>
  );
}
