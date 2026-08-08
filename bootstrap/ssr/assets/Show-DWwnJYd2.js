import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef, useMemo } from "react";
import { Link, Head } from "@inertiajs/react";
import { P as PublicLayout } from "./PublicLayout-B7nDyDjV.js";
import { c as cn, u as useLocale, t as tr, f as formatDate } from "./useLocale-CGFjb2L7.js";
import { B as Breadcrumb } from "./Breadcrumb-CY3ASVHf.js";
import { B as BlogPostCard, a as BlogNewsletter } from "./BlogNewsletter-C4zpkH5m.js";
import { List, Facebook, MessageCircle, Check, Copy, ArrowLeft, ArrowRight } from "lucide-react";
import "react-i18next";
import "clsx";
import "tailwind-merge";
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
  const [progress, setProgress] = useState(0);
  useEffect(() => {
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
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-x-0 top-0 z-40 h-1 bg-transparent", "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-heading transition-[width] duration-150 ease-out", style: { width: `${progress}%` } }) });
}
function TableOfContents({ items }) {
  var _a;
  const [activeId, setActiveId] = useState(((_a = items[0]) == null ? void 0 : _a.id) ?? null);
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      "aria-label": "Mục lục bài viết",
      className: "sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto rounded-3xl border border-[#CDBCA3] bg-white p-6 shadow-xl shadow-maha-900/5 lg:block",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-serif text-lg text-heading", children: [
          /* @__PURE__ */ jsx(List, { className: "h-4 w-4 text-subheading", strokeWidth: 1.5 }),
          "Mục lục"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "mt-3 block h-px w-10 bg-subheading/50", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-1 border-l border-maha-200 text-sm", children: items.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
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
  const [copied, setCopied] = useState(false);
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
  return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-2", className), children: [
    links.map((link) => /* @__PURE__ */ jsx(
      "a",
      {
        href: link.href,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": link.label,
        className: "flex h-9 w-9 items-center justify-center rounded-full bg-maha-100 text-heading transition-colors hover:bg-maha-200",
        children: /* @__PURE__ */ jsx(link.icon, { className: "h-4 w-4", strokeWidth: 1.5 })
      },
      link.label
    )),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: copyLink,
        "aria-label": "Sao chép liên kết",
        className: "flex h-9 w-9 items-center justify-center rounded-full bg-maha-100 text-heading transition-colors hover:bg-maha-200",
        children: copied ? /* @__PURE__ */ jsx(Check, { className: "h-4 w-4", strokeWidth: 1.5 }) : /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4", strokeWidth: 1.5 })
      }
    )
  ] });
}
function AuthorCard({ name, avatar }) {
  return /* @__PURE__ */ jsxs("div", { className: "mt-12 flex items-center gap-4 rounded-2xl border border-[#CDBCA3] bg-white p-5 shadow-sm", children: [
    /* @__PURE__ */ jsx("div", { className: "h-14 w-14 shrink-0 overflow-hidden rounded-full bg-maha-200", children: avatar && /* @__PURE__ */ jsx("img", { src: avatar, alt: name, className: "h-full w-full object-cover", loading: "lazy" }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wide text-subheading", children: "Người viết" }),
      /* @__PURE__ */ jsx("p", { className: "mt-0.5 font-serif text-lg text-heading", children: name }),
      /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm text-ink/60", children: "Đội ngũ biên tập Mầm Spa" })
    ] })
  ] });
}
function ArticleNav({ previous, next }) {
  if (!previous && !next) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "mt-12 grid grid-cols-1 gap-4 border-t border-maha-200 pt-8 sm:grid-cols-2", children: [
    /* @__PURE__ */ jsx(NavCard, { post: previous, direction: "previous" }),
    /* @__PURE__ */ jsx(NavCard, { post: next, direction: "next" })
  ] });
}
function NavCard({ post, direction }) {
  const locale = useLocale();
  if (!post) {
    return /* @__PURE__ */ jsx("div", { "aria-hidden": "true" });
  }
  const title = tr(post.title, locale);
  const isNext = direction === "next";
  return /* @__PURE__ */ jsxs(
    Link,
    {
      href: `/tin-tuc/${post.slug}/`,
      className: cn(
        "group flex items-center gap-3 rounded-2xl border border-maha-200 bg-white p-4 transition-colors hover:border-[#CDBCA3]",
        isNext && "sm:flex-row-reverse sm:text-right"
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-maha-200", children: post.cover_image && /* @__PURE__ */ jsx("img", { src: post.cover_image, alt: "", className: "h-full w-full object-cover", loading: "lazy" }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-subheading", children: [
            !isNext && /* @__PURE__ */ jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
            isNext ? "Bài sau" : "Bài trước",
            isNext && /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 line-clamp-2 font-serif text-sm leading-snug text-heading transition-colors group-hover:text-subheading", children: title })
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
  const articleRef = useRef(null);
  const seoTitle = tr(post.seo.title, locale) || title;
  const seoDescription = tr(post.seo.description, locale);
  const { html: body, toc } = useMemo(() => extractToc(rawBody), [rawBody]);
  const breadcrumbItems = [HOME_CRUMB, BLOG_CRUMB, { name: title }];
  return /* @__PURE__ */ jsxs(PublicLayout, { mainClassName: "bg-maha-50", minimalHeader: true, children: [
    /* @__PURE__ */ jsxs(Head, { title: seoTitle || "Blog", children: [
      seoDescription && /* @__PURE__ */ jsx("meta", { name: "description", content: seoDescription }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "article" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: seoTitle }),
      seoDescription && /* @__PURE__ */ jsx("meta", { property: "og:description", content: seoDescription }),
      post.cover_image && /* @__PURE__ */ jsx("meta", { property: "og:image", content: post.cover_image }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: post.cover_image ? "summary_large_image" : "summary" })
    ] }),
    /* @__PURE__ */ jsx(ReadingProgressBar, { targetRef: articleRef }),
    /* @__PURE__ */ jsx("header", { className: "px-5 pb-10 pt-28 sm:px-10 sm:pt-32 lg:px-16 lg:pt-36", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsx(Breadcrumb, { items: breadcrumbItems, className: "mb-8" }),
      post.category && /* @__PURE__ */ jsx("p", { className: "font-serif text-base italic text-subheading", children: post.category }),
      /* @__PURE__ */ jsx("h1", { className: "mt-1 font-serif text-3xl leading-snug tracking-wide text-heading sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-snug", children: title }),
      excerpt && /* @__PURE__ */ jsx(
        "div",
        {
          className: "rich-content mt-4 max-w-3xl text-lg leading-relaxed text-ink/70",
          dangerouslySetInnerHTML: { __html: excerpt }
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-maha-200 py-4", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-ink/60", children: [
          post.author && /* @__PURE__ */ jsxs(Fragment, { children: [
            post.author,
            " · "
          ] }),
          formatDate(post.published_at),
          " · ",
          post.reading_minutes,
          " phút đọc"
        ] }),
        /* @__PURE__ */ jsx(ArticleShare, { title })
      ] })
    ] }) }),
    post.cover_image && /* @__PURE__ */ jsx("div", { className: "px-5 sm:px-10 lg:px-16", children: /* @__PURE__ */ jsx("div", { className: "mx-auto aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-3xl bg-maha-200", children: /* @__PURE__ */ jsx("img", { src: post.cover_image, alt: imageAlt, className: "h-full w-full object-cover" }) }) }),
    /* @__PURE__ */ jsx("article", { ref: articleRef, className: "px-5 py-12 sm:px-10 sm:py-14 lg:px-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-5xl gap-10 lg:grid-cols-[2fr_5fr] lg:gap-16", children: [
      /* @__PURE__ */ jsx(TableOfContents, { items: toc }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        body && /* @__PURE__ */ jsx("div", { className: "blog-article", dangerouslySetInnerHTML: { __html: body } }),
        post.author && /* @__PURE__ */ jsx(AuthorCard, { name: post.author, avatar: post.author_avatar }),
        /* @__PURE__ */ jsx(ArticleNav, { previous, next })
      ] })
    ] }) }),
    related.length > 0 && /* @__PURE__ */ jsx("section", { className: "px-5 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsx("p", { className: "font-serif text-base italic text-subheading", children: "Bài viết liên quan" }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3", children: related.map((relatedPost) => /* @__PURE__ */ jsx(BlogPostCard, { data: relatedPost }, relatedPost.id)) })
    ] }) }),
    /* @__PURE__ */ jsx(BlogNewsletter, {})
  ] });
}
export {
  BlogShow as default
};
