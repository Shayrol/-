"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TravelOverviewProps {
  overview: string;
}

export default function TravelOverview({ overview }: TravelOverviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);

  const textRef = useRef<HTMLParagraphElement>(null);

  // useEffect(() => {
  //   setIsExpanded(false);
  // }, [overview]);

  useEffect(() => {
    const element = textRef.current;

    if (!element || isExpanded) return;

    const checkOverflow = () => {
      setIsOverflow(element.scrollHeight > element.clientHeight + 1);
    };

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(element);

    return () => observer.disconnect();
  }, [overview, isExpanded]);

  return (
    <div className="w-full">
      <div className="relative">
        <p
          ref={textRef}
          className={`
            text-sm leading-7 text-[#647069]
            sm:text-base sm:leading-8
            ${!isExpanded ? "line-clamp-5" : ""}
          `}
        >
          {overview}
        </p>

        {/* 마지막 줄 페이드 효과 */}
        {isOverflow && !isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-7 pointer-events-none bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      {/* 더보기 / 접기 */}
      {isOverflow && (
        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="
              inline-flex items-center gap-1
              text-sm font-semibold text-[#EC5B3F]
              hover:text-[#d94b32]
              transition-colors duration-200
            "
          >
            {isExpanded ? "접기" : "더 읽기"}

            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
