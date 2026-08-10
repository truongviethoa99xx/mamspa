import { X, G, j as jsxRuntimeExports, S as Se, x as xe, A as At } from "../ssr.js";
import { P as PublicLayout } from "./PublicLayout-B1ZBHElj.js";
import { a as createLucideIcon, d as useTranslation, e as Clock, i as formatVND } from "./useLocale-CxnXFSYR.js";
import { S as Search } from "./search-vSpO0jHJ.js";
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
/**
 * @license lucide-react v0.363.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CalendarDays = createLucideIcon("CalendarDays", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
]);
const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700"
};
function formatBookingDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
}
function MyBookings({ bookings }) {
  const { t } = useTranslation();
  const { props } = X();
  const flash = props.flash;
  const lookupForm = G({ phone: "", code: "" });
  const submitLookup = (event) => {
    event.preventDefault();
    lookupForm.post("/my-bookings/lookup", { preserveScroll: true });
  };
  const cancelBooking = (booking) => {
    if (!window.confirm(t("myBookings.confirmCancel", { code: booking.code }))) return;
    At.post(`/my-bookings/${booking.id}/cancel`, {}, { preserveScroll: true });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { mainClassName: "bg-maha-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Se, { title: t("nav.myBookings") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 pb-16 pt-10 md:pt-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl text-heading md:text-4xl", children: t("nav.myBookings") }),
      flash.success && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700", children: flash.success }),
      flash.error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700", children: flash.error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-4", children: [
        bookings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-maha-200 bg-white px-6 py-10 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-ink/70", children: t("myBookings.empty") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            xe,
            {
              href: "/dat-lich",
              className: "mt-4 inline-block rounded-lg bg-maha-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-maha-700",
              children: t("myBookings.bookOne")
            }
          )
        ] }),
        bookings.map((booking) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-maha-200 bg-white p-5 shadow-sm md:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-maha-500", children: booking.code }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-lg font-semibold text-ink", children: booking.service.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-ink/60", children: [
                booking.service.duration,
                " phút"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[booking.status]}`, children: t(`myBookings.status.${booking.status}`) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-4 text-sm text-ink/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4 text-maha-500" }),
              formatBookingDate(booking.date)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-maha-500" }),
              booking.time_slot
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-ink", children: formatVND(booking.total_price) })
          ] }),
          (booking.status === "pending" || booking.status === "confirmed") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
            booking.payment_status === "unpaid" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `/payment/vnpay/${booking.id}`,
                className: "rounded-lg bg-maha-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-maha-700",
                children: t("myBookings.payVnpay")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => cancelBooking(booking),
                className: "rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50",
                children: t("myBookings.cancelBooking")
              }
            )
          ] })
        ] }, booking.id))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-2xl border border-maha-200 bg-white p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 text-lg font-semibold text-heading", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5 text-maha-500" }),
          t("myBookings.lookupTitle")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-ink/60", children: t("myBookings.lookupDesc") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submitLookup, className: "mt-4 flex flex-col gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: lookupForm.data.phone,
              onChange: (e) => lookupForm.setData("phone", e.target.value),
              placeholder: t("myBookings.lookupPhonePlaceholder"),
              className: "input-base flex-1"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: lookupForm.data.code,
              onChange: (e) => lookupForm.setData("code", e.target.value),
              placeholder: t("myBookings.lookupCodePlaceholder"),
              className: "input-base flex-1"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: lookupForm.processing,
              className: "rounded-lg bg-maha-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-maha-700 disabled:opacity-60",
              children: t("myBookings.lookupButton")
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  MyBookings as default
};
