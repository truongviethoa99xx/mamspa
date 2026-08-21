import { j as jsxRuntimeExports, x as xe, r as reactExports, X, S as Se } from "../ssr.js";
import { P as PublicLayout } from "./PublicLayout-Bx-nt6O1.js";
import { H as Hero } from "./Hero-6EBq01_J.js";
import { a as createLucideIcon, u as useLocale, t as tr, c as cn, s as stripTags } from "./useLocale-NX8WGOIg.js";
import { u as useReveal, a as useReducedMotion } from "./useReveal-DiGU7tCR.js";
import { A as ArrowRight } from "./arrow-right-BuUR75f-.js";
import { S as Star } from "./star-ZYEvNRbV.js";
import { D as Droplet, F as Flower2 } from "./flower-2-CqwbaFmK.js";
import { a as Sun, S as Sprout } from "./sun-CuSyBsy5.js";
import { S as Sparkles } from "./sparkles-DYaJ_dq4.js";
import { S as ShieldCheck } from "./shield-check-CoBFVw63.js";
import { G as GraduationCap } from "./graduation-cap-D4VE57hJ.js";
import { U as Users } from "./users-7TJ5mtaC.js";
import { H as Heart } from "./heart-BoR077F8.js";
import { H as HeartHandshake } from "./heart-handshake-B2I5iEgG.js";
import { L as Leaf } from "./leaf-CPhqkXQK.js";
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
const Play = createLucideIcon("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
function Story({ data }) {
  var _a;
  const locale = useLocale();
  const heading = tr(data.heading, locale);
  const caption = tr(data.caption, locale);
  const ctaText = tr((_a = data.cta) == null ? void 0 : _a.text, locale);
  const imageAlt = tr(data.image_alt, locale);
  const { ref, className } = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref,
      className: cn(className, "relative isolate h-[calc(85vh/1.5)] overflow-hidden bg-[#ece1db] sm:h-[50vh]"),
      children: [
        data.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: data.image,
            alt: imageAlt,
            className: "absolute inset-0 z-0 h-full w-full object-cover",
            loading: "lazy",
            decoding: "async"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex h-full w-full flex-col justify-center px-5 py-10 sm:px-10 md:w-1/2 md:px-12 lg:w-1/3 lg:px-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 -z-10",
              style: {
                background: "linear-gradient(90deg, rgba(236,225,219,0.97) 0%, rgba(236,225,219,0.9) 55%, rgba(236,225,219,0) 100%)"
              }
            }
          ),
          heading && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rich-content font-serif text-xs uppercase tracking-[0.15em] text-subheading",
              dangerouslySetInnerHTML: { __html: heading }
            }
          ),
          caption && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rich-content mt-5 font-serif text-xl leading-relaxed text-ink sm:text-2xl md:mt-8",
              dangerouslySetInnerHTML: { __html: caption }
            }
          ),
          ctaText && data.cta && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            xe,
            {
              href: data.cta.link || "#",
              className: "group mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide md:mt-10",
              style: { color: data.cta.text_color },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ctaText }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Philosophy({ data }) {
  const locale = useLocale();
  const eyebrow = tr(data.eyebrow, locale);
  const quote = tr(data.quote, locale);
  const { ref, className } = useReveal();
  if (!eyebrow && !quote) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: cn(className, "bg-maha-50 px-5 pb-4 pt-12 sm:pb-5 sm:pt-14 lg:pb-6 lg:pt-16"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
    eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rich-content font-serif text-xs uppercase tracking-[0.2em] text-subheading",
        dangerouslySetInnerHTML: { __html: eyebrow }
      }
    ),
    quote && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rich-content mt-6 font-serif text-2xl leading-relaxed text-heading sm:text-3xl md:text-4xl",
        dangerouslySetInnerHTML: { __html: quote }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-9 h-[3px] w-16 bg-heading" })
  ] }) });
}
function FeaturedServices({ data }) {
  var _a;
  const locale = useLocale();
  const heading = tr(data.heading, locale);
  const title = tr(data.title, locale);
  const { ref, className } = useReveal();
  const tabRefs = reactExports.useRef([]);
  const [activeIndex, setActiveIndex] = reactExports.useState(0);
  if (!((_a = data.services) == null ? void 0 : _a.length)) {
    return null;
  }
  const selectTab = (index) => {
    var _a2;
    setActiveIndex(index);
    (_a2 = tabRefs.current[index]) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };
  const renderCard = (service) => {
    var _a2;
    const name = tr(service.name, locale);
    const description = tr(service.description, locale);
    const imageAlt = tr(service.thumbnail_alt, locale);
    const image = (_a2 = service.images) == null ? void 0 : _a2[0];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(xe, { href: service.url, className: "group flex h-full flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] shrink-0 overflow-hidden rounded-t-[4px] bg-maha-200", children: image && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: image,
          alt: imageAlt || stripTags(name),
          className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
          loading: "lazy",
          decoding: "async"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col rounded-b-[4px] bg-[#f4eae1] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h3",
          {
            className: "rich-content featured-service-title font-serif text-xl leading-snug text-heading",
            dangerouslySetInnerHTML: { __html: name }
          }
        ),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rich-content mt-2 text-sm leading-relaxed text-ink/70",
            dangerouslySetInnerHTML: { __html: description }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-5 inline-flex w-fit items-center gap-2 self-start rounded-md bg-heading px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-opacity group-hover:opacity-90", children: [
          "Xem thêm",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
        ] })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref,
      className: cn(className, "bg-maha-50 px-5 pb-8 pt-4 sm:px-10 sm:pb-8 sm:pt-6 lg:px-16 lg:pb-8 lg:pt-8"),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
        heading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rich-content text-center font-serif text-3xl font-semibold text-heading sm:text-4xl",
            dangerouslySetInnerHTML: { __html: heading }
          }
        ),
        title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 font-serif text-xs uppercase tracking-[0.2em] text-subheading", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "scrollbar-hide -mx-5 mt-6 flex gap-2 overflow-x-auto scroll-smooth px-5 pb-1 lg:hidden", children: data.services.map((service, index) => {
          const label = stripTags(tr(service.name, locale));
          const active = index === activeIndex;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              ref: (node) => {
                tabRefs.current[index] = node;
              },
              type: "button",
              onClick: () => selectTab(index),
              "aria-current": active,
              className: cn(
                "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active ? "border-heading bg-heading text-white" : "border-maha-300 bg-white text-heading/70 hover:border-heading/50"
              ),
              children: label
            },
            service.id
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 lg:hidden", children: renderCard(data.services[activeIndex]) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 hidden lg:grid lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10", children: data.services.map((service) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full", children: renderCard(service) }, service.id)) })
      ] })
    }
  );
}
function ArtBanner({ data }) {
  var _a;
  const locale = useLocale();
  const eyebrow = tr(data.eyebrow, locale);
  const body = tr(data.body, locale);
  const ctaText = tr((_a = data.cta) == null ? void 0 : _a.text, locale);
  const imageAlt = tr(data.image_alt, locale);
  const imageMobile = data.image_mobile;
  const { ref, className } = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: cn(className, "bg-maha-50"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[4/3] bg-maha-200 md:aspect-auto", children: data.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: data.image,
        srcSet: imageMobile ? `${imageMobile} 900w, ${data.image} 1600w` : void 0,
        sizes: imageMobile ? "(min-width: 768px) 50vw, 100vw" : void 0,
        alt: imageAlt,
        className: "absolute inset-0 h-full w-full object-cover",
        loading: "lazy",
        decoding: "async"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center bg-[#f4eae1] px-6 py-10 sm:px-10 sm:py-12 lg:px-16", children: [
      eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rich-content font-serif text-xs uppercase tracking-[0.2em] text-subheading",
          dangerouslySetInnerHTML: { __html: eyebrow }
        }
      ),
      body && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rich-content mt-5 font-serif text-lg leading-relaxed text-heading sm:text-xl",
          dangerouslySetInnerHTML: { __html: body }
        }
      ),
      ctaText && data.cta && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        xe,
        {
          href: data.cta.link || "#",
          className: "group mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-wide",
          style: { color: data.cta.text_color },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ctaText }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
          ]
        }
      )
    ] })
  ] }) });
}
function Spaces({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const items = data.items ?? [];
  const isOdd = items.length % 2 === 1;
  const { ref, className } = useReveal();
  if (!items.length) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref,
      className: cn(className, "bg-maha-50 px-5 pb-4 pt-4 sm:px-10 sm:pb-6 sm:pt-6 lg:px-16 lg:pb-8 lg:pt-8"),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
        title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-xs uppercase tracking-[0.2em] text-subheading", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 grid grid-cols-1 gap-6 sm:grid-cols-2", children: items.map((item, index) => {
          const itemTitle = tr(item.title, locale);
          const imageAlt = tr(item.image_alt, locale) || itemTitle.replace(/<[^>]+>/g, "");
          const description = tr(item.description, locale);
          const linkText = tr(item.link_text, locale);
          const isLastOdd = isOdd && index === items.length - 1;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            xe,
            {
              href: item.link_url || "#",
              className: cn(
                "group relative isolate block h-[230px] overflow-hidden rounded-[4px] bg-maha-200 sm:h-[260px]",
                isLastOdd && "sm:col-span-2"
              ),
              children: [
                item.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: item.image,
                    srcSet: item.image_mobile ? `${item.image_mobile} 750w, ${item.image} 1280w` : void 0,
                    sizes: item.image_mobile ? "(min-width: 640px) 50vw, 100vw" : void 0,
                    alt: imageAlt,
                    className: "absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                    loading: "lazy",
                    decoding: "async"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex h-full w-full flex-col justify-center px-6 py-8 sm:w-3/5 sm:px-8 lg:w-1/2 lg:px-10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute inset-0 -z-10",
                      style: {
                        background: "linear-gradient(90deg, rgba(236,225,219,0.97) 0%, rgba(236,225,219,0.9) 55%, rgba(236,225,219,0) 100%)"
                      }
                    }
                  ),
                  itemTitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "rich-content font-serif text-xl leading-snug text-heading",
                      dangerouslySetInnerHTML: { __html: itemTitle }
                    }
                  ),
                  description && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "rich-content mt-2 text-sm leading-relaxed text-ink/70",
                      dangerouslySetInnerHTML: { __html: description }
                    }
                  ),
                  linkText && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-4 inline-flex w-fit items-center gap-2 text-sm font-medium text-heading", children: [
                    linkText,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
                  ] })
                ] })
              ]
            },
            index
          );
        }) })
      ] })
    }
  );
}
const ICONS = {
  Leaf,
  Sprout,
  Flower2,
  HeartHandshake,
  Heart,
  Users,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Sun,
  Droplet,
  Star
};
function WhyUs({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const items = data.items ?? [];
  const { ref, className } = useReveal();
  if (!items.length) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref,
      className: cn(className, "bg-maha-50 px-5 pt-4 sm:px-10 sm:pt-6 lg:px-16 lg:pt-8"),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
        title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-xs uppercase tracking-[0.2em] text-subheading", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-2 divide-y divide-maha-200 sm:mt-12 sm:grid-cols-3 sm:divide-y-0 lg:grid-cols-5", children: items.map((item, index) => {
          const Icon = item.icon && ICONS[item.icon] || Leaf;
          const itemTitle = tr(item.title, locale);
          const description = tr(item.description, locale);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center border-maha-200 px-4 py-6 text-center sm:border-l sm:first:border-l-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-9 w-9 text-subheading", strokeWidth: 1.25 }),
                itemTitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "rich-content mt-4 min-h-[4.125rem] font-serif text-base leading-snug text-heading",
                    dangerouslySetInnerHTML: { __html: itemTitle }
                  }
                ),
                description && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "rich-content mt-2 text-xs leading-relaxed text-ink/70",
                    dangerouslySetInnerHTML: { __html: description }
                  }
                )
              ]
            },
            index
          );
        }) })
      ] })
    }
  );
}
const QUOTE_ROTATE_INTERVAL_MS = 6e3;
const QUOTE_FADE_DURATION_MS = 300;
function Stars({ count, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex items-center gap-0.5", className), children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      className: cn("h-3.5 w-3.5", i < Math.round(count) ? "fill-amber-400 text-amber-400" : "text-maha-300")
    },
    i
  )) });
}
function QuoteCarousel({ quotes, ctaLink }) {
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = reactExports.useState(0);
  const [isVisible, setIsVisible] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (quotes.length <= 1) return;
    const timer = setInterval(() => {
      if (prefersReducedMotion) {
        setActiveIndex((current) => (current + 1) % quotes.length);
        return;
      }
      setIsVisible(false);
      setTimeout(() => {
        setActiveIndex((current) => (current + 1) % quotes.length);
        setIsVisible(true);
      }, QUOTE_FADE_DURATION_MS);
    }, QUOTE_ROTATE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [quotes.length, prefersReducedMotion]);
  const activeQuote = quotes[activeIndex];
  const quoteText = tr(activeQuote.content, locale);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(xe, { href: ctaLink, className: "flex flex-col justify-between rounded-[4px] bg-white/60 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "rich-content text-sm leading-relaxed text-ink/80 transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        ),
        dangerouslySetInnerHTML: { __html: quoteText }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { count: activeQuote.rating }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-3 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wide text-heading", children: [
        "Xem thêm đánh giá",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
      ] })
    ] })
  ] });
}
function EmbedFacade({ embedUrl, thumbnail }) {
  var _a;
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const youtubeId = (_a = embedUrl.match(/\/embed\/([\w-]{11})/)) == null ? void 0 : _a[1];
  const fallbackThumbnail = youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : null;
  const posterUrl = thumbnail ?? fallbackThumbnail;
  if (isPlaying) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "iframe",
      {
        src: `${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1`,
        title: "Video trải nghiệm khách hàng",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true,
        className: "h-full w-full"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => setIsPlaying(true),
      "aria-label": "Phát video trải nghiệm khách hàng",
      className: "group relative h-full min-h-[220px] w-full",
      children: [
        posterUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: posterUrl,
            alt: "Video trải nghiệm khách hàng",
            className: "absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105",
            loading: "lazy",
            decoding: "async"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-heading transition-transform group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-5 w-5 translate-x-0.5", fill: "currentColor" }) }) })
      ]
    }
  );
}
function Reviews({ data }) {
  const video = data.video;
  const hasVideo = !!video.url;
  const hasQuote = data.quotes.length > 0;
  const { ref, className } = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref,
      className: cn(className, "bg-maha-50 px-5 pb-4 pt-4 sm:px-10 sm:pb-6 sm:pt-6 lg:px-16 lg:pb-8 lg:pt-8"),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: data.google.link,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex flex-col justify-between rounded-[4px] bg-white/60 p-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif text-2xl font-semibold", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#4285F4]", children: "G" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#EA4335]", children: "o" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#FBBC05]", children: "o" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#4285F4]", children: "g" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#34A853]", children: "l" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#EA4335]", children: "e" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-serif text-3xl text-heading", children: data.google.rating }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { count: Number(data.google.rating), className: "mt-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-ink/60", children: [
                  "(",
                  data.google.count,
                  " reviews)"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-4 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wide text-heading", children: [
                "Xem trên Google",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: data.tripadvisor.link,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex flex-col justify-between rounded-[4px] bg-white/60 p-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-2xl font-semibold text-[#34E0A1]", children: "Tripadvisor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-serif text-3xl text-heading", children: data.tripadvisor.rating }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { count: Number(data.tripadvisor.rating), className: "mt-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-ink/60", children: [
                  "(",
                  data.tripadvisor.count,
                  " reviews)"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-4 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wide text-heading", children: [
                "Xem trên Tripadvisor",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
              ] })
            ]
          }
        ),
        hasQuote && /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteCarousel, { quotes: data.quotes, ctaLink: data.quote_cta_link }),
        hasVideo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative min-h-[220px] overflow-hidden rounded-[4px] bg-maha-800", children: video.type === "file" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            src: video.url ?? void 0,
            poster: video.thumbnail ?? void 0,
            controls: true,
            preload: "metadata",
            className: "h-full w-full object-cover"
          }
        ) : video.embed_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmbedFacade, { embedUrl: video.embed_url, thumbnail: video.thumbnail }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: video.url ?? "#",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "group flex h-full min-h-[220px] flex-col justify-end p-6 text-white",
            children: [
              video.thumbnail && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: video.thumbnail,
                  alt: "Video trải nghiệm khách hàng",
                  className: "absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105",
                  loading: "lazy",
                  decoding: "async"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-heading transition-transform group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-5 w-5 translate-x-0.5", fill: "currentColor" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative z-10 mt-4 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wide", children: [
                "Xem thêm video",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
              ] })
            ]
          }
        ) })
      ] })
    }
  );
}
function GalleryPreview({ data }) {
  var _a;
  const locale = useLocale();
  const { ref, className } = useReveal();
  if (!((_a = data.images) == null ? void 0 : _a.length)) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref,
      className: cn(className, "bg-maha-50 px-5 pb-16 pt-4 sm:px-10 sm:pb-20 sm:pt-6 lg:px-16 lg:pb-24 lg:pt-8"),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-xs uppercase tracking-[0.2em] text-subheading", children: "Gallery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex gap-3 overflow-x-auto pb-2 sm:mt-8 sm:gap-4", children: data.images.map((image, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square w-40 shrink-0 overflow-hidden rounded-[4px] bg-maha-200 sm:w-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: image.src,
            alt: tr(image.alt, locale) || "Không gian Mầm Spa",
            className: "h-full w-full object-cover",
            loading: "lazy",
            decoding: "async"
          }
        ) }, index)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          xe,
          {
            href: data.link,
            className: "group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-heading",
            children: [
              "Xem thêm hình ảnh",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1" })
            ]
          }
        ) })
      ] })
    }
  );
}
function BookingStrip({ data }) {
  const locale = useLocale();
  const heading = tr(data.heading, locale);
  const ctaText = tr(data.cta_text, locale);
  const { ref, className } = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: cn(className, "relative overflow-hidden bg-maha-800"), children: [
    data.image && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: data.image,
          alt: "",
          className: "absolute inset-0 h-full w-full object-cover",
          loading: "lazy",
          decoding: "async"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-maha-900/45" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto flex min-h-[100px] max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-10 lg:px-16", children: [
      heading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-xl italic text-maha-50 sm:text-2xl", children: heading }),
      ctaText && /* @__PURE__ */ jsxRuntimeExports.jsx(
        xe,
        {
          href: data.cta_link || "/dat-lich/",
          className: "shrink-0 rounded-full bg-maha-50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-heading transition-transform hover:-translate-y-0.5",
          children: ctaText
        }
      )
    ] })
  ] });
}
function Home({
  hero,
  story,
  philosophy,
  serviceListHeading,
  serviceListTitle,
  featuredServices,
  artBanner,
  spaces,
  whyUs,
  reviews,
  galleryPreview,
  finalCta,
  sectionVisibility
}) {
  var _a;
  const { props } = X();
  const description = ((_a = props.site) == null ? void 0 : _a.meta_description) || "Mầm Spa — spa trị liệu tại Hồ Chí Minh với 2 chi nhánh Lê Văn Sỹ và Lê Thị Riêng. Massage body, chăm sóc da mặt, head spa và các liệu trình chăm sóc sức khoẻ theo giá trị trị liệu Việt.";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Se, { title: "Trang chủ", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: description }),
      hero.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "link",
        {
          rel: "preload",
          as: "image",
          href: hero.image,
          imageSrcSet: hero.image_mobile ? `${hero.image_mobile} 1280w, ${hero.image} 1920w` : void 0,
          imageSizes: hero.image_mobile ? "100vw" : void 0,
          fetchPriority: "high"
        }
      )
    ] }),
    sectionVisibility.hero && /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, { data: hero }),
    sectionVisibility.story && /* @__PURE__ */ jsxRuntimeExports.jsx(Story, { data: story }),
    sectionVisibility.philosophy && /* @__PURE__ */ jsxRuntimeExports.jsx(Philosophy, { data: philosophy }),
    sectionVisibility.featuredServices && /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedServices, { data: { heading: serviceListHeading, title: serviceListTitle, services: featuredServices } }),
    sectionVisibility.artBanner && /* @__PURE__ */ jsxRuntimeExports.jsx(ArtBanner, { data: artBanner }),
    sectionVisibility.spaces && /* @__PURE__ */ jsxRuntimeExports.jsx(Spaces, { data: spaces }),
    sectionVisibility.whyUs && /* @__PURE__ */ jsxRuntimeExports.jsx(WhyUs, { data: whyUs }),
    sectionVisibility.reviews && /* @__PURE__ */ jsxRuntimeExports.jsx(Reviews, { data: reviews }),
    sectionVisibility.gallery && /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryPreview, { data: galleryPreview }),
    sectionVisibility.finalCta && /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStrip, { data: finalCta })
  ] });
}
export {
  Home as default
};
