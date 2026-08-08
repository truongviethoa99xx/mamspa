import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { P as PublicLayout } from "./PublicLayout-B7nDyDjV.js";
import { u as useLocale, t as tr, s as stripTags, c as cn } from "./useLocale-CGFjb2L7.js";
import { Leaf, FileText, HeartHandshake } from "lucide-react";
import { u as useReveal } from "./useReveal-CTtvbu38.js";
import "react";
import "react-i18next";
import "clsx";
import "tailwind-merge";
function MenuHero({ data }) {
  const locale = useLocale();
  const kicker = tr(data.kicker, locale);
  const title = tr(data.title, locale);
  const subtitle = tr(data.subtitle, locale);
  const imageAlt = tr(data.image_alt, locale);
  const hasImage = !!data.image;
  return /* @__PURE__ */ jsxs("section", { className: "relative isolate flex min-h-[420px] items-center overflow-hidden bg-maha-100", children: [
    hasImage && /* @__PURE__ */ jsx(
      "img",
      {
        src: data.image ?? void 0,
        alt: imageAlt || stripTags(title),
        className: "absolute inset-0 z-0 h-full w-full object-cover"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 z-0",
        style: {
          background: "radial-gradient(ellipse 55% 85% at 50% 48%, rgba(246,243,239,.65) 0%, rgba(246,243,239,.3) 50%, rgba(246,243,239,0) 78%)"
        },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-16 text-center sm:py-20", children: [
      kicker && /* @__PURE__ */ jsx("p", { className: "text-xs font-medium tracking-[0.5em] text-subheading sm:text-sm", children: kicker }),
      title && /* @__PURE__ */ jsx("h1", { className: "mt-3 font-serif text-5xl uppercase tracking-[0.15em] text-heading sm:text-6xl", children: title }),
      subtitle && /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-ink/70 sm:text-base", children: subtitle })
    ] })
  ] });
}
function MenuIntro({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const note = tr(data.note, locale);
  const { ref, className } = useReveal();
  if (!title && !note) return null;
  return /* @__PURE__ */ jsxs("section", { ref, className: cn(className, "mx-auto max-w-3xl px-6 pb-6 pt-16 text-center sm:pt-20"), children: [
    title && /* @__PURE__ */ jsx(
      "h2",
      {
        className: "rich-content font-serif text-xl leading-relaxed text-heading sm:text-2xl",
        dangerouslySetInnerHTML: { __html: title }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mt-7 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "h-px w-7 bg-maha-300" }),
      /* @__PURE__ */ jsx(Leaf, { className: "h-4 w-4 text-maha-300", strokeWidth: 1.2 }),
      /* @__PURE__ */ jsx("span", { className: "h-px w-7 bg-maha-300" })
    ] }),
    note && /* @__PURE__ */ jsx(
      "div",
      {
        className: "rich-content mt-7 text-sm leading-loose text-ink/60",
        dangerouslySetInnerHTML: { __html: note }
      }
    )
  ] });
}
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
function MenuBranches({ data }) {
  const locale = useLocale();
  const items = data.items ?? [];
  const { ref, className } = useReveal();
  if (!items.length) return null;
  return /* @__PURE__ */ jsx("section", { ref, className: cn(className, "px-5 py-10 sm:px-10 lg:px-[60px]"), children: /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2", children: items.map((branch, index) => {
    const name = tr(branch.name, locale);
    const street = tr(branch.street, locale);
    const desc = tr(branch.desc, locale);
    const imageAlt = tr(branch.image_alt, locale) || name;
    const hasImage = !!branch.image;
    const pdfs = branch.pdfs ?? {};
    const availableLocales = PDF_LOCALE_ORDER.filter((code) => pdfs[code]);
    const defaultPdf = pickDefaultPdf(pdfs, locale);
    return /* @__PURE__ */ jsxs(
      "article",
      {
        className: "flex flex-col overflow-hidden rounded-2xl border border-maha-200 bg-maha-50",
        children: [
          /* @__PURE__ */ jsx("div", { className: "h-64 w-full shrink-0 bg-maha-200 sm:h-72 md:h-80", children: hasImage && /* @__PURE__ */ jsx(
            "img",
            {
              src: branch.image ?? void 0,
              alt: imageAlt,
              className: "h-full w-full object-cover",
              loading: "lazy"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col items-center px-7 py-9 text-center sm:px-9", children: [
            /* @__PURE__ */ jsx(Leaf, { className: "h-5 w-5 text-maha-300", strokeWidth: 1.2 }),
            name && /* @__PURE__ */ jsx("h3", { className: "mt-4 font-serif text-2xl uppercase tracking-[0.1em] text-heading", children: name }),
            street && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-xs tracking-[0.2em] text-ink/50", children: street }),
            /* @__PURE__ */ jsx("span", { className: "mt-5 h-px w-10 bg-maha-300" }),
            desc && /* @__PURE__ */ jsx(
              "div",
              {
                className: "rich-content mt-5 text-sm leading-relaxed text-ink/65",
                dangerouslySetInnerHTML: { __html: desc }
              }
            ),
            defaultPdf && /* @__PURE__ */ jsxs(
              "a",
              {
                href: defaultPdf,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "group mt-7 inline-flex items-center gap-3 rounded border border-maha-300 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-heading transition-colors hover:border-subheading hover:bg-maha-100",
                children: [
                  /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4", strokeWidth: 1.5 }),
                  /* @__PURE__ */ jsx("span", { children: "Xem Menu" })
                ]
              }
            ),
            availableLocales.length > 1 && /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap items-center justify-center gap-2", children: availableLocales.map((code) => /* @__PURE__ */ jsx(
              "a",
              {
                href: pdfs[code] ?? void 0,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "rounded-full border border-maha-200 px-3 py-1 text-[11px] font-medium text-ink/60 transition-colors hover:border-subheading hover:text-subheading",
                children: PDF_LOCALE_LABELS[code] ?? code.toUpperCase()
              },
              code
            )) })
          ] })
        ]
      },
      index
    );
  }) }) });
}
function MenuContact({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const text = tr(data.text, locale);
  const imageAlt = tr(data.image_alt, locale);
  const hasImage = !!data.image;
  const { ref, className } = useReveal();
  if (!title && !text) return null;
  return /* @__PURE__ */ jsx("section", { ref, className: cn(className, "px-5 pb-16 pt-4 sm:px-10 lg:px-[60px]"), children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-maha-200 bg-maha-50 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 p-8 sm:p-10", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-maha-300", children: /* @__PURE__ */ jsx(HeartHandshake, { className: "h-6 w-6 text-subheading", strokeWidth: 1.4 }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        title && /* @__PURE__ */ jsx("h3", { className: "font-serif text-xl text-heading sm:text-2xl", children: title }),
        text && /* @__PURE__ */ jsx(
          "div",
          {
            className: "rich-content mt-2.5 text-sm leading-relaxed text-ink/65",
            dangerouslySetInnerHTML: { __html: text }
          }
        )
      ] })
    ] }),
    hasImage && /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] w-full md:aspect-auto md:min-h-[190px]", children: /* @__PURE__ */ jsx(
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
function Menu({ hero, intro, branches, contact, sectionVisibility }) {
  const locale = useLocale();
  const title = stripTags(tr(hero.title, locale)) || "Menu";
  return /* @__PURE__ */ jsxs(PublicLayout, { mainClassName: "bg-[#f5f2ed]", children: [
    /* @__PURE__ */ jsx(Head, { title }),
    sectionVisibility.hero && /* @__PURE__ */ jsx(MenuHero, { data: hero }),
    sectionVisibility.intro && /* @__PURE__ */ jsx(MenuIntro, { data: intro }),
    sectionVisibility.branches && /* @__PURE__ */ jsx(MenuBranches, { data: branches }),
    sectionVisibility.contact && /* @__PURE__ */ jsx(MenuContact, { data: contact })
  ] });
}
export {
  Menu as default
};
