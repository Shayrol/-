"use client";

import { DetailCultureIntro } from "@/app/service/travel/travel_detail/detail.types";
import { Banknote, CalendarDays, Car, Phone } from "lucide-react";
import IntroInfoGrid from "./IntroGridItems";

interface Props {
  intro: DetailCultureIntro;
}

export default function TravelCultureIntro({ intro }: Props) {
  const items = [
    {
      label: "휴무일",
      value: intro.restdateculture !== "" ? intro.restdateculture : "-",
      icon: <CalendarDays className="w-4 h-4" />,
      isHighlight: true,
    },
    {
      label: "문의 및 안내",
      value: intro.infocenterculture !== "" ? intro.infocenterculture : "-",
      icon: <Phone className="w-4 h-4" />,
      isHighlight: true,
    },
    {
      label: "주차시설",
      value: intro.parkingculture !== "" ? intro.parkingculture : "-",
      icon: <Car className="w-4 h-4" />,
    },
    {
      label: "요금",
      value: intro.usefee !== "" ? intro.usefee : "-",
      icon: <Banknote className="w-4 h-4" />,
    },
  ];
  return (
    <section className="flex justify-center items-center w-full max-w-7xl px-4 sm:px-6">
      <IntroInfoGrid items={items} />
    </section>
  );
}
