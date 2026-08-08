import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
import { c as cn } from "./useLocale-CGFjb2L7.js";
function Breadcrumb({ items, className, variant = "dark" }) {
  if (!items.length) return null;
  const isLight = variant === "light";
  return /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", className: cn("text-xs", isLight ? "text-white/70" : "text-ink/60", className), children: /* @__PURE__ */ jsx("ol", { className: "flex flex-nowrap items-center gap-x-1.5 whitespace-nowrap", children: items.map((item, index) => /* @__PURE__ */ jsxs("li", { className: "flex shrink-0 items-center gap-x-1.5", children: [
    index > 0 && /* @__PURE__ */ jsx(ChevronRight, { className: cn("h-3 w-3", isLight ? "text-white/40" : "text-ink/40"), "aria-hidden": "true" }),
    item.url ? /* @__PURE__ */ jsx(
      Link,
      {
        href: item.url,
        className: cn("transition-colors", isLight ? "hover:text-white" : "hover:text-heading"),
        children: item.name
      }
    ) : /* @__PURE__ */ jsx("span", { "aria-current": "page", className: isLight ? "text-white" : "text-heading", children: item.name })
  ] }, index)) }) });
}
export {
  Breadcrumb as B
};
