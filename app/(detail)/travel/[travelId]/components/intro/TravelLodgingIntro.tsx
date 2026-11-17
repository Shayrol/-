"use client";

import { DetailLodgingIntro } from "@/app/service/travel/travel_detail/detail.types";
import IntroInfoGrid from "./IntroGridItems";
import { BedDouble, BedSingle, Car, LogIn, LogOut, Phone } from "lucide-react";

interface Props {
  intro: DetailLodgingIntro;
}

export default function TravelLodgingIntro({ intro }: Props) {
  console.log("dddddddddddddddddddddddddddddddd:", intro);

  const items = [
    {
      label: "입실시간",
      value: intro.checkintime || "-",
      icon: <LogIn className="w-4 h-4" />,
      isHighlight: true,
    },
    {
      label: "퇴실시간",
      value: intro.checkouttime || "-",
      icon: <LogOut className="w-4 h-4" />,
      isHighlight: true,
    },
    {
      label: "객실 수",
      value: intro.roomcount || "-",
      icon: <BedDouble className="w-4 h-4" />,
      isHighlight: false,
    },
    {
      label: "객실유형",
      value: intro.roomtype || "-",
      icon: <BedSingle className="w-4 h-4" />,
      isHighlight: false,
    },
    {
      label: "문의 및 안내",
      value: intro.infocenterlodging || "-",
      icon: <Phone className="w-4 h-4" />,
      isHighlight: true,
    },
    {
      label: "주차시설",
      value: intro.parkinglodging || "-",
      icon: <Car className="w-4 h-4" />,
    },
  ];
  return (
    <section className="flex justify-center items-center w-full max-w-7xl px-4 sm:px-6">
      <IntroInfoGrid items={items} />
    </section>
  );
}
