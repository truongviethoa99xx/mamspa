import { j as jsxRuntimeExports, r as reactExports, x as xe, X, S as Se } from "../ssr.js";
import { c as Phone, P as PublicLayout } from "./PublicLayout-B-Xc3wLI.js";
import { a as createLucideIcon, u as useLocale, t as tr, s as stripTags, c as cn } from "./useLocale-NX8WGOIg.js";
import { u as useReveal } from "./useReveal-DiGU7tCR.js";
import { S as Star } from "./star-ZYEvNRbV.js";
import { G as GraduationCap } from "./graduation-cap-D4VE57hJ.js";
import { F as Flower2, D as Droplet } from "./flower-2-CqwbaFmK.js";
import { S as Sparkles } from "./sparkles-DYaJ_dq4.js";
import { H as HeartHandshake } from "./heart-handshake-B2I5iEgG.js";
import { H as Heart } from "./heart-BoR077F8.js";
import { L as Leaf } from "./leaf-CPhqkXQK.js";
import { S as SectionHeading } from "./SectionHeading-BIejgZ9S.js";
import { A as ArrowRight } from "./arrow-right-BuUR75f-.js";
import { I as Instagram } from "./instagram-B31VQ2Ae.js";
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
const ArrowDown = createLucideIcon("ArrowDown", [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
]);
/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Globe = createLucideIcon("Globe", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
]);
/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Shield = createLucideIcon("Shield", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
]);
function CustomerExperienceHero({ data }) {
  const locale = useLocale();
  const heading = tr(data.heading, locale);
  const subtitle = tr(data.subtitle, locale);
  const imageAlt = tr(data.image_alt, locale);
  const hasImage = !!data.image;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: cn(
        "relative isolate overflow-hidden pt-20 sm:min-h-[460px] sm:pt-24",
        hasImage ? "bg-[#efe8da]" : "bg-maha-200"
      ),
      children: [
        hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: data.image ?? void 0,
            alt: imageAlt || stripTags(heading),
            className: "relative z-0 h-56 w-full object-cover sm:absolute sm:inset-y-0 sm:right-0 sm:h-full sm:w-[64%]"
          }
        ),
        hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 z-0 hidden sm:block",
            style: {
              background: "linear-gradient(90deg, #efe8da 0%, #efe8da 36%, rgba(239,232,218,.6) 48%, rgba(239,232,218,0) 62%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 px-5 py-8 sm:py-14 sm:px-10 lg:px-[60px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md", children: [
          heading && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rich-content font-serif text-4xl uppercase leading-[1.1] tracking-tight text-heading sm:text-5xl",
              dangerouslySetInnerHTML: { __html: heading }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 h-px w-12 bg-heading/30" }),
          subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rich-content mt-5 max-w-sm text-base leading-relaxed text-ink/80",
              dangerouslySetInnerHTML: { __html: subtitle }
            }
          )
        ] }) })
      ]
    }
  );
}
const CUSTOMER_EXPERIENCE_ICON_MAP = {
  leaf: Leaf,
  heart: Heart,
  "heart-hands": HeartHandshake,
  globe: Globe,
  sparkles: Sparkles,
  shield: Shield,
  droplet: Droplet,
  flower: Flower2,
  "graduation-cap": GraduationCap,
  star: Star
};
function StatsStrip({ data }) {
  const locale = useLocale();
  const items = data.items ?? [];
  const { ref, className } = useReveal();
  if (!items.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: cn(className, "bg-[#f5f2ed] px-5 py-8 sm:px-10 lg:px-[60px]"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-y-8 sm:grid-cols-4", children: items.map((item, index) => {
    const Icon = CUSTOMER_EXPERIENCE_ICON_MAP[item.icon ?? ""] ?? Leaf;
    const description = tr(item.description, locale);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "flex items-center gap-4 px-4 first:pl-0",
          index > 0 && "sm:border-l sm:border-heading/15"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-9 w-9 shrink-0 text-heading/70", strokeWidth: 1.3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            item.value && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-2xl leading-tight text-heading", children: item.value }),
            description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs leading-snug text-ink/60 sm:text-sm", children: description })
          ] })
        ]
      },
      index
    );
  }) }) });
}
const CATEGORY_TABS = [
  { key: "all", label: { vi: "Tất cả", en: "All" } },
  { key: "massage-therapy", label: { vi: "Massage Therapy", en: "Massage Therapy" } },
  { key: "head-spa", label: { vi: "Head Spa", en: "Head Spa" } },
  { key: "facial-care", label: { vi: "Facial Care", en: "Facial Care" } },
  { key: "signature-rituals", label: { vi: "Signature Rituals", en: "Signature Rituals" } },
  { key: "khac", label: { vi: "Khác", en: "Other" } }
];
function ExperienceGallery({ data }) {
  var _a, _b, _c;
  const locale = useLocale();
  const title = tr(data.title, locale);
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const items = data.items ?? [];
  const filteredItems = reactExports.useMemo(
    () => activeTab === "all" ? items : items.filter((item) => item.category_tag === activeTab),
    [items, activeTab]
  );
  const featuredTitle = tr((_a = data.featuredStat) == null ? void 0 : _a.title, locale);
  const featuredDescription = tr((_b = data.featuredStat) == null ? void 0 : _b.description, locale);
  const showFeaturedCard = activeTab === "all" && !!(featuredTitle || featuredDescription);
  const featuredIndex = Math.max(0, Math.min((((_c = data.featuredStat) == null ? void 0 : _c.position) ?? 1) - 1, filteredItems.length));
  const { ref, className } = useReveal();
  if (!items.length) return null;
  const tiles = filteredItems.map((item, index) => {
    const alt = tr(item.image_alt, locale);
    return {
      key: `image-${index}`,
      node: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden rounded-[3px] bg-maha-200", children: item.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: item.image,
          alt,
          loading: "lazy",
          className: "h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        }
      ) })
    };
  });
  if (showFeaturedCard) {
    tiles.splice(featuredIndex, 0, {
      key: "featured-stat",
      node: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-[3px] bg-[#2F3E2E] px-4 py-5 text-center text-white", children: [
        featuredTitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rich-content font-serif text-lg uppercase leading-snug tracking-wide",
            dangerouslySetInnerHTML: { __html: featuredTitle }
          }
        ),
        featuredDescription && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rich-content text-xs leading-relaxed text-white/75",
            dangerouslySetInnerHTML: { __html: featuredDescription }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "mt-1 h-4 w-4 text-white/50", strokeWidth: 1.5 })
      ] })
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: cn(className, "mt-[50px] bg-[#f5f2ed] px-5 sm:px-10 lg:px-[60px]"), children: [
    title && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-center font-serif text-2xl uppercase tracking-wide text-heading sm:text-3xl", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex flex-wrap justify-center gap-2", children: CATEGORY_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(tab.key),
        className: cn(
          "rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors sm:text-sm",
          activeTab === tab.key ? "bg-[#2F3E2E] text-white" : "bg-transparent text-ink/70 hover:bg-maha-100"
        ),
        children: tr(tab.label, locale)
      },
      tab.key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5", children: tiles.map((tile) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: tile.node }, tile.key)) })
  ] });
}
function Stars({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", "aria-label": `${rating}/5 sao`, children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: cn("h-3.5 w-3.5", i < rating ? "fill-heading text-heading" : "text-maha-300") }, i)) });
}
function ExperienceTestimonials({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const intro = tr(data.intro, locale);
  const items = data.items ?? [];
  const trackRef = reactExports.useRef(null);
  const { ref, className } = useReveal();
  if (!items.length) return null;
  const scrollNext = () => {
    var _a;
    (_a = trackRef.current) == null ? void 0 : _a.scrollBy({ left: trackRef.current.clientWidth * 0.4, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: cn(className, "mt-[50px] bg-[#f5f2ed] px-5 py-12 sm:px-10 lg:px-[60px]"), children: [
    (title || intro) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 max-w-2xl", children: [
      title && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { heading: title }),
      intro && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rich-content mt-3 text-base leading-relaxed text-ink/80",
          dangerouslySetInnerHTML: { __html: intro }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: trackRef,
          className: "flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          children: items.map((item, index) => {
            const quote = tr(item.quote, locale);
            const meta = tr(item.author_meta, locale);
            const rating = Number(item.rating ?? 0);
            const isLead = index === 0;
            const content = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              quote && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "blockquote",
                {
                  className: cn(
                    "rich-content leading-relaxed text-ink/80",
                    isLead ? "text-lg" : "mt-4 text-sm"
                  ),
                  dangerouslySetInnerHTML: { __html: quote }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-4 text-sm font-semibold text-heading", children: [
                item.author_name,
                meta && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 font-normal text-ink/60", children: [
                  "(",
                  stripTags(meta),
                  ")"
                ] })
              ] })
            ] });
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "figure",
              {
                className: cn(
                  "shrink-0 snap-start rounded-[4px] border border-maha-200 bg-maha-50 p-6",
                  isLead ? "flex w-[85%] gap-4 sm:w-[36%]" : "w-[75%] sm:w-[20%]"
                ),
                children: isLead ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "shrink-0 font-serif text-5xl leading-[0.8] text-heading/60",
                      "aria-hidden": "true",
                      children: "“"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: content })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  rating > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { rating }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-3xl leading-[0.8] text-heading/60", "aria-hidden": "true", children: "“" }),
                  content
                ] })
              },
              index
            );
          })
        }
      ),
      items.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: scrollNext,
          "aria-label": "Xem thêm đánh giá",
          className: "absolute -right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-heading/20 bg-white text-heading shadow-sm transition-colors hover:bg-maha-100 sm:flex",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        }
      )
    ] })
  ] });
}
function WhyGuestsReturn({ data }) {
  var _a, _b;
  const locale = useLocale();
  const title = tr(data.title, locale);
  const features = data.features ?? [];
  const card = data.card;
  const cardTitle = tr(card == null ? void 0 : card.title, locale);
  const cardDescription = tr(card == null ? void 0 : card.description, locale);
  const cardButtonText = tr(card == null ? void 0 : card.buttonText, locale);
  const { ref, className } = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: cn(className, "mt-[50px] bg-[#f5f2ed] px-5 sm:px-10 lg:px-[60px]"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 lg:grid-cols-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[4px] border border-heading/15 bg-maha-100/60 p-6 sm:p-8 lg:col-span-8", children: [
      title && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { heading: title }),
      !!features.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4", children: features.map((feature, index) => {
        const Icon = CUSTOMER_EXPERIENCE_ICON_MAP[feature.icon ?? ""] ?? Leaf;
        const featureTitle = tr(feature.title, locale);
        const featureDescription = tr(feature.description, locale);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-8 w-8 text-heading/70", strokeWidth: 1.3 }),
          featureTitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-heading", children: featureTitle }),
          featureDescription && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rich-content text-xs leading-relaxed text-ink/60",
              dangerouslySetInnerHTML: { __html: featureDescription }
            }
          )
        ] }, index);
      }) })
    ] }),
    (cardTitle || cardDescription) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[4px] bg-[#2F3E2E] p-6 text-white", children: [
      cardTitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-lg leading-snug", children: cardTitle }),
      cardDescription && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rich-content mt-2 text-sm leading-relaxed text-white/80",
          dangerouslySetInnerHTML: { __html: cardDescription }
        }
      ),
      (!!((_a = card.avatars) == null ? void 0 : _a.length) || card.statText) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-3", children: (_b = card.avatars) == null ? void 0 : _b.map((avatar, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: avatar.image ?? void 0,
            alt: avatar.alt ?? "",
            className: "h-9 w-9 rounded-full border-2 border-[#2F3E2E] object-cover",
            loading: "lazy"
          },
          index
        )) }),
        card.statText && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-3 text-sm font-semibold text-white/90", children: card.statText })
      ] }),
      cardButtonText && card.buttonUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        xe,
        {
          href: card.buttonUrl,
          className: "mt-6 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-heading transition-opacity hover:opacity-90",
          children: cardButtonText
        }
      )
    ] }) })
  ] }) });
}
function InstagramStrip({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const description = tr(data.description, locale);
  const items = data.items ?? [];
  const { ref, className } = useReveal();
  if (!items.length && !data.handle) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: cn(className, "mt-[50px] bg-[#f5f2ed] px-5 pb-4 sm:px-10 lg:px-[60px]"), children: [
    title && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 font-serif text-lg uppercase tracking-wide text-heading", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: [
      items.map((item, index) => {
        const alt = tr(item.image_alt, locale);
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square w-28 shrink-0 overflow-hidden rounded-[3px] bg-maha-200 sm:w-36", children: item.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: item.image,
            alt,
            loading: "lazy",
            className: "h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          }
        ) }, index);
      }),
      data.handle && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: data.url || void 0,
          target: "_blank",
          rel: "noreferrer",
          className: "flex aspect-square w-28 shrink-0 flex-col justify-center gap-1.5 rounded-[3px] bg-[#2F3E2E] p-4 text-white transition-opacity hover:opacity-90 sm:w-36",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-5 w-5", strokeWidth: 1.3 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: data.handle }),
            description && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "rich-content text-xs leading-snug text-white/70",
                dangerouslySetInnerHTML: { __html: description }
              }
            )
          ]
        }
      )
    ] })
  ] });
}
function ExperienceClosingCta({ data }) {
  var _a;
  const locale = useLocale();
  const { props } = X();
  const title = tr(data.title, locale);
  const imageAlt = tr(data.image_alt, locale);
  const buttonText = tr(data.buttonText, locale);
  const hotline = (_a = props.site) == null ? void 0 : _a.hotline;
  const hasImage = !!data.image;
  const { ref, className } = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref,
      className: cn(className, "relative isolate mt-[50px] overflow-hidden bg-[#2F3E2E] px-5 py-10 sm:px-10 lg:px-[60px]"),
      children: [
        hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: data.image ?? void 0,
            alt: imageAlt,
            className: "absolute inset-0 z-0 h-full w-full object-cover",
            loading: "lazy"
          }
        ),
        hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 z-0",
            style: {
              background: "linear-gradient(90deg, #2F3E2E 0%, #2F3E2E 62%, rgba(47,62,46,.75) 74%, rgba(47,62,46,0) 92%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center", children: [
          title && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rich-content max-w-lg font-serif text-2xl leading-snug text-white sm:text-3xl",
              dangerouslySetInnerHTML: { __html: title }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 flex-col items-start gap-4 sm:flex-row sm:items-center", children: [
            buttonText && data.buttonUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
              xe,
              {
                href: data.buttonUrl,
                className: "inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-heading transition-opacity hover:opacity-90",
                children: buttonText
              }
            ),
            hotline && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${hotline.replace(/\s+/g, "")}`, className: "flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4", strokeWidth: 1.5 }),
              hotline
            ] })
          ] })
        ] })
      ]
    }
  );
}
function CustomerExperience({ hero, stats, gallery, testimonials, reasons, instagram, closing, sectionVisibility }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { mainClassName: "bg-[#f5f2ed]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Se, { title: "Customer Experience" }),
    sectionVisibility.hero && /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerExperienceHero, { data: hero }),
    sectionVisibility.stats && /* @__PURE__ */ jsxRuntimeExports.jsx(StatsStrip, { data: stats }),
    sectionVisibility.gallery && /* @__PURE__ */ jsxRuntimeExports.jsx(ExperienceGallery, { data: gallery }),
    sectionVisibility.testimonials && /* @__PURE__ */ jsxRuntimeExports.jsx(ExperienceTestimonials, { data: testimonials }),
    sectionVisibility.reasons && /* @__PURE__ */ jsxRuntimeExports.jsx(WhyGuestsReturn, { data: reasons }),
    sectionVisibility.instagram && /* @__PURE__ */ jsxRuntimeExports.jsx(InstagramStrip, { data: instagram }),
    sectionVisibility.closing && /* @__PURE__ */ jsxRuntimeExports.jsx(ExperienceClosingCta, { data: closing })
  ] });
}
export {
  CustomerExperience as default
};
