import { r as reactExports, j as jsxRuntimeExports, S as Se } from "../ssr.js";
import { P as PublicLayout } from "./PublicLayout-aRtbho-a.js";
import { H as Hero } from "./Hero-6EBq01_J.js";
import { u as useLocale, s as stripTags, t as tr, h as truncate } from "./useLocale-NX8WGOIg.js";
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
const STYLE_ID = "custom-page-body-style";
function CustomPageBody({ html, css, js }) {
  reactExports.useEffect(() => {
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
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: { __html: html } });
}
function CustomPageShow({ banner, bannerVisible, metaDescription, body }) {
  const locale = useLocale();
  const title = stripTags(tr(banner.heading, locale)) || void 0;
  const description = truncate(stripTags(tr(metaDescription, locale)) || stripTags(body.html ?? ""), 160);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Se, { title, children: description && /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: description }) }),
    bannerVisible && /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, { data: banner }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomPageBody, { ...body })
  ] });
}
export {
  CustomPageShow as default
};
