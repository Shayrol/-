import HeaderBackButton from "@/components/layout/header/header.back.button";
import { getCommonInfo } from "../../../service/travel/travel_detail/detail.api";

interface DetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ travelId: string }>;
}

export default async function DetailLayout({
  children,
  params,
}: DetailLayoutProps) {
  const { travelId } = await params;

  const data = await getCommonInfo(travelId);
  // const travel = data.response.body.items.item[0];

  console.log("travel data", data);
  // console.log("travel", travel);

  return (
    <>
      <HeaderBackButton data={data} />
      <main className="w-full flex justify-center">{children}</main>
    </>
  );
}
