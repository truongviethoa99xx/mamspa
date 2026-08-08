import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import { u as useLocale, t as tr, s as stripTags } from "./useLocale-CGFjb2L7.js";
import { B as Breadcrumb } from "./Breadcrumb-CY3ASVHf.js";
const BOOKING_URL = "/dat-lich/";
const CTA_LABEL = { vi: "Đặt lịch ngay", en: "Book now" };
function CategoryHero({
  data,
  breadcrumb,
  showCta = true
}) {
  const locale = useLocale();
  const heading = tr(data.heading, locale);
  const subtitle = tr(data.subtitle, locale);
  const imageAlt = tr(data.imageAlt, locale);
  const hasImage = !!data.image;
  const ctaLabel = CTA_LABEL[locale] ?? CTA_LABEL.vi;
  return /* @__PURE__ */ jsxs("section", { className: "relative isolate h-[calc(85vh-40px)] min-h-[420px] overflow-hidden bg-[#ece1db] sm:h-[calc(75vh-40px)]", children: [
    hasImage && /* @__PURE__ */ jsx(
      "img",
      {
        src: data.image ?? void 0,
        alt: imageAlt || stripTags(heading),
        className: "absolute inset-0 z-0 h-full w-full object-cover"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex h-full w-full flex-col px-5 pb-28 pt-28 sm:px-10 sm:pb-32 sm:pt-32 md:w-1/2 md:px-12 md:pt-40 lg:w-1/3 lg:px-16", children: [
      hasImage && /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 -z-10",
          style: {
            background: "linear-gradient(90deg, rgba(236,225,219,0.97) 0%, rgba(236,225,219,0.9) 55%, rgba(236,225,219,0) 100%)"
          }
        }
      ),
      /* @__PURE__ */ jsx(Breadcrumb, { items: breadcrumb, variant: "dark", className: "text-sm" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-auto", children: [
        heading && /* @__PURE__ */ jsx(
          "h1",
          {
            className: "rich-content line-clamp-2 font-serif text-3xl leading-tight text-heading sm:text-4xl",
            dangerouslySetInnerHTML: { __html: heading }
          }
        ),
        subtitle && /* @__PURE__ */ jsx(
          "div",
          {
            className: "rich-content mt-4 text-base leading-relaxed text-ink/80 sm:text-lg",
            dangerouslySetInnerHTML: { __html: subtitle }
          }
        ),
        showCta && /* @__PURE__ */ jsxs(
          Link,
          {
            href: BOOKING_URL,
            className: "group mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-wide text-heading md:mt-10",
            children: [
              /* @__PURE__ */ jsx("span", { children: ctaLabel }),
              /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  CategoryHero as C
};
