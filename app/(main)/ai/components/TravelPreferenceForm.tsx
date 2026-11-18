// // 전체 설문 상태 및 단계 관리
// "use client";

// import { useState } from "react";
// import PreferenceProgress from "./PreferenceProgress";
// import PreferenceNavigation from "./PreferenceNevigation";

// export default function TravelPreferenceForm() {
//   const [currentStep, setCurrentStep] = useState(1);
//   // const [preference, setPreference] = useState({
//   //   travelStyle: "",
//   //   interests: [],
//   //   companion: "",
//   //   atmospheres: [],
//   //   preferredRegions: [],
//   //   additionalPreference: "",
//   // });

//   const preference = {
//     travelStyle: "맛집과 미식",
//     interests: [
//       { name: "음식", code: "FD" },
//       { name: "쇼핑", code: "SH" },
//     ],
//     companion: "혼자",
//     atmospheres: ["여유롭고 조용한", "자연 속에서 즐기는"],
//     preferredRegions: ["11"],
//     additionalPreference: "서울의 한적한 장소를 찾고 싶어",
//   };

//   const handleRecommend = async () => {
//   const response = await fetch("/api/recommend", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       preference,
//     }),
//   });

//   const data = await response.json();

//   console.log(data);
// };

//   const handleNext = () => {
//     if (currentStep < 6) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 1) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   return (
//     <div>
//       <PreferenceProgress currentStep={currentStep} />
//       <div>gd</div>
//       <PreferenceNavigation
//         currentStep={currentStep}
//         onNext={handleNext}
//         onPrevious={handlePrevious}
//       />
//     </div>
//   );
// }

"use client";

import { useState } from "react";

const initialPreference = {
  travelStyle: "맛집과 미식",
  interests: [
    { name: "음식", code: "FD" },
    { name: "쇼핑", code: "SH" },
  ],
  companion: "혼자",
  atmospheres: ["여유롭고 조용한", "자연 속에서 즐기는"],
  preferredRegions: ["11"],

  // 여행 일정
  startDate: "2026-11-21",
  endDate: "2026-11-22",

  additionalPreference: "서울의 한적한 장소를 찾고 싶어",
};

export default function AiPage() {
  const [preference, setPreference] = useState(initialPreference);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleRecommend = async () => {
    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          preference,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setResult(data.data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "추천 요청에 실패했습니다.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold">AI 여행 추천</h1>

      <button
        onClick={handleRecommend}
        disabled={loading}
        className="rounded-xl bg-[#EC5B3F] px-6 py-3 text-white"
      >
        {loading ? "여행지를 찾는 중..." : "여행 추천받기"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">{result.title}</h2>

          <p>{result.description}</p>

          {result.days.map((day: any) => (
            <div key={day.day} className="rounded-xl border p-4">
              <h3 className="mb-3 font-bold">{day.day}일 차</h3>

              {day.places.map((place: any) => (
                <div key={place.contentId} className="mb-3 border-b pb-3">
                  <p className="font-semibold">
                    {place.visitOrder}. {place.title}
                  </p>

                  <p className="text-sm text-gray-500">{place.address}</p>

                  <p className="mt-1 text-sm">{place.reason}</p>
                </div>
              ))}
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
