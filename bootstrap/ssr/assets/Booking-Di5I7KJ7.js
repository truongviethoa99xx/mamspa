import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, Search, Check, X, Clock, CheckCircle2, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { c as cn, u as useLocale, g as generateTimeOptions, s as stripTags, t as tr } from "./useLocale-CGFjb2L7.js";
import "clsx";
import "tailwind-merge";
function FancySelect({
  value,
  onChange,
  options,
  placeholder,
  hasError,
  className,
  searchable,
  searchPlaceholder,
  emptyText,
  disabled
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    const close = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);
  const selected = options.find((o) => o.value === value);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredOptions = searchable && normalizedQuery ? options.filter((o) => o.label.toLowerCase().includes(normalizedQuery)) : options;
  return /* @__PURE__ */ jsxs("div", { ref, className: cn("relative", className), children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        disabled,
        onClick: () => setOpen((c) => !c),
        className: cn(
          "flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 py-3 text-left text-sm text-ink transition-colors sm:px-4 sm:py-3.5 sm:text-base",
          open ? "border-maha-500 ring-2 ring-maha-500/10" : "border-maha-200",
          hasError && !value && "border-red-400 ring-2 ring-red-100",
          disabled && "cursor-not-allowed opacity-60"
        ),
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        children: [
          /* @__PURE__ */ jsx("span", { className: cn("truncate", !selected && "text-maha-400"), children: (selected == null ? void 0 : selected.shortLabel) ?? (selected == null ? void 0 : selected.label) ?? placeholder }),
          /* @__PURE__ */ jsx(ChevronDown, { className: cn("h-4 w-4 shrink-0 text-ink/60 transition-transform", open && "rotate-180") })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxs("div", { className: "absolute left-0 right-0 top-[calc(100%+0.4rem)] z-30 min-w-max overflow-hidden rounded-xl border border-maha-200 bg-white shadow-2xl shadow-maha-900/10", children: [
      searchable && /* @__PURE__ */ jsxs("div", { className: "relative border-b border-maha-100", children: [
        /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-maha-500" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            autoFocus: true,
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: searchPlaceholder,
            className: "w-full bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none placeholder:text-maha-400"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { role: "listbox", className: "max-h-64 overflow-y-auto py-1.5", children: filteredOptions.length === 0 ? /* @__PURE__ */ jsx("p", { className: "px-4 py-2.5 text-sm text-maha-500", children: emptyText }) : filteredOptions.map((o) => {
        const active = o.value === value;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            role: "option",
            "aria-selected": active,
            onClick: () => {
              onChange(o.value);
              setOpen(false);
            },
            className: cn(
              "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-maha-50 sm:text-base",
              active && "bg-[#E9E2D5] font-semibold text-ink"
            ),
            children: [
              /* @__PURE__ */ jsx("span", { className: "truncate", children: o.label }),
              active && /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 shrink-0 text-[#556B3F]" })
            ]
          },
          o.value
        );
      }) })
    ] })
  ] });
}
const COUNTRY_CODES = [
  { code: "+84", flag: "🇻🇳", name: "Việt Nam" },
  { code: "+93", flag: "🇦🇫", name: "Afghanistan" },
  { code: "+355", flag: "🇦🇱", name: "Albania" },
  { code: "+213", flag: "🇩🇿", name: "Algeria" },
  { code: "+1684", flag: "🇦🇸", name: "American Samoa" },
  { code: "+376", flag: "🇦🇩", name: "Andorra" },
  { code: "+244", flag: "🇦🇴", name: "Angola" },
  { code: "+1264", flag: "🇦🇮", name: "Anguilla" },
  { code: "+1268", flag: "🇦🇬", name: "Antigua and Barbuda" },
  { code: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "+374", flag: "🇦🇲", name: "Armenia" },
  { code: "+297", flag: "🇦🇼", name: "Aruba" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+43", flag: "🇦🇹", name: "Austria" },
  { code: "+994", flag: "🇦🇿", name: "Azerbaijan" },
  { code: "+1242", flag: "🇧🇸", name: "Bahamas" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+1246", flag: "🇧🇧", name: "Barbados" },
  { code: "+375", flag: "🇧🇾", name: "Belarus" },
  { code: "+32", flag: "🇧🇪", name: "Belgium" },
  { code: "+501", flag: "🇧🇿", name: "Belize" },
  { code: "+229", flag: "🇧🇯", name: "Benin" },
  { code: "+1441", flag: "🇧🇲", name: "Bermuda" },
  { code: "+975", flag: "🇧🇹", name: "Bhutan" },
  { code: "+591", flag: "🇧🇴", name: "Bolivia" },
  { code: "+387", flag: "🇧🇦", name: "Bosnia and Herzegovina" },
  { code: "+267", flag: "🇧🇼", name: "Botswana" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+246", flag: "🇮🇴", name: "British Indian Ocean Territory" },
  { code: "+673", flag: "🇧🇳", name: "Brunei" },
  { code: "+359", flag: "🇧🇬", name: "Bulgaria" },
  { code: "+226", flag: "🇧🇫", name: "Burkina Faso" },
  { code: "+257", flag: "🇧🇮", name: "Burundi" },
  { code: "+238", flag: "🇨🇻", name: "Cabo Verde" },
  { code: "+855", flag: "🇰🇭", name: "Cambodia" },
  { code: "+237", flag: "🇨🇲", name: "Cameroon" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+236", flag: "🇨🇫", name: "Central African Republic" },
  { code: "+235", flag: "🇹🇩", name: "Chad" },
  { code: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+57", flag: "🇨🇴", name: "Colombia" },
  { code: "+269", flag: "🇰🇲", name: "Comoros" },
  { code: "+243", flag: "🇨🇩", name: "Congo (DRC)" },
  { code: "+242", flag: "🇨🇬", name: "Congo (Republic)" },
  { code: "+682", flag: "🇨🇰", name: "Cook Islands" },
  { code: "+506", flag: "🇨🇷", name: "Costa Rica" },
  { code: "+225", flag: "🇨🇮", name: "Côte d'Ivoire" },
  { code: "+385", flag: "🇭🇷", name: "Croatia" },
  { code: "+53", flag: "🇨🇺", name: "Cuba" },
  { code: "+357", flag: "🇨🇾", name: "Cyprus" },
  { code: "+420", flag: "🇨🇿", name: "Czechia" },
  { code: "+45", flag: "🇩🇰", name: "Denmark" },
  { code: "+253", flag: "🇩🇯", name: "Djibouti" },
  { code: "+1767", flag: "🇩🇲", name: "Dominica" },
  { code: "+1809", flag: "🇩🇴", name: "Dominican Republic" },
  { code: "+593", flag: "🇪🇨", name: "Ecuador" },
  { code: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "+503", flag: "🇸🇻", name: "El Salvador" },
  { code: "+240", flag: "🇬🇶", name: "Equatorial Guinea" },
  { code: "+291", flag: "🇪🇷", name: "Eritrea" },
  { code: "+372", flag: "🇪🇪", name: "Estonia" },
  { code: "+268", flag: "🇸🇿", name: "Eswatini" },
  { code: "+251", flag: "🇪🇹", name: "Ethiopia" },
  { code: "+679", flag: "🇫🇯", name: "Fiji" },
  { code: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+241", flag: "🇬🇦", name: "Gabon" },
  { code: "+220", flag: "🇬🇲", name: "Gambia" },
  { code: "+995", flag: "🇬🇪", name: "Georgia" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "+350", flag: "🇬🇮", name: "Gibraltar" },
  { code: "+30", flag: "🇬🇷", name: "Greece" },
  { code: "+299", flag: "🇬🇱", name: "Greenland" },
  { code: "+1473", flag: "🇬🇩", name: "Grenada" },
  { code: "+1671", flag: "🇬🇺", name: "Guam" },
  { code: "+502", flag: "🇬🇹", name: "Guatemala" },
  { code: "+224", flag: "🇬🇳", name: "Guinea" },
  { code: "+245", flag: "🇬🇼", name: "Guinea-Bissau" },
  { code: "+592", flag: "🇬🇾", name: "Guyana" },
  { code: "+509", flag: "🇭🇹", name: "Haiti" },
  { code: "+504", flag: "🇭🇳", name: "Honduras" },
  { code: "+852", flag: "🇭🇰", name: "Hong Kong" },
  { code: "+36", flag: "🇭🇺", name: "Hungary" },
  { code: "+354", flag: "🇮🇸", name: "Iceland" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "+98", flag: "🇮🇷", name: "Iran" },
  { code: "+964", flag: "🇮🇶", name: "Iraq" },
  { code: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+1876", flag: "🇯🇲", name: "Jamaica" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+962", flag: "🇯🇴", name: "Jordan" },
  { code: "+7", flag: "🇰🇿", name: "Kazakhstan" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+686", flag: "🇰🇮", name: "Kiribati" },
  { code: "+850", flag: "🇰🇵", name: "Korea (North)" },
  { code: "+82", flag: "🇰🇷", name: "Korea (South)" },
  { code: "+383", flag: "🇽🇰", name: "Kosovo" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+996", flag: "🇰🇬", name: "Kyrgyzstan" },
  { code: "+856", flag: "🇱🇦", name: "Laos" },
  { code: "+371", flag: "🇱🇻", name: "Latvia" },
  { code: "+961", flag: "🇱🇧", name: "Lebanon" },
  { code: "+266", flag: "🇱🇸", name: "Lesotho" },
  { code: "+231", flag: "🇱🇷", name: "Liberia" },
  { code: "+218", flag: "🇱🇾", name: "Libya" },
  { code: "+423", flag: "🇱🇮", name: "Liechtenstein" },
  { code: "+370", flag: "🇱🇹", name: "Lithuania" },
  { code: "+352", flag: "🇱🇺", name: "Luxembourg" },
  { code: "+853", flag: "🇲🇴", name: "Macao" },
  { code: "+261", flag: "🇲🇬", name: "Madagascar" },
  { code: "+265", flag: "🇲🇼", name: "Malawi" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+960", flag: "🇲🇻", name: "Maldives" },
  { code: "+223", flag: "🇲🇱", name: "Mali" },
  { code: "+356", flag: "🇲🇹", name: "Malta" },
  { code: "+692", flag: "🇲🇭", name: "Marshall Islands" },
  { code: "+222", flag: "🇲🇷", name: "Mauritania" },
  { code: "+230", flag: "🇲🇺", name: "Mauritius" },
  { code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "+691", flag: "🇫🇲", name: "Micronesia" },
  { code: "+373", flag: "🇲🇩", name: "Moldova" },
  { code: "+377", flag: "🇲🇨", name: "Monaco" },
  { code: "+976", flag: "🇲🇳", name: "Mongolia" },
  { code: "+382", flag: "🇲🇪", name: "Montenegro" },
  { code: "+212", flag: "🇲🇦", name: "Morocco" },
  { code: "+258", flag: "🇲🇿", name: "Mozambique" },
  { code: "+95", flag: "🇲🇲", name: "Myanmar" },
  { code: "+264", flag: "🇳🇦", name: "Namibia" },
  { code: "+674", flag: "🇳🇷", name: "Nauru" },
  { code: "+977", flag: "🇳🇵", name: "Nepal" },
  { code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "+505", flag: "🇳🇮", name: "Nicaragua" },
  { code: "+227", flag: "🇳🇪", name: "Niger" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+389", flag: "🇲🇰", name: "North Macedonia" },
  { code: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+680", flag: "🇵🇼", name: "Palau" },
  { code: "+970", flag: "🇵🇸", name: "Palestine" },
  { code: "+507", flag: "🇵🇦", name: "Panama" },
  { code: "+675", flag: "🇵🇬", name: "Papua New Guinea" },
  { code: "+595", flag: "🇵🇾", name: "Paraguay" },
  { code: "+51", flag: "🇵🇪", name: "Peru" },
  { code: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "+48", flag: "🇵🇱", name: "Poland" },
  { code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "+1787", flag: "🇵🇷", name: "Puerto Rico" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+40", flag: "🇷🇴", name: "Romania" },
  { code: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "+250", flag: "🇷🇼", name: "Rwanda" },
  { code: "+1869", flag: "🇰🇳", name: "Saint Kitts and Nevis" },
  { code: "+1758", flag: "🇱🇨", name: "Saint Lucia" },
  { code: "+1784", flag: "🇻🇨", name: "Saint Vincent and the Grenadines" },
  { code: "+685", flag: "🇼🇸", name: "Samoa" },
  { code: "+378", flag: "🇸🇲", name: "San Marino" },
  { code: "+239", flag: "🇸🇹", name: "São Tomé and Príncipe" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+221", flag: "🇸🇳", name: "Senegal" },
  { code: "+381", flag: "🇷🇸", name: "Serbia" },
  { code: "+248", flag: "🇸🇨", name: "Seychelles" },
  { code: "+232", flag: "🇸🇱", name: "Sierra Leone" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+421", flag: "🇸🇰", name: "Slovakia" },
  { code: "+386", flag: "🇸🇮", name: "Slovenia" },
  { code: "+677", flag: "🇸🇧", name: "Solomon Islands" },
  { code: "+252", flag: "🇸🇴", name: "Somalia" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+211", flag: "🇸🇸", name: "South Sudan" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+249", flag: "🇸🇩", name: "Sudan" },
  { code: "+597", flag: "🇸🇷", name: "Suriname" },
  { code: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "+963", flag: "🇸🇾", name: "Syria" },
  { code: "+886", flag: "🇹🇼", name: "Taiwan" },
  { code: "+992", flag: "🇹🇯", name: "Tajikistan" },
  { code: "+255", flag: "🇹🇿", name: "Tanzania" },
  { code: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "+670", flag: "🇹🇱", name: "Timor-Leste" },
  { code: "+228", flag: "🇹🇬", name: "Togo" },
  { code: "+676", flag: "🇹🇴", name: "Tonga" },
  { code: "+1868", flag: "🇹🇹", name: "Trinidad and Tobago" },
  { code: "+216", flag: "🇹🇳", name: "Tunisia" },
  { code: "+90", flag: "🇹🇷", name: "Turkey" },
  { code: "+993", flag: "🇹🇲", name: "Turkmenistan" },
  { code: "+688", flag: "🇹🇻", name: "Tuvalu" },
  { code: "+256", flag: "🇺🇬", name: "Uganda" },
  { code: "+380", flag: "🇺🇦", name: "Ukraine" },
  { code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+598", flag: "🇺🇾", name: "Uruguay" },
  { code: "+998", flag: "🇺🇿", name: "Uzbekistan" },
  { code: "+678", flag: "🇻🇺", name: "Vanuatu" },
  { code: "+58", flag: "🇻🇪", name: "Venezuela" },
  { code: "+967", flag: "🇾🇪", name: "Yemen" },
  { code: "+260", flag: "🇿🇲", name: "Zambia" },
  { code: "+263", flag: "🇿🇼", name: "Zimbabwe" }
];
const DATE_LOCALES = { en: "en-US", ja: "ja-JP", ko: "ko-KR", zh: "zh-CN", vi: "vi-VN" };
const TODAY = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
const DEFAULT_CONTACT = { name: "", phone: "", email: "", note: "", channel: "zalo", value: "", country: "Việt Nam" };
function Booking({ preselect, branches, openHours, services }) {
  const { t } = useTranslation();
  const locale = useLocale();
  const dateLocale = DATE_LOCALES[locale] ?? "vi-VN";
  const [branch, setBranch] = useState(branches[0] ?? "");
  const [maleCount, setMaleCount] = useState(1);
  const [femaleCount, setFemaleCount] = useState(0);
  const [serviceByKey, setServiceByKey] = useState({});
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [contact, setContact] = useState(DEFAULT_CONTACT);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successCode, setSuccessCode] = useState(null);
  const availableServices = services;
  const guests = useMemo(() => {
    const arr = [];
    for (let i = 0; i < maleCount; i++) arr.push({ key: `m${i}`, gender: "male", label: t("bookingForm.guestMale") });
    for (let i = 0; i < femaleCount; i++) arr.push({ key: `f${i}`, gender: "female", label: t("bookingForm.guestFemale") });
    return arr;
  }, [maleCount, femaleCount, t]);
  const serviceFor = (key) => {
    const chosen = availableServices.find((s) => s.id === serviceByKey[key]);
    return chosen ?? availableServices[0] ?? null;
  };
  useEffect(() => {
    if (!preselect.service) return;
    const s = services.find((x) => x.slug === preselect.service);
    if (s) setServiceByKey((prev) => ({ ...prev, m0: s.id, f0: prev.f0 ?? s.id }));
  }, [preselect.service, services]);
  useEffect(() => {
    setTimeSlot("");
  }, [date]);
  const timeOptions = useMemo(
    () => generateTimeOptions(openHours.open, openHours.close, 60).map((v) => ({ value: v, label: v })),
    [openHours]
  );
  const canSubmit = !!branch && !!date && !!timeSlot && guests.length > 0 && guests.every((g) => serviceFor(g.key)) && contact.name.trim().length >= 2 && contact.phone.trim().length >= 8;
  const resetForm = () => {
    setBranch(branches[0] ?? "");
    setMaleCount(1);
    setFemaleCount(0);
    setServiceByKey({});
    setDate("");
    setTimeSlot("");
    setContact(DEFAULT_CONTACT);
  };
  const submit = () => {
    var _a;
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError(null);
    const dialCode = ((_a = COUNTRY_CODES.find((c) => c.name === contact.country)) == null ? void 0 : _a.code) ?? "+84";
    router.post(
      "/dat-lich",
      {
        items: guests.map((g) => ({ service_id: serviceFor(g.key).id, gender: g.gender })),
        branch,
        date,
        time_slot: timeSlot,
        guest_name: contact.name,
        guest_phone: `${dialCode} ${contact.phone}`.trim(),
        guest_email: contact.email || void 0,
        contact_channel: contact.channel || void 0,
        contact_value: contact.value || void 0,
        note: contact.note || void 0,
        payment_method: "cash",
        inline: true
      },
      {
        preserveScroll: true,
        onSuccess: (page) => {
          var _a2;
          const code = (_a2 = page.props.flash) == null ? void 0 : _a2.booking_code;
          if (code) {
            setSuccessCode(code);
            resetForm();
          }
        },
        onError: (errors) => setError(Object.values(errors).join(" ")),
        onFinish: () => setSubmitting(false)
      }
    );
  };
  const summaryDateLabel = date && new Date(date).toLocaleDateString(dateLocale, { weekday: "long" }) + " - " + new Date(date).toLocaleDateString("vi-VN");
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col bg-maha-50", children: [
    /* @__PURE__ */ jsx(Head, { title: t("bookingForm.title"), children: /* @__PURE__ */ jsx(
      "meta",
      {
        name: "description",
        content: t(
          "bookingForm.metaDescription",
          "Đặt lịch trị liệu online tại Mầm Spa — chọn dịch vụ và khung giờ phù hợp chỉ trong vài bước."
        )
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-5 py-4 sm:px-10", children: [
      /* @__PURE__ */ jsx(Link, { href: "/", className: "font-serif text-lg uppercase tracking-[0.12em] text-heading", children: "Mầm Spa" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/",
          "aria-label": "Đóng",
          className: "flex h-9 w-9 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-maha-100 hover:text-ink",
          children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("section", { className: "flex-1 bg-maha-50", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 pb-12 pt-4 md:pb-16 md:pt-6", children: [
      /* @__PURE__ */ jsxs("header", { className: "text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "font-serif text-base italic text-subheading", children: t("bookingForm.eyebrow") }),
        /* @__PURE__ */ jsx("h1", { className: "mt-1 font-serif text-4xl tracking-wide text-heading md:text-5xl", children: t("bookingForm.title") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto mt-8 max-w-4xl rounded-2xl border border-[#CDBCA3] bg-[#E9E2D5] px-6 py-5 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-ink/80", children: t("bookingForm.thankYou") }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "font-serif text-2xl text-heading", children: [
              "1. ",
              t("bookingForm.sectionLocation")
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-7 text-sm font-semibold text-ink/80", children: [
              t("bookingForm.branch", "Chi nhánh"),
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx(
              FancySelect,
              {
                value: branch,
                onChange: setBranch,
                placeholder: t("bookingForm.branchPlaceholder", "Chọn chi nhánh"),
                options: branches.map((b) => ({ value: b, label: b }))
              }
            ) }),
            /* @__PURE__ */ jsxs("p", { className: "mt-7 text-sm font-semibold text-ink/80", children: [
              t("bookingForm.guestCount"),
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 grid gap-3 sm:grid-cols-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-2xl border border-maha-200 bg-white px-5 py-3", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-sm text-maha-600", children: [
                  t("bookingForm.guestTotal"),
                  ":"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "font-semibold text-ink", children: [
                  maleCount + femaleCount,
                  " ",
                  t("bookingForm.people")
                ] })
              ] }),
              /* @__PURE__ */ jsx(Stepper, { label: t("bookingForm.male"), value: maleCount, min: 0, onChange: setMaleCount }),
              /* @__PURE__ */ jsx(Stepper, { label: t("bookingForm.female"), value: femaleCount, min: 0, onChange: setFemaleCount })
            ] }),
            guests.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-2xl border border-maha-100 bg-white p-5", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-maha-600", children: t("bookingForm.choosePerGuest") }),
              /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-3", children: guests.map((g, i) => {
                var _a;
                return /* @__PURE__ */ jsxs("li", { className: "grid items-center gap-3 sm:grid-cols-[160px_1fr]", children: [
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 text-sm text-ink/80", children: [
                    /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-subheading" }),
                    i + 1,
                    ". ",
                    g.label
                  ] }),
                  /* @__PURE__ */ jsx(
                    FancySelect,
                    {
                      value: String(((_a = serviceFor(g.key)) == null ? void 0 : _a.id) ?? ""),
                      onChange: (v) => setServiceByKey((prev) => ({ ...prev, [g.key]: Number(v) })),
                      placeholder: t("bookingForm.chooseService"),
                      options: availableServices.map((s) => ({
                        value: String(s.id),
                        label: `${stripTags(tr(s.name, locale))} (${s.duration} ${t("common.minute")})`
                      }))
                    }
                  )
                ] }, g.key);
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "font-serif text-2xl text-heading", children: [
              "2. ",
              t("bookingForm.sectionDatetime")
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-6 md:grid-cols-2", children: [
              /* @__PURE__ */ jsx(Calendar, { value: date, min: TODAY, locale: dateLocale, onChange: setDate }),
              /* @__PURE__ */ jsxs("div", { children: [
                !date && /* @__PURE__ */ jsx("p", { className: "text-sm text-maha-600", children: t("bookingForm.pickDate") }),
                date && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "time",
                        value: timeSlot,
                        onChange: (e) => setTimeSlot(e.target.value),
                        min: openHours.open,
                        max: openHours.close,
                        step: 3600,
                        className: "w-full rounded-lg border border-maha-200 bg-white px-3 py-3 pr-10 text-sm text-ink transition-colors focus:border-subheading focus:outline-none focus:ring-2 focus:ring-maha-500/10 sm:px-4 sm:py-3.5 sm:text-base"
                      }
                    ),
                    /* @__PURE__ */ jsx(Clock, { className: "pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-maha-500 sm:right-4" })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "mt-3 text-xs text-maha-500", children: t("bookingForm.timeHint", openHours) }),
                  /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: timeOptions.map((opt) => /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setTimeSlot(opt.value),
                      className: "rounded-full border px-4 py-2 text-sm font-medium transition-colors " + (timeSlot === opt.value ? "border-heading bg-heading text-white" : "border-maha-200 bg-white text-ink hover:border-subheading hover:text-subheading"),
                      children: opt.label
                    },
                    opt.value
                  )) })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "font-serif text-2xl text-heading", children: [
              "3. ",
              t("bookingForm.sectionContact")
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-5 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsx(Field, { label: t("bookingForm.name"), required: true, children: /* @__PURE__ */ jsx(
                "input",
                {
                  value: contact.name,
                  onChange: (e) => setContact({ ...contact, name: e.target.value }),
                  placeholder: t("bookingForm.namePlaceholder"),
                  className: "input-base"
                }
              ) }),
              /* @__PURE__ */ jsx(Field, { label: t("bookingForm.phone"), required: true, children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  FancySelect,
                  {
                    value: contact.country,
                    onChange: (v) => setContact({ ...contact, country: v }),
                    className: "w-[7.25rem] shrink-0",
                    searchable: true,
                    searchPlaceholder: t("blocks.bookingForm.phoneCountrySearchPlaceholder"),
                    emptyText: t("blocks.bookingForm.phoneCountryEmpty"),
                    options: COUNTRY_CODES.map((c) => ({
                      value: c.name,
                      label: `${c.flag} ${c.name} (${c.code})`,
                      shortLabel: `${c.flag} ${c.code}`
                    }))
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    value: contact.phone,
                    onChange: (e) => setContact({ ...contact, phone: e.target.value }),
                    placeholder: t("bookingForm.phonePlaceholder"),
                    className: "input-base"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxs(Field, { label: t("bookingForm.email"), children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    value: contact.email,
                    onChange: (e) => setContact({ ...contact, email: e.target.value }),
                    placeholder: t("bookingForm.emailPlaceholder"),
                    className: "input-base"
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-maha-500", children: t("bookingForm.emailHint") })
              ] }),
              /* @__PURE__ */ jsx(Field, { label: t("bookingForm.contactChannel"), children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  FancySelect,
                  {
                    value: contact.channel,
                    onChange: (v) => setContact({ ...contact, channel: v }),
                    className: "w-[8.5rem] shrink-0",
                    options: [
                      { value: "zalo", label: t("bookingForm.channelZalo") },
                      { value: "whatsapp", label: t("bookingForm.channelWhatsapp") },
                      { value: "phone", label: t("bookingForm.channelPhone") }
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    value: contact.value,
                    onChange: (e) => setContact({ ...contact, value: e.target.value }),
                    placeholder: t("bookingForm.contactValuePlaceholder"),
                    className: "input-base"
                  }
                )
              ] }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsx(Field, { label: t("bookingForm.note"), children: /* @__PURE__ */ jsx(
              "textarea",
              {
                value: contact.note,
                onChange: (e) => setContact({ ...contact, note: e.target.value }),
                placeholder: t("bookingForm.notePlaceholder"),
                rows: 4,
                className: "input-base resize-none"
              }
            ) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("aside", { className: "lg:sticky lg:top-24 lg:self-start", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-[#CDBCA3] bg-white p-7 shadow-xl shadow-maha-900/5", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-center font-serif text-2xl text-heading", children: t("bookingForm.summaryTitle") }),
          /* @__PURE__ */ jsx("span", { className: "mx-auto mt-3 block h-px w-16 bg-subheading/50" }),
          /* @__PURE__ */ jsxs("dl", { className: "mt-6 space-y-5 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-xs font-semibold uppercase tracking-wider text-subheading", children: t("bookingForm.summaryDatetime") }),
              /* @__PURE__ */ jsx("dd", { className: "mt-1 font-semibold text-ink", children: date && timeSlot ? `${timeSlot}, ${summaryDateLabel}` : "—" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("dt", { className: "text-xs font-semibold uppercase tracking-wider text-subheading", children: [
                t("bookingForm.summaryCustomers"),
                " (",
                guests.length,
                " ",
                t("bookingForm.people"),
                ")"
              ] }),
              /* @__PURE__ */ jsx("dd", { className: "mt-2 space-y-3", children: guests.map((g) => {
                const s = serviceFor(g.key);
                if (!s) return null;
                return /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("p", { className: "font-semibold text-ink", children: [
                    "1x ",
                    stripTags(tr(s.name, locale)),
                    " (",
                    s.duration,
                    " min)"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs italic text-maha-600", children: g.label })
                ] }) }, g.key);
              }) })
            ] })
          ] }),
          error && /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm text-red-500", children: error }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: submit,
              disabled: !canSubmit || submitting,
              className: "mt-5 w-full rounded-md bg-[#2F3E2E] py-4 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
              children: submitting ? t("bookingForm.processing") : t("bookingForm.confirm")
            }
          )
        ] }) })
      ] })
    ] }) }),
    successCode && /* @__PURE__ */ jsx(
      "div",
      {
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "booking-success-title",
        className: "fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4 backdrop-blur-sm",
        children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-md rounded-3xl border border-[#CDBCA3] bg-white p-8 text-center shadow-2xl shadow-maha-900/20", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setSuccessCode(null),
              "aria-label": "Đóng",
              className: "absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-maha-100 hover:text-ink",
              children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-maha-100 text-heading", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-7 w-7" }) }),
          /* @__PURE__ */ jsx("h2", { id: "booking-success-title", className: "mt-5 font-serif text-2xl text-heading", children: t("blocks.bookingForm.success.title") }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-ink/70", children: t("blocks.bookingForm.success.message") }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-xl border border-dashed border-maha-200 bg-maha-50 px-4 py-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-subheading", children: t("blocks.bookingForm.success.codeLabel") }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 font-mono text-lg font-semibold tracking-wide text-heading", children: successCode })
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/",
              className: "mt-6 block w-full rounded-md bg-[#2F3E2E] py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90",
              children: t("blocks.bookingForm.success.home")
            }
          )
        ] })
      }
    )
  ] });
}
function Stepper({ label, value, min, onChange }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-2xl border border-maha-200 bg-white px-4 py-3", children: [
    /* @__PURE__ */ jsxs("span", { className: "text-sm text-maha-600", children: [
      label,
      ":"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(Math.max(min, value - 1)),
          className: "flex h-7 w-7 items-center justify-center rounded-full bg-maha-100 text-maha-700 transition-colors hover:bg-maha-200",
          "aria-label": "−",
          children: /* @__PURE__ */ jsx(Minus, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "w-5 text-center font-semibold text-ink", children: value }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(value + 1),
          className: "flex h-7 w-7 items-center justify-center rounded-full bg-maha-100 text-maha-700 transition-colors hover:bg-maha-200",
          "aria-label": "+",
          children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" })
        }
      )
    ] })
  ] });
}
function Field({ label, required, children }) {
  return /* @__PURE__ */ jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-ink/80", children: [
      label,
      " ",
      required && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-2", children })
  ] });
}
function Calendar({ value, min, locale, onChange }) {
  const initial = value ? new Date(value) : /* @__PURE__ */ new Date();
  const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() });
  const monthLabel = new Date(view.year, view.month, 1).toLocaleDateString(locale, { month: "long", year: "numeric" });
  const firstDay = new Date(view.year, view.month, 1);
  const offset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const cells = [...Array(offset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const toIso = (day) => `${view.year}-${String(view.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const shift = (delta) => {
    const m = view.month + delta;
    setView({ year: view.year + Math.floor(m / 12), month: (m % 12 + 12) % 12 });
  };
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-maha-200 bg-white p-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-center gap-4", children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => shift(-1), className: "text-maha-600 hover:text-subheading", "aria-label": "prev", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("span", { className: "font-serif text-lg capitalize text-heading", children: monthLabel }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => shift(1), className: "text-maha-600 hover:text-subheading", "aria-label": "next", children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-1 text-center text-xs text-maha-500", children: weekdays.map((w) => /* @__PURE__ */ jsx("span", { className: "py-1", children: w }, w)) }),
    /* @__PURE__ */ jsx("div", { className: "mt-1 grid grid-cols-7 gap-1", children: cells.map((day, i) => {
      if (day === null) return /* @__PURE__ */ jsx("span", {}, `b${i}`);
      const iso = toIso(day);
      const disabled = iso < min;
      const active = iso === value;
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          disabled,
          onClick: () => onChange(iso),
          className: "aspect-square rounded-full text-sm transition-colors " + (active ? "bg-heading font-semibold text-white" : disabled ? "cursor-not-allowed text-maha-200" : "text-ink hover:bg-maha-100"),
          children: day
        },
        iso
      );
    }) })
  ] });
}
export {
  Booking as default
};
