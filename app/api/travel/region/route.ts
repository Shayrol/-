import { getRegionCodes } from "@/app/service/travel/travel_code/code.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const lDongRegnCd = request.nextUrl.searchParams.get("region");

  if (!lDongRegnCd) {
    return NextResponse.json(
      { message: "lDongRegnCd가 필요합니다." },
      { status: 400 },
    );
  }

  try {
    const data = await getRegionCodes(lDongRegnCd);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Next.js API 라우트 오류" },
      { status: 500 },
    );
  }
}
