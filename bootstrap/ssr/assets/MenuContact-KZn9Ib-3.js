import { j as jsxRuntimeExports } from "../ssr.js";
import { u as useLocale, t as tr, c as cn } from "./useLocale-NX8WGOIg.js";
import { u as useReveal } from "./useReveal-DiGU7tCR.js";
import { H as HeartHandshake } from "./heart-handshake-B2I5iEgG.js";
const PDF_LOCALE_ORDER = ["vi", "en", "zh", "ko", "ja"];
const PDF_LOCALE_LABELS = {
  vi: "VI",
  en: "EN",
  zh: "中文",
  ko: "한국어",
  ja: "日本語"
};
function pickDefaultPdf(pdfs, locale) {
  if (pdfs[locale]) return pdfs[locale] ?? null;
  for (const code of PDF_LOCALE_ORDER) {
    if (pdfs[code]) return pdfs[code] ?? null;
  }
  return null;
}
function MenuContact({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const text = tr(data.text, locale);
  const imageAlt = tr(data.image_alt, locale);
  const hasImage = !!data.image;
  const { ref, className } = useReveal();
  if (!title && !text) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: cn(className, "px-5 pb-16 pt-4 sm:px-10 lg:px-[60px]"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-maha-200 bg-maha-50 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 p-8 sm:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-maha-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeartHandshake, { className: "h-6 w-6 text-subheading", strokeWidth: 1.4 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        title && /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl text-heading sm:text-2xl", children: title }),
        text && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rich-content mt-2.5 text-sm leading-relaxed text-ink/65",
            dangerouslySetInnerHTML: { __html: text }
          }
        )
      ] })
    ] }),
    hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] w-full md:aspect-auto md:min-h-[190px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: data.image ?? void 0,
        alt: imageAlt,
        className: "h-full w-full object-cover",
        loading: "lazy"
      }
    ) })
  ] }) });
}
export {
  MenuContact as M,
  PDF_LOCALE_ORDER as P,
  PDF_LOCALE_LABELS as a,
  pickDefaultPdf as p
};
