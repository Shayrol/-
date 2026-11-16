"use client";

import { DetailSpotIntro } from "@/app/service/travel/travel_detail/detail.types";

interface Props {
  intro: DetailSpotIntro;
}

export default function TravelSpotIntro({ intro }: Props) {
  return (
    <section>
      <p>관광지</p>
    </section>
  );
}
