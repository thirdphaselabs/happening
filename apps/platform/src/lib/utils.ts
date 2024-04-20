import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildOrganizationFallbackInitials({ name }: { name: string }): string {
  const [first, second] = name.split(" ");

  return `${first?.slice(0, 1)}${second ? second.slice(0, 1) : ""}`.toUpperCase();
}
