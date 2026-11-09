"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CardImageSkeleton() {
  return (
    <Card className="group relative mx-auto w-full pt-0">
      {/* 이미지 */}
      <Skeleton className="aspect-video w-full rounded-t-xl" />

      {/* 내용 */}
      <div className="flex flex-col gap-1">
        <CardHeader className="flex flex-col gap-1.5">
          {/* 제목 */}
          <Skeleton className="h-5 w-3/4" />

          {/* 카테고리 */}
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>

        {/* 주소 */}
        <div className="w-full min-w-0 px-4">
          <Skeleton className="h-5 w-2/3" />
        </div>
      </div>
    </Card>
  );
}
