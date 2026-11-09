"use client";

import {
  RegionCode,
  TRAVEL_REGION_CODES,
} from "@/app/service/travel/travel_code/code.list";
import { SigunguCode } from "@/app/service/travel/travel_code/code.types";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ArrowLeft, Check, ChevronRight, MapPin } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface RegionSelectorMProps {
  regionCode: string;
  regionName: string;
  sigunguCode: string;
  sigunguName: string;
  mobileStep: string;
  setMobileStep: Dispatch<SetStateAction<"sigungu" | "sido">>;
  handleRegionSelect: (region: RegionCode) => void;
  isLoading: boolean;
  handleSigunguSelect: (code: string) => void;
  sigunguList: SigunguCode[];
}

export default function RegionSelectorM({
  regionCode,
  regionName,
  sigunguCode,
  sigunguName,
  mobileStep,
  setMobileStep,
  handleRegionSelect,
  isLoading,
  handleSigunguSelect,
  sigunguList,
}: RegionSelectorMProps) {
  const handleDrawerOpenChange = (open: boolean) => {
    if (open) {
      // 이미 시/도가 선택되어 있다면 바로 시/군/구 선택 화면을 보여준다.
      setMobileStep(regionCode ? "sigungu" : "sido");

      return;
    }

    // 닫힌 뒤 다음 상태를 위한 초기화
    setMobileStep("sido");
  };

  return (
    <Drawer onOpenChange={handleDrawerOpenChange}>
      {/* 지역 선택 버튼 */}

      <DrawerTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex items-center justify-between w-full h-10 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 cursor-pointer"
        >
          <div className="flex min-w-0 items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-[#EC5B3F]" />

            <div className="flex min-w-0 items-center gap-1.5 text-sm">
              {regionCode ? (
                <>
                  <span className="font-semibold text-[#EC5B3F]">
                    {regionName}
                  </span>

                  <span className="text-gray-300 font-bold">/</span>

                  <span className="truncate text-gray-600 font-medium">
                    {sigunguCode ? sigunguName : "전체"}
                  </span>
                </>
              ) : (
                <span className="text-gray-500 font-medium">전체 지역</span>
              )}
            </div>
          </div>

          <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
        </Button>
      </DrawerTrigger>

      {/* Bottom Sheet */}

      <DrawerContent>
        <div className="mx-auto flex w-full flex-col">
          <DrawerHeader className="border-b border-gray-100 px-4 pb-4">
            <div className="flex items-center gap-2">
              {mobileStep === "sigungu" && (
                <button
                  type="button"
                  onClick={() => setMobileStep("sido")}
                  className="-ml-1 rounded-md p-1.5 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}

              <DrawerTitle className="text-base font-bold text-gray-900">
                {mobileStep === "sido"
                  ? "시/도 선택"
                  : `${regionName} 시/군/구 선택`}
              </DrawerTitle>
            </div>

            {/* 현재 선택된 지역 */}

            {regionCode && (
              <div className="mt-2 flex items-center gap-1.5 text-left text-xs text-gray-500">
                <MapPin className="h-3.5 w-3.5" />

                <span>
                  {regionName}
                  {sigunguCode && ` · ${sigunguName}`}
                </span>
              </div>
            )}
          </DrawerHeader>

          {/* ------------------------------------------------ */}
          {/* 지역 목록 */}
          {/* ------------------------------------------------ */}

          <div className="max-h-[60vh] overflow-y-auto p-4">
            {mobileStep === "sido" ? (
              <ul className="space-y-1">
                {TRAVEL_REGION_CODES.map((region) => {
                  const isSelected =
                    region.code === "00"
                      ? !regionCode
                      : regionCode === region.code;

                  const button = (
                    <button
                      type="button"
                      onClick={() => handleRegionSelect(region)}
                      disabled={isLoading}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm transition-colors ${
                        isSelected
                          ? "bg-[#EC5B3F]/10 font-semibold text-[#EC5B3F]"
                          : "text-gray-700 hover:bg-gray-50"
                      } disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                      <span>{region.name}</span>

                      {isSelected && (
                        <Check className="h-4 w-4 text-[#EC5B3F]" />
                      )}
                    </button>
                  );

                  return (
                    <li key={region.code}>
                      {region.code === "00" ? (
                        <DrawerClose asChild>{button}</DrawerClose>
                      ) : (
                        button
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ul className="space-y-1">
                {/* 전체 */}

                <li>
                  <DrawerClose asChild>
                    <button
                      type="button"
                      onClick={() => handleSigunguSelect("")}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm transition-colors ${
                        sigunguCode === ""
                          ? "bg-[#EC5B3F]/10 font-semibold text-[#EC5B3F]"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>전체</span>

                      {sigunguCode === "" && (
                        <Check className="h-4 w-4 text-[#EC5B3F]" />
                      )}
                    </button>
                  </DrawerClose>
                </li>

                {/* 로딩 */}

                {isLoading ? (
                  <li className="px-4 py-8 text-center text-sm text-gray-400">
                    시/군/구를 불러오는 중...
                  </li>
                ) : sigunguList.length > 0 ? (
                  sigunguList.map((item) => {
                    const isSelected = sigunguCode === item.code;

                    return (
                      <li key={item.code}>
                        <DrawerClose asChild>
                          <button
                            type="button"
                            onClick={() => handleSigunguSelect(item.code)}
                            className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm transition-colors ${
                              isSelected
                                ? "bg-[#EC5B3F]/10 font-semibold text-[#EC5B3F]"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <span>{item.name}</span>

                            {isSelected && (
                              <Check className="h-4 w-4 text-[#EC5B3F]" />
                            )}
                          </button>
                        </DrawerClose>
                      </li>
                    );
                  })
                ) : (
                  <li className="px-4 py-8 text-center text-sm text-gray-400">
                    시/군/구 정보가 없습니다.
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
