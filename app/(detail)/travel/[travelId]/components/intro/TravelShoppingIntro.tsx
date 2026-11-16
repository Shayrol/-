"use client";

import { DetailShoppingIntro } from "@/app/service/travel/travel_detail/detail.types";

interface Props {
  intro: DetailShoppingIntro;
}

export default function TravelShoppingIntro({ intro }: Props) {
  return (
    <section>
      <p>쇼핑</p>
    </section>
  );
}
