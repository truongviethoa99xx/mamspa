import { a as createLucideIcon, u as useLocale, t as tr, f as formatDate, c as cn } from "./useLocale-DGbYLJ9C.js";
import { j as jsxRuntimeExports, x as xe, G } from "../ssr.js";
import { a as Mail } from "./PublicLayout-DZ3wy7zq.js";
/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ArrowLeft = createLucideIcon("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
function BlogPostCard({ data, className }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const imageAlt = tr(data.cover_image_alt, locale) || title;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(xe, { href: `/tin-tuc/${data.slug}/`, className: cn("group block", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-maha-200", children: [
      data.cover_image && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: data.cover_image,
          alt: imageAlt,
          loading: "lazy",
          className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        }
      ),
      data.category && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-3 left-3 rounded-full bg-heading/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white", children: data.category })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 line-clamp-2 font-serif text-lg leading-snug text-heading transition-colors group-hover:text-subheading", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-ink/60", children: [
      formatDate(data.published_at),
      " · ",
      data.reading_minutes,
      " phút đọc"
    ] })
  ] });
}
function BlogNewsletter() {
  const form = G({ email: "", website: "" });
  const submit = (event) => {
    event.preventDefault();
    form.post("/newsletter", {
      preserveScroll: true,
      onSuccess: () => form.reset("email")
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-maha-100 px-5 py-12 sm:px-10 lg:px-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-subheading", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-5 w-5", strokeWidth: 1.5 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-xl text-heading sm:text-2xl", children: "Đăng ký nhận thông tin từ Mầm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-md text-sm text-ink/70", children: "Nhận những bài viết hữu ích, ưu đãi đặc biệt và cập nhật mới nhất từ Mầm Spa." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, noValidate: true, className: "w-full max-w-md lg:w-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          name: "website",
          value: form.data.website,
          onChange: (e) => form.setData("website", e.target.value),
          tabIndex: -1,
          autoComplete: "off",
          className: "absolute h-0 w-0 opacity-0",
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "email",
            required: true,
            value: form.data.email,
            onChange: (e) => form.setData("email", e.target.value),
            placeholder: "Nhập email của bạn",
            className: "input-base text-sm sm:w-64"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: form.processing,
            className: "shrink-0 rounded-md bg-heading px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
            children: form.processing ? "Đang gửi..." : "Đăng ký"
          }
        )
      ] }),
      form.errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-red-600", children: form.errors.email }),
      form.recentlySuccessful && !form.errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-subheading", children: "Cảm ơn bạn đã đăng ký!" }),
      !form.recentlySuccessful && !form.errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-ink/50", children: "Chúng tôi tôn trọng quyền riêng tư của bạn." })
    ] })
  ] }) });
}
export {
  ArrowLeft as A,
  BlogPostCard as B,
  BlogNewsletter as a
};
