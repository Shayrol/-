"use client";

import { TRAVEL_CATEGORY_CODES } from "@/app/service/travel/travel_code/code.list";
import { CategoryCode } from "@/app/service/travel/travel_code/code.types";

import { Check, ChevronDown } from "lucide-react";

interface RegionSelectProps {
  category1: string;
  category2: string;
  onCategory2Change: (category: string) => void;
  isLoading: boolean;
  handleCategory1Select: (category: CategoryCode) => void;
  category2List: CategoryCode[];
  onOpenChange: () => void;
}

export default function CategorySelector({
  category1,
  category2,
  onCategory2Change,
  isLoading,
  handleCategory1Select,
  category2List,
  onOpenChange,
}: RegionSelectProps) {
  const currentCategory1Name =
    TRAVEL_CATEGORY_CODES.find((category) => category.code === category1)
      ?.name ?? "전체";

  console.log("category:", category2List);

  return (
    <div className="mb-3 w-full hidden md:block">
      {/* 지역 선택 영역 */}

      <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col border-r border-gray-200">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">카테고리</p>

              <p className="mt-0.5 text-xs text-gray-400">
                카테고리를 선택하세요
              </p>
            </div>

            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>

          <ul className="max-h-72 space-y-0.5 overflow-y-auto p-2">
            {TRAVEL_CATEGORY_CODES.map((category) => {
              const isSelected =
                category.code === "00"
                  ? !category1
                  : category1 === category.code;

              return (
                <li key={category.code}>
                  <button
                    type="button"
                    onClick={() => handleCategory1Select(category)}
                    disabled={isLoading}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-[#EC5B3F]/10 font-semibold text-[#EC5B3F]"
                        : "text-gray-700 hover:bg-gray-50"
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    <span>{category.name}</span>

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
              <p className="text-sm font-semibold text-gray-900">
                상세 카테고리
              </p>

              <p className="mt-0.5 text-xs text-gray-400">
                {category1
                  ? `${currentCategory1Name}의 지역`
                  : "시/도를 먼저 선택하세요"}
              </p>
            </div>

            {category1 && (
              <span className="rounded-full bg-[#EC5B3F]/10 px-2 py-1 text-xs font-medium text-[#EC5B3F]">
                {currentCategory1Name}
              </span>
            )}
          </div>

          <ul className="max-h-72 space-y-0.5 overflow-y-auto p-2">
            {isLoading ? (
              <li className="flex min-h-48 items-center justify-center px-3 text-sm text-gray-400">
                시/군/구를 불러오는 중...
              </li>
            ) : category2List.length > 0 ? (
              <>
                {/* 전체 */}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      onCategory2Change("");
                      onOpenChange();
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      !category2
                        ? "bg-[#EC5B3F]/10 font-semibold text-[#EC5B3F]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>전체</span>

                    {!category2 && <Check className="h-4 w-4 text-[#EC5B3F]" />}
                  </button>
                </li>

                {/* 시/군/구 */}
                {category2List.map((item) => {
                  const isSelected = category2 === item.code;

                  return (
                    <li key={item.code}>
                      <button
                        type="button"
                        onClick={() => {
                          onCategory2Change(item.code);
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
