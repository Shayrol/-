// 이전, 다음 버튼
"use client";

interface Props {
  currentStep: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function PreferenceNavigation({
  currentStep,
  onPrevious,
  onNext,
}: Props) {
  return (
    <div className="flex justify-between w-full">
      <button onClick={onPrevious} disabled={currentStep === 1}>
        이전
      </button>

      <button onClick={onNext}>
        {currentStep === 6 ? "취향 분석하기" : "다음"}
      </button>
    </div>
  );
}
