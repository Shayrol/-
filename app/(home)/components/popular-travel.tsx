import { ArrowRight } from "lucide-react";
import { POPULAR_TRAVEL_LIST } from "../data/popular-travel.data";
import PopularTravelSwiper from "./popular-travel-swiper";

export default function PopularTravel() {
  return (
    <section className="flex flex-col justify-center items-center gap-6 w-full max-w-7xl p-6">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-3">
          <p className="text-[#EC5B3F] font-bold text-sm">TRENDING NOW</p>
          <h2 className="text-[#17211B] font-black text-3xl sm:text-4xl">
            지금 인기 있는 여행지
          </h2>
        </div>
        <p className="max-sm:hidden text-[#647069] font-normal text-sm">
          여행자들이 요즘 가장 많이 찾는 장소를
          <br />
          여담이 먼저 모아봤어요.
        </p>
      </div>

      <div className="flex gap-3 w-full">
        <PopularTravelSwiper />
      </div>
    </section>
  );
}
