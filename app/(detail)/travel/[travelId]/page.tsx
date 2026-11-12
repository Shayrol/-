import {
  getCommonInfo,
  getTravelDetail,
} from "@/app/service/travel/travel_detail/detail.api";
import TravelDetail from "./components/TravelDetail";

export default async function TravelDetailPage({
  params,
}: {
  params: Promise<{ travelId: string }>;
}) {
  const { travelId } = await params;
  const { common, image, intro } = await getTravelDetail(travelId);

  console.log("data: ", common);
  console.log("data: ", image);
  console.log("data: ", intro);
  console.log("travelId: ", travelId);

  const common_ = common.response.body.items.item[0];
  const intro_ = intro.response.body.items.item[0];
  const image_ = image.response.body.items.item;

  return (
    <section className="mt-5 w-full">
      <TravelDetail common={common_} intro={intro_} image={image_} />
    </section>
  );
}
