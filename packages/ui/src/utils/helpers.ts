import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidEnumMember<T extends string>(
  enumMembers: { [key: string]: T },
  value: string,
): value is T {
  return Object.values<string>(enumMembers).includes(value);
}
