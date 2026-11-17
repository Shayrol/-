"use client";

import { DetailCourseIntro } from "@/app/service/travel/travel_detail/detail.types";
import { CalendarCheck, Hourglass, Tags } from "lucide-react";
import IntroInfoGrid from "./IntroGridItems";

interface Props {
  intro: DetailCourseIntro;
}

export default function TravelCourseIntro({ intro }: Props) {
  const items = [
    {
      label: "코스일정",
      value: intro.schedule !== "" ? intro.schedule : "-",
      icon: <CalendarCheck className="w-4 h-4" />,
    },
    {
      label: "코스테마",
      value: intro.theme !== "" ? intro.theme : "-",
      icon: <Tags className="w-4 h-4" />,
    },
    {
      label: "소요시간",
      value: intro.taketime !== "" ? intro.taketime : "-",
      icon: <Hourglass className="w-4 h-4" />,
    },
  ];
  return (
    <section className="flex justify-center items-center w-full max-w-7xl px-4 sm:px-6">
      <IntroInfoGrid items={items} />
    </section>
  );
}
