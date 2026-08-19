import { j as jsxRuntimeExports, S as Se, x as xe } from "../ssr.js";
import { P as PublicLayout } from "./PublicLayout-Bx-nt6O1.js";
import { d as useTranslation } from "./useLocale-NX8WGOIg.js";
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
function NotFound() {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Se, { title: t("notFound.title") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center sm:py-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-6xl text-maha-800 sm:text-7xl", children: t("notFound.heading") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-serif text-2xl text-ink sm:text-3xl", children: t("notFound.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm font-light text-ink/70 sm:text-base", children: t("notFound.description") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        xe,
        {
          href: "/",
          className: "mt-8 rounded-full bg-maha-800 px-8 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90",
          children: t("notFound.backHome")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 border-t border-maha-200 pt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.15em] text-maha-500", children: t("notFound.suggestionsTitle") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(xe, { href: "/dich-vu/", className: "text-maha-800 underline underline-offset-4 hover:text-maha-500", children: t("notFound.exploreServices") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(xe, { href: "/lien-he/", className: "text-maha-800 underline underline-offset-4 hover:text-maha-500", children: t("notFound.contact") })
        ] })
      ] })
    ] })
  ] });
}
export {
  NotFound as default
};
