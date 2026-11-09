import { API_KEY, TOUR_API_URL } from "../api_key";

interface GetTourismInfoParams {
  lDongRegnCd?: string;
  lDongSignguCd?: string;
  lclsSystm1?: string;
  lclsSystm2?: string;
  pageNo?: number;
}

// 지역기반 관광정보조회 🔔
export async function getTourismInfo({
  lDongRegnCd,
  lDongSignguCd,
  lclsSystm1,
  lclsSystm2,
  pageNo,
}: GetTourismInfoParams) {
  const params = new URLSearchParams({
    serviceKey: API_KEY,
    numOfRows: "30",
    pageNo: String(pageNo),
    MobileOS: "ETC",
    MobileApp: "MyTravel",
    _type: "json",
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
    `${TOUR_API_URL}/areaBasedList2?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("관광정보 조회 실패");
  }

  const data = await response.json();

  return data;
}
