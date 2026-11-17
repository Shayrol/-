"use client";

import { TravelDetailIntro } from "@/app/service/travel/travel_detail/detail.types";
import TravelSpotIntro from "./intro/TravelSpotIntro";
import TravelCultureIntro from "./intro/TravelCultureIntro";
import TravelFestivalIntro from "./intro/TravelFestivalIntro";
import TravelCourseIntro from "./intro/TravelCourseIntro";
import TravelLeportsIntro from "./intro/TravelLeportsIntro";
import TravelLodgingIntro from "./intro/TravelLodgingIntro";
import TravelShoppingIntro from "./intro/TravelShoppingIntro";
import TravelFoodIntro from "./intro/TravelFoodIntro";
import IntroNoData from "./intro/IntroNoData";

interface Props {
  intro?: TravelDetailIntro;
}

export default function DetailIntroSection({ intro }: Props) {
  switch (intro?.contenttypeid) {
    case "12":
      return <TravelSpotIntro intro={intro} />;
    case "14":
      return <TravelCultureIntro intro={intro} />;
    case "15":
      return <TravelFestivalIntro intro={intro} />;
    case "25":
      return <TravelCourseIntro intro={intro} />;
    case "28":
      return <TravelLeportsIntro intro={intro} />;
    case "32":
      return <TravelLodgingIntro intro={intro} />;
    case "38":
      return <TravelShoppingIntro intro={intro} />;
    case "39":
      return <TravelFoodIntro intro={intro} />;
    case undefined:
      return <IntroNoData />;

    default:
      return null;
  }
}
