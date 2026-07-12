"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const APP_URL = "https://rent.konstantinborisov.dev";

type Lang = "ru" | "en";

// ─── i18n content ─────────────────────────────────────────────────────────────

const RU = {
  back: "← портфолио",
  openApp: "Открыть приложение",
  badge: "// pet-проект · full-stack",
  heroTitle: "Аренда жилья",
  heroSub:
    "Платформа для арендодателей: учёт квартир и договоров, контроль арендных платежей, коммунальные услуги, заявки на ремонт и подрядчики — всё в одном кабинете владельца.",
  screenAlt: "Панель управления RentManager",
  featuresTitle: "Что внутри",
  featuresSub: "Полноценная система управления недвижимостью, а не демо.",
  features: [
    { t: "Квартиры и объекты", d: "Каталог объектов с площадью, этажами и статусом «занято / свободно», поиск и фильтры." },
    { t: "Договоры и арендаторы", d: "Арендаторы, договоры аренды, сроки и ставки — вся история по каждому объекту." },
    { t: "Арендные платежи", d: "Периоды оплаты, ожидаемые и полученные суммы, автоматический контроль просрочек." },
    { t: "Коммунальные услуги", d: "Учёт коммунальных платежей и их привязка к объектам и периодам." },
    { t: "Ремонт и подрядчики", d: "Заявки на ремонт с приоритетом, статусом, фото, тегами и оценкой стоимости работ." },
    { t: "Аудит и вебхуки", d: "Журнал аудита действий, вебхуки для интеграций и роли доступа для команды." },
  ],
  s1Badge: "// объекты",
  s1Title: "Учёт квартир и статусов",
  s1Sub: "Каталог объектов с ключевыми параметрами и текущим арендатором на карточке.",
  s1Points: [
    "Статус «занято / свободно» с цветными бейджами",
    "Площадь, этаж и количество комнат",
    "Текущий арендатор и ставка на карточке",
    "Поиск, фильтры и экспорт в CSV",
  ],
  s1Alt: "Список квартир",
  s2Badge: "// платежи",
  s2Title: "Контроль арендных платежей",
  s2Sub: "Таблица периодов с ожидаемыми и полученными суммами и отдельной вкладкой просроченных.",
  s2Points: [
    "Периоды, сроки оплаты и статусы",
    "Вкладка «Просроченные» с быстрым доступом",
    "Запись платежа в один клик",
    "Выгрузка в CSV для отчётности",
  ],
  s2Alt: "Арендные платежи",
  s3Badge: "// ремонт",
  s3Title: "Заявки на ремонт",
  s3Sub: "Карточка заявки с приоритетом, статусом, расположением, оценкой стоимости, фото и тегами.",
  s3Points: [
    "Приоритет и статус заявки",
    "Оценка стоимости и расположение",
    "Фотографии и комментарии",
    "Теги и назначение подрядчиков",
  ],
  s3Alt: "Заявка на ремонт",
  stackTitle: "Стек",
  ctaTitle: "Посмотрите вживую",
  ctaSub: "Откройте демо-кабинет: квартиры, договоры, платежи и заявки на ремонт — всё в одном месте.",
  footer: "Часть портфолио Konstantin Borisov",
};

const EN = {
  back: "← portfolio",
  openApp: "Open the app",
  badge: "// pet project · full-stack",
  heroTitle: "Property rental",
  heroSub:
    "A platform for landlords: apartments and leases, rent payment tracking, utilities, maintenance requests and contractors — all in a single owner dashboard.",
  screenAlt: "RentManager dashboard",
  featuresTitle: "What's inside",
  featuresSub: "A full property-management system, not a demo.",
  features: [
    { t: "Apartments & units", d: "Catalog of units with area, floors and occupied / vacant status, search and filters." },
    { t: "Leases & tenants", d: "Tenants, lease agreements, terms and rates — full history for every unit." },
    { t: "Rent payments", d: "Billing periods, expected and received amounts, automatic overdue tracking." },
    { t: "Utilities", d: "Track utility payments and tie them to units and billing periods." },
    { t: "Repairs & contractors", d: "Maintenance tickets with priority, status, photos, tags and cost estimates." },
    { t: "Audit & webhooks", d: "Action audit log, webhooks for integrations and role-based access for the team." },
  ],
  s1Badge: "// units",
  s1Title: "Apartment & status tracking",
  s1Sub: "A catalog of units with the key details and the current tenant right on the card.",
  s1Points: [
    "Occupied / vacant status with colored badges",
    "Area, floor and number of rooms",
    "Current tenant and rate on the card",
    "Search, filters and CSV export",
  ],
  s1Alt: "Apartments list",
  s2Badge: "// payments",
  s2Title: "Rent payment control",
  s2Sub: "A table of periods with expected and received amounts and a dedicated overdue tab.",
  s2Points: [
    "Periods, due dates and statuses",
    "Overdue tab for quick access",
    "Record a payment in one click",
    "CSV export for reporting",
  ],
  s2Alt: "Rent payments",
  s3Badge: "// maintenance",
  s3Title: "Maintenance requests",
  s3Sub: "A ticket card with priority, status, location, cost estimate, photos and tags.",
  s3Points: [
    "Ticket priority and status",
    "Cost estimate and location",
    "Photos and comments",
    "Tags and contractor assignment",
  ],
  s3Alt: "Maintenance request",
  stackTitle: "Stack",
  ctaTitle: "See it live",
  ctaSub: "Open the demo dashboard: apartments, leases, payments and maintenance tickets — all in one place.",
  footer: "Part of Konstantin Borisov's portfolio",
};

const STACK = [
  "Next.js",
  "React 19",
  "TypeScript",
  "Tailwind CSS",
  "Zustand",
  "TanStack Query",
  "Recharts",
  "Leaflet",
  "NestJS",
  "Prisma",
  "PostgreSQL",
  "i18n · RU / EN / UZ",
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
  <svg key="home" {...svgBase}><path d="M3 11 12 3l9 8" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></svg>,
  <svg key="doc" {...svgBase}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg>,
  <svg key="pay" {...svgBase}><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M6 15h4" /></svg>,
  <svg key="util" {...svgBase}><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" /></svg>,
  <svg key="wrench" {...svgBase}><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5Z" /></svg>,
  <svg key="audit" {...svgBase}><path d="M12 3a9 9 0 1 0 9 9" /><path d="M12 7v5l3 2M21 3v5h-5" /></svg>,
];

// ─── Showcase block ──────────────────────────────────────────────────────────

function Showcase({
  badge,
  title,
  sub,
  points,
  img,
  alt,
  reverse,
}: {
  badge: string;
  title: string;
  sub: string;
  points: string[];
  img: string;
  alt: string;
  reverse?: boolean;
}) {
  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "50px 24px" }}>
      <div className="cal-showcase-grid">
        <div style={{ order: reverse ? 2 : 1 }}>
          <div style={eyebrowStyle}>{badge}</div>
          <h2 style={{ fontFamily: heading, fontWeight: 600, fontSize: "clamp(26px,3.6vw,38px)", letterSpacing: "-.02em", margin: "0 0 14px" }}>
            {title}
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--muted)", margin: "0 0 22px" }}>{sub}</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {points.map((p) => (
              <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "var(--fg)", fontSize: 15.5 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20, flexShrink: 0, marginTop: 1 }}>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ ...frameStyle, order: reverse ? 1 : 2 }}>
          <Image src={img} alt={alt} width={1024} height={537} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      </div>
    </section>
  );
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function RentalLanding() {
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
            <p style={{ fontSize: 18, lineHeight: 1.65, color: "var(--muted)", maxWidth: 620, margin: "22px auto 0" }}>{c.heroSub}</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 34 }}>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={primaryBtn}>
                {c.openApp} →
              </a>
            </div>
          </div>

          {/* Hero screenshot */}
          <div className="fade-up" style={{ ...frameStyle, maxWidth: 940, margin: "56px auto 0" }}>
            <Image
              src="/rental/dashboard.png"
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

        {/* SHOWCASES */}
        <Showcase badge={c.s1Badge} title={c.s1Title} sub={c.s1Sub} points={c.s1Points} img="/rental/apartments.png" alt={c.s1Alt} />
        <Showcase badge={c.s2Badge} title={c.s2Title} sub={c.s2Sub} points={c.s2Points} img="/rental/payments.png" alt={c.s2Alt} reverse />
        <Showcase badge={c.s3Badge} title={c.s3Title} sub={c.s3Sub} points={c.s3Points} img="/rental/maintenance.png" alt={c.s3Alt} />

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
