import { j as jsxRuntimeExports, x as xe, S as Se } from "../ssr.js";
import { P as PublicLayout } from "./PublicLayout-Bx-nt6O1.js";
import { H as Hero } from "./Hero-6EBq01_J.js";
import { u as useLocale, t as tr, s as stripTags, c as cn } from "./useLocale-NX8WGOIg.js";
import { u as useReveal } from "./useReveal-DiGU7tCR.js";
import { A as ArrowRight } from "./arrow-right-BuUR75f-.js";
import { S as ServicesClosing } from "./ServicesClosing-C0muRF1-.js";
import "stream";
import "util";
import "path";
import "http";
import "https";
import "url";
import "fs";
import "crypto";
import "net";
import "tls";
import "assert";
import "tty";
import "os";
import "events";
import "http2";
import "zlib";
const EXPLORE_MORE = { vi: "Khám phá thêm", en: "Explore more" };
function ServicesShowcase({ data }) {
  var _a;
  const locale = useLocale();
  const { ref, className } = useReveal();
  if (!((_a = data.items) == null ? void 0 : _a.length)) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref,
      className: cn(className, "mt-[24px] bg-maha-50 px-5 pb-16 sm:px-10 sm:pb-20 lg:px-[60px] lg:pb-24"),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex max-w-6xl flex-col gap-6", children: data.items.map((item, index) => {
        const title = tr(item.title, locale);
        const description = tr(item.description, locale);
        const ctaText = EXPLORE_MORE[locale] ?? EXPLORE_MORE.vi;
        const imageFirst = index % 2 === 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 overflow-hidden rounded-sm sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("relative aspect-[4/3] bg-maha-200 sm:aspect-auto", !imageFirst && "sm:order-2"), children: item.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: item.image,
              alt: stripTags(title),
              className: "absolute inset-0 h-full w-full object-cover",
              loading: "lazy"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "flex flex-col justify-center bg-[#f4eae1] px-6 py-10 sm:px-10 sm:py-12 lg:px-14",
                !imageFirst && "sm:order-1"
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative bottom-[20px] shrink-0 font-serif text-4xl text-heading/25 sm:text-5xl", children: String(index + 1).padStart(2, "0") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  title && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "rich-content font-serif text-2xl leading-snug text-heading sm:text-3xl",
                      dangerouslySetInnerHTML: { __html: title }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 h-px w-16 bg-heading/30" }),
                  description && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "rich-content mt-5 max-w-sm text-sm leading-relaxed text-ink/70",
                      dangerouslySetInnerHTML: { __html: description }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    xe,
                    {
                      href: item.url,
                      className: "group mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-wide text-heading",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ctaText }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
                      ]
                    }
                  )
                ] })
              ] })
            }
          )
        ] }, index);
      }) })
    }
  );
}
function DichVu({ hero, showcase, closing, sectionVisibility }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Se, { title: "Dịch vụ", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meta",
      {
        name: "description",
        content: "Khám phá các liệu trình trị liệu tại Mầm Spa: massage body, chăm sóc da mặt, head spa và các gói combo — theo giá trị trị liệu Việt kết hợp chuyên môn hiện đại."
      }
    ) }),
    sectionVisibility.hero && /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, { data: hero }),
    sectionVisibility.showcase && /* @__PURE__ */ jsxRuntimeExports.jsx(ServicesShowcase, { data: showcase }),
    sectionVisibility.closing && /* @__PURE__ */ jsxRuntimeExports.jsx(ServicesClosing, { data: closing })
  ] });
}
export {
  DichVu as default
};
