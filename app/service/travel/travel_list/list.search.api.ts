import { API_KEY } from "../api_key";

// 지역 코드 조회 API URL
const TOUR_API_URL = "https://apis.data.go.kr/B551011/KorService2";

interface GetKeywordInfoParams {
  lDongRegnCd?: string;
  lDongSignguCd?: string;
  lclsSystm1?: string;
  lclsSystm2?: string;
  pageNo?: number;
  keyword: string;
}

export async function getKeywordInfo({
  lDongRegnCd,
  lDongSignguCd,
  lclsSystm1,
  lclsSystm2,
  pageNo,
  keyword,
}: GetKeywordInfoParams) {
  if (keyword === "") {
    throw new Error("검색어 값이 없습니다.");
  }

  const params = new URLSearchParams({
    serviceKey: API_KEY,
    numOfRows: "30",
    pageNo: String(pageNo),
    MobileOS: "ETC",
    MobileApp: "MyTravel",
    _type: "json",
    keyword,
  });

  // 시·도 있음 옵션 추가
  if (lDongRegnCd) {
    params.set("lDongRegnCd", lDongRegnCd);
  }

  // 시·군·구 있음 옵션 추가
  if (lDongSignguCd) {
    params.set("lDongSignguCd", lDongSignguCd);
  }

  // 대분류 있음 옵션 추가
  if (lclsSystm1) {
    params.set("lclsSystm1", lclsSystm1);
  }

  // 중분류 있음 옵션 추가
  if (lclsSystm2) {
    params.set("lclsSystm2", lclsSystm2);
  }

  const response = await fetch(
    `${TOUR_API_URL}/searchKeyword2?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("검색결과 조회 실패");
  }

  const data = await response.json();

  return data;
}
