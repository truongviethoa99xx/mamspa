import { j as jsxRuntimeExports, x as xe } from "../ssr.js";
import { c as cn } from "./useLocale-DGbYLJ9C.js";
import { C as ChevronRight } from "./chevron-right-Bj4Bao04.js";
function Breadcrumb({ items, className, variant = "dark" }) {
  if (!items.length) return null;
  const isLight = variant === "light";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "Breadcrumb", className: cn("text-xs", isLight ? "text-white/70" : "text-ink/60", className), children: /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "flex flex-nowrap items-center gap-x-1.5 whitespace-nowrap", children: items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex shrink-0 items-center gap-x-1.5", children: [
    index > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: cn("h-3 w-3", isLight ? "text-white/40" : "text-ink/40"), "aria-hidden": "true" }),
    item.url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      xe,
      {
        href: item.url,
        className: cn("transition-colors", isLight ? "hover:text-white" : "hover:text-heading"),
        children: item.name
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-current": "page", className: isLight ? "text-white" : "text-heading", children: item.name })
  ] }, index)) }) });
}
export {
  Breadcrumb as B
};
