"use client";

import { TRAVEL_CATEGORY_CODES } from "@/app/service/travel/travel_code/code.list";
import { CategoryCode } from "@/app/service/travel/travel_code/code.types";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ArrowLeft, Check, ChevronRight, Map, MapPin } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface RegionSelectorMProps {
  categoryCode1: string;
  categoryName1: string;
  categoryCode2: string;
  categoryName2: string;
  mobileStep: string;
  setMobileStep: Dispatch<SetStateAction<"ct1" | "ct2">>;
  handleCategory1Select: (category: CategoryCode) => void;
  isLoading: boolean;
  handleCategory2Select: (code: string) => void;
  category2List: CategoryCode[];
}

export default function CategorySelectorM({
  categoryCode1,
  categoryName1,
  categoryCode2,
  categoryName2,
  mobileStep,
  setMobileStep,
  handleCategory1Select,
  isLoading,
  handleCategory2Select,
  category2List,
}: RegionSelectorMProps) {
  const handleDrawerOpenChange = (open: boolean) => {
    if (open) {
      setMobileStep(categoryCode1 ? "ct2" : "ct1");

      return;
    }

    // 닫힌 뒤 다음 상태를 위한 초기화
    setMobileStep("ct1");
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
            <Map className="h-4 w-4 shrink-0 text-[#EC5B3F]" />

            <div className="flex min-w-0 items-center gap-1.5 text-sm">
              {categoryCode1 ? (
                <>
                  <span className="font-semibold text-[#EC5B3F]">
                    {categoryName1}
                  </span>

                  <span className="text-gray-300 font-bold">/</span>

                  <span className="truncate text-gray-600 font-medium">
                    {categoryCode2 ? categoryName2 : "전체"}
                  </span>
                </>
              ) : (
                <span className="text-gray-500 font-medium">전체 카테고리</span>
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
              {mobileStep === "ct2" && (
                <button
                  type="button"
                  onClick={() => setMobileStep("ct1")}
                  className="-ml-1 rounded-md p-1.5 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}

              <DrawerTitle className="text-base font-bold text-gray-900">
                {mobileStep === "ct1"
                  ? "시/도 선택"
                  : `${categoryName1} 시/군/구 선택`}
              </DrawerTitle>
            </div>

            {/* 현재 선택된 지역 */}

            {categoryCode1 && (
              <div className="mt-2 flex items-center gap-1.5 text-left text-xs text-gray-500">
                <MapPin className="h-3.5 w-3.5" />

                <span>
                  {categoryName1}
                  {categoryCode2 && ` · ${categoryName2}`}
                </span>
              </div>
            )}
          </DrawerHeader>

          {/* ------------------------------------------------ */}
          {/* 지역 목록 */}
          {/* ------------------------------------------------ */}

          <div className="max-h-[60vh] overflow-y-auto p-4">
            {mobileStep === "ct1" ? (
              <ul className="space-y-1">
                {TRAVEL_CATEGORY_CODES.map((ct) => {
                  const isSelected =
                    ct.code === "00"
                      ? !categoryCode1
                      : categoryCode1 === ct.code;

                  const button = (
                    <button
                      type="button"
                      onClick={() => handleCategory1Select(ct)}
                      disabled={isLoading}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm transition-colors ${
                        isSelected
                          ? "bg-[#EC5B3F]/10 font-semibold text-[#EC5B3F]"
                          : "text-gray-700 hover:bg-gray-50"
                      } disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                      <span>{ct.name}</span>

                      {isSelected && (
                        <Check className="h-4 w-4 text-[#EC5B3F]" />
                      )}
                    </button>
                  );

                  return (
                    <li key={ct.code}>
                      {ct.code === "00" ? (
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
                      onClick={() => handleCategory2Select("")}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm transition-colors ${
                        categoryCode2 === ""
                          ? "bg-[#EC5B3F]/10 font-semibold text-[#EC5B3F]"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>전체</span>

                      {categoryCode2 === "" && (
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
                ) : category2List.length > 0 ? (
                  category2List.map((item) => {
                    const isSelected = categoryCode2 === item.code;

                    return (
                      <li key={item.code}>
                        <DrawerClose asChild>
                          <button
                            type="button"
                            onClick={() => handleCategory2Select(item.code)}
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
