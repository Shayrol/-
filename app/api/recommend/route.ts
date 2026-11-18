import { NextResponse } from "next/server";
import Groq from "groq-sdk";

import { getTourismInfo } from "@/app/service/travel/travel_list/list.api";
import { getKeywordInfo } from "@/app/service/travel/travel_list/list.search.api";

// ========================================
// Types
// ========================================

interface Interest {
  name: string;
  code: string;
}

interface TravelPreference {
  travelStyle: string;
  interests: Interest[];
  companion: string;
  atmospheres: string[];
  preferredRegions: string[];
  startDate: string;
  endDate: string;
  additionalPreference?: string;
}

interface TourismCandidate {
  contentId: string;
  title: string;
  address: string;
  contentTypeId: string;
  category: string;
  image: string;
  mapX: number | null;
  mapY: number | null;
}

// Groq가 반환하는 장소
interface LLMRecommendationPlace {
  contentId: string;
  reason: string;
  visitOrder: number;
}

interface LLMRecommendationDay {
  day: number;
  date: string;
  places: LLMRecommendationPlace[];
}

interface LLMRecommendationResponse {
  title: string;
  description: string;
  days: LLMRecommendationDay[];
}

// 최종 API가 반환하는 장소
interface RecommendationPlace extends TourismCandidate {
  reason: string;
  visitOrder: number;
}

interface RecommendationDay {
  day: number;
  date: string;
  places: RecommendationPlace[];
}

interface RecommendationResponse {
  title: string;
  description: string;
  days: RecommendationDay[];
}

interface TravelSchedule {
  day: number;
  date: string;
}

// ========================================
// Constants
// ========================================

const MAX_TRAVEL_DAYS = 30;
const MAX_PLACES_PER_DAY = 5;

// 관심사별 추가 검색 키워드
const INTEREST_KEYWORDS: Record<string, string[]> = {
  FD: ["맛집", "카페", "음식"],
  SH: ["쇼핑", "전통시장", "상점"],
  NA: ["자연 관광", "자연 경관", "공원"],
  EV: ["축제", "행사"],
  EX: ["체험 관광", "이색 체험"],
  HS: ["역사 관광", "문화유산"],
  LS: ["레저 스포츠"],
  VE: ["문화 관광"],
  AC: ["숙박"],
  C01: ["추천 여행 코스"],
};

// ========================================
// Date Utility
// ========================================

// YYYY-MM-DD 날짜 유효성 검사
function isValidDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return false;
  }

  const parsed = new Date(`${date}T00:00:00.000Z`);

  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === date
  );
}

// 여행 시작일과 종료일을 기준으로 전체 일정 생성
function createTravelSchedule(
  startDate: string,
  endDate: string,
): TravelSchedule[] {
  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    throw new Error("여행 시작일 또는 종료일이 올바르지 않습니다.");
  }

  const start = new Date(`${startDate}T00:00:00.000Z`);
  const end = new Date(`${endDate}T00:00:00.000Z`);

  if (start.getTime() > end.getTime()) {
    throw new Error("여행 종료일은 시작일보다 빠를 수 없습니다.");
  }

  const totalDays =
    Math.floor((end.getTime() - start.getTime()) / 86400000) + 1;

  if (totalDays > MAX_TRAVEL_DAYS) {
    throw new Error(
      `여행 일정은 최대 ${MAX_TRAVEL_DAYS}일까지 설정할 수 있습니다.`,
    );
  }

  return Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(start);

    date.setUTCDate(date.getUTCDate() + index);

    return {
      day: index + 1,
      date: date.toISOString().slice(0, 10),
    };
  });
}

// ========================================
// Tourism Utility
// ========================================

// KTO API 응답에서 관광지 목록 추출
function getItems(data: any): any[] {
  const items = data?.response?.body?.items?.item;

  if (!items) {
    return [];
  }

  return Array.isArray(items) ? items : [items];
}

// KTO 관광지 데이터 정리
function normalizeTourism(item: any): TourismCandidate | null {
  if (!item.contentid || !item.title) {
    return null;
  }

  const mapX = Number(item.mapx);
  const mapY = Number(item.mapy);

  return {
    contentId: String(item.contentid),
    title: item.title,
    address: item.addr1 ?? "",
    contentTypeId: String(item.contenttypeid ?? ""),
    category: item.lclsSystm1 ?? "",
    image: item.firstimage ?? item.firstimage2 ?? "",
    mapX: Number.isFinite(mapX) && mapX !== 0 ? mapX : null,
    mapY: Number.isFinite(mapY) && mapY !== 0 ? mapY : null,
  };
}

// contentId 기준 중복 제거
function removeDuplicates(items: TourismCandidate[]) {
  const map = new Map<string, TourismCandidate>();

  items.forEach((item) => {
    if (!item.contentId) {
      return;
    }

    const existing = map.get(item.contentId);

    if (!existing) {
      map.set(item.contentId, item);
      return;
    }

    map.set(item.contentId, {
      ...existing,
      ...item,
      image: existing.image || item.image,
      address: existing.address || item.address,
      mapX: existing.mapX ?? item.mapX,
      mapY: existing.mapY ?? item.mapY,
    });
  });

  return Array.from(map.values());
}

// ========================================
// Tourism Retrieval
// ========================================

async function getTourismCandidates(
  preference: TravelPreference,
  region: string,
): Promise<TourismCandidate[]> {
  const interests = preference.interests ?? [];

  // 1. 관심사별 카테고리 검색
  const categoryTasks = interests.map((interest) => ({
    name: `카테고리 검색: ${interest.name} (${interest.code})`,

    request: () =>
      getTourismInfo({
        lDongRegnCd: region,
        lclsSystm1: interest.code,
        pageNo: 1,
      }),
  }));

  // 2. 관심사별 키워드 생성
  const keywords = [
    ...new Set(
      interests.flatMap((interest) => [
        interest.name,
        ...(INTEREST_KEYWORDS[interest.code] ?? []),
      ]),
    ),
  ].slice(0, 8);

  // 3. 키워드 검색
  const keywordTasks = keywords.map((keyword) => ({
    name: `키워드 검색: ${keyword}`,

    request: () =>
      getKeywordInfo({
        keyword,
        lDongRegnCd: region,
        pageNo: 1,
      }),
  }));

  // 4. 검색 요청 통합
  const tasks = [...categoryTasks, ...keywordTasks];

  console.log("[관광지 검색 시작]", {
    region,
    interests,
    keywords,
    requestCount: tasks.length,
  });

  // 5. 모든 검색 요청 실행
  const results = await Promise.allSettled(tasks.map((task) => task.request()));

  const items: any[] = [];

  let successCount = 0;
  let failureCount = 0;

  // 6. 검색 성공 및 실패 확인
  results.forEach((result, index) => {
    const task = tasks[index];

    if (result.status === "fulfilled") {
      successCount++;

      const data = getItems(result.value);

      console.log(`[검색 성공] ${task.name}`, {
        count: data.length,
        totalCount: result.value.response?.body?.totalCount,
      });

      items.push(...data);
    } else {
      failureCount++;

      console.error(`[검색 실패] ${task.name}`, {
        error: result.reason,
      });
    }
  });

  console.log("[관광지 검색 결과]", {
    totalRequests: tasks.length,
    successCount,
    failureCount,
    totalItems: items.length,
  });

  // 모든 API 요청이 실패한 경우
  if (successCount === 0 && failureCount > 0) {
    throw new Error("모든 KTO 관광지 검색 요청이 실패했습니다.");
  }

  // 7. 데이터 정리
  const normalizedItems = items
    .map(normalizeTourism)
    .filter((item): item is TourismCandidate => item !== null);

  // 8. 중복 제거
  const candidates = removeDuplicates(normalizedItems);

  console.log("[최종 관광지 후보]", {
    beforeDeduplication: normalizedItems.length,
    afterDeduplication: candidates.length,
  });

  return candidates.slice(0, 40);
}

// ========================================
// Groq Recommendation
// ========================================

async function createRecommendation(
  preference: TravelPreference,
  candidates: TourismCandidate[],
  schedule: TravelSchedule[],
): Promise<LLMRecommendationResponse> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY가 설정되지 않았습니다.");
  }

  const groq = new Groq({
    apiKey,
  });

  // LLM에 전달할 데이터 최소화
  const simplifiedCandidates = candidates.slice(0, 15).map((item) => ({
    contentId: item.contentId,
    title: item.title,
    address: item.address,
    category: item.category,
    mapX: item.mapX,
    mapY: item.mapY,
  }));

  const totalDays = schedule.length;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",

    temperature: 0.2,

    response_format: {
      type: "json_object",
    },

    max_completion_tokens: 8192,

    messages: [
      {
        role: "system",
        content: `
          너는 사용자의 취향과 여행 일정을 분석하여 여행 코스를 구성하는 전문 여행 추천 AI야.

          사용자가 입력한 여행 시작일과 종료일을 반드시 준수하여 정확한 일정의 여행 코스를 생성해야 해.

          [가장 중요한 여행 일정 규칙]

          1. 서버에서 전달한 schedule이 실제 여행 일정이야.
          2. schedule에 포함된 날짜와 day 번호를 절대 변경하지 마.
          3. schedule의 날짜 수와 반환하는 days 배열의 길이는 반드시 같아야 해.
          4. 모든 날짜를 빠짐없이 반환해야 해.
          5. 첫 번째 일정은 반드시 schedule의 첫 번째 날짜여야 해.
          6. 마지막 일정은 반드시 schedule의 마지막 날짜여야 해.
          7. 여행 날짜를 임의로 추가하거나 삭제하지 마.
          8. 날짜를 추측하거나 새로 계산하지 마.
          9. 당일치기 여행이라면 반드시 1개의 일정만 반환해.
          10. 1박 2일 여행이라면 반드시 2개의 일정을 반환해.
          11. 2박 3일 여행이라면 반드시 3개의 일정을 반환해.
          12. 각 일정의 date는 schedule에 전달된 날짜 문자열과 정확히 일치해야 해.
          13. 날짜가 없는 일정이나 중복 날짜를 반환하지 마.

          [여행 장소 추천 규칙]

          1. 제공된 관광지 후보 안에서만 장소를 선택해.
          2. 존재하지 않는 관광지나 contentId를 만들지 마.
          3. 추천 장소는 전체 여행 일정에서 중복되지 않아야 해.
          4. 사용자의 여행 스타일과 관심사를 고려해.
          5. 동행 유형과 선호 분위기를 고려해.
          6. 추가 요청이 있다면 반영해.
          7. 장소의 주소와 좌표를 고려하여 이동하기 좋은 순서로 구성해.
          8. 각 날짜에는 최대 ${MAX_PLACES_PER_DAY}개 장소를 추천해.
          9. 후보가 부족하다면 실제 제공된 후보만 사용해.
          10. 모든 날짜에 억지로 장소를 채우지 않아도 돼. 적합한 후보가 부족하면 빈 places 배열을 반환해.
          11. 각 날짜의 방문 장소는 해당 날짜에 효율적으로 이동할 수 있도록 구성해.
          12. 여행 기간이 길다면 날짜별로 관광지 유형과 여행 경험이 적절히 분산되도록 해.

          [여행 일정 구성 규칙]

          1. 1일차부터 마지막 날까지 순서대로 구성해.
          2. 각 날짜의 관광지는 이동 동선을 고려해.
          3. 여행 스타일에 맞게 일정을 구성해.
          4. 첫날과 마지막 날도 반드시 포함해.
          5. 숙박 여부를 임의로 만들어내지 마.
          6. 실제 제공된 관광지 후보에 없는 숙박 시설이나 장소를 추가하지 마.

          [응답 형식]

          반드시 아래 JSON 구조를 따라야 해.

          {
            "title": "추천 여행 제목",
            "description": "전체 여행 코스 설명",
            "days": [
              {
                "day": 1,
                "date": "2026-11-21",
                "places": [
                  {
                    "contentId": "후보 장소 ID",
                    "reason": "해당 날짜에 이 장소를 추천하는 이유",
                    "visitOrder": 1
                  }
                ]
              }
            ]
          }

          [최종 검증]

          JSON을 반환하기 전에 반드시 확인해.

          - days 배열의 길이가 ${totalDays}개인가?
          - schedule의 모든 날짜가 순서대로 포함되어 있는가?
          - 각 day 번호가 1부터 ${totalDays}까지 순서대로 되어 있는가?
          - 각 date가 schedule의 날짜와 정확히 일치하는가?
          - 후보에 존재하는 contentId만 사용했는가?
          - 각 날짜의 places가 최대 ${MAX_PLACES_PER_DAY}개인가?
          - 전체 일정에서 중복 장소가 없는가?

          하나라도 어긋나면 수정한 뒤 반환해.

          반드시 JSON만 반환해.
        `,
      },
      {
        role: "user",
        content: JSON.stringify({
          preference,
          travelSchedule: {
            totalDays,
            startDate: schedule[0].date,
            endDate: schedule[schedule.length - 1].date,
            schedule,
          },
          candidates: simplifiedCandidates,
        }),
      },
    ],
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("Groq 응답이 비어 있습니다.");
  }

  try {
    return JSON.parse(content) as RecommendationResponse;
  } catch {
    console.error("[Groq JSON 파싱 실패]", content);

    throw new Error("Groq 응답 JSON 파싱에 실패했습니다.");
  }
}

// ========================================
// Recommendation Validation
// ========================================

function validateRecommendation(
  recommendation: RecommendationResponse,
  candidates: TourismCandidate[],
  schedule: TravelSchedule[],
) {
  if (!recommendation || !Array.isArray(recommendation.days)) {
    throw new Error("추천 결과의 일정 데이터가 올바르지 않습니다.");
  }

  const candidateMap = new Map(
    candidates.map((item) => [item.contentId, item]),
  );

  // 날짜별 LLM 응답 매핑
  const recommendationMap = new Map<number, RecommendationDay>();

  recommendation.days.forEach((day) => {
    const dayNumber = Number(day.day);

    if (
      Number.isInteger(dayNumber) &&
      dayNumber >= 1 &&
      dayNumber <= schedule.length &&
      !recommendationMap.has(dayNumber)
    ) {
      recommendationMap.set(dayNumber, day);
    }
  });

  // 전체 여행 일정에서 장소 중복 방지
  const usedContentIds = new Set<string>();

  // 서버의 schedule을 기준으로 정확한 날짜 생성
  const days: RecommendationDay[] = schedule.map((scheduledDay) => {
    const recommendedDay = recommendationMap.get(scheduledDay.day);

    const places: RecommendationPlace[] = [];
    const dayPlaces = Array.isArray(recommendedDay?.places)
      ? recommendedDay.places
      : [];

    dayPlaces.forEach((place) => {
      const contentId = String(place.contentId ?? "");

      // 실제 후보에 존재하는 장소인지 확인
      const candidate = candidateMap.get(contentId);

      if (!candidate) {
        return;
      }

      // 전체 일정 중복 방지
      if (usedContentIds.has(contentId)) {
        return;
      }

      // 하루 최대 5개 장소
      if (places.length >= MAX_PLACES_PER_DAY) {
        return;
      }

      usedContentIds.add(contentId);

      places.push({
        ...candidate,
        reason: place.reason ?? "",
        visitOrder: places.length + 1,
      } as RecommendationPlace);
    });

    return {
      day: scheduledDay.day,
      date: scheduledDay.date,
      places,
    };
  });

  return {
    title: recommendation.title || "맞춤 여행 코스",
    description: recommendation.description || "취향에 맞춘 여행 코스입니다.",
    days,
  };
}

// ========================================
// API Route
// ========================================

export async function POST(req: Request) {
  try {
    // 1. 요청 데이터
    const body = await req.json();

    const preference = body?.preference as TravelPreference | undefined;

    // 2. 기본 데이터 검증
    if (
      !preference ||
      !Array.isArray(preference.interests) ||
      preference.interests.length === 0 ||
      !Array.isArray(preference.preferredRegions) ||
      preference.preferredRegions.length === 0
    ) {
      return NextResponse.json(
        {
          message: "여행 취향 정보가 부족합니다.",
        },
        {
          status: 400,
        },
      );
    }

    // 3. 날짜 검증 및 여행 일정 생성
    let schedule: TravelSchedule[];

    try {
      schedule = createTravelSchedule(preference.startDate, preference.endDate);
    } catch (error) {
      return NextResponse.json(
        {
          message:
            error instanceof Error
              ? error.message
              : "여행 날짜가 올바르지 않습니다.",
        },
        {
          status: 400,
        },
      );
    }

    // 현재는 선호 지역 중 첫 번째 지역 사용
    const region = preference.preferredRegions[0];

    console.log("[여행 추천 요청]", {
      region,
      preference,
      schedule,
      totalDays: schedule.length,
    });

    // 4. 관광지 후보 수집
    const candidates = await getTourismCandidates(preference, region);

    if (candidates.length === 0) {
      return NextResponse.json(
        {
          message: "조건에 맞는 관광지를 찾지 못했습니다.",
          detail: "KTO API 검색 결과가 0개입니다.",
        },
        {
          status: 404,
        },
      );
    }

    console.log("[Groq 추천 요청]", {
      candidateCount: candidates.length,
      totalDays: schedule.length,
    });

    // 5. Groq 여행 추천
    const recommendation = await createRecommendation(
      preference,
      candidates,
      schedule,
    );

    // 6. 추천 결과 검증 및 날짜 보정
    const validatedRecommendation = validateRecommendation(
      recommendation,
      candidates,
      schedule,
    );

    // 7. 유효한 추천 장소가 있는지 확인
    const hasPlaces = validatedRecommendation.days.some(
      (day) => day.places.length > 0,
    );

    if (!hasPlaces) {
      throw new Error("실제 관광지 후보와 일치하는 추천 장소가 없습니다.");
    }

    // 8. 최종 응답
    return NextResponse.json({
      success: true,

      data: {
        title: validatedRecommendation.title,
        description: validatedRecommendation.description,

        startDate: schedule[0].date,
        endDate: schedule[schedule.length - 1].date,
        totalDays: schedule.length,

        days: validatedRecommendation.days,
      },
    });
  } catch (error) {
    console.error("[RECOMMEND ERROR]", error);

    return NextResponse.json(
      {
        message: "여행 추천 중 오류가 발생했습니다.",

        detail:
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.",
      },
      {
        status: 500,
      },
    );
  }
}
