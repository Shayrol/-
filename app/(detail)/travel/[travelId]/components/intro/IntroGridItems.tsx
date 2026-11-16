import type { ReactNode } from "react";

interface IntroInfoItem {
  label: string;
  value?: string | null;
  icon: ReactNode;
}

interface Props {
  items: IntroInfoItem[];
}

export default function IntroInfoGrid({ items }: Props) {
  const visibleItems = items.filter((item) => item.value?.trim());

  if (visibleItems.length === 0) return null;

  return (
    <div className="grid grid-cols-1 w-full sm:grid-cols-2 xl:grid-cols-3 gap-3">
      {visibleItems.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-2 w-full p-4 sm:p-5 rounded-xl bg-[#F6F5F0]"
        >
          <div className="flex items-center gap-2 text-sm text-[#647069]">
            {item.icon}
            <span>{item.label}</span>
          </div>

          <p className="text-sm sm:text-base font-semibold text-[#17211B] whitespace-pre-line break-words">
            {item.value?.replace(/<br\s*\/?>/gi, "\n")}
          </p>
        </div>
      ))}
    </div>
  );
}
