"use client";

import { DetailLodgingIntro } from "@/app/service/travel/travel_detail/detail.types";

interface Props {
  intro: DetailLodgingIntro;
}

export default function TravelLodgingIntro({ intro }: Props) {
  return (
    <section>
      <p>숙박</p>
    </section>
  );
}
