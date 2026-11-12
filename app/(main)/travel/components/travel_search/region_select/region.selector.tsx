"use client";

import {
  TRAVEL_REGION_CODES,
  RegionCode,
} from "@/app/service/travel/travel_code/code.list";
import { SigunguCode } from "@/app/service/travel/travel_code/code.types";

import { Check, ChevronDown } from "lucide-react";

interface RegionSelectProps {
  regionCode: string;
  sigunguCode: string;
  onSigunguChange: (sigungu: string) => void;
  isLoading: boolean;
  handleRegionSelect: (region: RegionCode) => void;
  sigunguList: SigunguCode[];
  onOpenChange: () => void;
}

export default function RegionSelector({
  regionCode,
  sigunguCode,
  onSigunguChange,
  isLoading,
  handleRegionSelect,
  sigunguList,
  onOpenChange,
}: RegionSelectProps) {
  const currentRegionName =
    TRAVEL_REGION_CODES.find((region) => region.code === regionCode)?.name ??
    "전체 지역";

  return (
    <div className="mb-3 w-full hidden md:block">
      {/* 지역 선택 영역 */}

      <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col border-r border-gray-200">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">시/도</p>

              <p className="mt-0.5 text-xs text-gray-400">지역을 선택하세요</p>
            </div>

            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>

          <ul className="max-h-72 space-y-0.5 overflow-y-auto p-2">
            {TRAVEL_REGION_CODES.map((region) => {
              const isSelected =
                region.code === "00" ? !regionCode : regionCode === region.code;

              return (
                <li key={region.code}>
                  <button
                    type="button"
                    onClick={() => handleRegionSelect(region)}
                    disabled={isLoading}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-[#EC5B3F]/10 font-semibold text-[#EC5B3F]"
                        : "text-gray-700 hover:bg-gray-50"
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    <span>{region.name}</span>

                    {isSelected && <Check className="h-4 w-4 text-[#EC5B3F]" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">시/군/구</p>

              <p className="mt-0.5 text-xs text-gray-400">
                {regionCode
                  ? `${currentRegionName}의 지역`
                  : "시/도를 먼저 선택하세요"}
              </p>
            </div>

            {regionCode && (
              <span className="rounded-full bg-[#EC5B3F]/10 px-2 py-1 text-xs font-medium text-[#EC5B3F]">
                {currentRegionName}
              </span>
            )}
          </div>

          <ul className="max-h-72 space-y-0.5 overflow-y-auto p-2">
            {isLoading ? (
              <li className="flex min-h-48 items-center justify-center px-3 text-sm text-gray-400">
                시/군/구를 불러오는 중...
              </li>
            ) : sigunguList.length > 0 ? (
              <>
                {/* 전체 */}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      onSigunguChange("");
                      onOpenChange();
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      !sigunguCode
                        ? "bg-[#EC5B3F]/10 font-semibold text-[#EC5B3F]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>전체</span>

                    {!sigunguCode && (
                      <Check className="h-4 w-4 text-[#EC5B3F]" />
                    )}
                  </button>
                </li>

                {/* 시/군/구 */}
                {sigunguList.map((item) => {
                  const isSelected = sigunguCode === item.code;

                  return (
                    <li key={item.code}>
                      <button
                        type="button"
                        onClick={() => {
                          onSigunguChange(item.code);
                          onOpenChange();
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
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
                    </li>
                  );
                })}
              </>
            ) : (
              <li className="flex min-h-48 items-center justify-center px-3 text-center text-sm text-gray-400">
                시/도를 먼저 선택하면
                <br />
                시/군/구를 선택할 수 있습니다.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
