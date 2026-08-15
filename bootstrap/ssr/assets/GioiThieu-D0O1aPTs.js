import { j as jsxRuntimeExports, x as xe, r as reactExports, S as Se } from "../ssr.js";
import { P as PublicLayout } from "./PublicLayout-QlQ_GdpY.js";
import { H as Hero } from "./Hero-6EBq01_J.js";
import { u as useLocale, t as tr, c as cn, s as stripTags$4 } from "./useLocale-NX8WGOIg.js";
import { u as useReveal } from "./useReveal-DiGU7tCR.js";
import { S as SectionHeading } from "./SectionHeading-BIejgZ9S.js";
import { L as Leaf } from "./leaf-CPhqkXQK.js";
import { D as Droplet, F as Flower2 } from "./flower-2-CqwbaFmK.js";
import { S as Sparkles } from "./sparkles-DYaJ_dq4.js";
import { G as GraduationCap } from "./graduation-cap-D4VE57hJ.js";
import { H as HeartHandshake } from "./heart-handshake-B2I5iEgG.js";
import { A as ArrowRight } from "./arrow-right-BuUR75f-.js";
import { Q as Quote } from "./quote-Kcs8vWNG.js";
import { S as Star } from "./star-ZYEvNRbV.js";
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
const stripTags$3 = (html) => html.replace(/<[^>]+>/g, "");
function AboutStory({ data }) {
  const locale = useLocale();
  const heading = tr(data.heading, locale);
  const body = tr(data.body, locale);
  const imageAlt = tr(data.image_alt, locale);
  const hasImage = !!data.image;
  const { ref, className } = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref,
      className: cn(className, "mt-[50px] bg-[#f5f2ed] px-5 py-12 sm:px-10 lg:h-[360px] lg:px-[60px] lg:py-0"),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 lg:h-full lg:grid-cols-[4fr_6fr] lg:items-stretch lg:gap-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:flex lg:flex-col lg:justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { heading }),
          body && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rich-content mt-6 max-w-md space-y-4 text-base leading-relaxed text-ink/80",
              dangerouslySetInnerHTML: { __html: body }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "aspect-[4/3] w-full overflow-hidden rounded-sm lg:aspect-auto lg:h-full",
              !hasImage && "bg-maha-200"
            ),
            children: hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: data.image ?? void 0,
                alt: imageAlt || stripTags$3(heading),
                className: "h-full w-full object-cover",
                loading: "lazy"
              }
            )
          }
        )
      ] })
    }
  );
}
const STEM_PATH = "M132,8 C108,120 152,215 118,335 C96,415 128,468 108,508";
const LEAVES = [
  { x: 120, y: 42, angle: -50, length: 68, width: 30 },
  { x: 130, y: 58, angle: 48, length: 88, width: 36 },
  { x: 106, y: 102, angle: -68, length: 100, width: 40 },
  { x: 140, y: 132, angle: 58, length: 108, width: 42 },
  { x: 116, y: 192, angle: -74, length: 92, width: 36 },
  { x: 130, y: 232, angle: 62, length: 82, width: 33 },
  { x: 110, y: 302, angle: -58, length: 68, width: 27 },
  { x: 122, y: 362, angle: 52, length: 58, width: 23 },
  { x: 108, y: 432, angle: -48, length: 48, width: 19 }
];
function leafPath(length, width) {
  const half = width / 2;
  const bulge = length * 0.42;
  return `M0,0 Q${half},-${bulge} 0,-${length} Q-${half},-${bulge} 0,0 Z`;
}
function LeafBranch({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 260 520", className, fill: "none", stroke: "currentColor", strokeWidth: 1, "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: STEM_PATH }),
    LEAVES.map((leaf, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: `translate(${leaf.x},${leaf.y}) rotate(${leaf.angle})`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: leafPath(leaf.length, leaf.width) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: 0, y1: 0, x2: 0, y2: -leaf.length })
    ] }, index))
  ] });
}
function AboutPhilosophy({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const body = tr(data.body, locale);
  const imageAlt = tr(data.image_alt, locale);
  const { ref, className } = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref,
      className: cn(
        className,
        "relative isolate mt-[50px] overflow-hidden rounded-3xl bg-[#f5f2ed] px-5 py-12 sm:px-10 lg:px-[60px]"
      ),
      children: [
        data.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: data.image,
            alt: imageAlt,
            "aria-hidden": imageAlt ? void 0 : "true",
            className: "absolute inset-0 -z-10 h-full w-full object-cover",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 lg:grid-cols-3 lg:gap-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { label: tr(data.heading, locale), heading: title, size: "lg" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "mb-4 h-8 w-8 text-maha-300", strokeWidth: 1.25, "aria-hidden": "true" }),
            body && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "rich-content space-y-4 text-base leading-relaxed text-ink/80",
                dangerouslySetInnerHTML: { __html: body }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative hidden lg:block", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeafBranch, { className: "pointer-events-none absolute inset-0 h-full w-full text-[#C2A274]/60" }) })
        ] })
      ]
    }
  );
}
function AboutHealingJourneys({ data }) {
  var _a;
  const locale = useLocale();
  const eyebrow = tr(data.eyebrow, locale);
  const { ref, className } = useReveal();
  if (!((_a = data.items) == null ? void 0 : _a.length)) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: cn(className, "mt-[50px] bg-[#f5f2ed] px-5 sm:px-10 lg:px-[60px]"), children: [
    eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-center font-serif text-xs uppercase tracking-[0.25em] text-subheading sm:text-left", children: eyebrow }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4", children: data.items.map((item, index) => {
      const title = tr(item.title, locale);
      const description = tr(item.description, locale);
      const imageAlt = tr(item.image_alt, locale);
      const hasImage = !!item.image;
      const body = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] shrink-0 overflow-hidden rounded-t-[4px] bg-maha-200", children: hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: item.image ?? void 0,
            alt: imageAlt || stripTags$4(title),
            className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
            loading: "lazy"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col rounded-b-[4px] bg-[#f4eae1] p-5", children: [
          title && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "rich-content featured-service-title font-serif text-xl leading-snug text-heading",
              dangerouslySetInnerHTML: { __html: title }
            }
          ),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rich-content mt-2 text-sm leading-relaxed text-ink/70",
              dangerouslySetInnerHTML: { __html: description }
            }
          )
        ] })
      ] });
      if (item.url) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(xe, { href: item.url, className: "group flex h-full flex-col", children: body }, index);
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "group flex h-full flex-col", children: body }, index);
    }) })
  ] });
}
const ICON_MAP = {
  "heart-hands": HeartHandshake,
  leaf: Leaf,
  "graduation-cap": GraduationCap,
  flower: Flower2,
  sparkles: Sparkles,
  droplet: Droplet
};
function AboutApproach({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const p1 = tr(data.p1, locale);
  const imageAlt = tr(data.image_alt, locale);
  const hasImage = !!data.image;
  const features = data.features ?? [];
  const { ref, className } = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: cn(className, "mt-[50px] bg-[#f5f2ed] px-5 sm:px-10 lg:px-[60px]"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-10 lg:grid-cols-2 lg:gap-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "aspect-[4/3] overflow-hidden rounded-sm lg:aspect-[5/4]",
          !hasImage && "bg-maha-200"
        ),
        children: hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: data.image ?? void 0,
            alt: imageAlt || stripTags$4(title),
            className: "h-full w-full object-cover",
            loading: "lazy"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { heading: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 h-px w-12 bg-heading/30" }),
      p1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rich-content mt-5 space-y-4 text-base leading-relaxed text-ink/80",
          dangerouslySetInnerHTML: { __html: p1 }
        }
      ),
      !!features.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-9 grid grid-cols-3 divide-x divide-heading/15", children: features.map((feature, index) => {
        const Icon = ICON_MAP[feature.icon ?? ""] ?? Leaf;
        const label = tr(feature.title, locale);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 px-2 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-7 w-7 text-heading/70", strokeWidth: 1.5 }),
          label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium leading-snug text-ink/70 sm:text-sm", children: label })
        ] }, index);
      }) })
    ] })
  ] }) });
}
const isExternalUrl = (url) => /^(https?:)?\/\/|^(mailto|tel):/i.test(url);
function AboutSpaces({ data }) {
  var _a;
  const locale = useLocale();
  const title = tr(data.title, locale);
  const intro = tr(data.intro, locale);
  const { ref, className } = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: cn(className, "mt-[50px] bg-[#f5f2ed] px-5 sm:px-10 lg:px-[60px]"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { heading: title }),
    intro && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rich-content mt-4 max-w-2xl text-base leading-relaxed text-ink/80",
        dangerouslySetInnerHTML: { __html: intro }
      }
    ),
    !!((_a = data.items) == null ? void 0 : _a.length) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-6 sm:grid-cols-2", children: data.items.map((item, index) => {
      const itemTitle = tr(item.title, locale);
      const description = tr(item.description, locale);
      const linkText = tr(item.link_text, locale);
      const itemImageAlt = tr(item.image_alt, locale);
      const hasImage = !!item.image;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group flex h-full flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-[4px]",
              !hasImage && "bg-maha-200"
            ),
            children: hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.image ?? void 0,
                alt: itemImageAlt || stripTags$4(itemTitle),
                className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                loading: "lazy"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col rounded-b-[4px] bg-[#f4eae1] p-5", children: [
          itemTitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rich-content font-serif text-lg text-heading",
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
          linkText && item.link_url && (isExternalUrl(item.link_url) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: item.link_url,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "group/link mt-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-heading",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: linkText }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover/link:translate-x-1" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            xe,
            {
              href: item.link_url,
              className: "group/link mt-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-heading",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: linkText }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover/link:translate-x-1" })
              ]
            }
          ))
        ] })
      ] }, index);
    }) })
  ] });
}
const stripTags$2 = (html) => html.replace(/<[^>]+>/g, "");
function AboutPeople({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const p1 = tr(data.p1, locale);
  const imageAlt = tr(data.image_alt, locale);
  const hasImage = !!data.image;
  const { ref, className } = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: cn(className, "mt-[50px] bg-[#f4eae1] px-5 py-12 sm:px-10 lg:px-[60px]"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("aspect-[21/10] w-full overflow-hidden rounded-sm", !hasImage && "bg-maha-200"), children: hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: data.image ?? void 0,
        alt: imageAlt || stripTags$2(title),
        className: "h-full w-full object-cover",
        loading: "lazy"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { heading: title }),
      p1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rich-content mt-6 max-w-md space-y-4 text-base leading-relaxed text-ink/80",
          dangerouslySetInnerHTML: { __html: p1 }
        }
      )
    ] })
  ] }) });
}
const stripTags$1 = (html) => html.replace(/<[^>]+>/g, "");
function Stars({ rating, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex gap-0.5", className), "aria-label": `${rating}/5 sao`, children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: cn("h-3.5 w-3.5", i < rating ? "fill-amber-400 text-amber-400" : "text-maha-300") }, i)) });
}
function SourceMark({ source }) {
  if (source === "google") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif text-xl font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#4285F4]", children: "G" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#EA4335]", children: "o" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#FBBC05]", children: "o" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#4285F4]", children: "g" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#34A853]", children: "l" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#EA4335]", children: "e" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-xl font-semibold text-[#34E0A1]", children: "Tripadvisor" });
}
function TestimonialCard({ item, locale }) {
  const quote = tr(item.quote, locale);
  const meta = tr(item.author_meta, locale);
  const rating = Number(item.rating ?? 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { children: [
    item.source === "google" || item.source === "tripadvisor" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SourceMark, { source: item.source }),
      !!rating && /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { rating, className: "mt-2" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-6 w-6 text-maha-300", strokeWidth: 1.5, "aria-hidden": "true" }),
    quote && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "blockquote",
      {
        className: "rich-content mt-4 text-sm leading-relaxed text-ink/80",
        dangerouslySetInnerHTML: { __html: quote }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-4 text-sm font-semibold text-heading", children: [
      item.author_name,
      meta && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 font-normal text-ink/60", children: [
        "(",
        stripTags$1(meta),
        ")"
      ] })
    ] })
  ] });
}
function AboutExperiences({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const intro = tr(data.intro, locale);
  const items = data.items ?? [];
  const { ref, className } = useReveal();
  const trackRef = reactExports.useRef(null);
  const itemRefs = reactExports.useRef([]);
  const [activeIndex, setActiveIndex] = reactExports.useState(0);
  const dragState = reactExports.useRef({
    dragging: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false
  });
  reactExports.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const intersecting = /* @__PURE__ */ new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.slideIndex);
          if (entry.isIntersecting) {
            intersecting.add(index);
          } else {
            intersecting.delete(index);
          }
        });
        if (intersecting.size) {
          setActiveIndex(Math.min(...intersecting));
        }
      },
      { root: track, threshold: 0.6 }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [items.length]);
  const goToSlide = (index) => {
    var _a;
    (_a = itemRefs.current[index]) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };
  const onPointerDown = (e) => {
    const track = trackRef.current;
    if (!track) return;
    dragState.current = { dragging: true, startX: e.clientX, startScrollLeft: track.scrollLeft, moved: false };
    track.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    const track = trackRef.current;
    const state = dragState.current;
    if (!track || !state.dragging) return;
    const delta = e.clientX - state.startX;
    if (Math.abs(delta) > 3) state.moved = true;
    track.scrollLeft = state.startScrollLeft - delta;
  };
  const endDrag = () => {
    dragState.current.dragging = false;
  };
  const onClickCapture = (e) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: cn(className, "mt-[50px] bg-[#f5f2ed] px-5 py-12 sm:px-10 lg:px-[60px]"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-8 lg:grid-cols-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { heading: title }),
      intro && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rich-content mt-4 text-base leading-relaxed text-ink/80",
          dangerouslySetInnerHTML: { __html: intro }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-9", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: trackRef,
          onPointerDown,
          onPointerMove,
          onPointerUp: endDrag,
          onPointerLeave: endDrag,
          onClickCapture,
          className: "flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden",
          style: { cursor: "grab" },
          children: items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              ref: (el) => itemRefs.current[index] = el,
              "data-slide-index": index,
              className: "w-[85%] shrink-0 snap-start rounded-[4px] border border-maha-200 p-6 sm:w-[calc((100%_-_1.25rem)/2)] lg:w-[calc((100%_-_2.5rem)/3)]",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialCard, { item, locale })
            },
            index
          ))
        }
      ),
      items.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-center gap-2", children: items.map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => goToSlide(index),
          "aria-label": `Xem đánh giá ${index + 1}`,
          className: cn(
            "h-1.5 rounded-full transition-all",
            index === activeIndex ? "w-5 bg-maha-500" : "w-1.5 bg-maha-300"
          )
        },
        index
      )) })
    ] })
  ] }) });
}
const stripTags = (html) => html.replace(/<[^>]+>/g, "");
function AboutMissionVisionJourney({ missionVision, journey }) {
  var _a;
  const locale = useLocale();
  const mvTitle = tr(missionVision.title, locale);
  const missionTitle = tr(missionVision.mission.title, locale);
  const missionDesc = tr(missionVision.mission.description, locale);
  const visionTitle = tr(missionVision.vision.title, locale);
  const visionDesc = tr(missionVision.vision.description, locale);
  const journeyTitle = tr(journey.title, locale);
  const journeyIntro = tr(journey.intro, locale);
  const { ref, className } = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: cn(className, "mt-[50px] bg-[#f5f2ed] px-5 py-12 sm:px-10 lg:px-[60px]"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { heading: mvTitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flower2, { className: "h-5 w-5 shrink-0 text-maha-500", strokeWidth: 1.25, "aria-hidden": "true" }),
            missionTitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "rich-content font-serif text-lg text-heading",
                dangerouslySetInnerHTML: { __html: missionTitle }
              }
            )
          ] }),
          missionDesc && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rich-content mt-2 text-sm leading-relaxed text-ink/80",
              dangerouslySetInnerHTML: { __html: missionDesc }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-5 w-5 shrink-0 text-maha-500", strokeWidth: 1.25, "aria-hidden": "true" }),
            visionTitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "rich-content font-serif text-lg text-heading",
                dangerouslySetInnerHTML: { __html: visionTitle }
              }
            )
          ] }),
          visionDesc && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rich-content mt-2 text-sm leading-relaxed text-ink/80",
              dangerouslySetInnerHTML: { __html: visionDesc }
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { heading: journeyTitle }),
      journeyIntro && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rich-content mt-4 max-w-xl text-base leading-relaxed text-ink/80",
          dangerouslySetInnerHTML: { __html: journeyIntro }
        }
      ),
      !!((_a = journey.images) == null ? void 0 : _a.length) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4", children: journey.images.map((item, index) => {
        const caption = tr(item.caption, locale);
        const imageAlt = tr(item.image_alt, locale);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] w-full overflow-hidden rounded-sm bg-maha-200", children: item.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: item.image,
              alt: imageAlt || stripTags(caption) || stripTags(journeyTitle),
              className: "h-full w-full object-cover",
              loading: "lazy"
            }
          ) }),
          caption && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rich-content mt-2 text-xs text-ink/60",
              dangerouslySetInnerHTML: { __html: caption }
            }
          )
        ] }, index);
      }) })
    ] })
  ] }) });
}
function AboutInvitation({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const p1 = tr(data.p1, locale);
  const p2 = tr(data.p2, locale);
  const buttonText = tr(data.buttonText, locale);
  const imageAlt = tr(data.image_alt, locale);
  const hasImage = !!data.image;
  const { ref, className } = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref,
      className: cn(
        className,
        "relative isolate mt-[50px] flex min-h-[420px] flex-col justify-end overflow-hidden px-5 pb-12 pt-16 sm:min-h-[480px] sm:px-10 sm:pb-16 lg:px-[60px]",
        hasImage ? "bg-[#2F3E2E]" : "bg-maha-200"
      ),
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
            style: { background: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6))" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-2xl", children: [
          title && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "rich-content font-serif text-3xl leading-tight sm:text-4xl md:text-5xl",
                hasImage ? "text-white" : "text-heading"
              ),
              dangerouslySetInnerHTML: { __html: title }
            }
          ),
          p1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "rich-content mt-6 space-y-4 text-base leading-relaxed",
                hasImage ? "text-white/85" : "text-ink/80"
              ),
              dangerouslySetInnerHTML: { __html: p1 }
            }
          ),
          p2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn("rich-content mt-4 text-base leading-relaxed", hasImage ? "text-white/95" : "text-ink/90"),
              dangerouslySetInnerHTML: { __html: p2 }
            }
          ),
          buttonText && data.buttonUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            xe,
            {
              href: data.buttonUrl,
              className: cn(
                "mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-90",
                hasImage ? "bg-white text-heading" : "bg-[#2F3E2E] text-white"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: buttonText } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function GioiThieu({
  hero,
  story,
  philosophy,
  healingJourneys,
  approach,
  spaces,
  people,
  experiences,
  missionVision,
  journey,
  invitation,
  sectionVisibility
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { mainClassName: "bg-[#f5f2ed]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Se, { title: "Về Mầm" }),
    sectionVisibility.hero && /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, { data: hero, heightClassName: "h-[calc(85vh-100px)] min-h-[340px] sm:h-[calc(75vh-100px)]" }),
    sectionVisibility.story && /* @__PURE__ */ jsxRuntimeExports.jsx(AboutStory, { data: story }),
    sectionVisibility.philosophy && /* @__PURE__ */ jsxRuntimeExports.jsx(AboutPhilosophy, { data: philosophy }),
    sectionVisibility.healingJourneys && /* @__PURE__ */ jsxRuntimeExports.jsx(AboutHealingJourneys, { data: healingJourneys }),
    sectionVisibility.approach && /* @__PURE__ */ jsxRuntimeExports.jsx(AboutApproach, { data: approach }),
    sectionVisibility.spaces && /* @__PURE__ */ jsxRuntimeExports.jsx(AboutSpaces, { data: spaces }),
    sectionVisibility.people && /* @__PURE__ */ jsxRuntimeExports.jsx(AboutPeople, { data: people }),
    sectionVisibility.experiences && /* @__PURE__ */ jsxRuntimeExports.jsx(AboutExperiences, { data: experiences }),
    (sectionVisibility.missionVision || sectionVisibility.journey) && /* @__PURE__ */ jsxRuntimeExports.jsx(AboutMissionVisionJourney, { missionVision, journey }),
    sectionVisibility.invitation && /* @__PURE__ */ jsxRuntimeExports.jsx(AboutInvitation, { data: invitation })
  ] });
}
export {
  GioiThieu as default
};
