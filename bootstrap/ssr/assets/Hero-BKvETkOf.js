import { j as jsxRuntimeExports, x as xe } from "../ssr.js";
import { u as useLocale, t as tr, c as cn } from "./useLocale-DGbYLJ9C.js";
const isVideoUrl = (url) => /\.(mp4|webm|ogv)$/i.test(url);
function Hero({ data, heightClassName, showDivider }) {
  var _a, _b;
  const locale = useLocale();
  const heading = tr(data.heading, locale);
  const subtitle = tr(data.subtitle, locale);
  const ctaText = tr((_a = data.cta) == null ? void 0 : _a.text, locale);
  const secondaryCtaText = tr((_b = data.secondary_cta) == null ? void 0 : _b.text, locale);
  const image = data.image;
  const imageAlt = tr(data.image_alt, locale);
  const isVideo = !!image && isVideoUrl(image);
  const hasImage = !!image;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: cn(
        "relative isolate flex flex-col justify-end overflow-hidden px-5 pb-12 pt-28 sm:px-10 sm:pb-16 sm:pt-32 md:pb-20 md:pt-40 lg:pl-[150px] lg:pr-6",
        heightClassName ?? "h-[85vh] min-h-[440px] sm:h-[75vh]",
        hasImage ? "bg-[#2F3E2E]" : "bg-maha-200"
      ),
      children: [
        hasImage && !isVideo && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: image,
            alt: imageAlt,
            className: "absolute inset-0 z-0 h-full w-full object-cover",
            fetchPriority: "high",
            decoding: "async"
          }
        ),
        isVideo && image && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            className: "absolute inset-0 z-0 h-full w-full object-cover",
            src: image,
            autoPlay: true,
            muted: true,
            loop: true,
            playsInline: true,
            preload: "auto",
            "aria-label": imageAlt
          }
        ),
        hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 z-0",
            style: { background: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.55))" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-2xl", children: [
          heading && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "rich-content font-serif text-4xl leading-tight sm:text-5xl md:text-6xl",
                hasImage ? "text-white" : "text-ink"
              ),
              dangerouslySetInnerHTML: { __html: heading }
            }
          ),
          showDivider && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-4 block h-px w-14 bg-[#3d3f29]", "aria-hidden": "true" }),
          subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "rich-content mt-4 text-base sm:text-lg",
                hasImage ? "text-white/85" : "text-ink/80"
              ),
              dangerouslySetInnerHTML: { __html: subtitle }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-center gap-4", children: [
            ctaText && data.cta && /* @__PURE__ */ jsxRuntimeExports.jsx(
              xe,
              {
                href: data.cta.link || "#",
                className: "rounded-md border px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-90",
                style: {
                  backgroundColor: data.cta.background_color,
                  color: data.cta.text_color,
                  borderColor: data.cta.border_color
                },
                children: ctaText
              }
            ),
            secondaryCtaText && data.secondary_cta && /* @__PURE__ */ jsxRuntimeExports.jsx(
              xe,
              {
                href: data.secondary_cta.link || "#",
                className: "rounded-md border px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-90",
                style: {
                  backgroundColor: data.secondary_cta.background_color,
                  color: data.secondary_cta.text_color,
                  borderColor: data.secondary_cta.border_color
                },
                children: secondaryCtaText
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  Hero as H
};
