"use client";

import { DetailFestivalIntro } from "@/app/service/travel/travel_detail/detail.types";
import IntroInfoGrid from "./IntroGridItems";
import {
  CalendarCheck2,
  CalendarX2,
  Clock,
  ListChecks,
  Map,
  Ticket,
} from "lucide-react";
import { formatTravelDate } from "@/utils/date";

interface Props {
  intro: DetailFestivalIntro;
}

export default function TravelFestivalIntro({ intro }: Props) {
  const items = [
    {
      label: "시작일",
      value:
        intro.eventstartdate !== ""
          ? formatTravelDate(intro.eventstartdate!)
          : "-",
      icon: <CalendarCheck2 className="w-4 h-4" />,
      isHighlight: true,
    },
    {
      label: "종료일",
      value:
        intro.eventenddate !== "" ? formatTravelDate(intro.eventenddate!) : "-",
      icon: <CalendarX2 className="w-4 h-4" />,
      isHighlight: true,
    },
    {
      label: "위치안내",
      value: intro.placeinfo !== "" ? intro.placeinfo : "-",
      icon: <Map className="w-4 h-4" />,
    },
    {
      label: "공연시간",
      value: intro.playtime !== "" ? intro.playtime : "-",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      label: "공연 및 행사",
      value: intro.program !== "" ? intro.program : "-",
      icon: <ListChecks className="w-4 h-4" />,
      isHighlight: true,
    },
    {
      label: "요금",
      value: intro.usetimefestival !== "" ? intro.usetimefestival : "-",
      icon: <Ticket className="w-4 h-4" />,
    },
  ];
  return (
    <section className="flex justify-center items-center w-full max-w-7xl px-4 sm:px-6">
      <IntroInfoGrid items={items} />
    </section>
  );
}
