"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MobileMenu from "./header.mobile.menu";
import HeaderLogo from "./header.logo.link";

export default function Header() {
  return (
    <header className="sticky flex justify-center items-center top-0 z-50 w-full h-20 border-b bg-[#F6F5F0]">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <HeaderLogo />

        {/* 데스크톱 메뉴 */}
        <nav className="hidden items-center gap-6 sm:flex">
          <a href="#">인기 여행지</a>
          <a href="#">여담 소개</a>
          <Link
            href="/travel"
            className="flex justify-center items-center gap-1 py-2 px-4 bg-[#17211B] rounded-full text-white hover:bg-[#EC5B3F] transition-colors duration-300"
          >
            <span className="text-sm font-semibold">여행지 찾기</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <MobileMenu />
      </div>
    </header>
  );
}
