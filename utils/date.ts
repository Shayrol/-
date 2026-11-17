export function formatTravelDate(date: string) {
  if (!/^\d{8}$/.test(date)) return date;

  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);

  return `${year}년 ${month}월 ${day}일`;
}

// 행사 종료일 계산
export function isTravelEnded(endDate: string) {
  if (!/^\d{8}$/.test(endDate)) return false;

  const year = Number(endDate.slice(0, 4));
  const month = Number(endDate.slice(4, 6));
  const day = Number(endDate.slice(6, 8));

  const end = new Date(year, month - 1, day);
  const today = new Date();

  // 시간 제거 후 날짜만 비교
  today.setHours(0, 0, 0, 0);

  return end < today;
}
