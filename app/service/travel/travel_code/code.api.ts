import { API_KEY } from "../api_key";

// API URL
const TOUR_API_URL = "https://apis.data.go.kr/B551011/KorService2";

// ✅ 지역 코드 조회
export async function getRegionCodes(lDongRegnCd: string) {
  const params = new URLSearchParams({
    serviceKey: API_KEY,
    numOfRows: "100",
    pageNo: "1",
    MobileOS: "ETC",
    MobileApp: "MyTravel",
    _type: "json",
    lDongRegnCd,
  });

  const response = await fetch(
    `${TOUR_API_URL}/ldongCode2?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("지역코드 조회 실패");
  }

  const data = await response.json();

  return data;
}

// ✅ 분류체계 코드 조회
export async function getCategoryCode({
  lclsSystm1,
  // lclsSystm2,
}: {
  lclsSystm1: string;
  // lclsSystm2?: string;
}) {
  const params = new URLSearchParams({
    serviceKey: API_KEY,
    numOfRows: "100",
    pageNo: "1",
    MobileOS: "ETC",
    MobileApp: "MyTravel",
    _type: "json",
    lclsSystm1,
  });

  // if (lclsSystm2) {
  //   params.set("lclsSystm2", lclsSystm2);
  // }

  const response = await fetch(
    `${TOUR_API_URL}/lclsSystmCode2?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("분류체계코드 조회 실패");
  }

  const data = await response.json();

  console.log("카테고리 API 요청:", params.toString());
  console.log("카테고리 API 응답:", data);

  return data;
}
