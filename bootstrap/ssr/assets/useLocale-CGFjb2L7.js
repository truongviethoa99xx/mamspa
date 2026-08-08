import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function formatVND(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(value);
}
function publicAssetUrl(path) {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return `/storage/${path}`;
}
function formatDate(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}.${date.getFullYear()}`;
}
function stripTags(html) {
  return html.replace(/<[^>]+>/g, "");
}
function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}
function tr(value, locale = "vi") {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && locale in value) {
    return value[locale] ?? "";
  }
  if (value && typeof value === "object" && "vi" in value) {
    return value.vi ?? "";
  }
  return "";
}
function generateTimeOptions(open, close, stepMinutes = 30) {
  const toMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };
  const start = toMinutes(open);
  const end = toMinutes(close);
  const options = [];
  for (let mins = start; mins <= end; mins += stepMinutes) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    options.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
  return options;
}
function useLocale() {
  const { props } = usePage();
  const { i18n } = useTranslation();
  if (props.locale && i18n.language !== props.locale) {
    void i18n.changeLanguage(props.locale);
  }
  return props.locale;
}
export {
  truncate as a,
  formatVND as b,
  cn as c,
  formatDate as f,
  generateTimeOptions as g,
  publicAssetUrl as p,
  stripTags as s,
  tr as t,
  useLocale as u
};
