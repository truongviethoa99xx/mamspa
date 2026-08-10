import { j as jsxRuntimeExports, x as xe } from "../ssr.js";
import { u as useLocale, t as tr, c as cn } from "./useLocale-DGbYLJ9C.js";
import { u as useReveal } from "./useReveal-D9SSgWK4.js";
import { A as ArrowRight } from "./arrow-right-CzMsDkxu.js";
function ServicesClosing({ data, fixedHeight = false }) {
  const locale = useLocale();
  const heading = tr(data.heading, locale);
  const body = tr(data.body, locale);
  const ctaText = tr(data.ctaText, locale);
  const imageAlt = tr(data.image_alt, locale);
  const hasImage = !!data.image;
  const { ref, className } = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref,
      className: cn(
        className,
        "relative isolate w-full overflow-hidden px-5 sm:px-10 lg:px-[60px]",
        fixedHeight ? "flex h-[360px] items-center sm:h-[400px]" : "py-16 sm:py-20",
        !hasImage && "bg-maha-100"
      ),
      children: [
        hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: data.image ?? void 0,
            alt: imageAlt,
            "aria-hidden": imageAlt ? void 0 : "true",
            className: "absolute inset-0 h-full w-full object-cover",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative ml-auto max-w-4xl", children: [
          heading && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rich-content font-serif text-2xl leading-snug text-heading sm:text-3xl",
              dangerouslySetInnerHTML: { __html: heading }
            }
          ),
          body && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rich-content mt-3 max-w-lg text-sm leading-relaxed text-ink/75 sm:text-base",
              dangerouslySetInnerHTML: { __html: body }
            }
          ),
          ctaText && data.ctaLink && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            xe,
            {
              href: data.ctaLink,
              className: "group mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-[#2F3E2E] px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: ctaText } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  ServicesClosing as S
};
