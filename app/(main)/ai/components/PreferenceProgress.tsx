// 진행도 상태 바
"use client";

interface Props {
  currentStep: number;
}

export default function PreferenceProgress({ currentStep }: Props) {
  const progress = (currentStep / 6) * 100;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between text-sm">
        <span className="font-semibold">나의 여행 취향 알아보기</span>
        <span className="text-[#647069]">{currentStep} / 6</span>
      </div>

      <div className="w-full h-2 rounded-full bg-[#E8E6DF] overflow-hidden">
        <div
          className="h-full rounded-full bg-[#EC5B3F] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
