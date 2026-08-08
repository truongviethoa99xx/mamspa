import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { P as PublicLayout } from "./PublicLayout-B7nDyDjV.js";
import { u as useLocale, t as tr } from "./useLocale-CGFjb2L7.js";
import "react";
import "lucide-react";
import "react-i18next";
import "clsx";
import "tailwind-merge";
function Gallery({ images }) {
  const locale = useLocale();
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Thư viện ảnh" }),
    /* @__PURE__ */ jsx("section", { className: "bg-maha-50 px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsx("p", { className: "font-serif text-xs uppercase tracking-[0.2em] text-subheading", children: "Gallery" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-serif text-3xl text-heading sm:text-4xl", children: "Thư viện ảnh" }),
      images.length ? /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4", children: images.map((image, index) => {
        const alt = tr(image.alt, locale) || "Khách hàng trải nghiệm tại Mầm Spa";
        return /* @__PURE__ */ jsx("div", { className: "aspect-square overflow-hidden rounded-[4px] bg-maha-200", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: image.src,
            alt,
            className: "h-full w-full object-cover transition-transform duration-500 hover:scale-105",
            loading: "lazy"
          }
        ) }, index);
      }) }) : /* @__PURE__ */ jsx("p", { className: "mt-10 text-sm text-ink/70", children: "Chưa có hình ảnh nào được đăng tải." })
    ] }) })
  ] });
}
export {
  Gallery as default
};
