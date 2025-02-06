import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Use tailwind-merge with clsx.
 * @param inputs ClassValue[]
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}