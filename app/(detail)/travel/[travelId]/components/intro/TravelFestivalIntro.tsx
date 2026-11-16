"use client";

import { DetailFestivalIntro } from "@/app/service/travel/travel_detail/detail.types";

interface Props {
  intro: DetailFestivalIntro;
}

export default function TravelFestivalIntro({ intro }: Props) {
  return (
    <section>
      <p>행사/공연/축제</p>
    </section>
  );
}
