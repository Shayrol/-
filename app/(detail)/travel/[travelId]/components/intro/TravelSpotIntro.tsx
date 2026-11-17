"use client";

import { DetailSpotIntro } from "@/app/service/travel/travel_detail/detail.types";
import IntroInfoGrid from "./IntroGridItems";
import {
  CalendarDays,
  Car,
  Clock,
  Footprints,
  Phone,
  Ticket,
} from "lucide-react";

interface Props {
  intro: DetailSpotIntro;
}

export default function TravelSpotIntro({ intro }: Props) {
  const items = [
    {
      label: "휴무일",
      value: intro.restdate || "-",
      icon: <CalendarDays className="w-4 h-4" />,
      isHighlight: true,
    },
    {
      label: "이용시간",
      value: intro.usetime || "-",
      icon: <Clock className="w-4 h-4" />,
      isHighlight: true,
    },
    {
      label: "문의 및 안내",
      value: intro.infocenter || "-",
      icon: <Phone className="w-4 h-4" />,
      isHighlight: true,
    },
    {
      label: "체험 안내",
      value: intro.expguide || "-",
      icon: <Footprints className="w-4 h-4" />,
    },
    {
      label: "이용 가능한 시기",
      value: intro.useseason || "-",
      icon: <Ticket className="w-4 h-4" />,
    },
    {
      label: "주차시설",
      value: intro.parking || "-",
      icon: <Car className="w-4 h-4" />,
    },
  ];
  return (
    <section className="flex justify-center items-center w-full max-w-7xl px-4 sm:px-6">
      <IntroInfoGrid items={items} />
    </section>
  );
}
