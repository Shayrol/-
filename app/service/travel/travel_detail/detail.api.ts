import { API_KEY, TOUR_API_URL } from "../api_key";
import {
  CommonInfoResponse,
  DetailImageInfoResponse,
  DetailIntroResponse,
} from "./detail.types";

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

// 소개정보: 화장실, 전화번호, 주차요금 등등의 정보 제공
export async function getDetailIntro({
  travelId,
  contentTypeId,
}: {
  travelId: string;
  contentTypeId: string;
}): Promise<DetailIntroResponse> {
  const params = new URLSearchParams({
    serviceKey: API_KEY,
    numOfRows: "100",
    pageNo: "1",
    MobileOS: "ETC",
    MobileApp: "MyTravel",
    _type: "json",
  });

  if (travelId && contentTypeId) {
    params.set("contentId", travelId);
    params.set("contentTypeId", contentTypeId);
  }

  const response = await fetch(
    `${TOUR_API_URL}/detailIntro2?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("소개정보 조회 실패");
  }

  const data = await response.json();

  return data;
}

// 이미지정보: 서브이미지목록
export async function getDetailImage(
  travelId: string,
): Promise<DetailImageInfoResponse> {
  const params = new URLSearchParams({
    serviceKey: API_KEY,
    numOfRows: "100",
    pageNo: "1",
    MobileOS: "ETC",
    MobileApp: "MyTravel",
    _type: "json",
    imageYN: "Y",
  });

  if (travelId) {
    params.set("contentId", travelId);
  }

  const response = await fetch(
    `${TOUR_API_URL}/detailImage2?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("이미지정보 조회 실패");
  }

  const data = await response.json();

  return data;
}

// 통합 요청 함수
export async function getTravelDetail(travelId: string) {
  const common = await getCommonInfo(travelId);
  const item = common.response.body.items.item[0];

  const contentTypeId = item.contenttypeid;

  const [intro, image] = await Promise.all([
    getDetailIntro({ travelId, contentTypeId }),
    getDetailImage(travelId),
  ]);
  // const [common] = await Promise.all([getCommonInfo(travelId)]);

  return {
    common,
    intro,
    image,
  };
}
