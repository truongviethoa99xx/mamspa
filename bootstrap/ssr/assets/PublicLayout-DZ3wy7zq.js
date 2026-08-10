import { X, r as reactExports, j as jsxRuntimeExports, x as xe } from "../ssr.js";
import { a as createLucideIcon, b as ChevronDown, c as cn, C as Check, p as publicAssetUrl, X as X$1, d as useTranslation, e as Clock, u as useLocale } from "./useLocale-DGbYLJ9C.js";
/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ArrowUp = createLucideIcon("ArrowUp", [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
]);
/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ExternalLink = createLucideIcon("ExternalLink", [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
]);
/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mail = createLucideIcon("Mail", [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);
/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MapPin = createLucideIcon("MapPin", [
  ["path", { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z", key: "2oe9fu" }],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
]);
/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Menu = createLucideIcon("Menu", [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
]);
/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MessageCircle = createLucideIcon("MessageCircle", [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
]);
/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Phone = createLucideIcon("Phone", [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "foiqr5"
    }
  ]
]);
const LOCALE_META = {
  vi: { label: "Tiếng Việt", flag: "🇻🇳" },
  en: { label: "English", flag: "🇬🇧" },
  ja: { label: "日本語", flag: "🇯🇵" },
  ko: { label: "한국어", flag: "🇰🇷" },
  zh: { label: "中文", flag: "🇨🇳" }
};
const VISIBLE_LOCALES = ["vi", "en"];
function buildLocaleHref(url, locale) {
  const [path, query] = url.split("?");
  const params = new URLSearchParams(query);
  params.set("lang", locale);
  return `${path}?${params.toString()}`;
}
function LanguageSwitcher({ color, accentColor = "#2F3E2E", className, onNavigate, hideChevron }) {
  const { props, url } = X();
  const [open, setOpen] = reactExports.useState(false);
  const rootRef = reactExports.useRef(null);
  const locales = VISIBLE_LOCALES.filter((locale) => {
    var _a;
    return (_a = props.availableLocales) == null ? void 0 : _a.includes(locale);
  });
  reactExports.useEffect(() => {
    if (!open) {
      return;
    }
    function handleClickOutside(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);
  if (locales.length < 2) {
    return null;
  }
  const current = LOCALE_META[props.locale] ?? LOCALE_META.vi;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: rootRef, className: cn("relative", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((value) => !value),
        "aria-haspopup": "true",
        "aria-expanded": open,
        "aria-label": "Chuyển ngôn ngữ",
        className: "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-black/5",
        style: { color, borderColor: `${color}40` },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: current.flag }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: props.locale }),
          !hideChevron && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180") })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "menu",
        className: "absolute right-0 top-full z-40 mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-black/5 bg-white py-1 shadow-xl",
        children: locales.map((locale) => {
          const meta = LOCALE_META[locale] ?? { label: locale.toUpperCase(), flag: "" };
          const active = locale === props.locale;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            xe,
            {
              role: "menuitem",
              href: buildLocaleHref(url, locale),
              preserveScroll: true,
              onClick: () => {
                setOpen(false);
                onNavigate == null ? void 0 : onNavigate();
              },
              className: "flex items-center gap-2 px-3 py-2 text-sm text-stone-700 transition-colors hover:bg-stone-100",
              style: active ? { color: accentColor, fontWeight: 600 } : void 0,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: meta.flag }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: meta.label }),
                active && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4", style: { color: accentColor } })
              ]
            },
            locale
          );
        })
      }
    )
  ] });
}
const HEADER_HEIGHT = "100px";
const SCROLL_THRESHOLD = 10;
const SCROLLED_BACKGROUND = "rgba(0, 0, 0, 0.9)";
const SCROLLED_TEXT_COLOR = "#FFFFFF";
const NAV_ITEMS = [
  { label: "Trang chủ", href: "/" },
  { label: "Về Mầm", href: "/gioi-thieu/" },
  { label: "Dịch vụ", href: "/dich-vu/" },
  { label: "Ưu đãi", href: "/uu-dai/" },
  { label: "Blog", href: "/tin-tuc/" },
  { label: "Khách hàng", href: "/trai-nghiem-khach-hang/" },
  { label: "Liên hệ", href: "/lien-he/" }
];
function Header({ minimal = false }) {
  const { props, url } = X();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const site = props.site ?? {};
  const brandName = site.brand_name || "Mầm Spa";
  const logoUrl = publicAssetUrl(site.logo_path);
  const isTransparent = !!site.header_transparent;
  const textColor = site.header_text_color || "#2F3E2E";
  const configuredBackground = site.header_background_color || "#F6F3EF";
  const headerBackground = isTransparent ? "transparent" : configuredBackground;
  const ctaText = site.header_cta_text || "Đặt lịch ngay";
  const ctaBackground = site.header_cta_background_color || "#2F3E2E";
  const ctaTextColor = site.header_cta_text_color || "#FFFFFF";
  const currentPath = url.split("?")[0];
  const effectiveTextColor = scrolled ? SCROLLED_TEXT_COLOR : textColor;
  const effectiveBackground = scrolled ? SCROLLED_BACKGROUND : headerBackground;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    scrolled && !isTransparent && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, style: { height: HEADER_HEIGHT } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "header",
      {
        className: cn(
          "w-full",
          scrolled ? "fixed inset-x-0 top-0 z-50" : isTransparent ? "absolute inset-x-0 top-0 z-30" : "relative shrink-0"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "grid grid-cols-3 items-center gap-3 px-5 transition-colors duration-300 sm:gap-6 sm:px-10 lg:flex lg:justify-between",
              style: { height: HEADER_HEIGHT, backgroundColor: effectiveBackground, color: effectiveTextColor },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  xe,
                  {
                    href: "/",
                    className: "col-start-1 flex shrink-0 items-center justify-self-start gap-2 sm:gap-3 lg:col-auto",
                    children: logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoUrl, alt: brandName, className: "h-16 w-16 object-contain sm:h-20 sm:w-20" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-serif text-base uppercase tracking-[0.1em] sm:text-xl sm:tracking-[0.12em]",
                        style: { color: effectiveTextColor },
                        children: brandName
                      }
                    )
                  }
                ),
                !minimal && /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-8 lg:flex", children: NAV_ITEMS.map((item) => {
                  const active = item.href === "/" ? currentPath === "/" : currentPath.startsWith(item.href);
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    xe,
                    {
                      href: item.href,
                      className: cn(
                        "pb-1 text-sm font-medium uppercase tracking-wide opacity-80 transition-opacity hover:opacity-100",
                        active && "border-b-2 opacity-100"
                      ),
                      style: active ? { borderColor: effectiveTextColor, color: effectiveTextColor } : { color: effectiveTextColor },
                      children: item.label
                    },
                    item.href
                  );
                }) }),
                !minimal && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  LanguageSwitcher,
                  {
                    color: effectiveTextColor,
                    accentColor: ctaBackground,
                    className: "col-start-2 justify-self-center lg:hidden",
                    hideChevron: true
                  }
                ),
                !minimal && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setMobileOpen((open) => !open),
                    "aria-label": mobileOpen ? "Đóng menu" : "Mở menu",
                    "aria-expanded": mobileOpen,
                    className: "col-start-3 flex h-10 w-10 items-center justify-center justify-self-end rounded-md lg:hidden",
                    style: { color: effectiveTextColor },
                    children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X$1, { className: "h-6 w-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-6 w-6" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden shrink-0 items-center gap-4 lg:flex", children: [
                  !minimal && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    LanguageSwitcher,
                    {
                      color: effectiveTextColor,
                      accentColor: ctaBackground
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    xe,
                    {
                      href: "/dat-lich/",
                      className: "inline-block rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-opacity hover:opacity-90 sm:px-5 sm:py-2.5 sm:text-sm",
                      style: { backgroundColor: ctaBackground, color: ctaTextColor },
                      children: "Đặt lịch"
                    }
                  )
                ] })
              ]
            }
          ),
          !minimal && mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col gap-1 border-t px-5 py-4 shadow-lg lg:hidden",
              style: {
                backgroundColor: scrolled ? SCROLLED_BACKGROUND : configuredBackground,
                borderColor: `${effectiveTextColor}22`
              },
              children: [
                NAV_ITEMS.map((item) => {
                  const active = item.href === "/" ? currentPath === "/" : currentPath.startsWith(item.href);
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    xe,
                    {
                      href: item.href,
                      onClick: () => setMobileOpen(false),
                      className: cn(
                        "rounded-md px-3 py-3 text-sm font-medium uppercase tracking-wide transition-opacity",
                        active ? "opacity-100" : "opacity-80"
                      ),
                      style: { color: scrolled ? SCROLLED_TEXT_COLOR : ctaBackground },
                      children: item.label
                    },
                    item.href
                  );
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  xe,
                  {
                    href: "/dat-lich/",
                    onClick: () => setMobileOpen(false),
                    className: "mt-2 rounded-md px-5 py-3 text-center text-sm font-semibold uppercase tracking-wide",
                    style: { backgroundColor: ctaBackground, color: ctaTextColor },
                    children: ctaText
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "mt-2 flex justify-center border-t pt-3",
                    style: { borderColor: `${effectiveTextColor}22` },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      LanguageSwitcher,
                      {
                        color: scrolled ? SCROLLED_TEXT_COLOR : ctaBackground,
                        accentColor: ctaBackground,
                        onNavigate: () => setMobileOpen(false)
                      }
                    )
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    !minimal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      xe,
      {
        href: "/dat-lich/",
        className: "fixed inset-x-0 bottom-0 z-40 block text-center text-sm font-semibold uppercase tracking-wide shadow-[0_-4px_16px_rgba(0,0,0,0.15)] lg:hidden",
        style: {
          backgroundColor: ctaBackground,
          color: ctaTextColor,
          padding: "0.875rem 1.25rem calc(0.875rem + env(safe-area-inset-bottom))"
        },
        children: ctaText
      }
    )
  ] });
}
function googleMapsQuery(name, address) {
  return [name, address].filter(Boolean).join(", ");
}
function googleMapsSearchUrl(name, address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(googleMapsQuery(name, address))}`;
}
function trackEvent(event, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
const trackContactClick = (channel, location) => trackEvent("contact_click", { contact_channel: channel, contact_location: location });
const DEFAULT_HOTLINE = "(+84) 965 80 6166";
const DEFAULT_EMAIL = "info@mamspa.vn";
const DEFAULT_SOCIALS = [
  { label: "Facebook", href: "https://facebook.com/mamSpa.danang" },
  { label: "Instagram", href: "https://instagram.com/mamspa.danang" },
  { label: "Zalo OA", href: "https://zalo.me/0865806166" }
];
function SocialIcon({ label }) {
  const key = label.toLowerCase();
  if (key.includes("facebook")) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.7-1.6h1.5V3.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.6H7.8V13h2.7v8h3z" }) });
  }
  if (key.includes("instagram")) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "17.2", cy: "6.8", r: "1", fill: "currentColor", stroke: "none" })
    ] });
  }
  if (key.includes("zalo")) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" }) });
  }
  if (key.includes("tiktok")) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.6 7.1a5 5 0 0 1-3.6-1.6v7.6a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.9a2.7 2.7 0 1 0 1.9 2.6V2h2.8a5 5 0 0 0 3.6 4.3v2.8z" }) });
  }
  if (key.includes("youtube")) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 12s0-3.2-.4-4.7a2.9 2.9 0 0 0-2-2C17.9 5 12 5 12 5s-5.9 0-7.6.3a2.9 2.9 0 0 0-2 2C2 8.8 2 12 2 12s0 3.2.4 4.7a2.9 2.9 0 0 0 2 2C6.1 19 12 19 12 19s5.9 0 7.6-.3a2.9 2.9 0 0 0 2-2C22 15.2 22 12 22 12z" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10 9.5v5l4.5-2.5z", fill: "#0E1611" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" });
}
function FooterColumn({ title, children, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-maha-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-4 bg-maha-500/60", "aria-hidden": "true" }),
      title
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 space-y-3", children })
  ] });
}
function BranchBlock({ branch }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-white/[0.03] p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-base text-maha-50", children: branch.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-2.5", children: [
      branch.address && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm font-light leading-relaxed text-maha-50/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-maha-400" }),
        branch.map_link ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: branch.map_link, target: "_blank", rel: "noreferrer", className: "transition-colors hover:text-maha-400", children: branch.address }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: branch.address })
      ] }),
      branch.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 text-sm font-light text-maha-50/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 shrink-0 text-maha-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `tel:${branch.phone.replace(/[^\d+]/g, "")}`,
            onClick: () => trackContactClick("phone", "footer_branch"),
            className: "transition-colors hover:text-maha-400",
            children: branch.phone
          }
        )
      ] }),
      branch.open_hours && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 text-sm font-light text-maha-50/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 shrink-0 text-maha-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: branch.open_hours })
      ] })
    ] })
  ] });
}
function Footer() {
  const { t } = useTranslation();
  const { props } = X();
  const site = props.site ?? {};
  const brandName = site.brand_name || "Mầm Spa";
  const logoUrl = publicAssetUrl(site.logo_path);
  const tagline = site.tagline || t("footer.tagline");
  const description = t("footer.description");
  const hotline = site.hotline || DEFAULT_HOTLINE;
  const email = site.email || DEFAULT_EMAIL;
  const address = site.address;
  const openHours = site.open_hours;
  const socials = site.social_links && site.social_links.length > 0 ? site.social_links : DEFAULT_SOCIALS;
  const serviceLinks = (site.service_menu ?? []).slice(0, 6);
  const branches = site.branches ?? [];
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const exploreLinks = [
    { label: t("nav.about"), href: "/gioi-thieu/" },
    { label: t("nav.offers"), href: "/uu-dai/" },
    { label: t("nav.blog"), href: "/tin-tuc/" },
    { label: t("nav.experience"), href: "/trai-nghiem-khach-hang/" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "relative overflow-hidden bg-maha-900 text-maha-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-6 2xl:max-w-[1440px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 border-b border-white/10 py-9 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-11", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-serif text-[28px] leading-tight text-maha-50 sm:text-4xl", children: [
        t("footer.ctaLine1"),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "not-italic text-maha-300", children: t("footer.ctaLine2") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: `tel:${hotline.replace(/[^\d+]/g, "")}`,
          onClick: () => trackContactClick("phone", "footer_cta"),
          className: "flex h-16 items-center gap-3 rounded-full border border-maha-400/30 bg-maha-800 pl-4 pr-6 transition-colors hover:border-maha-400",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-maha-400/15 text-maha-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] uppercase tracking-[0.18em] text-maha-300", children: t("footer.hotline") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-base font-semibold tracking-wide sm:text-lg", children: hotline })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-x-10 gap-y-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(xe, { href: "/", className: "inline-block", children: logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoUrl, alt: brandName, className: "h-12 w-auto object-contain" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-2xl uppercase tracking-[0.2em] text-maha-50", children: brandName }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-serif text-base italic text-maha-300", children: tagline }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-[34ch] text-sm font-light leading-relaxed text-maha-50/65", children: description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 flex flex-wrap gap-2.5", children: socials.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: s.href,
            target: "_blank",
            rel: "noreferrer",
            "aria-label": s.label,
            onClick: () => trackContactClick(s.label.toLowerCase(), "footer_social"),
            className: "grid h-9 w-9 place-items-center rounded-full border border-white/15 text-maha-300 transition-colors hover:border-maha-400 hover:text-maha-400",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocialIcon, { label: s.label })
          }
        ) }, s.label)) })
      ] }),
      serviceLinks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(FooterColumn, { title: t("footer.servicesTitle"), className: branches.length > 0 ? "hidden lg:block" : void 0, children: serviceLinks.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        xe,
        {
          href: item.href,
          className: "text-sm font-light text-maha-50/80 transition-colors hover:text-maha-400",
          children: item.label
        }
      ) }, item.href)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FooterColumn,
        {
          title: t("footer.exploreTitle"),
          className: branches.length > 0 ? "hidden lg:block" : void 0,
          children: exploreLinks.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(xe, { href: item.href, className: "text-sm font-light text-maha-50/80 transition-colors hover:text-maha-400", children: item.label }) }, item.href))
        }
      ),
      branches.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5 lg:hidden", children: branches.map((branch, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(BranchBlock, { branch }, branch.name ?? index)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FooterColumn, { title: t("footer.contact"), children: [
        address && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm font-light leading-relaxed text-maha-50/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-maha-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: address })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm font-light text-maha-50/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "mt-0.5 h-4 w-4 shrink-0 text-maha-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `mailto:${email}`,
              onClick: () => trackContactClick("email", "footer"),
              className: "transition-colors hover:text-maha-400",
              children: email
            }
          )
        ] }),
        openHours && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "mt-2 border-t border-white/10 pt-4 text-sm font-light text-maha-50/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs uppercase tracking-[0.1em] text-maha-300", children: t("footer.hours") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block font-medium text-maha-50", children: openHours })
        ] }),
        address && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: googleMapsSearchUrl(brandName, address),
            target: "_blank",
            rel: "noreferrer",
            className: "mt-1 inline-block text-sm font-light text-maha-400 underline underline-offset-4 transition-colors hover:text-maha-300",
            children: t("footer.viewMap")
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 border-t border-white/10 py-6 text-center text-xs text-maha-50/70 sm:flex-row sm:justify-between sm:text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("footer.rights", { year }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(xe, { href: "/chinh-sach-bao-mat/", className: "inline-block py-1.5 transition-colors hover:text-maha-400", children: t("footer.privacy") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(xe, { href: "/dieu-khoan-dich-vu/", className: "inline-block py-1.5 transition-colors hover:text-maha-400", children: t("footer.terms") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(xe, { href: "/ho-tro-khach-hang/", className: "inline-block py-1.5 transition-colors hover:text-maha-400", children: t("footer.support") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(xe, { href: "/luu-y-dich-vu/", className: "inline-block py-1.5 transition-colors hover:text-maha-400", children: t("footer.guidelines") })
      ] })
    ] })
  ] }) });
}
const DEFAULT_BUTTONS = [
  {
    enabled: true,
    label: "Zalo",
    type: "zalo",
    href: "https://zalo.me/0865806166",
    background: "#ffffff",
    color: "#028fe8"
  },
  {
    enabled: true,
    label: "Google Maps",
    type: "map",
    href: "/lien-he/",
    background: "#ffffff",
    color: "#4285f4"
  },
  {
    enabled: true,
    label: "WhatsApp",
    type: "whatsapp",
    href: "https://wa.me/84865806166",
    background: "#19b83f",
    color: "#ffffff"
  },
  {
    enabled: true,
    label: "KakaoTalk",
    type: "kakao",
    href: "#",
    background: "#fee500",
    color: "#3b1f1f"
  },
  {
    enabled: true,
    label: "Hotline",
    type: "phone",
    href: "tel:0865806166",
    background: "#0d8bff",
    color: "#ffffff"
  }
];
const ICON_BOX = "flex h-6 w-6 items-center justify-center";
function ButtonIcon({ button }) {
  const iconUrl = publicAssetUrl(button.icon);
  if (iconUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: iconUrl, alt: "", className: "h-full w-full object-contain", loading: "lazy" }) });
  }
  const type = button.type || "custom";
  if (type === "phone") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-6 w-6", strokeWidth: 2.6 });
  }
  if (type === "map") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-6 w-6", strokeWidth: 2.4 });
  }
  if (type === "zalo") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(ICON_BOX, "text-[10px] font-extrabold leading-none"), children: "Zalo" });
  }
  if (type === "whatsapp") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(ICON_BOX, "text-[14px] font-black leading-none"), children: "☎" });
  }
  if (type === "kakao") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(ICON_BOX, "text-[8px] font-black leading-none"), children: "TALK" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-6 w-6", strokeWidth: 2.4 });
}
function ChatWidget() {
  var _a, _b;
  const { t } = useTranslation();
  const { props } = X();
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const configuredButtons = ((_b = (_a = props.site) == null ? void 0 : _a.floating_contact_buttons) == null ? void 0 : _b.length) ? props.site.floating_contact_buttons : DEFAULT_BUTTONS;
  const buttons = configuredButtons.filter((button) => button.enabled !== false && button.href);
  if (!buttons.length) {
    return null;
  }
  return (
    // bottom-44 thay vì bottom-24 trên mobile — chừa chỗ vừa cho thanh CTA "Đặt lịch"
    // ghim đáy (Header.tsx) vừa cho nút "lên đầu trang" (BackToTop.tsx) đã dời lên
    // bottom-24, tránh 3 thứ chồng lên nhau.
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-44 right-6 z-50 flex flex-col items-center gap-4 lg:bottom-24", children: [
      buttons.map((button, index) => {
        var _a2, _b2;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: button.href,
            target: ((_a2 = button.href) == null ? void 0 : _a2.startsWith("http")) ? "_blank" : void 0,
            rel: ((_b2 = button.href) == null ? void 0 : _b2.startsWith("http")) ? "noreferrer" : void 0,
            className: cn(
              "flex items-center justify-center overflow-hidden rounded-full border border-black/10 shadow-[0_4px_14px_rgba(15,23,42,0.22)] ring-4 ring-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(15,23,42,0.28)]",
              "h-12 w-12",
              isOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-90 opacity-0"
            ),
            style: {
              backgroundColor: button.background || "#ffffff",
              color: button.color || "#0d8bff",
              transitionDelay: isOpen ? `${Math.max(0, buttons.length - index - 1) * 25}ms` : "0ms"
            },
            "aria-label": button.label || t("common.chat"),
            title: button.label || t("common.chat"),
            tabIndex: isOpen ? 0 : -1,
            onClick: () => {
              trackContactClick(button.type || "custom", "chat_widget");
              setIsOpen(false);
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonIcon, { button })
          },
          `${button.label}-${index}`
        );
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setIsOpen((open) => !open),
          className: "flex h-12 w-12 items-center justify-center rounded-full bg-[#556B3F] text-white shadow-[0_8px_24px_rgba(85,107,63,0.36)] ring-4 ring-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#425436]",
          "aria-expanded": isOpen,
          "aria-label": isOpen ? "Đóng nút liên hệ" : t("common.chat"),
          title: isOpen ? "Đóng" : t("common.chat"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            MessageCircle,
            {
              className: cn("h-6 w-6 transition duration-200", isOpen && "rotate-45"),
              strokeWidth: 2.6
            }
          )
        }
      )
    ] })
  );
}
const SHOW_AFTER_PX = 400;
function BackToTop() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let ticking = false;
    const updateVisibility = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_PX);
      ticking = false;
    };
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateVisibility);
    };
    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: scrollToTop,
      className: cn(
        // bottom-24 thay vì bottom-6 trên mobile — chừa chỗ cho thanh CTA "Đặt lịch"
        // ghim cố định dưới đáy (xem Header.tsx), tránh 2 thứ chồng lên nhau.
        "fixed bottom-24 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-maha-600 text-white shadow-[0_8px_24px_rgba(85,107,63,0.36)] ring-4 ring-white transition duration-200 hover:-translate-y-0.5 hover:bg-maha-700 lg:bottom-6",
        isVisible ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-90 opacity-0"
      ),
      "aria-label": t("common.backToTop"),
      title: t("common.backToTop"),
      tabIndex: isVisible ? 0 : -1,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-6 w-6", strokeWidth: 2.6 })
    }
  );
}
function PublicLayout({ children, mainClassName, minimalHeader }) {
  useLocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex min-h-screen flex-col bg-white",
        // Chừa chỗ cho thanh CTA "Đặt lịch" ghim cố định dưới đáy trên mobile (Header.tsx)
        // — nếu không, nó sẽ đè lên phần cuối Footer. Không cần khi header ở chế độ
        // minimal vì lúc đó Header không render thanh CTA đó.
        !minimalHeader && "pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-0"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { minimal: minimalHeader }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn("flex-1", mainClassName ?? "bg-white"), children }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChatWidget, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BackToTop, {})
      ]
    }
  );
}
export {
  MessageCircle as M,
  PublicLayout as P,
  Mail as a,
  MapPin as b,
  Phone as c
};
