import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date?: string | Date): string => {
  if (!date) return "Invalid Date";

  const parsed = typeof date === 'string' ? new Date(date) : date;

  return isNaN(parsed.getTime())
    ? "Invalid Date"
    : parsed.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
};
