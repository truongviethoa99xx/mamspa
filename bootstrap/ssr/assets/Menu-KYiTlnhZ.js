import { j as jsxRuntimeExports, S as Se } from "../ssr.js";
import { P as PublicLayout } from "./PublicLayout-efzjeqLo.js";
import { a as createLucideIcon, u as useLocale, t as tr, s as stripTags, c as cn } from "./useLocale-NX8WGOIg.js";
import { u as useReveal } from "./useReveal-DiGU7tCR.js";
import { L as Leaf } from "./leaf-CPhqkXQK.js";
import { H as HeartHandshake } from "./heart-handshake-B2I5iEgG.js";
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
const FileText = createLucideIcon("FileText", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
]);
function MenuHero({ data }) {
  const locale = useLocale();
  const kicker = tr(data.kicker, locale);
  const title = tr(data.title, locale);
  const subtitle = tr(data.subtitle, locale);
  const imageAlt = tr(data.image_alt, locale);
  const hasImage = !!data.image;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative isolate flex min-h-[420px] items-center overflow-hidden bg-maha-100", children: [
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
          background: "radial-gradient(ellipse 55% 85% at 50% 48%, rgba(246,243,239,.65) 0%, rgba(246,243,239,.3) 50%, rgba(246,243,239,0) 78%)"
        },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-16 text-center sm:py-20", children: [
      kicker && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium tracking-[0.5em] text-subheading sm:text-sm", children: kicker }),
      title && /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-serif text-5xl uppercase tracking-[0.15em] text-heading sm:text-6xl", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-ink/70 sm:text-base", children: subtitle })
    ] })
  ] });
}
function MenuIntro({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const note = tr(data.note, locale);
  const { ref, className } = useReveal();
  if (!title && !note) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: cn(className, "mx-auto max-w-3xl px-6 pb-6 pt-16 text-center sm:pt-20"), children: [
    title && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        className: "rich-content font-serif text-xl leading-relaxed text-heading sm:text-2xl",
        dangerouslySetInnerHTML: { __html: title }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-7 bg-maha-300" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-4 w-4 text-maha-300", strokeWidth: 1.2 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-7 bg-maha-300" })
    ] }),
    note && /* @__PURE__ */ jsxRuntimeExports.jsx(
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: cn(className, "px-5 py-10 sm:px-10 lg:px-[60px]"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2", children: items.map((branch, index) => {
    const name = tr(branch.name, locale);
    const street = tr(branch.street, locale);
    const desc = tr(branch.desc, locale);
    const imageAlt = tr(branch.image_alt, locale) || name;
    const hasImage = !!branch.image;
    const pdfs = branch.pdfs ?? {};
    const availableLocales = PDF_LOCALE_ORDER.filter((code) => pdfs[code]);
    const defaultPdf = pickDefaultPdf(pdfs, locale);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "article",
      {
        className: "flex flex-col overflow-hidden rounded-2xl border border-maha-200 bg-maha-50",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 w-full shrink-0 bg-maha-200 sm:h-72 md:h-80", children: hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: branch.image ?? void 0,
              alt: imageAlt,
              className: "h-full w-full object-cover",
              loading: "lazy"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center px-7 py-9 text-center sm:px-9", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-5 w-5 text-maha-300", strokeWidth: 1.2 }),
            name && /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-serif text-2xl uppercase tracking-[0.1em] text-heading", children: name }),
            street && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs tracking-[0.2em] text-ink/50", children: street }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-5 h-px w-10 bg-maha-300" }),
            desc && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "rich-content mt-5 text-sm leading-relaxed text-ink/65",
                dangerouslySetInnerHTML: { __html: desc }
              }
            ),
            defaultPdf && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: defaultPdf,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "group mt-7 inline-flex items-center gap-3 rounded border border-maha-300 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-heading transition-colors hover:border-subheading hover:bg-maha-100",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4", strokeWidth: 1.5 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Xem Menu" })
                ]
              }
            ),
            availableLocales.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap items-center justify-center gap-2", children: availableLocales.map((code) => /* @__PURE__ */ jsxRuntimeExports.jsx(
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
function Menu({ hero, intro, branches, contact, sectionVisibility }) {
  const locale = useLocale();
  const title = stripTags(tr(hero.title, locale)) || "Menu";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { mainClassName: "bg-[#f5f2ed]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Se, { title }),
    sectionVisibility.hero && /* @__PURE__ */ jsxRuntimeExports.jsx(MenuHero, { data: hero }),
    sectionVisibility.intro && /* @__PURE__ */ jsxRuntimeExports.jsx(MenuIntro, { data: intro }),
    sectionVisibility.branches && /* @__PURE__ */ jsxRuntimeExports.jsx(MenuBranches, { data: branches }),
    sectionVisibility.contact && /* @__PURE__ */ jsxRuntimeExports.jsx(MenuContact, { data: contact })
  ] });
}
export {
  Menu as default
};
