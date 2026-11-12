"use client";

import { Dispatch, SetStateAction } from "react";
import CategoryTrigger from "./category.trigger";
import { CategoryCode } from "@/app/service/travel/travel_code/code.types";

interface CategorySelectProps {
  onCategory1Change: (newCategory: string) => void;
  onCategory2Change: (category: string) => void;
  category1: string;
  category2: string;
  isOpen: boolean;
  onOpenChange: () => void;
  setCategory2List: Dispatch<SetStateAction<CategoryCode[]>>;
  currentCategory1Name: string;
  currentCategory2Name: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function CategorySelect({
  category1,
  category2,
  onOpenChange,
  currentCategory1Name,
  currentCategory2Name,
}: CategorySelectProps) {
  return (
    <>
      {/* <div onClick={() => onCategory1Change("AC")}>숙박</div> */}
      <div className="hidden md:block w-full">
        <div onClick={onOpenChange}>
          <CategoryTrigger
            category1={category1}
            category1Name={currentCategory1Name}
            category2={category2}
            category2Name={currentCategory2Name}
          />
        </div>
      </div>
    </>
  );
}
