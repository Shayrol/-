import { ArrowRight, Sparkle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AiTravelHero() {
  return (
    <section className="flex flex-col gap-10 py-16 px-6 w-full max-w-7xl lg:flex-row">
      <div className="flex flex-1 flex-col gap-8 w-full">
        <p className="flex justify-start items-center gap-1 text-[#EC5B3F] font-bold text-sm">
          <span className="bg-[#FEE5DC] rounded-lg p-1">
            <Sparkle className="w-4 h-4 text-[#EC5B3F]" />
          </span>
          AI가 발견하는 나만의 여행
        </p>

        <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.2] font-black">
          어디로 떠날지
          <br />
          고민이라면,
          <br />
          <span className="text-[#EC5B3F]">여담</span>
          에게 물어봐.
        </h1>

        <p className="text-[#647069] text-[clamp(1.125rem,2.3vw,1.25rem)] font-normal">
          취향과 일정, 지금의 기분만 알려주세요.
          <br />
          복잡한 검색 대신 AI가 꼭 맞는 여행지를 골라
          <br />
          당신만의 여해 이야기를 시작해드려요.
        </p>

        <Link
          href={"#"}
          className="flex justify-center items-center gap-3 w-fit text-white text-sm font-extrabold bg-[#EC5B3F] rounded-4xl py-2 px-2 pl-5"
        >
          관광지 검색하러 가기{" "}
          <span className="flex justify-center items-center w-9 h-9 rounded-full bg-white/15">
            <ArrowRight className="w-5 h-5" />
          </span>
        </Link>
      </div>

      <div className="flex flex-1 items-stretch gap-[clamp(4px,1vw,12px)] w-full">
        <Link
          href={`/travel/127797`}
          className="relative flex items-end p-6 min-w-0 flex-2 aspect-4/5 border rounded-4xl overflow-hidden"
        >
          <Image
            src="/images/travel/popular/everland.webp"
            alt="에버랜드"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />

          <div className="flex flex-col gap-3 z-10">
            <span className="text-[clamp(0.45rem,2.5vw,0.75rem)] font-bold text-white bg-white/15 w-fit py-1 px-2 rounded-4xl sm:py-2 sm:px-4">
              지금 가장 인기
            </span>
            <div className="flex flex-col gap-0">
              <p className="text-sm font-medium text-white/75">용인</p>
              <h2 className="text-[clamp(1.125rem,5vw,2.25rem)] font-extrabold text-white">
                에버랜드
              </h2>
            </div>
          </div>
        </Link>
        <div className="min-w-0 flex flex-col gap-[clamp(4px,1vw,12px)] flex-1 w-full">
          <Link
            href={"/travel/229901"}
            className="relative flex items-end flex-1 p-4 aspect-5/6 border rounded-4xl overflow-hidden"
          >
            <Image
              src="/images/travel/popular/coex.webp"
              alt="코엑스"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />

            <div className="flex flex-col gap-0 z-10">
              <p className="text-sm font-medium text-white/75">강남</p>
              <h2 className="text-[clamp(0.75rem,2.5vw,1.5rem)] font-extrabold text-white">
                코엑스
              </h2>
            </div>
          </Link>
          <Link
            href={"/travel/250465"}
            className="relative flex items-end flex-1 p-4 aspect-5/6 border rounded-4xl overflow-hidden"
          >
            <Image
              src="/images/travel/popular/kintex.webp"
              alt="킨텍스"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="flex flex-col gap-0 z-10">
              <p className="text-sm font-medium text-white/75">고양</p>
              <h2 className="text-[clamp(0.75rem,2.5vw,1.5rem)] font-extrabold text-white text-nowrap">
                킨텍스
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
