import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { P as PublicLayout } from "./PublicLayout-B7nDyDjV.js";
import { B as Breadcrumb } from "./Breadcrumb-CY3ASVHf.js";
import { f as formatDate } from "./useLocale-CGFjb2L7.js";
import "react";
import "lucide-react";
import "react-i18next";
import "clsx";
import "tailwind-merge";
const HOME_CRUMB = { name: "Trang chủ", url: "/" };
function ChinhSachShow({ page, other }) {
  const title = page.name;
  return /* @__PURE__ */ jsxs(PublicLayout, { minimalHeader: true, children: [
    /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsx("header", { className: "px-5 pb-8 pt-28 sm:px-10 sm:pt-32 lg:px-16 lg:pt-36", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsx(Breadcrumb, { items: [HOME_CRUMB, { name: title }], className: "mb-8" }),
      /* @__PURE__ */ jsx("p", { className: "font-serif text-base italic text-subheading", children: "Chính sách" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-1 font-serif text-3xl leading-snug tracking-wide text-heading sm:text-4xl lg:text-5xl", children: page.name }),
      page.updated_at && /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm text-ink/50", children: [
        "Cập nhật lần cuối: ",
        formatDate(page.updated_at)
      ] })
    ] }) }),
    page.featured_image && /* @__PURE__ */ jsx("div", { className: "px-5 sm:px-10 lg:px-16", children: /* @__PURE__ */ jsx("div", { className: "mx-auto aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-3xl bg-maha-200", children: /* @__PURE__ */ jsx("img", { src: page.featured_image, alt: title, className: "h-full w-full object-cover" }) }) }),
    /* @__PURE__ */ jsx("article", { className: "px-5 py-12 sm:px-10 sm:py-14 lg:px-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-5xl gap-10 lg:grid-cols-[5fr_2fr] lg:gap-16", children: [
      /* @__PURE__ */ jsx("div", { className: "min-w-0", children: page.content && /* @__PURE__ */ jsx("div", { className: "blog-article", dangerouslySetInnerHTML: { __html: page.content } }) }),
      other.length > 0 && /* @__PURE__ */ jsxs("aside", { className: "lg:sticky lg:top-28 lg:self-start", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.15em] text-maha-500", children: "Xem thêm" }),
        /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-3 border-t border-maha-200 pt-4", children: other.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Link,
          {
            href: `/${item.slug}/`,
            className: "text-sm text-ink/70 underline-offset-4 transition-colors hover:text-maha-800 hover:underline",
            children: item.name
          }
        ) }, item.slug)) })
      ] })
    ] }) })
  ] });
}
export {
  ChinhSachShow as default
};
