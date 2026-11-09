export default function AiTravelFeatures() {
  return (
    <section className="flex justify-center items-center min-h-80 w-full bg-white">
      <div className="flex flex-col justify-between items-start gap-10 w-full max-w-7xl p-6 lg:flex-row">
        <div className="flex flex-col gap-3">
          <p className="text-[#EC5B3F] font-bold text-sm">여담의 여행 추천</p>
          <h2 className="text-black font-black text-3xl text-nowrap sm:text-4xl">
            검색은 짧게,
            <br />
            여행의 여운은 길게.
          </h2>
        </div>

        <div className="flex flex-col gap-3 w-full sm:flex-row">
          {features.map((f, idx) => (
            <article
              key={f.title}
              className="
                flex w-full flex-col justify-between gap-3 rounded-4xl bg-[#F6F5F0] p-6
                sm:aspect-2/1 sm:w-auto sm:flex-1 sm:p-8
              "
            >
              <div className="flex justify-start items-center gap-2 w-full">
                <span className="text-[#EC5B3F] font-bold text-lg">
                  0{idx + 1}
                </span>
                <h3 className="text-[#17211B] font-extrabold text-md">
                  {f.title}
                </h3>
              </div>
              <p className="text-[#647069] font-normal text-sm">
                {f.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    title: "취향 이해",
    description: "대화 속 취향과 여행 목적을 섬세하게 파악해요.",
  },
  {
    title: "AI 큐레이션",
    description: "수많은 장소 중 지금의 나와 어울리는 곳만 골라요.",
  },
  {
    title: "맞춤 제안",
    description: "장소의 매력과 방문 팁까지 한눈에 알려드려요.",
  },
];
