import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { P as PublicLayout } from "./PublicLayout-B7nDyDjV.js";
import "react";
import "lucide-react";
import "./useLocale-CGFjb2L7.js";
import "clsx";
import "tailwind-merge";
function NotFound() {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: t("notFound.title") }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center sm:py-32", children: [
      /* @__PURE__ */ jsx("p", { className: "font-serif text-6xl text-maha-800 sm:text-7xl", children: t("notFound.heading") }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 font-serif text-2xl text-ink sm:text-3xl", children: t("notFound.title") }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm font-light text-ink/70 sm:text-base", children: t("notFound.description") }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/",
          className: "mt-8 rounded-full bg-maha-800 px-8 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90",
          children: t("notFound.backHome")
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 border-t border-maha-200 pt-8", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.15em] text-maha-500", children: t("notFound.suggestionsTitle") }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm", children: [
          /* @__PURE__ */ jsx(Link, { href: "/dich-vu/", className: "text-maha-800 underline underline-offset-4 hover:text-maha-500", children: t("notFound.exploreServices") }),
          /* @__PURE__ */ jsx(Link, { href: "/lien-he/", className: "text-maha-800 underline underline-offset-4 hover:text-maha-500", children: t("notFound.contact") })
        ] })
      ] })
    ] })
  ] });
}
export {
  NotFound as default
};
