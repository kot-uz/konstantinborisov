"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const APP_URL = "https://calendar.konstantinborisov.dev";
const REPO_URL = "https://github.com/kot-uz/calendar";

type Lang = "ru" | "en";

// ─── i18n content ─────────────────────────────────────────────────────────────

const RU = {
  back: "← портфолио",
  openApp: "Открыть приложение",
  badge: "// pet-проект · full-stack",
  heroTitle: "Календарь",
  heroSub:
    "Аналог Google Календаря: своя авторизация, несколько календарей, повторяющиеся события, задачи с шарингом, вложения и уведомления в реальном времени.",
  source: "Исходный код",
  screenAlt: "Месячный вид календаря",
  featuresTitle: "Что внутри",
  featuresSub: "Полноценный продукт, а не демо: от событий до web-push.",
  features: [
    { t: "Несколько календарей", d: "Виды на месяц, неделю и день с собственной сеткой и drag & drop событий." },
    { t: "Повторяющиеся события", d: "RRULE-повторения с исключениями — правки «только это» или «все» вхождения." },
    { t: "Задачи и сроки", d: "Задачи со сроком выполнения, напоминаниями и отметкой готовности." },
    { t: "Шаринг задач", d: "Приглашение по email с ролями viewer / editor и правами доступа." },
    { t: "Вложения", d: "Файлы к задачам и событиям через S3-совместимое хранилище (presigned URL)." },
    { t: "Уведомления", d: "Real-time через WebSocket и браузерные web-push при наступлении времени." },
  ],
  showcaseBadge: "// события",
  showcaseTitle: "Создание и редактирование событий",
  showcaseSub: "Удобный редактор с повторениями, напоминаниями, выбором календаря и вложениями.",
  showcasePoints: [
    "Быстрое создание кликом по ячейке сетки",
    "Повторения: ежедневно / еженедельно / свой интервал",
    "Напоминания и выбор календаря",
    "Оптимистичные обновления UI",
  ],
  showcaseAlt: "Модальное окно события",
  stackTitle: "Стек",
  ctaTitle: "Попробуйте вживую",
  ctaSub: "Регистрация за секунду — создайте событие и задачу, пошарьте её и получите уведомление.",
  footer: "Часть портфолио Konstantin Borisov",
};

const EN = {
  back: "← portfolio",
  openApp: "Open the app",
  badge: "// pet project · full-stack",
  heroTitle: "Calendar",
  heroSub:
    "A Google Calendar clone: own authentication, multiple calendars, recurring events, shareable tasks, attachments and real-time notifications.",
  source: "Source code",
  screenAlt: "Calendar month view",
  featuresTitle: "What's inside",
  featuresSub: "A real product, not a demo — from events to web push.",
  features: [
    { t: "Multiple calendars", d: "Month, week and day views on a custom grid with drag & drop events." },
    { t: "Recurring events", d: "RRULE recurrence with exceptions — edit “this one” or “all” occurrences." },
    { t: "Tasks & due dates", d: "Tasks with due dates, reminders and a done state." },
    { t: "Task sharing", d: "Invite by email with viewer / editor roles and access control." },
    { t: "Attachments", d: "Files on tasks and events via S3-compatible storage (presigned URLs)." },
    { t: "Notifications", d: "Real-time over WebSocket plus browser web push when reminders fire." },
  ],
  showcaseBadge: "// events",
  showcaseTitle: "Create and edit events",
  showcaseSub: "A polished editor with recurrence, reminders, calendar selection and attachments.",
  showcasePoints: [
    "Quick create by clicking a grid cell",
    "Recurrence: daily / weekly / custom interval",
    "Reminders and calendar selection",
    "Optimistic UI updates",
  ],
  showcaseAlt: "Event modal window",
  stackTitle: "Stack",
  ctaTitle: "Try it live",
  ctaSub: "Sign up in a second — create an event and a task, share it and get a notification.",
  footer: "Part of Konstantin Borisov's portfolio",
};

const STACK = [
  "NestJS",
  "Prisma",
  "PostgreSQL",
  "Redis · BullMQ",
  "Socket.io",
  "web-push",
  "MinIO / S3",
  "React 19",
  "Vite",
  "TanStack Query",
  "Zustand",
  "Tailwind CSS",
];

// ─── Shared styles ─────────────────────────────────────────────────────────────

const mono = "var(--font-jetbrains-mono),monospace";
const heading = "var(--font-space-grotesk),sans-serif";

const eyebrowStyle: React.CSSProperties = {
  fontFamily: mono,
  fontSize: 13,
  color: "var(--accent)",
  marginBottom: 14,
};
const chipStyle: React.CSSProperties = {
  fontFamily: mono,
  fontSize: 13,
  color: "var(--fg)",
  padding: "7px 12px",
  border: "1px solid var(--line)",
  borderRadius: 8,
  background: "rgba(255,255,255,.02)",
};
const cardStyle: React.CSSProperties = {
  border: "1px solid var(--line)",
  borderRadius: 16,
  padding: 24,
  background: "rgba(255,255,255,.03)",
};
const frameStyle: React.CSSProperties = {
  border: "1px solid var(--line)",
  borderRadius: 16,
  overflow: "hidden",
  background: "var(--bg-2)",
  boxShadow: "0 30px 80px rgba(0,0,0,.45)",
};

// ─── Feature icons ─────────────────────────────────────────────────────────────

const svgBase = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "var(--accent)",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  style: { width: 26, height: 26 },
};

const FEATURE_ICONS = [
  <svg key="cal" {...svgBase}><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>,
  <svg key="rep" {...svgBase}><path d="M17 2l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>,
  <svg key="task" {...svgBase}><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
  <svg key="share" {...svgBase}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></svg>,
  <svg key="clip" {...svgBase}><path d="M21.4 11.05 12.2 20.3a5 5 0 0 1-7.07-7.07l9.2-9.2a3.33 3.33 0 0 1 4.71 4.71l-9.2 9.2a1.67 1.67 0 0 1-2.36-2.36l8.49-8.49" /></svg>,
  <svg key="bell" {...svgBase}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>,
];

// ─── Component ─────────────────────────────────────────────────────────────────

export function CalendarLanding() {
  const [lang, setLang] = useState<Lang>("ru");
  const c = lang === "ru" ? RU : EN;

  const primaryBtn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 9,
    padding: "13px 24px",
    borderRadius: 12,
    textDecoration: "none",
    fontFamily: mono,
    fontSize: 14,
    fontWeight: 600,
    color: "#05070d",
    background: "linear-gradient(120deg,var(--accent),var(--accent-2))",
    boxShadow: "0 8px 30px rgba(var(--glow),.4)",
  };
  const ghostBtn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 9,
    padding: "13px 24px",
    borderRadius: 12,
    textDecoration: "none",
    fontFamily: mono,
    fontSize: 14,
    color: "var(--fg)",
    border: "1px solid var(--line)",
    background: "rgba(255,255,255,.02)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--fg)",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          background: "rgba(5,7,13,.55)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <nav
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <Link
            href="/#projects"
            style={{ fontFamily: mono, fontSize: 13, color: "var(--muted)", textDecoration: "none" }}
          >
            {c.back}
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => setLang((l) => (l === "ru" ? "en" : "ru"))}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                padding: "6px 9px",
                border: "1px solid var(--line)",
                borderRadius: 11,
                background: "rgba(255,255,255,.02)",
                fontFamily: mono,
                fontSize: 12,
                cursor: "pointer",
              }}
              aria-label="Switch language"
            >
              <span style={{ color: lang === "ru" ? "var(--accent)" : "var(--muted)", fontWeight: lang === "ru" ? 600 : 400 }}>RU</span>
              <span style={{ color: "var(--muted)" }}>/</span>
              <span style={{ color: lang === "en" ? "var(--accent)" : "var(--muted)", fontWeight: lang === "en" ? 600 : 400 }}>EN</span>
            </button>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{ ...primaryBtn, padding: "9px 16px", fontSize: 13 }}>
              {c.openApp} →
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "70px 24px 40px", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: -20,
              right: 40,
              width: 380,
              height: 380,
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(var(--glow),.28),transparent 68%)",
              filter: "blur(20px)",
              pointerEvents: "none",
            }}
          />
          <div className="fade-up" style={{ position: "relative", maxWidth: 720, textAlign: "center", margin: "0 auto" }}>
            <div style={{ fontFamily: mono, fontSize: 14, color: "var(--accent)", marginBottom: 20 }}>{c.badge}</div>
            <h1
              style={{
                fontFamily: heading,
                fontWeight: 600,
                fontSize: "clamp(44px,7vw,78px)",
                lineHeight: 1.02,
                letterSpacing: "-.03em",
                margin: 0,
              }}
            >
              <span
                style={{
                  background: "linear-gradient(120deg,var(--accent),var(--accent-2))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {c.heroTitle}
              </span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: "var(--muted)", maxWidth: 600, margin: "22px auto 0" }}>{c.heroSub}</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 34 }}>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={primaryBtn}>
                {c.openApp} →
              </a>
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer" style={ghostBtn}>
                {c.source}
              </a>
            </div>
          </div>

          {/* Hero screenshot */}
          <div className="fade-up" style={{ ...frameStyle, maxWidth: 940, margin: "56px auto 0" }}>
            <Image
              src="/calendar/month-view.png"
              alt={c.screenAlt}
              width={1200}
              height={750}
              priority
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </section>

        {/* FEATURES */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={eyebrowStyle}>// features</div>
            <h2 style={{ fontFamily: heading, fontWeight: 600, fontSize: "clamp(28px,4vw,42px)", letterSpacing: "-.02em", margin: 0 }}>
              {c.featuresTitle}
            </h2>
            <p style={{ fontSize: 16, color: "var(--muted)", marginTop: 14 }}>{c.featuresSub}</p>
          </div>
          <div className="cal-features-grid">
            {c.features.map((f, i) => (
              <div key={f.t} style={cardStyle}>
                <div
                  style={{
                    display: "inline-flex",
                    padding: 11,
                    borderRadius: 12,
                    background: "rgba(var(--glow),.1)",
                    marginBottom: 16,
                  }}
                >
                  {FEATURE_ICONS[i]}
                </div>
                <div style={{ fontFamily: heading, fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{f.t}</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SHOWCASE */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
          <div className="cal-showcase-grid">
            <div>
              <div style={eyebrowStyle}>{c.showcaseBadge}</div>
              <h2 style={{ fontFamily: heading, fontWeight: 600, fontSize: "clamp(26px,3.6vw,38px)", letterSpacing: "-.02em", margin: "0 0 14px" }}>
                {c.showcaseTitle}
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--muted)", margin: "0 0 22px" }}>{c.showcaseSub}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {c.showcasePoints.map((p) => (
                  <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "var(--fg)", fontSize: 15.5 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20, flexShrink: 0, marginTop: 1 }}>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={frameStyle}>
              <Image
                src="/calendar/event-modal.png"
                alt={c.showcaseAlt}
                width={1200}
                height={900}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </section>

        {/* STACK */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={eyebrowStyle}>// tech</div>
            <h2 style={{ fontFamily: heading, fontWeight: 600, fontSize: "clamp(26px,3.6vw,38px)", letterSpacing: "-.02em", margin: 0 }}>
              {c.stackTitle}
            </h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 760, margin: "0 auto" }}>
            {STACK.map((s) => (
              <span key={s} style={chipStyle}>{s}</span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px 80px" }}>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 24,
              padding: "56px 32px",
              textAlign: "center",
              border: "1px solid var(--line)",
              background: "linear-gradient(135deg,rgba(var(--glow),.14),transparent 70%), var(--bg-2)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -60,
                right: -40,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: "radial-gradient(circle,rgba(var(--glow),.25),transparent 70%)",
                filter: "blur(20px)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative" }}>
              <h2 style={{ fontFamily: heading, fontWeight: 600, fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-.02em", margin: "0 0 14px" }}>
                {c.ctaTitle}
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--muted)", maxWidth: 480, margin: "0 auto 30px" }}>{c.ctaSub}</p>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={primaryBtn}>
                {c.openApp} →
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid var(--line)" }}>
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              padding: "28px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <Link href="/#projects" style={{ fontFamily: mono, fontSize: 12, color: "var(--muted)", textDecoration: "none" }}>
              {c.back}
            </Link>
            <span style={{ fontFamily: mono, fontSize: 12, color: "var(--muted)" }}>{c.footer}</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
