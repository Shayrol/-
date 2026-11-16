"use client";

import { DetailLeportsIntro } from "@/app/service/travel/travel_detail/detail.types";

interface Props {
  intro: DetailLeportsIntro;
}

export default function TravelLeportsIntro({ intro }: Props) {
  return (
    <section>
      <p>레포츠</p>
    </section>
  );
}
