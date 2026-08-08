import { jsxs, jsx } from "react/jsx-runtime";
import { Link, Head } from "@inertiajs/react";
import { P as PublicLayout } from "./PublicLayout-B7nDyDjV.js";
import { u as useLocale, t as tr, s as stripTags, c as cn, a as truncate } from "./useLocale-CGFjb2L7.js";
import { ArrowRight, Sparkles, ShieldCheck, Users, Heart, HeartHandshake, Flower2, Sprout, GraduationCap, Leaf, HandHeart, Star, PersonStanding, Layers, Gem, ShoppingBag, Soup, Flame, Droplet, Sun } from "lucide-react";
import { B as Breadcrumb } from "./Breadcrumb-CY3ASVHf.js";
import { u as useReveal } from "./useReveal-CTtvbu38.js";
import { S as ServicesClosing } from "./ServicesClosing-aggeXKcb.js";
import "react";
import "react-i18next";
import "clsx";
import "tailwind-merge";
const BOOKING_URL = "/dat-lich/";
const CTA_LABEL = { vi: "Đặt lịch ngay", en: "Book now" };
function ServiceHero({ data, breadcrumb }) {
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
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex h-full w-full flex-col px-5 pb-10 pt-28 sm:px-10 sm:pt-32 md:w-1/2 md:px-12 md:pt-40 lg:w-1/3 lg:px-16", children: [
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
        /* @__PURE__ */ jsxs(
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
const ICONS$1 = {
  HandHeart,
  Leaf,
  GraduationCap,
  Sprout,
  Flower2,
  HeartHandshake,
  Heart,
  Users,
  ShieldCheck,
  Sparkles
};
function ServicePillars({ data }) {
  const locale = useLocale();
  const heading = tr(data.heading, locale);
  const imageAlt = tr(data.imageAlt, locale);
  const hasImage = !!data.image;
  const pillars = data.pillars ?? [];
  const { ref, className } = useReveal();
  if (!heading && !pillars.length) {
    return null;
  }
  return /* @__PURE__ */ jsx("section", { ref, className: cn(className, "mb-2 mt-2 bg-[#f5f2ed]"), children: /* @__PURE__ */ jsxs("div", { className: "grid items-center lg:grid-cols-2", children: [
    /* @__PURE__ */ jsx("div", { className: cn("aspect-[4/3] lg:aspect-[5/4]", !hasImage && "bg-maha-200"), children: hasImage && /* @__PURE__ */ jsx(
      "img",
      {
        src: data.image ?? void 0,
        alt: imageAlt || stripTags(heading),
        className: "h-full w-full object-cover",
        loading: "lazy"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 py-10 sm:px-10 sm:py-14 lg:px-16", children: [
      heading && /* @__PURE__ */ jsx(
        "div",
        {
          className: "rich-content font-serif text-2xl leading-snug text-heading sm:text-3xl",
          dangerouslySetInnerHTML: { __html: heading }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "mt-5 h-px w-10 bg-maha-300", "aria-hidden": "true" }),
      !!pillars.length && /* @__PURE__ */ jsx("div", { className: "mt-9 grid grid-cols-3 divide-x divide-heading/15", children: pillars.map((pillar, index) => {
        const Icon = pillar.icon && ICONS$1[pillar.icon] || Leaf;
        const title = tr(pillar.title, locale);
        return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 px-2 text-center", children: [
          /* @__PURE__ */ jsx(Icon, { className: "h-[56px] w-[56px] text-subheading", strokeWidth: 1.25, "aria-hidden": "true" }),
          title && /* @__PURE__ */ jsx(
            "div",
            {
              className: "rich-content text-sm leading-snug text-heading",
              dangerouslySetInnerHTML: { __html: title }
            }
          )
        ] }, index);
      }) })
    ] })
  ] }) });
}
const ICONS = {
  HandHeart,
  Leaf,
  GraduationCap,
  Sprout,
  Flower2,
  HeartHandshake,
  Heart,
  Users,
  ShieldCheck,
  Sparkles,
  Sun,
  Droplet,
  Flame,
  Soup,
  ShoppingBag,
  Gem,
  Layers,
  PersonStanding,
  Star
};
const SCOPE_LABEL = { vi: "Đặc điểm chung của liệu trình", en: "Treatment scope" };
const TOOLS_LABEL = { vi: "Sản phẩm & dụng cụ sử dụng", en: "Products & tools used" };
function ServiceScopeAndTools({ data }) {
  const locale = useLocale();
  const scopeNote = tr(data.scopeNote, locale);
  const tools = data.tools ?? [];
  const showScope = !!scopeNote;
  const showTools = tools.length > 0;
  const { ref, className } = useReveal();
  if (!showScope && !showTools) {
    return null;
  }
  const ScopeIcon = data.scopeIcon && ICONS[data.scopeIcon] || PersonStanding;
  const scopeLabel = SCOPE_LABEL[locale] ?? SCOPE_LABEL.vi;
  const toolsLabel = TOOLS_LABEL[locale] ?? TOOLS_LABEL.vi;
  return /* @__PURE__ */ jsx("section", { ref, className: cn(className, "mt-2 bg-[#f4eae1] px-5 py-10 sm:px-10 lg:px-[60px]"), children: /* @__PURE__ */ jsxs("div", { className: cn("grid gap-10", showScope && showTools && "lg:grid-cols-[1fr_auto_2fr] lg:gap-10"), children: [
    showScope && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "font-serif text-lg text-heading", children: scopeLabel }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-start gap-4", children: [
        /* @__PURE__ */ jsx(ScopeIcon, { className: "h-12 w-12 shrink-0 text-subheading", strokeWidth: 1.25, "aria-hidden": "true" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "rich-content text-sm leading-relaxed text-ink/75",
            dangerouslySetInnerHTML: { __html: scopeNote }
          }
        )
      ] })
    ] }),
    showScope && showTools && /* @__PURE__ */ jsx("span", { className: "hidden w-px bg-maha-300 lg:block", "aria-hidden": "true" }),
    showTools && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "font-serif text-lg text-heading", children: toolsLabel }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 grid grid-cols-3 gap-6 sm:grid-cols-5", children: tools.map((tool, index) => {
        const Icon = tool.icon && ICONS[tool.icon] || Droplet;
        const label = tr(tool.label, locale);
        return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
          /* @__PURE__ */ jsx(Icon, { className: "h-12 w-12 text-subheading", strokeWidth: 1.25, "aria-hidden": "true" }),
          label && /* @__PURE__ */ jsx(
            "div",
            {
              className: "rich-content mt-3 text-xs leading-snug text-heading",
              dangerouslySetInnerHTML: { __html: label }
            }
          )
        ] }, index);
      }) })
    ] })
  ] }) });
}
const TIERS_LABEL = { vi: "TẦNG TRẢI NGHIỆM", en: "EXPERIENCE TIERS" };
const SUBTITLE_FALLBACK = {
  vi: "Mỗi tầng trải nghiệm được thiết kế với tỷ lệ thư giãn, kỹ thuật day ấn huyệt và mức độ tác động khác nhau, giúp bạn dễ dàng lựa chọn liệu trình phù hợp.",
  en: "Each tier is designed with its own balance of relaxation, acupressure technique and intensity, so you can easily choose the treatment that fits."
};
const RELAX_LABEL = { vi: "Thư giãn", en: "Relaxation" };
const ACUPRESSURE_LABEL = { vi: "Day ấn huyệt", en: "Acupressure" };
const INTENSITY_LABEL = { vi: "Mức độ tác động", en: "Intensity" };
const SUITABLE_LABEL = { vi: "Phù hợp với", en: "Suitable for" };
function ServiceTiers({ data }) {
  const locale = useLocale();
  const tiers = data.tiers ?? [];
  const { ref, className } = useReveal();
  if (!tiers.length) {
    return null;
  }
  const customLabel = tr(data.heading, locale);
  const fallbackLabel = TIERS_LABEL[locale] ?? TIERS_LABEL.vi;
  const subtitle = tr(data.subtitle, locale) || (SUBTITLE_FALLBACK[locale] ?? SUBTITLE_FALLBACK.vi);
  const relaxLabel = RELAX_LABEL[locale] ?? RELAX_LABEL.vi;
  const acupressureLabel = ACUPRESSURE_LABEL[locale] ?? ACUPRESSURE_LABEL.vi;
  const intensityLabel = tr(data.intensityLabel, locale) || (INTENSITY_LABEL[locale] ?? INTENSITY_LABEL.vi);
  const suitableLabel = SUITABLE_LABEL[locale] ?? SUITABLE_LABEL.vi;
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref,
      className: cn(className, "mt-2 bg-white px-5 pb-16 sm:px-10 sm:pb-20 lg:px-[60px] lg:pb-24"),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-sm uppercase tracking-[0.25em] text-heading", children: customLabel ? /* @__PURE__ */ jsx(
            "span",
            {
              className: "rich-content inline [&>p]:inline",
              dangerouslySetInnerHTML: { __html: customLabel }
            }
          ) : fallbackLabel }),
          /* @__PURE__ */ jsx("span", { className: "mx-auto mt-3 block h-px w-10 bg-maha-300", "aria-hidden": "true" }),
          subtitle && /* @__PURE__ */ jsx(
            "div",
            {
              className: "rich-content mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink/70",
              dangerouslySetInnerHTML: { __html: subtitle }
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 flex flex-col gap-4", children: tiers.map((tier, index) => {
          const name = tr(tier.name, locale);
          const description = tr(tier.description, locale);
          const imageAlt = tr(tier.image_alt, locale);
          const intensity = tr(tier.intensity_label, locale);
          const duration = tr(tier.duration_label, locale);
          const suitableFor = tier.suitable_for ?? [];
          const hasStats = tier.relaxation_percent != null || tier.acupressure_percent != null;
          return /* @__PURE__ */ jsxs(
            "article",
            {
              className: "grid gap-5 rounded-sm bg-maha-50 p-5 sm:p-6 lg:grid-cols-3 lg:items-start lg:gap-6",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-maha-200 lg:aspect-auto lg:h-full lg:min-h-[180px]", children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center bg-[#2F3E2E] font-serif text-xs text-white", children: String(index + 1).padStart(2, "0") }),
                  tier.image && /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: tier.image,
                      alt: imageAlt || stripTags(name),
                      className: "h-full w-full object-cover",
                      loading: "lazy"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  name && /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "rich-content font-serif text-2xl uppercase tracking-wide text-heading",
                      dangerouslySetInnerHTML: { __html: name }
                    }
                  ),
                  description && /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "rich-content mt-1.5 text-base leading-relaxed text-ink/70",
                      dangerouslySetInnerHTML: { __html: description }
                    }
                  ),
                  hasStats && /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-2.5", children: [
                    tier.relaxation_percent != null && /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm text-ink/75", children: [
                        /* @__PURE__ */ jsx("span", { children: relaxLabel }),
                        /* @__PURE__ */ jsxs("span", { children: [
                          tier.relaxation_percent,
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "mt-1 h-1.5 w-full overflow-hidden rounded-full bg-maha-200", children: /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "h-full rounded-full bg-[#2F3E2E]",
                          style: { width: `${tier.relaxation_percent}%` }
                        }
                      ) })
                    ] }),
                    tier.acupressure_percent != null && /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm text-ink/75", children: [
                        /* @__PURE__ */ jsx("span", { children: acupressureLabel }),
                        /* @__PURE__ */ jsxs("span", { children: [
                          tier.acupressure_percent,
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "mt-1 h-1.5 w-full overflow-hidden rounded-full bg-maha-200", children: /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "h-full rounded-full bg-[#2F3E2E]",
                          style: { width: `${tier.acupressure_percent}%` }
                        }
                      ) })
                    ] })
                  ] }),
                  (intensity || duration) && /* @__PURE__ */ jsxs("ul", { className: "mt-3 space-y-1 text-sm text-ink/75", children: [
                    intensity && /* @__PURE__ */ jsxs("li", { className: "flex gap-1", children: [
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "rich-content inline [&>p]:inline",
                          dangerouslySetInnerHTML: { __html: intensityLabel }
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { children: ":" }),
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "rich-content inline [&>p]:inline",
                          dangerouslySetInnerHTML: { __html: intensity }
                        }
                      )
                    ] }),
                    duration && /* @__PURE__ */ jsx(
                      "li",
                      {
                        className: "rich-content [&>p]:inline",
                        dangerouslySetInnerHTML: { __html: duration }
                      }
                    )
                  ] })
                ] }),
                !!suitableFor.length && /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-serif text-sm uppercase tracking-[0.15em] text-subheading", children: suitableLabel }),
                  /* @__PURE__ */ jsx("ul", { className: "mt-3 space-y-1.5 text-sm leading-relaxed text-ink/75", children: suitableFor.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "•" }),
                    /* @__PURE__ */ jsx("span", { children: item })
                  ] }, i)) })
                ] })
              ]
            },
            index
          );
        }) })
      ]
    }
  );
}
const HOME_CRUMB = { name: "Trang chủ", url: "/" };
const SERVICES_CRUMB = { name: "Dịch vụ", url: "/dich-vu/" };
function DichVuDetail({ service, breadcrumb, closing }) {
  const locale = useLocale();
  const serviceName = stripTags(tr(service.name, locale));
  const serviceDescription = truncate(stripTags(tr(service.short_description, locale)), 160);
  const breadcrumbItems = [
    HOME_CRUMB,
    SERVICES_CRUMB,
    ...breadcrumb.map((item) => ({ name: item.name, url: item.url })),
    { name: serviceName }
  ];
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: serviceName || "Dịch vụ", children: serviceDescription && /* @__PURE__ */ jsx("meta", { name: "description", content: serviceDescription }) }),
    /* @__PURE__ */ jsx(
      ServiceHero,
      {
        breadcrumb: breadcrumbItems,
        data: {
          heading: service.name,
          subtitle: service.short_description,
          image: service.hero_image ?? null,
          imageAlt: service.thumbnail_alt
        }
      }
    ),
    /* @__PURE__ */ jsx(
      ServicePillars,
      {
        data: {
          heading: service.pillars_heading,
          image: service.pillars_image,
          imageAlt: service.pillars_image_alt,
          pillars: service.pillars
        }
      }
    ),
    /* @__PURE__ */ jsx(
      ServiceScopeAndTools,
      {
        data: {
          scopeIcon: service.treatment_scope_image,
          scopeNote: service.treatment_scope_note,
          tools: service.tools_used
        }
      }
    ),
    /* @__PURE__ */ jsx(
      ServiceTiers,
      {
        data: {
          heading: service.tiers_heading,
          subtitle: service.tiers_subtitle,
          intensityLabel: service.tiers_intensity_label,
          tiers: service.tiers ?? []
        }
      }
    ),
    /* @__PURE__ */ jsx(ServicesClosing, { data: closing, fixedHeight: true })
  ] });
}
export {
  DichVuDetail as default
};
