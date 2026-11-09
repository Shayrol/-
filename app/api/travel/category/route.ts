import { getCategoryCode } from "@/app/service/travel/travel_code/code.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const lclsSystm1 = request.nextUrl.searchParams.get("category1");
  // const lclsSystm2 = request.nextUrl.searchParams.get("category2");

  if (!lclsSystm1) {
    return NextResponse.json(
      { message: "lclsSystm1이 필요합니다." },
      { status: 400 },
    );
  }

  try {
    const data = await getCategoryCode({
      lclsSystm1,
      // lclsSystm2: lclsSystm2 ?? undefined,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Next.js API 라우트 오류" },
      { status: 500 },
    );
  }
}
