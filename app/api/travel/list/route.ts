import { getTourismInfo } from "@/app/service/travel/travel_list/list.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const lDongRegnCd = searchParams.get("region") ?? undefined;
    const lDongSignguCd = searchParams.get("sigungu") ?? undefined;
    const lclsSystm1 = searchParams.get("category1") ?? undefined;
    const lclsSystm2 = searchParams.get("category2") ?? undefined;

    const pageNo = Number(searchParams.get("page") ?? "1");

    const data = await getTourismInfo({
      lDongRegnCd,
      lDongSignguCd,
      lclsSystm1,
      lclsSystm2,
      pageNo,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "관광정보 조회에 실패했습니다." },
      { status: 500 },
    );
  }
}
