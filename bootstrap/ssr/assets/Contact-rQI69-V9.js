import { jsx, jsxs } from "react/jsx-runtime";
import { Link, useForm, Head } from "@inertiajs/react";
import { P as PublicLayout } from "./PublicLayout-B7nDyDjV.js";
import { H as Hero } from "./Hero-DI8c9mRY.js";
import { MapPin, Clock, Phone, ArrowRight, Leaf, MessageCircle, Mail, Instagram, Lock, X, CheckCircle2, AlertTriangle, Sparkles, ShieldCheck, HeartHandshake, Gift } from "lucide-react";
import { u as useLocale, t as tr, c as cn } from "./useLocale-CGFjb2L7.js";
import { u as useReveal } from "./useReveal-CTtvbu38.js";
import { useState } from "react";
import "react-i18next";
import "clsx";
import "tailwind-merge";
const stripTags = (html) => html.replace(/<[^>]+>/g, "");
const badgeLabel = (name) => name.replace(/^Mầm\s*Spa\s*/i, "").trim().toUpperCase() || name.toUpperCase();
function ContactBranches({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const intro = tr(data.intro, locale);
  const directionsLabel = tr(data.directionsLabel, locale);
  const moreLabel = tr(data.moreLabel, locale);
  const items = data.items ?? [];
  const { ref, className } = useReveal();
  if (!items.length) {
    return null;
  }
  return /* @__PURE__ */ jsx("section", { ref, className: cn(className, "bg-maha-50 px-5 pb-2 pt-8 sm:px-10 lg:px-16"), children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      title && /* @__PURE__ */ jsx(
        "div",
        {
          className: "rich-content font-serif text-2xl uppercase tracking-wide text-heading sm:text-3xl",
          dangerouslySetInnerHTML: { __html: title }
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "mx-auto mt-3 block h-px w-10 bg-maha-300", "aria-hidden": "true" }),
      intro && /* @__PURE__ */ jsx(
        "div",
        {
          className: "rich-content mt-3 text-sm text-ink/70",
          dangerouslySetInnerHTML: { __html: intro }
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-1 gap-8 sm:mt-12 md:grid-cols-2", children: items.map((branch, index) => {
      const name = tr(branch.name, locale);
      const plainName = stripTags(name);
      const displayName = plainName ? `Mầm Spa ${plainName}` : "";
      const address = tr(branch.address, locale);
      const imageAlt = tr(branch.image_alt, locale) || plainName;
      const label = badgeLabel(plainName);
      const hoursNote = tr(branch.hours_note, locale);
      return /* @__PURE__ */ jsxs("article", { className: "overflow-hidden rounded-2xl bg-white shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative aspect-[5/2] w-full bg-maha-200", children: [
          branch.image && /* @__PURE__ */ jsx(
            "img",
            {
              src: branch.image,
              alt: imageAlt,
              className: "h-full w-full object-cover",
              loading: "lazy"
            }
          ),
          label && /* @__PURE__ */ jsx("span", { className: "absolute bottom-4 left-4 rounded-md bg-[#2F3E2E]/95 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white", children: label })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 sm:p-7", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
            displayName && /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 font-serif text-base font-bold uppercase tracking-wide text-heading", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 shrink-0 text-subheading", strokeWidth: 1.5 }),
              displayName
            ] }),
            address && /* @__PURE__ */ jsx(
              "div",
              {
                className: "rich-content mt-1.5 text-sm leading-relaxed text-ink/60",
                dangerouslySetInnerHTML: { __html: address }
              }
            )
          ] }),
          (branch.open_hours || branch.phone) && /* @__PURE__ */ jsxs("div", { className: "mt-5 grid grid-cols-2", children: [
            branch.open_hours && /* @__PURE__ */ jsxs(
              "span",
              {
                className: cn(
                  "flex items-center justify-center gap-2 px-3 text-sm text-ink/80",
                  branch.phone && "border-r border-maha-200"
                ),
                children: [
                  /* @__PURE__ */ jsx(Clock, { className: "h-5 w-5 shrink-0 text-subheading", strokeWidth: 1.5 }),
                  /* @__PURE__ */ jsxs("span", { className: "flex flex-col leading-snug", children: [
                    /* @__PURE__ */ jsx("span", { children: branch.open_hours }),
                    hoursNote && /* @__PURE__ */ jsx("span", { className: "text-xs text-ink/50", children: hoursNote })
                  ] })
                ]
              }
            ),
            branch.phone && /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2 px-3 text-sm text-ink/80", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 shrink-0 text-subheading", strokeWidth: 1.5 }),
              branch.phone
            ] })
          ] }),
          (branch.directions_url || branch.link_url) && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-6 border-t border-maha-200 pt-4", children: [
            directionsLabel && branch.directions_url && /* @__PURE__ */ jsxs(
              "a",
              {
                href: branch.directions_url,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-heading",
                children: [
                  directionsLabel,
                  /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1" })
                ]
              }
            ),
            directionsLabel && branch.directions_url && moreLabel && branch.link_url && /* @__PURE__ */ jsx("span", { className: "h-4 w-px bg-maha-200", "aria-hidden": "true" }),
            moreLabel && branch.link_url && /* @__PURE__ */ jsxs(
              "a",
              {
                href: branch.link_url,
                className: "group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-subheading",
                children: [
                  moreLabel,
                  /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1" })
                ]
              }
            )
          ] })
        ] })
      ] }, index);
    }) })
  ] }) });
}
function ContactAboutBanner({ data }) {
  const locale = useLocale();
  const text = tr(data.text, locale);
  const linkText = tr(data.linkText, locale);
  const { ref, className } = useReveal();
  if (!text && !linkText) {
    return null;
  }
  return /* @__PURE__ */ jsx("section", { ref, className: cn(className, "bg-maha-50 px-5 sm:px-10 lg:px-16"), children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl rounded-2xl bg-maha-100", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-2 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Leaf, { className: "h-4 w-4 shrink-0 text-subheading", strokeWidth: 1.5, "aria-hidden": "true" }),
      text && /* @__PURE__ */ jsx(
        "div",
        {
          className: "rich-content text-sm text-ink/80",
          dangerouslySetInnerHTML: { __html: text }
        }
      )
    ] }),
    linkText && data.linkUrl && /* @__PURE__ */ jsxs(
      Link,
      {
        href: data.linkUrl,
        className: "group inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-heading",
        children: [
          linkText,
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1" })
        ]
      }
    )
  ] }) }) });
}
function ContactInfoForm({ info, form: formContent }) {
  const locale = useLocale();
  const infoTitle = tr(info.title, locale);
  const infoIntro = tr(info.intro, locale);
  const formTitle = tr(formContent.title, locale);
  const formIntro = tr(formContent.intro, locale);
  const privacyNote = tr(formContent.privacyNote, locale);
  const { ref, className } = useReveal();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const form = useForm({
    name: "",
    phone: "",
    email: "",
    branch: "",
    message: ""
  });
  const submit = (event) => {
    event.preventDefault();
    form.post("/lien-he", {
      preserveScroll: true,
      onSuccess: () => {
        form.reset();
        setShowSuccess(true);
      },
      onError: () => setShowError(true)
    });
  };
  const rows = [
    {
      icon: Phone,
      label: "HOTLINE",
      value: info.hotline,
      note: tr(info.hotline_note, locale)
    },
    {
      icon: MessageCircle,
      label: "ZALO",
      value: info.zalo,
      note: tr(info.zalo_note, locale)
    },
    {
      icon: Mail,
      label: "EMAIL",
      value: info.email,
      note: tr(info.email_note, locale)
    },
    {
      icon: Instagram,
      label: "INSTAGRAM",
      value: info.instagram,
      note: tr(info.instagram_note, locale)
    }
  ].filter((row) => row.value);
  return /* @__PURE__ */ jsxs("section", { ref, className: cn(className, "bg-maha-50 px-5 pb-14 pt-2 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20"), children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-maha-100 p-6 sm:p-8 lg:p-10", children: [
        infoTitle && /* @__PURE__ */ jsx(
          "div",
          {
            className: "rich-content font-serif text-2xl text-heading sm:text-3xl",
            dangerouslySetInnerHTML: { __html: infoTitle }
          }
        ),
        infoIntro && /* @__PURE__ */ jsx(
          "div",
          {
            className: "rich-content mt-2 text-sm text-ink/70",
            dangerouslySetInnerHTML: { __html: infoIntro }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-8 divide-y divide-maha-300/60", children: rows.map((row) => /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 py-5 first:pt-0 last:pb-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-maha-400 text-subheading", children: /* @__PURE__ */ jsx(row.icon, { className: "h-5 w-5", strokeWidth: 1.5 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-subheading", children: row.label }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 font-serif text-lg text-heading", children: row.value })
            ] })
          ] }),
          row.note && /* @__PURE__ */ jsx(
            "div",
            {
              className: "rich-content max-w-[10rem] text-right text-xs leading-relaxed text-ink/60",
              dangerouslySetInnerHTML: { __html: row.note }
            }
          )
        ] }, row.label)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-maha-100 p-6 sm:p-8 lg:p-10", children: [
        formTitle && /* @__PURE__ */ jsx(
          "div",
          {
            className: "rich-content font-serif text-2xl text-heading sm:text-3xl",
            dangerouslySetInnerHTML: { __html: formTitle }
          }
        ),
        formIntro && /* @__PURE__ */ jsx(
          "div",
          {
            className: "rich-content mt-2 text-sm text-ink/70",
            dangerouslySetInnerHTML: { __html: formIntro }
          }
        ),
        /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-4", noValidate: true, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: form.data.name,
                onChange: (e) => form.setData("name", e.target.value),
                placeholder: "Họ và tên *",
                className: "w-full rounded-md border border-maha-200 bg-maha-50 px-4 py-3 text-sm text-ink placeholder:text-ink/50 focus:border-subheading focus:outline-none"
              }
            ),
            form.errors.name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-600", children: form.errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                value: form.data.phone,
                onChange: (e) => form.setData("phone", e.target.value),
                placeholder: "Số điện thoại *",
                className: "w-full rounded-md border border-maha-200 bg-maha-50 px-4 py-3 text-sm text-ink placeholder:text-ink/50 focus:border-subheading focus:outline-none"
              }
            ),
            form.errors.phone && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-600", children: form.errors.phone })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                value: form.data.email,
                onChange: (e) => form.setData("email", e.target.value),
                placeholder: "Email",
                className: "w-full rounded-md border border-maha-200 bg-maha-50 px-4 py-3 text-sm text-ink placeholder:text-ink/50 focus:border-subheading focus:outline-none"
              }
            ),
            form.errors.email && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-600", children: form.errors.email })
          ] }),
          formContent.branchOptions.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: form.data.branch,
                onChange: (e) => form.setData("branch", e.target.value),
                className: "w-full rounded-md border border-maha-200 bg-maha-50 px-4 py-3 text-sm text-ink focus:border-subheading focus:outline-none",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Chi nhánh bạn quan tâm" }),
                  formContent.branchOptions.map((option) => /* @__PURE__ */ jsx("option", { value: option.value, children: option.label }, option.value))
                ]
              }
            ),
            form.errors.branch && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-600", children: form.errors.branch })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: form.data.message,
                onChange: (e) => form.setData("message", e.target.value),
                placeholder: "Nội dung (Yêu cầu dịch vụ, thời gian,...)",
                rows: 4,
                className: "w-full resize-none rounded-md border border-maha-200 bg-maha-50 px-4 py-3 text-sm text-ink placeholder:text-ink/50 focus:border-subheading focus:outline-none"
              }
            ),
            form.errors.message && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-600", children: form.errors.message })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: form.processing,
              className: "w-full rounded-md bg-heading px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
              children: form.processing ? "Đang gửi..." : "Gửi thông tin"
            }
          ),
          privacyNote && /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-center gap-1.5 text-center text-xs text-ink/50", children: [
            /* @__PURE__ */ jsx(Lock, { className: "h-3.5 w-3.5", strokeWidth: 1.5 }),
            privacyNote
          ] })
        ] })
      ] })
    ] }),
    showSuccess && /* @__PURE__ */ jsx(
      "div",
      {
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "contact-success-title",
        className: "fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4 backdrop-blur-sm",
        children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-md rounded-3xl border border-[#CDBCA3] bg-white p-8 text-center shadow-2xl shadow-maha-900/20", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowSuccess(false),
              "aria-label": "Đóng",
              className: "absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-maha-100 hover:text-ink",
              children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-maha-100 text-heading", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-7 w-7" }) }),
          /* @__PURE__ */ jsx("h2", { id: "contact-success-title", className: "mt-5 font-serif text-2xl text-heading", children: "Gửi thành công" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-ink/70", children: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể." }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowSuccess(false),
              className: "mt-6 block w-full rounded-md bg-[#2F3E2E] py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90",
              children: "Đóng"
            }
          )
        ] })
      }
    ),
    showError && /* @__PURE__ */ jsx(
      "div",
      {
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "contact-error-title",
        className: "fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4 backdrop-blur-sm",
        children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-md rounded-3xl border border-[#CDBCA3] bg-white p-8 text-center shadow-2xl shadow-maha-900/20", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowError(false),
              "aria-label": "Đóng",
              className: "absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-maha-100 hover:text-ink",
              children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-7 w-7" }) }),
          /* @__PURE__ */ jsx("h2", { id: "contact-error-title", className: "mt-5 font-serif text-2xl text-heading", children: "Gửi không thành công" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-ink/70", children: "Vui lòng kiểm tra lại thông tin bên dưới và thử gửi lại." }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowError(false),
              className: "mt-6 block w-full rounded-md bg-[#2F3E2E] py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90",
              children: "Đóng"
            }
          )
        ] })
      }
    )
  ] });
}
function ContactClosingBanner({ data }) {
  const locale = useLocale();
  const title = tr(data.title, locale);
  const buttonText = tr(data.buttonText, locale);
  const imageAlt = tr(data.image_alt, locale);
  const hasImage = !!data.image;
  const { ref, className } = useReveal();
  return /* @__PURE__ */ jsx("section", { ref, className: cn(className, "bg-maha-50 px-5 py-4 sm:px-10 sm:py-6 lg:px-16"), children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative isolate mx-auto flex min-h-[280px] max-w-7xl flex-col justify-end overflow-hidden rounded-2xl px-5 pb-10 pt-16 sm:min-h-[320px] sm:px-10 sm:pb-12 lg:px-16",
        hasImage ? "bg-[#2F3E2E]" : "bg-maha-200"
      ),
      children: [
        hasImage && /* @__PURE__ */ jsx(
          "img",
          {
            src: data.image ?? void 0,
            alt: imageAlt,
            className: "absolute inset-0 z-0 h-full w-full object-cover",
            loading: "lazy"
          }
        ),
        hasImage && /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 z-0",
            style: { background: "linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.55))" }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex w-full max-w-lg flex-col items-start gap-6", children: [
          title && /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "rich-content font-serif text-2xl leading-snug sm:text-3xl",
                hasImage ? "text-white" : "text-heading"
              ),
              dangerouslySetInnerHTML: { __html: title }
            }
          ),
          buttonText && data.buttonUrl && /* @__PURE__ */ jsxs(
            Link,
            {
              href: data.buttonUrl,
              className: cn(
                "group inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-90",
                hasImage ? "bg-[#2F3E2E] text-white ring-1 ring-white/30" : "bg-heading text-white"
              ),
              children: [
                /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: buttonText } }),
                /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
const ICONS = {
  Clock,
  Gift,
  Leaf,
  HeartHandshake,
  ShieldCheck,
  Sparkles
};
function ContactCommitments({ data }) {
  const locale = useLocale();
  const items = data.items ?? [];
  const { ref, className } = useReveal();
  if (!items.length) {
    return null;
  }
  return /* @__PURE__ */ jsx("section", { ref, className: cn(className, "bg-maha-50 px-5 py-10 sm:px-10 sm:py-12 lg:px-16"), children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 divide-y divide-maha-200 sm:grid-cols-4 sm:divide-y-0", children: items.map((item, index) => {
    const Icon = item.icon && ICONS[item.icon] || Leaf;
    const title = tr(item.title, locale);
    const description = tr(item.description, locale);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-2 border-maha-200 px-4 py-6 text-center sm:border-l sm:first:border-l-0",
        children: [
          /* @__PURE__ */ jsx(Icon, { className: "h-7 w-7 text-subheading", strokeWidth: 1.25 }),
          title && /* @__PURE__ */ jsx(
            "div",
            {
              className: "rich-content mt-2 text-sm font-semibold text-heading",
              dangerouslySetInnerHTML: { __html: title }
            }
          ),
          description && /* @__PURE__ */ jsx(
            "div",
            {
              className: "rich-content text-xs leading-relaxed text-ink/70",
              dangerouslySetInnerHTML: { __html: description }
            }
          )
        ]
      },
      index
    );
  }) }) }) });
}
function Contact({
  hero,
  branches,
  aboutBanner,
  info,
  form,
  closing,
  commitments,
  sectionVisibility
}) {
  return /* @__PURE__ */ jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Liên hệ" }),
    sectionVisibility.hero && /* @__PURE__ */ jsx(
      Hero,
      {
        data: hero,
        heightClassName: "h-[calc(85vh-100px)] min-h-[340px] sm:h-[calc(75vh-100px)]",
        showDivider: true
      }
    ),
    sectionVisibility.branches && /* @__PURE__ */ jsx(ContactBranches, { data: branches }),
    sectionVisibility.aboutBanner && /* @__PURE__ */ jsx(ContactAboutBanner, { data: aboutBanner }),
    sectionVisibility.contactForm && /* @__PURE__ */ jsx(ContactInfoForm, { info, form }),
    sectionVisibility.closing && /* @__PURE__ */ jsx(ContactClosingBanner, { data: closing }),
    sectionVisibility.commitments && /* @__PURE__ */ jsx(ContactCommitments, { data: commitments })
  ] });
}
export {
  Contact as default
};
