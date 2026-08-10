import { r as reactExports, j as jsxRuntimeExports, x as xe, S as Se } from "../ssr.js";
import { M as MessageCircle, P as PublicLayout } from "./PublicLayout-D0TZvdKG.js";
import { a as createLucideIcon, c as cn, C as Check, u as useLocale, t as tr, f as formatDate } from "./useLocale-BQAiG63T.js";
import { B as Breadcrumb } from "./Breadcrumb-BEbxDM1x.js";
import { A as ArrowLeft, B as BlogPostCard, a as BlogNewsletter } from "./BlogNewsletter-CNi_UBxO.js";
import { A as ArrowRight } from "./arrow-right-BARmMJBD.js";
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
import "./chevron-right-DlOXaoUS.js";
/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Copy = createLucideIcon("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);
/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Facebook = createLucideIcon("Facebook", [
  [
    "path",
    { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "1jg4f8" }
  ]
]);
/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const List = createLucideIcon("List", [
  ["line", { x1: "8", x2: "21", y1: "6", y2: "6", key: "7ey8pc" }],
  ["line", { x1: "8", x2: "21", y1: "12", y2: "12", key: "rjfblc" }],
  ["line", { x1: "8", x2: "21", y1: "18", y2: "18", key: "c3b1m8" }],
  ["line", { x1: "3", x2: "3.01", y1: "6", y2: "6", key: "1g7gq3" }],
  ["line", { x1: "3", x2: "3.01", y1: "12", y2: "12", key: "1pjlvk" }],
  ["line", { x1: "3", x2: "3.01", y1: "18", y2: "18", key: "28t2mc" }]
]);
const COMBINING_MARKS = /[̀-ͯ]/g;
function slugify(text, usedIds) {
  const base = text.toLowerCase().replace(/đ/g, "d").normalize("NFD").replace(COMBINING_MARKS, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "section";
  let slug = base;
  let suffix = 2;
  while (usedIds.has(slug)) {
    slug = `${base}-${suffix++}`;
  }
  usedIds.add(slug);
  return slug;
}
function extractToc(html) {
  const usedIds = /* @__PURE__ */ new Set();
  const toc = [];
  const withIds = html.replace(/<(h2|h3)([^>]*)>(.*?)<\/\1>/gis, (match, tag, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    if (!text) return match;
    const id = slugify(text, usedIds);
    toc.push({ id, text, level: tag.toLowerCase() === "h2" ? 2 : 3 });
    const newAttrs = /\sid=/i.test(attrs) ? attrs : `${attrs} id="${id}"`;
    return `<${tag}${newAttrs}>${inner}</${tag}>`;
  });
  return { html: withIds, toc };
}
function ReadingProgressBar({ targetRef }) {
  const [progress, setProgress] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const update = () => {
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const ratio = total > 0 ? scrolled / total : 0;
      setProgress(Math.min(100, Math.max(0, ratio * 100)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetRef]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-x-0 top-0 z-40 h-1 bg-transparent", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-heading transition-[width] duration-150 ease-out", style: { width: `${progress}%` } }) });
}
function TableOfContents({ items }) {
  var _a;
  const [activeId, setActiveId] = reactExports.useState(((_a = items[0]) == null ? void 0 : _a.id) ?? null);
  reactExports.useEffect(() => {
    if (!items.length) return;
    const elements = items.map((item) => document.getElementById(item.id)).filter((el) => !!el);
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);
  if (!items.length) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "nav",
    {
      "aria-label": "Mục lục bài viết",
      className: "sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto rounded-3xl border border-[#CDBCA3] bg-white p-6 shadow-xl shadow-maha-900/5 lg:block",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-serif text-lg text-heading", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4 text-subheading", strokeWidth: 1.5 }),
          "Mục lục"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-3 block h-px w-10 bg-subheading/50", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-1 border-l border-maha-200 text-sm", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `#${item.id}`,
            className: cn(
              "block border-l-2 py-1.5 pl-4 -ml-px transition-colors",
              item.level === 3 && "pl-7",
              activeId === item.id ? "border-heading font-semibold text-heading" : "border-transparent text-ink/60 hover:text-heading"
            ),
            children: item.text
          }
        ) }, item.id)) })
      ]
    }
  );
}
function ArticleShare({ title, className }) {
  const [copied, setCopied] = reactExports.useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const links = [
    {
      label: "Chia sẻ lên Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      label: "Chia sẻ qua Zalo",
      icon: MessageCircle,
      href: `https://sp.zalo.me/share?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`
    }
  ];
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center gap-2", className), children: [
    links.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: link.href,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": link.label,
        className: "flex h-9 w-9 items-center justify-center rounded-full bg-maha-100 text-heading transition-colors hover:bg-maha-200",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(link.icon, { className: "h-4 w-4", strokeWidth: 1.5 })
      },
      link.label
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: copyLink,
        "aria-label": "Sao chép liên kết",
        className: "flex h-9 w-9 items-center justify-center rounded-full bg-maha-100 text-heading transition-colors hover:bg-maha-200",
        children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4", strokeWidth: 1.5 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4", strokeWidth: 1.5 })
      }
    )
  ] });
}
function AuthorCard({ name, avatar }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex items-center gap-4 rounded-2xl border border-[#CDBCA3] bg-white p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 shrink-0 overflow-hidden rounded-full bg-maha-200", children: avatar && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatar, alt: name, className: "h-full w-full object-cover", loading: "lazy" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wide text-subheading", children: "Người viết" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 font-serif text-lg text-heading", children: name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-ink/60", children: "Đội ngũ biên tập Mầm Spa" })
    ] })
  ] });
}
function ArticleNav({ previous, next }) {
  if (!previous && !next) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid grid-cols-1 gap-4 border-t border-maha-200 pt-8 sm:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavCard, { post: previous, direction: "previous" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavCard, { post: next, direction: "next" })
  ] });
}
function NavCard({ post, direction }) {
  const locale = useLocale();
  if (!post) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": "true" });
  }
  const title = tr(post.title, locale);
  const isNext = direction === "next";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    xe,
    {
      href: `/tin-tuc/${post.slug}/`,
      className: cn(
        "group flex items-center gap-3 rounded-2xl border border-maha-200 bg-white p-4 transition-colors hover:border-[#CDBCA3]",
        isNext && "sm:flex-row-reverse sm:text-right"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-maha-200", children: post.cover_image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.cover_image, alt: "", className: "h-full w-full object-cover", loading: "lazy" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-subheading", children: [
            !isNext && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
            isNext ? "Bài sau" : "Bài trước",
            isNext && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 font-serif text-sm leading-snug text-heading transition-colors group-hover:text-subheading", children: title })
        ] })
      ]
    }
  );
}
const HOME_CRUMB = { name: "Trang chủ", url: "/" };
const BLOG_CRUMB = { name: "Blog", url: "/tin-tuc/" };
function BlogShow({ post, related, previous, next }) {
  const locale = useLocale();
  const title = tr(post.title, locale);
  const excerpt = tr(post.excerpt, locale);
  const rawBody = tr(post.body, locale);
  const imageAlt = tr(post.cover_image_alt, locale) || title;
  const articleRef = reactExports.useRef(null);
  const seoTitle = tr(post.seo.title, locale) || title;
  const seoDescription = tr(post.seo.description, locale);
  const { html: body, toc } = reactExports.useMemo(() => extractToc(rawBody), [rawBody]);
  const breadcrumbItems = [HOME_CRUMB, BLOG_CRUMB, { name: title }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { mainClassName: "bg-maha-50", minimalHeader: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Se, { title: seoTitle || "Blog", children: [
      seoDescription && /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: seoDescription }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: "article" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:title", content: seoTitle }),
      seoDescription && /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:description", content: seoDescription }),
      post.cover_image && /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image", content: post.cover_image }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:card", content: post.cover_image ? "summary_large_image" : "summary" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReadingProgressBar, { targetRef: articleRef }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "px-5 pb-10 pt-28 sm:px-10 sm:pt-32 lg:px-16 lg:pt-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { items: breadcrumbItems, className: "mb-8" }),
      post.category && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-base italic text-subheading", children: post.category }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-serif text-3xl leading-snug tracking-wide text-heading sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-snug", children: title }),
      excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rich-content mt-4 max-w-3xl text-lg leading-relaxed text-ink/70",
          dangerouslySetInnerHTML: { __html: excerpt }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-maha-200 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-ink/60", children: [
          post.author && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            post.author,
            " · "
          ] }),
          formatDate(post.published_at),
          " · ",
          post.reading_minutes,
          " phút đọc"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleShare, { title })
      ] })
    ] }) }),
    post.cover_image && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 sm:px-10 lg:px-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-3xl bg-maha-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.cover_image, alt: imageAlt, className: "h-full w-full object-cover" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("article", { ref: articleRef, className: "px-5 py-12 sm:px-10 sm:py-14 lg:px-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-5xl gap-10 lg:grid-cols-[2fr_5fr] lg:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableOfContents, { items: toc }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        body && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blog-article", dangerouslySetInnerHTML: { __html: body } }),
        post.author && /* @__PURE__ */ jsxRuntimeExports.jsx(AuthorCard, { name: post.author, avatar: post.author_avatar }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleNav, { previous, next })
      ] })
    ] }) }),
    related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-base italic text-subheading", children: "Bài viết liên quan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3", children: related.map((relatedPost) => /* @__PURE__ */ jsxRuntimeExports.jsx(BlogPostCard, { data: relatedPost }, relatedPost.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BlogNewsletter, {})
  ] });
}
export {
  BlogShow as default
};
