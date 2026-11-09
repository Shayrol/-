import { API_KEY, TOUR_API_URL } from "../api_key";
import { CommonInfoResponse } from "./detail.types";

// 공통정보조회: 기본정보, 약도이미지, 대표이미지, 주소, 좌표, 개요, 길안내 등
export async function getCommonInfo(
  travelId: string,
): Promise<CommonInfoResponse> {
  const params = new URLSearchParams({
    serviceKey: API_KEY,
    numOfRows: "100",
    pageNo: "1",
    MobileOS: "ETC",
    MobileApp: "MyTravel",
    _type: "json",
  });

  if (travelId) {
    params.set("contentId", travelId);
  }

  const response = await fetch(
    `${TOUR_API_URL}/detailCommon2?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("공통정보 조회 실패");
  }

  const data = await response.json();

  return data;
}

// 통합 요청 함수
export async function getTravelDetail(travelId: string) {
  const [common] = await Promise.all([getCommonInfo(travelId)]);

  return {
    common,
  };
}
