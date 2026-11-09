// 여행 검색 페이지

import TravelSearch from "./components/travel_search/TravelSearch";
import TravelList from "./components/travel_list/TravelList";

interface TravelPageProps {
  searchParams: Promise<{
    region?: string;
    sigungu?: string;
    category?: string;
    keyword?: string;
    page?: string;
  }>;
}

export default async function TravelPage({ searchParams }: TravelPageProps) {
  const resolvedParams = await searchParams;

  return (
    <section className="mt-5 w-full max-w-7xl px-3">
      <TravelSearch />

      <TravelList searchParams={resolvedParams} />
    </section>
  );
}
