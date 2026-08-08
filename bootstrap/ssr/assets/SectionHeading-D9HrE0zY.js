import { jsxs, jsx } from "react/jsx-runtime";
import { c as cn } from "./useLocale-CGFjb2L7.js";
function SectionHeading({ label, heading, size = "md", align = "left", className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-2", align === "center" && "text-center", className), children: [
    label && /* @__PURE__ */ jsx("span", { className: "block font-serif text-sm uppercase tracking-[0.2em] text-subheading", children: label }),
    /* @__PURE__ */ jsx(
      "h2",
      {
        className: cn(
          "rich-content font-serif leading-tight text-heading",
          size === "lg" ? "text-3xl sm:text-4xl md:text-5xl" : "text-3xl sm:text-4xl"
        ),
        dangerouslySetInnerHTML: { __html: heading }
      }
    )
  ] });
}
export {
  SectionHeading as S
};
