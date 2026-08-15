import { j as jsxRuntimeExports, r as reactExports, x as xe, S as Se } from "../ssr.js";
import { P as PublicLayout } from "./PublicLayout-QlQ_GdpY.js";
import { u as useLocale, t as tr, c as cn, C as Check, s as stripTags, h as truncate } from "./useLocale-NX8WGOIg.js";
import { C as CategoryHero } from "./CategoryHero-hoIscTKK.js";
import { u as useReveal } from "./useReveal-DiGU7tCR.js";
import { G as GraduationCap } from "./graduation-cap-D4VE57hJ.js";
import { L as Leaf } from "./leaf-CPhqkXQK.js";
import { H as HandHeart } from "./hand-heart-DHf0_clX.js";
import { Q as Quote } from "./quote-Kcs8vWNG.js";
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
import "./Breadcrumb-CnbsLNuJ.js";
import "./chevron-right-4VLElmMH.js";
const ICONS = {
  HandHeart,
  Leaf,
  GraduationCap
};
function CategoryIntro({ data }) {
  const locale = useLocale();
  const heading = tr(data.heading, locale);
  const body = tr(data.body, locale);
  const imageAlt = tr(data.imageAlt, locale);
  const hasImage = !!data.image;
  const pillars = data.pillars ?? [];
  const { ref, className } = useReveal();
  if (!heading && !body && !hasImage && !pillars.length) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: cn(className, "mt-1 bg-[#f5f2ed]"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:h-[440px] lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("aspect-[4/3] w-full lg:aspect-auto lg:h-[440px]", !hasImage && "bg-maha-200"), children: hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: data.image ?? void 0,
        alt: imageAlt || heading,
        className: "h-full w-full object-cover",
        loading: "lazy"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center overflow-y-auto px-5 pb-6 pt-10 sm:px-10 sm:pb-8 sm:pt-14 lg:h-[440px] lg:px-16 lg:pb-10", children: [
      heading && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rich-content font-serif text-3xl leading-snug text-heading sm:text-4xl",
          dangerouslySetInnerHTML: { __html: heading }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-5 block h-px w-10 bg-maha-300", "aria-hidden": "true" }),
      body && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rich-content mt-5 max-w-md text-sm leading-relaxed text-ink/75",
          dangerouslySetInnerHTML: { __html: body }
        }
      ),
      !!pillars.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-3 gap-4", children: pillars.map((pillar, index) => {
        const Icon = pillar.icon && ICONS[pillar.icon] || Leaf;
        const title = tr(pillar.title, locale);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[56px] w-[56px] text-subheading", strokeWidth: 1.25, "aria-hidden": "true" }),
          title && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rich-content mt-3 text-sm leading-snug text-heading",
              dangerouslySetInnerHTML: { __html: title }
            }
          )
        ] }, index);
      }) })
    ] })
  ] }) });
}
function CategoryQuote({ data }) {
  const locale = useLocale();
  const quote = tr(data.quote, locale);
  const { ref, className } = useReveal();
  if (!quote) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref,
      className: cn(className, "mt-1 bg-maha-200 px-5 py-10 text-center sm:px-10 sm:py-14 lg:px-[60px]"),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "mx-auto h-6 w-6 text-heading/50", strokeWidth: 1.25, "aria-hidden": "true" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rich-content mx-auto mt-4 max-w-2xl font-serif text-xl leading-snug text-heading sm:text-2xl",
            dangerouslySetInnerHTML: { __html: quote }
          }
        )
      ]
    }
  );
}
function CategoryExperienceNote({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const body = tr(data.body, locale);
  const imageAlt = tr(data.imageAlt, locale);
  const hasImage = !!data.image;
  const checklist = (data.checklist ?? []).map((item) => tr(item.text, locale)).filter(Boolean);
  const { ref, className } = useReveal();
  if (!title && !body && !hasImage && !checklist.length) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref,
      className: cn(className, "relative isolate mt-1 h-[480px] overflow-hidden bg-[#ece1db]"),
      children: [
        hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: data.image ?? void 0,
            alt: imageAlt || title,
            className: "absolute inset-0 z-0 h-full w-full object-cover",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 ml-auto flex h-full w-full flex-col justify-center overflow-y-auto px-5 py-10 sm:px-10 md:w-1/2 md:px-12 lg:w-1/2 lg:px-16", children: [
          hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 -z-10",
              style: {
                background: "linear-gradient(270deg, rgba(236,225,219,0.97) 0%, rgba(236,225,219,0.9) 55%, rgba(236,225,219,0) 100%)"
              }
            }
          ),
          title && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rich-content font-serif text-3xl leading-snug text-heading sm:text-4xl",
              dangerouslySetInnerHTML: { __html: title }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-5 block h-px w-10 bg-maha-300", "aria-hidden": "true" }),
          !!checklist.length && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-3 pl-3", children: checklist.map((text, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 text-sm text-ink/85", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-heading", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 text-white", strokeWidth: 3, "aria-hidden": "true" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: text })
          ] }, index)) }),
          body && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rich-content mt-6 max-w-md pl-3 text-sm leading-relaxed text-ink/75",
              dangerouslySetInnerHTML: { __html: body }
            }
          )
        ] })
      ]
    }
  );
}
const HEADING_LABEL = { vi: "NHÓM LIỆU PHÁP", en: "THERAPY GROUPS" };
const SEE_MORE_LABEL = { vi: "Xem thêm", en: "See more" };
const GO_TO_LABEL = { vi: "Đi tới mục", en: "Go to item" };
const CARD_BASIS = "basis-[calc(50%_-_0.625rem)] sm:basis-[calc(33.333%_-_0.834rem)] lg:basis-[calc(20%_-_1rem)]";
function CategoryTherapyGrid({ items, heading }) {
  const locale = useLocale();
  const scrollRef = reactExports.useRef(null);
  const itemRefs = reactExports.useRef([]);
  const [activeIndex, setActiveIndex] = reactExports.useState(0);
  const [canScroll, setCanScroll] = reactExports.useState(false);
  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScroll(el.scrollWidth - el.clientWidth > 4);
    let closestIndex = 0;
    let closestDistance = Infinity;
    itemRefs.current.forEach((node, index) => {
      if (!node) return;
      const distance = Math.abs(node.offsetLeft - el.scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    setActiveIndex(closestIndex);
  };
  const scrollToIndex = (index) => {
    const el = scrollRef.current;
    const node = itemRefs.current[index];
    if (!el || !node) return;
    el.scrollTo({ left: node.offsetLeft, behavior: "smooth" });
  };
  reactExports.useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [items.length]);
  const { ref, className } = useReveal();
  if (!items.length) {
    return null;
  }
  const customLabel = tr(heading, locale);
  const fallbackLabel = HEADING_LABEL[locale] ?? HEADING_LABEL.vi;
  const seeMoreLabel = SEE_MORE_LABEL[locale] ?? SEE_MORE_LABEL.vi;
  const goToLabel = GO_TO_LABEL[locale] ?? GO_TO_LABEL.vi;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: cn(className, "mt-1 bg-[#f5f2ed] pb-2 pt-4"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-sm uppercase tracking-[0.25em] text-heading", children: customLabel ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rich-content inline [&>p]:inline", dangerouslySetInnerHTML: { __html: customLabel } }) : fallbackLabel }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-auto mt-3 block h-px w-10 bg-maha-300", "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: scrollRef,
        onScroll: updateScrollState,
        className: "scrollbar-hide mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 sm:px-10 lg:px-[60px]",
        children: items.map((item, index) => {
          var _a;
          const itemName = tr(item.name, locale);
          const itemDescription = tr(item.short_description, locale);
          const itemImageAlt = tr(item.thumbnail_alt, locale);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "article",
            {
              ref: (node) => {
                itemRefs.current[index] = node;
              },
              className: `group flex ${CARD_BASIS} shrink-0 snap-start flex-col overflow-hidden rounded-[8px] border border-maha-200 bg-white`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-maha-200", children: ((_a = item.images) == null ? void 0 : _a[0]) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: item.images[0],
                    alt: itemImageAlt || stripTags(itemName),
                    className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                    loading: "lazy"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "rich-content font-serif text-lg leading-snug text-heading",
                      dangerouslySetInnerHTML: { __html: itemName }
                    }
                  ),
                  itemDescription && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "rich-content mt-1 text-xs leading-relaxed text-ink/70",
                      dangerouslySetInnerHTML: { __html: itemDescription }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    xe,
                    {
                      href: item.url,
                      "aria-label": stripTags(itemName),
                      className: "mt-auto inline-flex w-fit items-center gap-1.5 pt-3 text-xs font-semibold uppercase tracking-wide text-heading transition-transform hover:translate-x-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: seeMoreLabel }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
                      ]
                    }
                  )
                ] })
              ]
            },
            item.url
          );
        })
      }
    ),
    canScroll && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex items-center justify-center gap-2", children: items.map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => scrollToIndex(index),
        "aria-label": `${goToLabel} ${index + 1}`,
        "aria-current": index === activeIndex,
        className: cn(
          "h-2 rounded-full transition-all",
          index === activeIndex ? "w-6 bg-heading/70" : "w-2 bg-maha-200 hover:bg-maha-300"
        )
      },
      index
    )) })
  ] });
}
function CategoryClosing({ data }) {
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
        "relative isolate mt-2 overflow-hidden px-5 py-16 sm:px-10 sm:py-20 lg:px-[60px]",
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
const HOME_CRUMB = { name: "Trang chủ", url: "/" };
const SERVICES_CRUMB = { name: "Dịch vụ", url: "/dich-vu/" };
function DichVuCategory({ category, breadcrumb, services, closing }) {
  const locale = useLocale();
  const categoryName = stripTags(tr(category.name, locale));
  const categoryDescription = truncate(stripTags(tr(category.description, locale)), 160);
  const breadcrumbItems = [
    HOME_CRUMB,
    SERVICES_CRUMB,
    ...breadcrumb.map((item) => ({ name: item.name, url: item.url })),
    { name: categoryName }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { mainClassName: "bg-[#f5f2ed]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Se, { title: categoryName || "Dịch vụ", children: categoryDescription && /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: categoryDescription }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CategoryHero,
      {
        breadcrumb: breadcrumbItems,
        data: {
          heading: category.name,
          subtitle: category.description,
          image: category.image,
          imageAlt: category.image_alt
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CategoryIntro,
      {
        data: {
          heading: category.intro_heading,
          body: category.intro_body,
          image: category.intro_image,
          imageAlt: category.intro_image_alt,
          pillars: category.pillars
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryQuote, { data: { quote: category.quote } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CategoryExperienceNote,
      {
        data: {
          title: category.experience_note_title,
          checklist: category.experience_checklist,
          body: category.experience_note_body,
          image: category.experience_note_image,
          imageAlt: category.experience_note_image_alt
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryTherapyGrid, { items: services, heading: category.therapy_heading }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryClosing, { data: closing })
  ] });
}
export {
  DichVuCategory as default
};
