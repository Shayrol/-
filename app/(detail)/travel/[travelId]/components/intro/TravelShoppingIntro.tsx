"use client";

import { DetailShoppingIntro } from "@/app/service/travel/travel_detail/detail.types";
import {
  CalendarCheck,
  CalendarDays,
  Car,
  Clock,
  Phone,
  ShoppingBasket,
} from "lucide-react";
import IntroInfoGrid from "./IntroGridItems";

interface Props {
  intro: DetailShoppingIntro;
}

export default function TravelShoppingIntro({ intro }: Props) {
  const items = [
    {
      label: "장날",
      value: intro.fairday || "-",
      icon: <CalendarCheck className="w-4 h-4" />,
      isHighlight: true,
    },
    {
      label: "영업시간",
      value: intro.opentime || "-",
      icon: <Clock className="w-4 h-4" />,
      isHighlight: true,
    },
    {
      label: "휴무일",
      value: intro.restdateshopping || "-",
      icon: <CalendarDays className="w-4 h-4" />,
      isHighlight: true,
    },
    {
      label: "문의 및 안내",
      value: intro.infocentershopping || "-",
      icon: <Phone className="w-4 h-4" />,
      isHighlight: true,
    },
    {
      label: "판매 품목",
      value: intro.saleitem || "-",
      icon: <ShoppingBasket className="w-4 h-4" />,
    },
    {
      label: "주차시설",
      value: intro.parkingshopping || "-",
      icon: <Car className="w-4 h-4" />,
    },
  ];
  return (
    <section className="flex justify-center items-center w-full max-w-7xl px-4 sm:px-6">
      <IntroInfoGrid items={items} />
    </section>
  );
}
