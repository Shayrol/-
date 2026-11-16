"use client";

import { DetailCourseIntro } from "@/app/service/travel/travel_detail/detail.types";

interface Props {
  intro: DetailCourseIntro;
}

export default function TravelCourseIntro({ intro }: Props) {
  return (
    <section>
      <p>여행코스</p>
    </section>
  );
}
