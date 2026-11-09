import { getTravelDetail } from "@/app/service/travel/travel_detail/detail.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ travelId: string }> },
) {
  try {
    const resParams = await params;
    const travelId = resParams.travelId;

    const data = await getTravelDetail(travelId);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "상세정보 조회에 실패했습니다." },
      { status: 500 },
    );
  }
}
