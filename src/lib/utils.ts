import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function an(promise: (...args: any) => any) {
  return promise()
    .then((data: any) => [null, data])
    .catch((err: Error) => [err]);
}
