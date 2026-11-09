"use client";

import Link from "next/link";
import { ArrowRight, Menu, XIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import HeaderLogo from "./header.logo.link";

const MENU_LIST = [
  { name: "홈", href: "/" },
  { name: "여행지 검색", href: "/travel" },
  { name: "AI 여행 추천", href: "/recommend" },
];

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="sm:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full max-w-none p-4 bg-[#F6F5F0]"
      >
        <SheetHeader>
          <SheetTitle className="flex justify-between items-center pb-6 w-full border-b border-gray-300">
            <SheetClose asChild>
              <HeaderLogo />
            </SheetClose>
            <SheetClose asChild>
              <XIcon className="w-6 h-6 font-extrabold" />
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col p-4 gap-2">
          <p className="text-sm font-bold text-[#EC5B3F]">MENU</p>
          {MENU_LIST.map((menu) => (
            <SheetClose asChild key={menu.href}>
              <Link
                href={menu.href}
                className="group flex justify-between items-center py-3 border-b border-gray-300"
              >
                <p className="text-lg font-semibold">{menu.name}</p>
                <div className="flex justify-center items-center p-2 rounded-full bg-white duration-300 group-hover:bg-[#EC5B3F]">
                  <ArrowRight className="w-5 h-5 text-[#17211B] group-hover:text-white" />
                </div>
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
