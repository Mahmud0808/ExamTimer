import { Time } from "../types";

export const getFormattedTime = (time: number): Time => {
  if (time < 0) return { hours: "00", minutes: "00", seconds: "00" };

  const hours = String(Math.floor(time / (60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor((time / 60) % 60)).padStart(2, "0");
  const seconds = String(Math.floor(time % 60)).padStart(2, "0");

  return { hours, minutes, seconds };
};

export const saveToLocalStorage = (key: string, value: boolean | number) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
