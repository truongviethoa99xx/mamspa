import { jsx, jsxs } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { P as PublicLayout } from "./PublicLayout-B7nDyDjV.js";
import { H as Hero } from "./Hero-DI8c9mRY.js";
import { useEffect } from "react";
import { u as useLocale, s as stripTags, t as tr, a as truncate } from "./useLocale-CGFjb2L7.js";
import "lucide-react";
import "react-i18next";
import "clsx";
import "tailwind-merge";
const STYLE_ID = "custom-page-body-style";
function CustomPageBody({ html, css, js }) {
  useEffect(() => {
    if (!css) {
      return;
    }
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, [css]);
  useEffect(() => {
    if (!js) {
      return;
    }
    const script = document.createElement("script");
    script.textContent = js;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [js]);
  if (!html) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: html } });
}
function CustomPageShow({ banner, bannerVisible, metaDescription, body }) {
  const locale = useLocale();
  const title = stripTags(tr(banner.heading, locale)) || void 0;
  const description = truncate(stripTags(tr(metaDescription, locale)) || stripTags(body.html ?? ""), 160);
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title, children: description && /* @__PURE__ */ jsx("meta", { name: "description", content: description }) }),
    bannerVisible && /* @__PURE__ */ jsx(Hero, { data: banner }),
    /* @__PURE__ */ jsx(CustomPageBody, { ...body })
  ] });
}
export {
  CustomPageShow as default
};
