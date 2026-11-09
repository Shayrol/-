"use client";

import { Dispatch, SetStateAction } from "react";

import {} from "@/app/service/travel/travel_code/code.list";
import { SigunguCode } from "@/app/service/travel/travel_code/code.types";

import RegionTrigger from "./region.trigger";

interface RegionSelectProps {
  regionCode: string;
  sigunguCode: string;

  onRegionChange: (region: string) => void;
  onSigunguChange: (sigungu: string) => void;

  isOpen: boolean;
  onOpenChange: () => void;
  setSigunguList: Dispatch<SetStateAction<SigunguCode[]>>;
  currentRegionName: string;
  currentSigunguName: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function RegionSelect({
  regionCode,
  sigunguCode,
  onOpenChange,
  currentRegionName,
  currentSigunguName,
}: RegionSelectProps) {
  return (
    <>
      {/* 모바일 (지역 선택) */}
      {/* <div className="block md:hidden w-full">
        <RegionSelectorM
          regionCode={regionCode}
          regionName={currentRegionName}
          sigunguCode={sigunguCode}
          sigunguName={currentSigunguName}
          mobileStep={mobileStep}
          setMobileStep={setMobileStep}
          handleRegionSelect={handleRegionSelect}
          isLoading={isLoading}
          handleSigunguSelect={handleSigunguSelect}
          sigunguList={sigunguList}
        />
      </div> */}

      {/* 웹 (지역 선택) */}
      <div className="hidden md:block w-full">
        <div onClick={onOpenChange}>
          <RegionTrigger
            regionCode={regionCode}
            regionName={currentRegionName}
            sigunguCode={sigunguCode}
            sigunguName={currentSigunguName}
          />
        </div>
      </div>
    </>
  );
}
