"use client";

import { Balloon } from "lucide-react";
import Link from "next/link";

export default function HeaderLogo() {
  return (
    <Link href={"/"} className="flex justify-center items-center gap-3 group">
      <span className="flex justify-center items-center rounded-full w-9 h-9 bg-[#17211B] group-hover:bg-[#EC5B3F] transition-colors duration-300">
        <Balloon className="h-6 w-6 text-[#F6F5F0]" />
      </span>
      <div className="flex justify-center items-end gap-1">
        <h4 className="font-extrabold text-xl">여담</h4>
        <span className="text-[#647069] font-medium text-xs">YEODAM</span>
      </div>
    </Link>
  );
}
