import { j as jsxRuntimeExports, x as xe, S as Se } from "../ssr.js";
import { b as MapPin, P as PublicLayout } from "./PublicLayout-aRtbho-a.js";
import { a as createLucideIcon, u as useLocale, t as tr, s as stripTags, c as cn, e as Clock } from "./useLocale-NX8WGOIg.js";
import { L as Leaf } from "./leaf-CPhqkXQK.js";
import { u as useReveal } from "./useReveal-DiGU7tCR.js";
import { S as ShieldCheck } from "./shield-check-CoBFVw63.js";
import { H as HeartHandshake } from "./heart-handshake-B2I5iEgG.js";
import { G as Gift } from "./gift-Bu8788U-.js";
import { A as ArrowRight } from "./arrow-right-BuUR75f-.js";
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
/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Info = createLucideIcon("Info", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
]);
/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const User = createLucideIcon("User", [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
]);
function OfferHero({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const subtitle = tr(data.subtitle, locale);
  const body = tr(data.body, locale);
  const imageAlt = tr(data.image_alt, locale);
  const hasImage = !!data.image;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative isolate min-h-[460px] overflow-hidden bg-maha-900", children: [
    hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: data.image ?? void 0,
        alt: imageAlt || stripTags(title),
        className: "absolute inset-0 z-0 h-full w-full object-cover"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 z-0",
        style: {
          background: "linear-gradient(90deg, rgba(36,48,35,0.97) 0%, rgba(36,48,35,0.94) 34%, rgba(36,48,35,0.55) 52%, rgba(36,48,35,0.05) 72%, rgba(36,48,35,0) 85%)"
        },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex min-h-[460px] w-full max-w-xl flex-col justify-center px-5 pb-14 pt-32 sm:px-10 sm:pb-16 sm:pt-36 lg:px-16 lg:pt-40", children: [
      title && /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl uppercase tracking-wide text-maha-50 sm:text-5xl", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rich-content mt-6 max-w-sm text-sm leading-relaxed text-maha-100/85",
          dangerouslySetInnerHTML: { __html: subtitle }
        }
      ),
      body && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex max-w-sm items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "mt-0.5 h-5 w-5 shrink-0 text-maha-200", strokeWidth: 1.4 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rich-content text-xs leading-relaxed text-maha-200/90",
            dangerouslySetInnerHTML: { __html: body }
          }
        )
      ] })
    ] })
  ] });
}
const ICONS = {
  Leaf,
  Clock,
  User,
  Gift,
  HeartHandshake,
  ShieldCheck
};
function OfferBranches({ data }) {
  const locale = useLocale();
  const heading = tr(data.heading, locale);
  const items = data.items ?? [];
  const { ref, className } = useReveal();
  if (!items.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: cn(className, "mt-[50px] bg-[#f5f2ed] px-5 py-12 sm:px-10 lg:px-[60px] lg:py-16"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl", children: [
    heading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-4 w-4 shrink-0 text-subheading", strokeWidth: 1.5 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl uppercase tracking-wide text-heading sm:text-3xl", children: heading })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex flex-col gap-8", children: items.map((branch, index) => {
      const name = tr(branch.name, locale);
      const tagline = tr(branch.tagline, locale);
      const imageAlt = tr(branch.image_alt, locale) || name;
      const hasImage = !!branch.image;
      const offers = branch.offers ?? [];
      const isReversed = index % 2 === 1;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "aspect-[4/3] overflow-hidden rounded-2xl border border-maha-200 bg-maha-200 md:aspect-auto md:min-h-[320px]",
              isReversed ? "md:order-2" : "md:order-1"
            ),
            children: hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: branch.image ?? void 0,
                alt: imageAlt,
                className: "h-full w-full object-cover",
                loading: "lazy"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "rounded-2xl border border-maha-200 bg-white p-7 sm:p-8",
              isReversed ? "md:order-1" : "md:order-2"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mt-1 h-5 w-5 shrink-0 text-subheading", strokeWidth: 1.5 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  name && /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-2xl uppercase tracking-wide text-heading", children: name }),
                  tagline && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-ink/60", children: tagline })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex flex-col", children: offers.map((offer, offerIndex) => {
                const Icon = offer.icon && ICONS[offer.icon] || Leaf;
                const offerTitle = tr(offer.title, locale);
                const offerDescription = tr(offer.description, locale);
                const offerButtonLabel = tr(offer.button_label, locale);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: cn(
                      "flex items-center gap-4 py-4",
                      offerIndex > 0 && "border-t border-maha-200"
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-maha-200 bg-maha-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-subheading", strokeWidth: 1.4 }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                        offerTitle && /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-serif text-base text-heading sm:text-lg", children: offerTitle }),
                        offerDescription && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "rich-content mt-0.5 text-xs leading-relaxed text-ink/65",
                            dangerouslySetInnerHTML: { __html: offerDescription }
                          }
                        )
                      ] }),
                      offerButtonLabel && offer.button_link && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        xe,
                        {
                          href: offer.button_link,
                          className: "group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-heading transition-colors hover:text-subheading",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: offerButtonLabel }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1" })
                          ]
                        }
                      )
                    ]
                  },
                  offerIndex
                );
              }) })
            ]
          }
        )
      ] }, index);
    }) })
  ] }) });
}
function OfferNote({ data }) {
  const locale = useLocale();
  const text = tr(data.text, locale);
  const imageAlt = tr(data.image_alt, locale);
  const hasImage = !!data.image;
  const { ref, className } = useReveal();
  if (!text) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: cn(className, "bg-[#f5f2ed] px-5 pb-[50px] sm:px-10 lg:px-[60px]"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-2xl bg-maha-100 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5 p-7 sm:p-9", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-maha-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-5 w-5 text-subheading", strokeWidth: 1.5 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rich-content text-sm leading-relaxed text-ink/75",
          dangerouslySetInnerHTML: { __html: text }
        }
      )
    ] }),
    hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] w-full md:aspect-auto md:min-h-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
function OfferClosing({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const subtitle = tr(data.subtitle, locale);
  const buttonText = tr(data.buttonText, locale);
  const imageAlt = tr(data.image_alt, locale);
  const hasImage = !!data.image;
  const { ref, className } = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: cn(className, "mt-[50px] bg-[#f5f2ed] px-5 pb-16 sm:px-10 lg:px-[60px]"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-2xl bg-maha-100 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center p-8 sm:p-10", children: [
      title && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rich-content font-serif text-2xl leading-snug text-heading sm:text-3xl",
          dangerouslySetInnerHTML: { __html: title }
        }
      ),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rich-content mt-3 max-w-sm text-sm leading-relaxed text-ink/70",
          dangerouslySetInnerHTML: { __html: subtitle }
        }
      ),
      buttonText && data.buttonUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        xe,
        {
          href: data.buttonUrl,
          className: "group mt-7 inline-flex w-fit items-center gap-2 rounded-md bg-maha-800 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: buttonText }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1" })
          ]
        }
      )
    ] }),
    hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] w-full md:aspect-auto md:min-h-[220px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
function Offers({ hero, branches, note, closing, sectionVisibility }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { mainClassName: "bg-[#f5f2ed]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Se, { title: "Ưu đãi" }),
    sectionVisibility.hero && /* @__PURE__ */ jsxRuntimeExports.jsx(OfferHero, { data: hero }),
    sectionVisibility.branches && /* @__PURE__ */ jsxRuntimeExports.jsx(OfferBranches, { data: branches }),
    sectionVisibility.note && /* @__PURE__ */ jsxRuntimeExports.jsx(OfferNote, { data: note }),
    sectionVisibility.closing && /* @__PURE__ */ jsxRuntimeExports.jsx(OfferClosing, { data: closing })
  ] });
}
export {
  Offers as default
};
