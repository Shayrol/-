"use client";

import type { ReactNode } from "react";

interface IntroInfoItem {
  label: string;
  value?: string | null;
  icon: ReactNode;
  /** 영업시간, 휴무일 등 방문 전 꼭 확인해야 할 핵심 정보 강조 여부 */
  isHighlight?: boolean;
}

interface Props {
  items?: IntroInfoItem[];
  /** 섹션 타이틀 (선택 사항) */
  title?: string;
}

export default function IntroInfoGrid({
  items = [],
  title = "이용 안내",
}: Props) {
  return (
    <section className="w-full space-y-3.5">
      {title && (
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-4 rounded-full bg-[#EC5B3F]"
            aria-hidden="true"
          />
          <h3 className="text-base sm:text-lg font-bold text-[#17211B] tracking-tight">
            {title}
          </h3>
        </div>
      )}

      <div className="grid grid-cols-1 w-full sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="group flex flex-col justify-start gap-3 w-full p-4 sm:p-5 rounded-2xl bg-[#F6F5F0] border border-[#E7E5DC] transition-colors duration-200 hover:border-[#EC5B3F]/40 hover:bg-[#F3F1EA]"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#EC5B3F]/10 text-[#EC5B3F] shrink-0 transition-transform duration-200 group-hover:scale-105">
                {item.icon}
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#647069]">
                {item.label}
              </span>
            </div>

            <p
              className={`text-sm sm:text-base font-semibold whitespace-pre-line wrap-break-word leading-relaxed ${
                item.isHighlight ? "text-[#EC5B3F]" : "text-[#17211B]"
              }`}
            >
              {item.value?.replace(/<br\s*\/?>/gi, "\n")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
