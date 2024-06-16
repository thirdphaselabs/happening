import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildOrganizationFallbackInitials({ name }: { name: string }): string {
  const [first, second] = name.split(" ");

  return `${first?.slice(0, 1)}${second ? second.slice(0, 1) : ""}`.toUpperCase();
}

import { format, differenceInMilliseconds, formatDuration, intervalToDuration } from "date-fns";

function addOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

export function formatDateWithOrdinal(date: Date) {
  const day = format(date, "d");
  const month = format(date, "MMMM");
  const year = format(date, "yyyy");

  return `${addOrdinalSuffix(+day)} ${month} ${year}`;
}

export function formatDateWithWeekdayAndOrdinal(date: Date) {
  const weekday = format(date, "EEEE");
  const day = format(date, "d");
  const month = format(date, "MMMM");

  return `${weekday}, ${month} ${addOrdinalSuffix(+day)}`;
}

export function timeUntil(date: Date) {
  const now = new Date();
  const duration = intervalToDuration({ start: now, end: date });

  // Format the duration to "Xd Yh"
  const days = duration.days ? `${duration.days}d ` : "";
  const hours = duration.hours ? `${duration.hours}h` : "";

  return `${days}${hours}`.trim();
}
