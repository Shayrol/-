"use client";

import { DetailCultureIntro } from "@/app/service/travel/travel_detail/detail.types";

interface Props {
  intro: DetailCultureIntro;
}

export default function TravelCultureIntro({ intro }: Props) {
  return (
    <section>
      <p>문화시설</p>
    </section>
  );
}
