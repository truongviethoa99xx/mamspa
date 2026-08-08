import { jsx, jsxs } from "react/jsx-runtime";
import { Link, router, Head } from "@inertiajs/react";
import { P as PublicLayout } from "./PublicLayout-B7nDyDjV.js";
import { C as CategoryHero } from "./CategoryHero-EgN955Kt.js";
import { Leaf, Flower2, Droplet, HeartHandshake, ArrowRight, ArrowLeft, Sprout, Sun } from "lucide-react";
import { c as cn, u as useLocale, t as tr, f as formatDate } from "./useLocale-CGFjb2L7.js";
import { useState } from "react";
import { B as BlogPostCard, a as BlogNewsletter } from "./BlogNewsletter-C4zpkH5m.js";
import "react-i18next";
import "./Breadcrumb-CY3ASVHf.js";
import "clsx";
import "tailwind-merge";
const ICONS = [Leaf, Flower2, Droplet, HeartHandshake];
function BlogCategoryFilter({
  categories,
  activeCategory
}) {
  if (!categories.length) {
    return null;
  }
  return /* @__PURE__ */ jsx("section", { className: "relative z-10 px-5 sm:px-10 lg:px-16", children: /* @__PURE__ */ jsx("div", { className: "mx-auto -mt-8 max-w-7xl rounded-lg bg-white px-4 py-5 shadow-[0_10px_40px_-15px_rgba(47,62,46,0.25)] sm:-mt-10 sm:px-8 sm:py-6", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-5 divide-y divide-maha-100 sm:grid-cols-2 sm:gap-6 sm:divide-y-0 lg:grid-cols-4", children: categories.map((item, index) => {
    const Icon = ICONS[index % ICONS.length];
    const isActive = activeCategory === item.name;
    const href = isActive ? "/tin-tuc/" : `/tin-tuc/?category=${encodeURIComponent(item.name)}`;
    return /* @__PURE__ */ jsxs(
      Link,
      {
        href,
        className: cn(
          "flex items-center gap-3 pt-5 transition-colors first:pt-0 sm:pt-0",
          isActive ? "text-subheading" : "text-heading"
        ),
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                isActive ? "bg-subheading text-white" : "bg-maha-100 text-subheading"
              ),
              children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5", strokeWidth: 1.5 })
            }
          ),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("span", { className: "block text-sm font-semibold uppercase tracking-wide", children: item.name }),
            /* @__PURE__ */ jsxs("span", { className: "mt-0.5 block text-xs text-ink/60", children: [
              item.count,
              " bài viết"
            ] })
          ] })
        ]
      },
      item.name
    );
  }) }) }) });
}
function BlogFeatured({
  featured,
  recentPosts
}) {
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  if (!featured.length) {
    return null;
  }
  const current = featured[activeIndex];
  const title = tr(current.title, locale);
  const excerpt = tr(current.excerpt, locale);
  const imageAlt = tr(current.cover_image_alt, locale) || title;
  const hasCarousel = featured.length > 1;
  const goTo = (index) => setActiveIndex((index + featured.length) % featured.length);
  return /* @__PURE__ */ jsx("section", { className: "px-5 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 lg:grid-cols-[7fr_5fr] lg:gap-12", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "font-serif text-xs uppercase tracking-[0.2em] text-subheading", children: "Bài viết nổi bật" }),
      /* @__PURE__ */ jsx(Link, { href: `/tin-tuc/${current.slug}/`, className: "group mt-5 block", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/11] w-full overflow-hidden rounded-sm bg-maha-200", children: [
        current.cover_image && /* @__PURE__ */ jsx(
          "img",
          {
            src: current.cover_image,
            alt: imageAlt,
            className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          }
        ),
        current.category && /* @__PURE__ */ jsx("span", { className: "absolute bottom-4 left-4 rounded-sm bg-heading/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white", children: current.category })
      ] }) }),
      /* @__PURE__ */ jsxs("p", { className: "mt-5 text-xs text-ink/60", children: [
        formatDate(current.published_at),
        " · ",
        current.reading_minutes,
        " phút đọc"
      ] }),
      /* @__PURE__ */ jsx(Link, { href: `/tin-tuc/${current.slug}/`, className: "mt-2 block", children: /* @__PURE__ */ jsx("h2", { className: "font-serif text-2xl leading-snug text-heading transition-colors hover:text-subheading sm:text-3xl", children: title }) }),
      excerpt && /* @__PURE__ */ jsx(
        "div",
        {
          className: "rich-content mt-3 max-w-xl text-sm leading-relaxed text-ink/70",
          dangerouslySetInnerHTML: { __html: excerpt }
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: `/tin-tuc/${current.slug}/`,
            className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-heading transition-colors hover:text-subheading",
            children: [
              "Đọc tiếp",
              /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
            ]
          }
        ),
        hasCarousel && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5", children: featured.map((item, index) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveIndex(index),
              "aria-label": `Xem bài viết nổi bật ${index + 1}`,
              "aria-current": index === activeIndex,
              className: cn(
                "h-1.5 rounded-full transition-all",
                index === activeIndex ? "w-6 bg-heading" : "w-1.5 bg-maha-300"
              )
            },
            item.id
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => goTo(activeIndex - 1),
                "aria-label": "Bài viết nổi bật trước",
                className: "flex h-8 w-8 items-center justify-center rounded-full border border-maha-200 text-heading transition-colors hover:bg-maha-100",
                children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => goTo(activeIndex + 1),
                "aria-label": "Bài viết nổi bật tiếp theo",
                className: "flex h-8 w-8 items-center justify-center rounded-full border border-maha-200 text-heading transition-colors hover:bg-maha-100",
                children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
              }
            )
          ] })
        ] })
      ] })
    ] }),
    recentPosts.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("p", { className: "font-serif text-xs uppercase tracking-[0.2em] text-subheading", children: "Bài viết mới" }),
        /* @__PURE__ */ jsx("a", { href: "#kham-pha-them", className: "text-xs font-semibold uppercase tracking-wide text-heading hover:text-subheading", children: "Xem tất cả →" })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-5", children: recentPosts.map((post) => /* @__PURE__ */ jsx(RecentPostRow, { data: post }, post.id)) })
    ] })
  ] }) });
}
function RecentPostRow({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const imageAlt = tr(data.cover_image_alt, locale) || title;
  return /* @__PURE__ */ jsx("li", { className: "border-b border-maha-100 pb-5 last:border-b-0 last:pb-0", children: /* @__PURE__ */ jsxs(Link, { href: `/tin-tuc/${data.slug}/`, className: "group flex items-start gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-maha-200", children: data.cover_image && /* @__PURE__ */ jsx("img", { src: data.cover_image, alt: imageAlt, className: "h-full w-full object-cover", loading: "lazy" }) }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      data.category && /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-wide text-subheading", children: data.category }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 line-clamp-2 font-serif text-sm leading-snug text-heading transition-colors group-hover:text-subheading", children: title }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-ink/50", children: [
        formatDate(data.published_at),
        " · ",
        data.reading_minutes,
        " phút đọc"
      ] })
    ] })
  ] }) });
}
function BlogExploreGrid({ posts }) {
  const [items, setItems] = useState(posts.data);
  const [nextPageUrl, setNextPageUrl] = useState(posts.next_page_url);
  const [loading, setLoading] = useState(false);
  if (!items.length) {
    return null;
  }
  const loadMore = () => {
    if (!nextPageUrl || loading) return;
    setLoading(true);
    router.get(
      nextPageUrl,
      {},
      {
        preserveScroll: true,
        preserveState: true,
        only: ["posts"],
        onSuccess: (page) => {
          const next = page.props.posts;
          setItems((prev) => [...prev, ...next.data]);
          setNextPageUrl(next.next_page_url);
        },
        onFinish: () => setLoading(false)
      }
    );
  };
  return /* @__PURE__ */ jsx("section", { id: "kham-pha-them", className: "bg-maha-50 px-5 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsx("p", { className: "font-serif text-xs uppercase tracking-[0.2em] text-subheading", children: "Khám phá thêm" }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3", children: items.map((post) => /* @__PURE__ */ jsx(BlogPostCard, { data: post }, post.id)) }),
    nextPageUrl && /* @__PURE__ */ jsx("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: loadMore,
        disabled: loading,
        className: "rounded-md border border-heading px-7 py-3 text-sm font-semibold uppercase tracking-wide text-heading transition-colors hover:bg-heading hover:text-white disabled:cursor-not-allowed disabled:opacity-60",
        children: loading ? "Đang tải..." : "Xem thêm bài viết"
      }
    ) })
  ] }) });
}
const ITEMS = [
  { icon: Leaf, title: "Liệu pháp chuẩn Việt", description: "Kết hợp tinh hoa trị liệu truyền thống và kiến thức hiện đại" },
  { icon: HeartHandshake, title: "Chăm sóc từ trái tim", description: "Tinh tế trong từng chi tiết, tận tâm trong từng liệu trình" },
  { icon: Sprout, title: "Nguyên liệu thiên nhiên", description: "Lựa chọn lành tính, an toàn và hiệu quả" },
  { icon: Sun, title: "Không gian an yên", description: "Nơi bạn được lắng nghe, thư giãn và tái tạo năng lượng" }
];
function BlogCommitments() {
  return /* @__PURE__ */ jsx("section", { className: "bg-white px-5 py-10 sm:px-10 sm:py-12 lg:px-16", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 divide-y divide-maha-200 sm:grid-cols-4 sm:divide-y-0", children: ITEMS.map((item) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex flex-col items-center gap-2 border-maha-200 px-4 py-6 text-center sm:border-l sm:first:border-l-0",
      children: [
        /* @__PURE__ */ jsx(item.icon, { className: "h-7 w-7 text-subheading", strokeWidth: 1.25 }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm font-semibold text-heading", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed text-ink/70", children: item.description })
      ]
    },
    item.title
  )) }) }) });
}
const HERO_BREADCRUMB = [{ name: "Trang chủ", url: "/" }, { name: "Blog" }];
function BlogIndex({
  hero,
  featured,
  recentPosts,
  posts,
  categories,
  activeCategory,
  sectionVisibility
}) {
  const heroData = {
    heading: hero.title,
    subtitle: hero.subtitle,
    image: hero.image,
    imageAlt: hero.image_alt
  };
  return /* @__PURE__ */ jsxs(PublicLayout, { mainClassName: "bg-white", children: [
    /* @__PURE__ */ jsx(Head, { title: "Blog" }),
    sectionVisibility.hero && /* @__PURE__ */ jsx(CategoryHero, { data: heroData, breadcrumb: HERO_BREADCRUMB, showCta: false }),
    /* @__PURE__ */ jsx(BlogCategoryFilter, { categories, activeCategory }),
    featured.length > 0 ? /* @__PURE__ */ jsx(BlogFeatured, { featured, recentPosts }) : /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-7xl px-5 py-16 text-center text-sm text-ink/60 sm:px-10 lg:px-16", children: "Chưa có bài viết nào được đăng tải." }),
    /* @__PURE__ */ jsx(BlogExploreGrid, { posts }),
    /* @__PURE__ */ jsx(BlogNewsletter, {}),
    /* @__PURE__ */ jsx(BlogCommitments, {})
  ] });
}
export {
  BlogIndex as default
};
