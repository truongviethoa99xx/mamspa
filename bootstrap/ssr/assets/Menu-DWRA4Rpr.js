import { j as jsxRuntimeExports, X, S as Se } from "../ssr.js";
import { P as PublicLayout } from "./PublicLayout-BWSgHXuX.js";
import { u as useLocale, t as tr, s as stripTags, c as cn, h as truncate } from "./useLocale-NX8WGOIg.js";
import { u as useReveal } from "./useReveal-DiGU7tCR.js";
import { L as Leaf } from "./leaf-CPhqkXQK.js";
import { P as PDF_LOCALE_ORDER, a as PDF_LOCALE_LABELS, M as MenuContact } from "./MenuContact-KZn9Ib-3.js";
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
import "./heart-handshake-B2I5iEgG.js";
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
function MenuBranches({ data }) {
  const locale = useLocale();
  const items = data.items ?? [];
  const { ref, className } = useReveal();
  if (!items.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: cn(className, "px-5 py-10 sm:px-10 lg:px-[60px]"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2", children: items.map((branch) => {
    const name = tr(branch.name, locale);
    const street = tr(branch.street, locale);
    const imageAlt = tr(branch.image_alt, locale) || name;
    const hasImage = !!branch.image;
    const pdfs = branch.pdfs ?? {};
    const availablePdfs = PDF_LOCALE_ORDER.filter((code) => pdfs[code]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
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
            availablePdfs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-7 flex flex-wrap items-center justify-center gap-2.5", children: availablePdfs.map((code) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: pdfs[code] ?? void 0,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center rounded-full border border-maha-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-heading transition-colors hover:border-subheading hover:bg-maha-100",
                children: PDF_LOCALE_LABELS[code] ?? code.toUpperCase()
              },
              code
            )) })
          ] })
        ]
      },
      branch.slug
    );
  }) }) });
}
function Menu({ hero, intro, branches, contact, sectionVisibility }) {
  var _a;
  const { props } = X();
  const locale = useLocale();
  const title = stripTags(tr(hero.title, locale)) || "Menu";
  const description = truncate(((_a = props.site) == null ? void 0 : _a.meta_description) || stripTags(tr(hero.subtitle, locale)) || "", 160);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { mainClassName: "bg-[#f5f2ed]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Se, { title, children: description && /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: description }) }),
    sectionVisibility.hero && /* @__PURE__ */ jsxRuntimeExports.jsx(MenuHero, { data: hero }),
    sectionVisibility.intro && /* @__PURE__ */ jsxRuntimeExports.jsx(MenuIntro, { data: intro }),
    sectionVisibility.branches && /* @__PURE__ */ jsxRuntimeExports.jsx(MenuBranches, { data: branches }),
    sectionVisibility.contact && /* @__PURE__ */ jsxRuntimeExports.jsx(MenuContact, { data: contact })
  ] });
}
export {
  Menu as default
};
