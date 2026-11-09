"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Astroid, Search } from "lucide-react";

// import RegionSelect from "./region_select/region.selector";

import { Button } from "@/components/ui/button";
import RegionSelect from "./region_select/region.select";
import CategorySelect from "./category_select/category.select";
import {
  RegionCode,
  TRAVEL_CATEGORY_CODES,
  TRAVEL_REGION_CODES,
} from "@/app/service/travel/travel_code/code.list";
import {
  CategoryCode,
  SigunguCode,
} from "@/app/service/travel/travel_code/code.types";
import RegionSelector from "./region_select/region.selector";
import CategorySelector from "./category_select/category_selector";
import RegionSelectorM from "./region_select/region.selector.mobile";
import CategorySelectorM from "./category_select/category.selector.mobile";

type OpenType = "region" | "category" | null;

export default function TravelSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 지역 상태 값
  const [region, setRegion] = useState(searchParams.get("region") || "");
  const [sigungu, setSigungu] = useState(searchParams.get("sigungu") || "");
  const [sigunguList, setSigunguList] = useState<SigunguCode[]>([]);
  const [mobileRegionStep, setMobileRegionStep] = useState<"sido" | "sigungu">(
    "sido",
  );

  // 카테고리 상태 값
  const [category1, setCategory1] = useState(
    searchParams.get("category1") || "",
  );
  const [category2, setCategory2] = useState(
    searchParams.get("category2") || "",
  );
  const [category2List, setCategory2List] = useState<CategoryCode[]>([]);
  const [mobileCategoryStep, setMobileCategoryStep] = useState<"ct1" | "ct2">(
    "ct1",
  );

  // 검색어 상태 값
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  const [openType, setOpenType] = useState<OpenType>(null);

  const onRegionChange = (newRegion: string) => {
    setRegion(newRegion);

    // 시/도가 변경되면 시/군/구 초기화
    setSigungu("");
  };

  const onCategory1Change = (newCategory: string) => {
    setCategory1(newCategory);

    setCategory2("");
  };

  const currentRegionName =
    TRAVEL_REGION_CODES.find((r) => r.code === region)?.name ?? "전체 지역";

  const currentSigunguName =
    sigungu === ""
      ? "전체"
      : (sigunguList.find((s) => s.code === sigungu)?.name ?? "");

  const currentCategory1Name =
    TRAVEL_CATEGORY_CODES.find((category) => category.code === category1)
      ?.name ?? "전체";

  const currentCategory2Name =
    category2 === ""
      ? "전체"
      : (category2List.find((category) => category.code === category2)?.name ??
        "");

  // 검색 함수
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (region) {
      params.set("region", region);
    }

    if (sigungu) {
      params.set("sigungu", sigungu);
    }

    if (category1) {
      params.set("category1", category1);
    }
    if (category2) {
      params.set("category2", category2);
    }
    if (keyword.trim()) {
      params.set("keyword", keyword.trim());
    }

    const query = params.toString();

    router.push(query ? `/travel?${query}` : "/travel");
  };

  const handleRegionSelect = (region: RegionCode) => {
    // 전체 지역
    if (region.code === "00") {
      onRegionChange("");
      setSigungu("");

      setSigunguList([]);
      setMobileRegionStep("sido");

      // Desktop 선택창 닫기
      // setIsOpen(false);
      // onOpenChange();
      setOpenType((prev) => (prev === "region" ? null : "region"));
      return;
    }

    // 시/도 변경
    onRegionChange(region.code);

    // 시/도가 바뀌면 시/군/구 초기화
    setSigungu("");

    // 모바일에서는 시/군/구 화면으로 이동
    setMobileRegionStep("sigungu");
  };

  const handleCategory1Select = (category: CategoryCode) => {
    // 전체 지역
    if (category.code === "00") {
      onCategory1Change("");
      setCategory2("");

      setCategory2List([]);
      setMobileCategoryStep("ct1");

      // Desktop 선택창 닫기
      setOpenType((prev) => (prev === "category" ? null : "category"));
      return;
    }

    onCategory1Change(category.code);
    setCategory2("");

    setMobileCategoryStep("ct2");
  };

  useEffect(() => {
    if (!region) {
      // setSigunguList([]);
      return;
    }

    let ignore = false;

    const loadSigungu = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(`/api/travel/region?region=${region}`);

        if (!res.ok) {
          throw new Error("시군구 정보를 불러오지 못했습니다.");
        }

        const data = await res.json();

        const items = data?.response?.body?.items?.item ?? [];

        if (!ignore) {
          setSigunguList(items);
        }
      } catch (error) {
        console.error(error);

        if (!ignore) {
          setSigunguList([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadSigungu();

    return () => {
      ignore = true;
    };
  }, [region]);

  useEffect(() => {
    if (!category1) return;

    let ignore = false;

    const loadCategory = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(`/api/travel/category?category1=${category1}`);

        if (!res.ok) {
          throw new Error("카테고리 정보를 불러오지 못했습니다.");
        }

        const data = await res.json();
        const items = data?.response?.body?.items?.item ?? [];

        if (!ignore) {
          setCategory2List(items);
        }
      } catch (error) {
        console.error(error);

        if (!ignore) {
          setCategory2List([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadCategory();

    return () => {
      ignore = true;
    };
  }, [category1]);

  return (
    <section className="w-full flex flex-col gap-3">
      <div className="flex flex-col justify-center items-start py-3 w-full h-fit sm:h-56">
        <div className="flex items-center gap-2 text-[#EC5B3F]">
          <Astroid className="w-4 h-4" />
          <p className="text-sm font-bold">FIND YOUR PLACE</p>
        </div>
        <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[1.2]">
          오늘은 어디로 <br className="block sm:hidden" />
          떠나볼까요?
        </h2>
      </div>
      <div className="w-full flex justify-center items-center gap-2">
        <RegionSelect
          onRegionChange={onRegionChange}
          onSigunguChange={setSigungu}
          regionCode={region}
          sigunguCode={sigungu}
          isOpen={openType === "region"}
          onOpenChange={() =>
            setOpenType((prev) => (prev === "region" ? null : "region"))
          }
          setSigunguList={setSigunguList}
          currentRegionName={currentRegionName}
          currentSigunguName={currentSigunguName}
          setIsLoading={setIsLoading}
        />

        <CategorySelect
          onCategory1Change={onCategory1Change}
          onCategory2Change={setCategory2}
          category1={category1}
          category2={category2}
          isOpen={openType === "category"}
          onOpenChange={() =>
            setOpenType((prev) => (prev === "category" ? null : "category"))
          }
          setCategory2List={setCategory2List}
          currentCategory1Name={currentCategory1Name}
          currentCategory2Name={currentCategory2Name}
          setIsLoading={setIsLoading}
        />

        <div className="flex md:hidden flex-col gap-3 w-full">
          <RegionSelectorM
            regionCode={region}
            regionName={currentRegionName}
            sigunguCode={sigungu}
            sigunguName={currentSigunguName}
            mobileStep={mobileRegionStep}
            setMobileStep={setMobileRegionStep}
            handleRegionSelect={handleRegionSelect}
            isLoading={isLoading}
            handleSigunguSelect={setSigungu}
            sigunguList={sigunguList}
          />
          <CategorySelectorM
            categoryCode1={category1}
            categoryName1={currentCategory1Name}
            categoryCode2={category2}
            categoryName2={currentCategory2Name}
            mobileStep={mobileCategoryStep}
            setMobileStep={setMobileCategoryStep}
            handleCategory1Select={handleCategory1Select}
            isLoading={isLoading}
            handleCategory2Select={setCategory2}
            category2List={category2List}
          />
        </div>
      </div>

      {openType &&
        (openType === "region" ? (
          <RegionSelector
            handleRegionSelect={handleRegionSelect}
            isLoading={isLoading}
            onSigunguChange={setSigungu}
            regionCode={region}
            sigunguCode={sigungu}
            sigunguList={sigunguList}
            onOpenChange={() =>
              setOpenType((prev) => (prev === "region" ? null : "region"))
            }
          />
        ) : (
          <CategorySelector
            handleCategory1Select={handleCategory1Select}
            isLoading={isLoading}
            onCategory2Change={setCategory2}
            category1={category1}
            category2={category2}
            category2List={category2List}
            onOpenChange={() =>
              setOpenType((prev) => (prev === "category" ? null : "category"))
            }
          />
        ))}

      {/* 검색 창 */}
      <input
        type="text"
        placeholder="검색어를 입력해 주세요."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 h-10 text-sm"
      />

      {/* 검색 버튼 */}
      <Button
        type="button"
        onClick={handleSearch}
        className="h-11 w-full rounded-xl px-6 lg:w-auto lg:shrink-0 cursor-pointer"
      >
        <Search className="mr-2 h-4 w-4" />
        검색
      </Button>
    </section>
  );
}
