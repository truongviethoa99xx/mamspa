import { X, j as jsxRuntimeExports, S as Se } from "../ssr.js";
import { P as PublicLayout } from "./PublicLayout-BWSgHXuX.js";
import { B as Breadcrumb } from "./Breadcrumb-CnbsLNuJ.js";
import { P as PDF_LOCALE_ORDER, p as pickDefaultPdf, a as PDF_LOCALE_LABELS, M as MenuContact } from "./MenuContact-KZn9Ib-3.js";
import { a as createLucideIcon, u as useLocale, t as tr, h as truncate, s as stripTags } from "./useLocale-NX8WGOIg.js";
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
import "./chevron-right-4VLElmMH.js";
import "./useReveal-DiGU7tCR.js";
import "./heart-handshake-B2I5iEgG.js";
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
const HOME_CRUMB = { name: "Trang chủ", url: "/" };
const MENU_CRUMB = { name: "Menu", url: "/menu/" };
function MenuBranch({ branch, contact, sectionVisibility }) {
  var _a;
  const { props } = X();
  const locale = useLocale();
  const name = tr(branch.name, locale);
  const street = tr(branch.street, locale);
  const desc = tr(branch.desc, locale);
  const imageAlt = tr(branch.image_alt, locale) || name;
  const pdfs = branch.pdfs ?? {};
  const availableLocales = PDF_LOCALE_ORDER.filter((code) => pdfs[code]);
  const defaultPdf = pickDefaultPdf(pdfs, locale);
  const title = name || "Menu";
  const description = truncate(((_a = props.site) == null ? void 0 : _a.meta_description) || stripTags(desc) || "", 160);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { mainClassName: "bg-[#f5f2ed]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Se, { title, children: description && /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: description }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "px-5 pb-8 pt-28 sm:px-10 sm:pt-32 lg:px-16 lg:pt-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { items: [HOME_CRUMB, MENU_CRUMB, { name: title }], className: "mb-8" }),
      name && /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl uppercase tracking-[0.1em] text-heading sm:text-4xl", children: name }),
      street && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm tracking-[0.15em] text-ink/50", children: street })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "px-5 pb-16 sm:px-10 lg:px-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-start", children: [
      branch.image && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] w-full overflow-hidden rounded-2xl bg-maha-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: branch.image, alt: imageAlt, className: "h-full w-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: branch.image ? "" : "md:col-span-2", children: [
        desc && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rich-content text-sm leading-relaxed text-ink/70",
            dangerouslySetInnerHTML: { __html: desc }
          }
        ),
        defaultPdf && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: defaultPdf,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "mt-8 inline-flex items-center gap-3 rounded border border-maha-300 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-heading transition-colors hover:border-subheading hover:bg-maha-100",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4", strokeWidth: 1.5 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Xem Menu" })
            ]
          }
        ),
        availableLocales.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap items-center gap-2", children: availableLocales.map((code) => /* @__PURE__ */ jsxRuntimeExports.jsx(
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
    ] }) }),
    sectionVisibility.contact && /* @__PURE__ */ jsxRuntimeExports.jsx(MenuContact, { data: contact })
  ] });
}
export {
  MenuBranch as default
};
