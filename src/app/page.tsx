"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "aurora" | "terminal" | "neon";
type Lang = "ru" | "en";

// ─── Particle canvas ──────────────────────────────────────────────────────────

function ParticleCanvas({ variant }: { variant: Variant }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    const COUNT = 70,
      LINK = 130;
    const mouse = { x: -9999, y: -9999 };
    let w: number, h: number, dpr: number;
    let raf: number;

    const accentMap: Record<Variant, string> = {
      aurora: "#3b82f6",
      terminal: "#22d3ee",
      neon: "#8b5cf6",
    };

    const hexToRgb = (hex: string) => {
      hex = hex.replace("#", "");
      const n = parseInt(hex, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    window.addEventListener("resize", resize);
    resize();

    const parts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
    }));

    const parent = cv.parentElement!;
    const onMove = (e: MouseEvent) => {
      const rect = cv.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);

    const draw = () => {
      const rgb = hexToRgb(accentMap[variant]);
      const rc = rgb.join(",");
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - mouse.x,
          dy = p.y - mouse.y;
        const md = Math.sqrt(dx * dx + dy * dy);
        if (md < 120) {
          p.x += (dx / md) * 0.6;
          p.y += (dy / md) * 0.6;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rc},0.7)`;
        ctx.fill();
      }
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i],
            b = parts[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${rc},${0.16 * (1 - d / LINK)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [variant]);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.55,
      }}
    />
  );
}

// ─── Reveal hook ──────────────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    els.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    setTimeout(() => els.forEach((el) => el.classList.add("visible")), 1500);
    return () => io.disconnect();
  }, []);
}

// ─── i18n content ─────────────────────────────────────────────────────────────

const RU = {
  nav: {
    about: "обо мне",
    skills: "стек",
    experience: "опыт",
    projects: "проекты",
    games: "игры",
    contact: "контакты",
  },
  hero: {
    kicker: "// frontend engineer · team lead",
    role: "Frontend-разработчик · Team Lead",
    desc: "Создаю производительные веб-интерфейсы на React и Vue с 2019 года. Веду команду, проектирую архитектуру фронтенда и full-stack решения на Next.js и Nest.js. В свободное время увлёкся разработкой игр на Flutter.",
    cta1: "Смотреть проекты",
    cta2: "Связаться",
    stat1: "5+ лет в разработке",
    stat2: "Team Lead",
    stat3: "React · Vue · Next",
  },
  about: {
    label: "01 / обо мне",
    title: "Инженер, фронтенд-разработчик, сетевой администратор",
    p1: "Я фронтенд-разработчик с опытом full-stack разработки. Пишу на React.js и Vue (2 и 3), строю серверную часть на Express.js и Nest.js, делаю fullstack приложения на Next.js.",
    p2: "Сейчас работаю тимлидом фронтенд-команды: отвечаю за архитектуру, ревью, найм и рост ребят. Люблю аккуратный код, понятные интерфейсы и архитектуру",
    s1v: "2019",
    s1l: "старт в разработке",
    s2v: "Lead",
    s2l: "роль в команде",
    s3v: "10+",
    s3l: "продуктов в проде",
    s4v: "∞",
    s4l: "желание учиться",
  },
  skills: {
    label: "02 / стек",
    title: "Технологии, с которыми работаю",
    frameworks: "frameworks",
    state: "state & data",
    ui: "ui & анимация",
    data: "карты & графики",
    tooling: "инструменты",
    mobile: "мобайл & игры",
  },
  exp: {
    label: "03 / опыт",
    title: "Путь в разработке",
    e1y: "2024 — наст. время",
    e1r: "Team Lead Frontend",
    e1d: "Руковожу командой фронтенда: архитектура приложений, код-ревью, менторство, найм. Внедряю стандарты качества и процессы, выстраиваю CI и компонентные библиотеки.",
    e2y: "2021 — 2024",
    e2r: "Senior Frontend / Fullstack",
    e2d: "Разрабатывал сложные SPA и full-stack продукты на React, Vue и Next.js. Бэкенд на Nest.js и Express.js, интеграции, real-time, карты и дашборды.",
    e3y: "2019 — 2021",
    e3r: "Frontend Developer",
    e3d: "Начал карьеру с вёрстки и SPA на React и Vue. Освоил state-менеджмент, работу с API и UI-библиотеками, прокачался до уверенного продуктового разработчика.",
  },
  proj: {
    label: "04 / проекты",
    title: "Избранные кейсы",
    note: "// проекты под NDA — показаны обобщённо, без брендов и данных",
    maps: {
      t: "Гео-платформа",
      d: "Интерактивные карты со слоями и фильтрами, перемещением объектов в реальном времени.",
    },
    kanban: {
      t: "Канбан / трекер задач",
      d: "Инструмент управления проектами в духе Jira: доски, drag-and-drop.",
    },
    docs: {
      t: "Документооборот",
      d: "Корпоративная система согласования и оборота документов с маршрутами, ролями и подписанием.",
    },
    dash: {
      t: "BI-дашборды",
      d: "Аналитические панели в стиле Power BI: интерактивные графики, срезы и выгрузки по большим данным.",
    },
    rental: {
      t: "Аренда жилья",
      d: "Платформа для арендодателей: размещение объектов, бронирования, контроль оплаты и кабинет владельца.",
    },
    comms: {
      t: "Соцсеть & общение",
      d: "Блоги, ленты и чаты с аудио- и видеозвонками на WebRTC, уведомления в реальном времени.",
    },
  },
  games: {
    label: "05 / сайд-проект",
    title: "Увлёкся разработкой игр на Flutter",
    tag: "in dev",
    desc: "Параллельно с фронтендом изучаю геймдев: пишу небольшие игры на Flutter и движке Flame. Тут я отдыхаю, экспериментирую с механиками, анимацией и физикой.",
    g1t: "Аркада-прототип",
    g1d: "Казуальная аркада с физикой и таблицей рекордов — полигон для механик.",
    g2t: "Пиксельный платформер",
    g2d: "2D-платформер с уровнями, врагами и сбором предметов.",
  },
  contact: {
    label: "06 / контакты",
    title: "Открыт к предложениям",
    desc: "Открыт к интересным задачам, консультациям и сотрудничеству. Напишите — я отвечу.",
    avail: "Открыт к предложениям",
    nameL: "имя",
    emailL: "email",
    msgL: "сообщение",
    namePh: "Напишите Ваше имя",
    emailPh: "you@example.com",
    msgPh: "Расскажите о задаче…",
    send: "Отправить",
    sending: "Отправка...",
    sent: "Отправлено!",
    err: "Ошибка. Попробуйте ещё раз.",
  },
  footer: { text: "собрано с любовью к коду " },
};

const EN = {
  nav: {
    about: "about",
    skills: "stack",
    experience: "experience",
    projects: "projects",
    games: "games",
    contact: "contact",
  },
  hero: {
    kicker: "// frontend engineer · team lead",
    role: "Frontend Engineer · Team Lead",
    desc: "Building fast, polished web interfaces with React and Vue since 2019. I lead a team, design frontend architecture and full-stack apps on Next.js and Nest.js. Lately I got into building games with Flutter.",
    cta1: "View projects",
    cta2: "Get in touch",
    stat1: "5+ years building",
    stat2: "Team Lead",
    stat3: "React · Vue · Next",
  },
  about: {
    label: "01 / about",
    title: "An engineer who leads the way",
    p1: "I am a frontend developer with full-stack experience. I work with React.js and Vue (2 & 3), build backends with Express.js and Nest.js, and ship complete products on Next.js.",
    p2: "Today I lead a frontend team — owning architecture, reviews, hiring and growth. I care about clean code, intuitive interfaces and architecture.",
    s1v: "2019",
    s1l: "started coding",
    s2v: "Lead",
    s2l: "team role",
    s3v: "10+",
    s3l: "products shipped",
    s4v: "∞",
    s4l: "urge to learn",
  },
  skills: {
    label: "02 / stack",
    title: "Technologies I work with",
    frameworks: "frameworks",
    state: "state & data",
    ui: "ui & motion",
    data: "maps & charts",
    tooling: "tooling",
    mobile: "mobile & games",
  },
  exp: {
    label: "03 / experience",
    title: "My path in development",
    e1y: "2024 — present",
    e1r: "Team Lead Frontend",
    e1d: "Leading a frontend team: app architecture, code reviews, mentoring and hiring. Setting quality standards and processes, building CI pipelines and component libraries.",
    e2y: "2021 — 2024",
    e2r: "Senior Frontend / Fullstack",
    e2d: "Built complex SPAs and full-stack products with React, Vue and Next.js. Backends on Nest.js and Express.js, integrations, real-time, maps and dashboards.",
    e3y: "2019 — 2021",
    e3r: "Frontend Developer",
    e3d: "Started with markup and SPAs in React and Vue. Mastered state management, APIs and UI libraries, and grew into a confident product engineer.",
  },
  proj: {
    label: "04 / projects",
    title: "Selected work",
    note: "// projects under NDA — shown abstractly, no brands or data",
    maps: {
      t: "Geo platform",
      d: "Interactive maps with objects, popovers, and real-time filtering and moving objects.",
    },
    kanban: {
      t: "Kanban / task tracker",
      d: "A Jira-style project management tool: boards, drag-and-drop, shared files and folders.",
    },
    docs: {
      t: "Document workflow",
      d: "Enterprise document approval and routing system with roles, routes and e-signing.",
    },
    dash: {
      t: "BI dashboards",
      d: "Power BI-style analytics panels: interactive charts, slices and exports over big data.",
    },
    rental: {
      t: "Property rental",
      d: "A platform for landlords: listings, bookings, control of payments and an owner dashboard.",
    },
    comms: {
      t: "Social & comms",
      d: "Blogs, feeds and chats with WebRTC audio/video calls and real-time notifications.",
    },
  },
  games: {
    label: "05 / side project",
    title: "Hooked on building games with Flutter",
    tag: "in dev",
    desc: "Alongside frontend I explore game dev: small games built with Flutter and the Flame engine. This is where I unwind and experiment with mechanics, animation and physics.",
    g1t: "Arcade prototype",
    g1d: "A casual arcade with physics and a leaderboard — a playground for mechanics.",
    g2t: "Pixel platformer",
    g2d: "A 2D platformer with levels, enemies and collectibles, built on Flame.",
  },
  contact: {
    label: "06 / contact",
    title: "Open to communications",
    desc: "Open to interesting challenges, consulting and collaboration. Drop a line — I reply.",
    avail: "Open to opportunities",
    nameL: "name",
    emailL: "email",
    msgL: "message",
    namePh: "Enter your name",
    emailPh: "you@example.com",
    msgPh: "Tell me about the task…",
    send: "Send",
    sending: "Sending...",
    sent: "Sent!",
    err: "Error. Please try again.",
  },
  footer: { text: "crafted with love for clean code " },
};

// ─── Shared styles ─────────────────────────────────────────────────────────────

const tagStyle: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains-mono), monospace",
  fontSize: 11,
  color: "var(--muted)",
  padding: "4px 9px",
  border: "1px solid var(--line)",
  borderRadius: 6,
};
const chipStyle: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains-mono), monospace",
  fontSize: 13,
  color: "var(--fg)",
  padding: "6px 11px",
  border: "1px solid var(--line)",
  borderRadius: 8,
  background: "rgba(255,255,255,.02)",
};
const cardStyle: React.CSSProperties = {
  border: "1px solid var(--line)",
  borderRadius: 16,
  padding: 24,
  background: "rgba(255,255,255,.03)",
  transition: "border-color .2s, transform .2s",
};
const eyebrowStyle: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains-mono), monospace",
  fontSize: 13,
  color: "var(--accent)",
  marginBottom: 14,
};
const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-space-grotesk), sans-serif",
  fontWeight: 600,
  letterSpacing: "-.02em",
  margin: "0 0 40px",
};

// ─── Contact form ──────────────────────────────────────────────────────────────

function ContactForm({ c }: { c: typeof RU.contact }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "err">(
    "idle",
  );

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 15px",
    border: "1px solid var(--line)",
    borderRadius: 11,
    background: "rgba(255,255,255,.02)",
    color: "var(--fg)",
    fontFamily: "var(--font-inter), sans-serif",
    fontSize: 15,
    outline: "none",
    transition: "border-color .2s",
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    }
  };

  const btnLabel =
    status === "sending"
      ? c.sending
      : status === "sent"
        ? c.sent
        : status === "err"
          ? c.err
          : `${c.send} →`;

  return (
    <form
      onSubmit={onSubmit}
      style={{
        border: "1px solid var(--line)",
        borderRadius: 18,
        padding: 28,
        background: "var(--bg-2)",
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontFamily: "var(--font-jetbrains-mono),monospace",
            fontSize: 12,
            color: "var(--muted)",
            marginBottom: 8,
          }}
        >
          {c.nameL}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={c.namePh}
          required
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--line)")}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontFamily: "var(--font-jetbrains-mono),monospace",
            fontSize: 12,
            color: "var(--muted)",
            marginBottom: 8,
          }}
        >
          {c.emailL}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={c.emailPh}
          required
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--line)")}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label
          style={{
            display: "block",
            fontFamily: "var(--font-jetbrains-mono),monospace",
            fontSize: 12,
            color: "var(--muted)",
            marginBottom: 8,
          }}
        >
          {c.msgL}
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={c.msgPh}
          required
          style={{ ...inputStyle, resize: "vertical" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--line)")}
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        style={{
          width: "100%",
          padding: 14,
          border: "none",
          borderRadius: 12,
          cursor: status === "sent" ? "default" : "pointer",
          fontFamily: "var(--font-jetbrains-mono),monospace",
          fontSize: 14,
          fontWeight: 600,
          color: "#05070d",
          background:
            status === "sent"
              ? "linear-gradient(120deg,#22c55e,#16a34a)"
              : status === "err"
                ? "linear-gradient(120deg,#ef4444,#dc2626)"
                : "linear-gradient(120deg,var(--accent),var(--accent-2))",
          boxShadow: "0 8px 26px rgba(var(--glow),.4)",
          transition: "transform .2s",
          opacity: status === "sending" ? 0.7 : 1,
        }}
      >
        {btnLabel}
      </button>
    </form>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [variant, setVariant] = useState<Variant>("aurora");
  const [lang, setLang] = useState<Lang>("ru");
  const c = lang === "ru" ? RU : EN;

  useReveal();

  const swatch = (
    g1: string,
    g2: string,
    active: boolean,
  ): React.CSSProperties => ({
    width: 22,
    height: 22,
    borderRadius: 7,
    cursor: "pointer",
    padding: 0,
    background: `linear-gradient(135deg,${g1},${g2})`,
    border: active ? "2px solid #fff" : "2px solid transparent",
    boxShadow: active ? `0 0 10px ${g1}` : "none",
    transition: "all .2s",
  });

  return (
    <div
      data-variant={variant}
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--fg)",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <ParticleCanvas variant={variant} />

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
            maxWidth: 1180,
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <a
            href="#top"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 11,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                display: "grid",
                placeItems: "center",
                fontFamily: "var(--font-jetbrains-mono),monospace",
                fontWeight: 600,
                fontSize: 14,
                color: "#05070d",
                background:
                  "linear-gradient(135deg,var(--accent),var(--accent-2))",
                boxShadow: "0 0 20px rgba(var(--glow),.55)",
              }}
            >
              KB
            </span>
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono),monospace",
                fontSize: 13,
                letterSpacing: ".02em",
                color: "var(--muted)",
              }}
            >
              konstantinborisov
              <span style={{ color: "var(--accent)" }}>.dev</span>
            </span>
          </a>
          <div
            className="nav-links"
            style={{
              fontFamily: "var(--font-jetbrains-mono),monospace",
              fontSize: 13,
            }}
          >
            {(
              [
                "about",
                "skills",
                "experience",
                "projects",
                "games",
                "contact",
              ] as const
            ).map((k) => (
              <a
                key={k}
                href={`#${k}`}
                style={{ color: "var(--muted)", textDecoration: "none" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--fg)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--muted)")
                }
              >
                {c.nav[k]}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
                fontFamily: "var(--font-jetbrains-mono),monospace",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  color: lang === "ru" ? "var(--accent)" : "var(--muted)",
                  fontWeight: lang === "ru" ? 600 : 400,
                }}
              >
                RU
              </span>
              <span style={{ color: "var(--muted)" }}>/</span>
              <span
                style={{
                  color: lang === "en" ? "var(--accent)" : "var(--muted)",
                  fontWeight: lang === "en" ? 600 : 400,
                }}
              >
                EN
              </span>
            </button>
          </div>
        </nav>
      </header>

      <main style={{ position: "relative", zIndex: 1 }}>
        {/* HERO */}
        <section
          id="top"
          className="hero-section"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "90px 24px 100px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -40,
              right: 0,
              width: 420,
              height: 420,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(var(--glow),.32),transparent 68%)",
              filter: "blur(20px)",
              animation: "pulseGlow 6s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
          <div
            className="hero-ring"
            style={{
              position: "absolute",
              top: 120,
              right: 80,
              width: 240,
              height: 240,
              borderRadius: "50%",
              border: "1px solid var(--line)",
              animation: "floatY 9s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", maxWidth: 780 }}>
            <div
              className="fade-up"
              style={{
                fontFamily: "var(--font-jetbrains-mono),monospace",
                fontSize: 14,
                color: "var(--accent)",
                letterSpacing: ".02em",
                marginBottom: 22,
                animationDelay: ".05s",
              }}
            >
              {c.hero.kicker}
            </div>
            <h1
              className="fade-up"
              style={{
                fontFamily: "var(--font-space-grotesk),sans-serif",
                fontWeight: 600,
                fontSize: "clamp(44px,7vw,82px)",
                lineHeight: 1.02,
                letterSpacing: "-.03em",
                margin: 0,
                animationDelay: ".12s",
              }}
            >
              Konstantin
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(120deg,var(--accent),var(--accent-2))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Borisov
              </span>
            </h1>
            <p
              className="fade-up"
              style={{
                fontFamily: "var(--font-jetbrains-mono),monospace",
                fontSize: "clamp(15px,2vw,19px)",
                color: "var(--fg)",
                margin: "24px 0 0",
                animationDelay: ".2s",
              }}
            >
              {c.hero.role}
            </p>
            <p
              className="fade-up"
              style={{
                fontSize: 18,
                lineHeight: 1.65,
                color: "var(--muted)",
                maxWidth: 620,
                margin: "20px 0 0",
                animationDelay: ".28s",
              }}
            >
              {c.hero.desc}
            </p>
            <div
              className="fade-up"
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                marginTop: 36,
                animationDelay: ".36s",
              }}
            >
              <a
                href="#projects"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "13px 24px",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontFamily: "var(--font-jetbrains-mono),monospace",
                  fontSize: 14,
                  color: "#05070d",
                  fontWeight: 600,
                  background:
                    "linear-gradient(120deg,var(--accent),var(--accent-2))",
                  boxShadow: "0 8px 30px rgba(var(--glow),.4)",
                  transition: "transform .2s, box-shadow .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 36px rgba(var(--glow),.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(var(--glow),.4)";
                }}
              >
                {c.hero.cta1} →
              </a>
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "13px 24px",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontFamily: "var(--font-jetbrains-mono),monospace",
                  fontSize: 14,
                  color: "var(--fg)",
                  border: "1px solid var(--line)",
                  background: "rgba(255,255,255,.02)",
                  transition: "border-color .2s, color .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line)";
                  e.currentTarget.style.color = "var(--fg)";
                }}
              >
                {c.hero.cta2}
              </a>
            </div>
            <div
              className="fade-up"
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginTop: 42,
                animationDelay: ".44s",
              }}
            >
              {[c.hero.stat1, c.hero.stat2, c.hero.stat3].map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "var(--font-jetbrains-mono),monospace",
                    fontSize: 12,
                    color: "var(--muted)",
                    padding: "8px 13px",
                    border: "1px solid var(--line)",
                    borderRadius: 999,
                    background: "rgba(255,255,255,.02)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          data-reveal
          style={{ maxWidth: 1180, margin: "0 auto", padding: "60px 24px" }}
        >
          <div style={eyebrowStyle}>{c.about.label}</div>
          <h2 style={{ ...h2Style, fontSize: "clamp(30px,4.4vw,46px)" }}>
            {c.about.title}
          </h2>
          <div className="about-grid">
            <div>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.75,
                  color: "var(--muted)",
                  margin: "0 0 18px",
                }}
              >
                {c.about.p1}
              </p>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.75,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                {c.about.p2}
              </p>
            </div>
            <div className="stats-grid">
              {(
                [
                  [c.about.s1v, c.about.s1l],
                  [c.about.s2v, c.about.s2l],
                  [c.about.s3v, c.about.s3l],
                  [c.about.s4v, c.about.s4l],
                ] as [string, string][]
              ).map(([val, lbl]) => (
                <div
                  key={lbl}
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: 14,
                    padding: 20,
                    background: "rgba(255,255,255,.03)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-space-grotesk),sans-serif",
                      fontSize: 32,
                      fontWeight: 600,
                      color: "var(--accent)",
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-jetbrains-mono),monospace",
                      fontSize: 12,
                      color: "var(--muted)",
                      marginTop: 6,
                    }}
                  >
                    {lbl}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          data-reveal
          style={{ maxWidth: 1180, margin: "0 auto", padding: "60px 24px" }}
        >
          <div style={eyebrowStyle}>{c.skills.label}</div>
          <h2 style={{ ...h2Style, fontSize: "clamp(30px,4.4vw,46px)" }}>
            {c.skills.title}
          </h2>
          <div className="skills-grid">
            {(
              [
                [
                  c.skills.frameworks,
                  [
                    "React.js",
                    "Vue 3",
                    "Vue 2",
                    "Next.js",
                    "Nest.js",
                    "Express.js",
                  ],
                ],
                [
                  c.skills.state,
                  [
                    "Redux",
                    "Redux Toolkit",
                    "Zustand",
                    "TanStack Query",
                    "Pinia",
                    "Vuex",
                  ],
                ],
                [
                  c.skills.ui,
                  [
                    "Tailwind CSS",
                    "Framer Motion",
                    "MUI",
                    "Ant Design",
                    "shadcn/ui",
                    "Radix UI",
                  ],
                ],
                [
                  c.skills.data,
                  ["Leaflet", "Nivo", "Recharts", "particles.js"],
                ],
                [
                  c.skills.tooling,
                  ["Axios", "React Hook Form", "React DnD", "React Router"],
                ],
                [c.skills.mobile, ["Flutter", "Dart", "★ new"]],
              ] as [string, string[]][]
            ).map(([label, items], idx) => (
              <div
                key={label}
                style={{
                  ...cardStyle,
                  ...(idx === 5
                    ? {
                        background:
                          "linear-gradient(135deg,rgba(var(--glow),.1),rgba(255,255,255,.03))",
                      }
                    : {}),
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = `rgba(var(--glow),.4)`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "var(--line)")
                }
              >
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains-mono),monospace",
                    fontSize: 12,
                    color: "var(--accent)",
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  {label}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {items.map((item) =>
                    item === "★ new" ? (
                      <span
                        key="new"
                        style={{
                          ...tagStyle,
                          color: "var(--accent)",
                          border: "1px solid rgba(var(--glow),.4)",
                          fontSize: 12,
                        }}
                      >
                        ★ new
                      </span>
                    ) : (
                      <span key={item} style={chipStyle}>
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section
          id="experience"
          data-reveal
          style={{ maxWidth: 1180, margin: "0 auto", padding: "60px 24px" }}
        >
          <div style={eyebrowStyle}>{c.exp.label}</div>
          <h2 style={{ ...h2Style, fontSize: "clamp(30px,4.4vw,46px)" }}>
            {c.exp.title}
          </h2>
          <div style={{ position: "relative", paddingLeft: 34 }}>
            <div
              style={{
                position: "absolute",
                left: 9,
                top: 6,
                bottom: 6,
                width: 2,
                background: "linear-gradient(180deg,var(--accent),transparent)",
              }}
            />
            {[
              {
                y: c.exp.e1y,
                r: c.exp.e1r,
                d: c.exp.e1d,
                lvl: "LVL 03 · LEAD",
                active: true,
              },
              {
                y: c.exp.e2y,
                r: c.exp.e2r,
                d: c.exp.e2d,
                lvl: "LVL 02 · SENIOR",
                active: false,
              },
              {
                y: c.exp.e3y,
                r: c.exp.e3r,
                d: c.exp.e3d,
                lvl: "LVL 01 · START",
                active: false,
              },
            ].map((e, i) => (
              <div
                key={i}
                style={{ position: "relative", marginBottom: i < 2 ? 34 : 0 }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: -33,
                    top: 4,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: `2px solid ${e.active ? "var(--accent)" : "var(--line)"}`,
                    background: "var(--bg)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: e.active ? "var(--accent)" : "var(--muted)",
                      ...(e.active
                        ? { boxShadow: "0 0 10px rgba(var(--glow),.8)" }
                        : {}),
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 6,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains-mono),monospace",
                      fontSize: 13,
                      color: "var(--accent)",
                    }}
                  >
                    {e.y}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains-mono),monospace",
                      fontSize: 11,
                      color: "var(--muted)",
                      padding: "2px 8px",
                      border: "1px solid var(--line)",
                      borderRadius: 6,
                    }}
                  >
                    {e.lvl}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk),sans-serif",
                    fontSize: 21,
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  {e.r}
                </div>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "var(--muted)",
                    margin: 0,
                    maxWidth: 680,
                  }}
                >
                  {e.d}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          data-reveal
          style={{ maxWidth: 1180, margin: "0 auto", padding: "60px 24px" }}
        >
          <div style={eyebrowStyle}>{c.proj.label}</div>
          <h2
            style={{
              ...h2Style,
              fontSize: "clamp(30px,4.4vw,46px)",
              marginBottom: 12,
            }}
          >
            {c.proj.title}
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--muted)",
              margin: "0 0 40px",
              fontFamily: "var(--font-jetbrains-mono),monospace",
            }}
          >
            {c.proj.note}
          </p>
          <div className="projects-grid">
            {[
              {
                n: "01",
                proj: c.proj.maps,
                tags: ["react-leaflet", "React", "TanStack Query"],
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 30, height: 30, marginBottom: 16 }}
                  >
                    <path d="M9 3 3 6v15l6-3 6 3 6-3V3l-6 3-6-3Z" />
                    <path d="M9 3v15M15 6v15" />
                  </svg>
                ),
              },
              {
                n: "02",
                proj: c.proj.kanban,
                tags: ["React DnD", "Redux Toolkit", "WebSocket"],
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 30, height: 30, marginBottom: 16 }}
                  >
                    <rect x="3" y="4" width="5" height="16" rx="1" />
                    <rect x="10" y="4" width="5" height="11" rx="1" />
                    <rect x="17" y="4" width="4" height="14" rx="1" />
                  </svg>
                ),
              },
              {
                n: "03",
                proj: c.proj.docs,
                tags: ["Vue 3", "Pinia", "Nest.js"],
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 30, height: 30, marginBottom: 16 }}
                  >
                    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
                    <path d="M14 3v5h5M9 13h6M9 17h6" />
                  </svg>
                ),
              },
              {
                n: "04",
                proj: c.proj.dash,
                tags: ["Nivo", "Recharts", "Next.js"],
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 30, height: 30, marginBottom: 16 }}
                  >
                    <path d="M3 3v18h18" />
                    <rect x="7" y="11" width="3" height="6" />
                    <rect x="12" y="7" width="3" height="10" />
                    <rect x="17" y="13" width="3" height="4" />
                  </svg>
                ),
              },
              {
                n: "05", proj: c.proj.rental, tags: ["Next.js", "Leaflet", "Zustand"], url: "https://rent.konstantinborisov.dev",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 30, height: 30, marginBottom: 16 }}><path d="M3 11 12 3l9 8" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></svg>,
              },
              {
                n: "06",
                proj: c.proj.comms,
                tags: ["WebRTC", "React", "Socket.io"],
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 30, height: 30, marginBottom: 16 }}
                  >
                    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-4A8.4 8.4 0 1 1 21 11.5Z" />
                    <path d="M8 11h.01M12 11h.01M16 11h.01" />
                  </svg>
                ),
              },
            ]).map(({ n, proj, tags, icon, url }) => (
              <div key={n} style={{ ...cardStyle, position: "relative", overflow: "hidden", cursor: url ? "pointer" : undefined }}
                onClick={url ? () => window.open(url, "_blank", "noopener,noreferrer") : undefined}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(var(--glow),.45)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.transform = "none"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 12, color: "var(--muted)" }}>{n}</span>
                  {!url && <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 10, color: "var(--accent)", padding: "3px 8px", border: "1px solid rgba(var(--glow),.3)", borderRadius: 6, letterSpacing: ".08em" }}>NDA</span>}
                </div>
                {icon}
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk),sans-serif",
                    fontSize: 19,
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  {proj.t}
                </div>
                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    color: "var(--muted)",
                    margin: "0 0 16px",
                  }}
                >
                  {proj.d}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {tags.map((t) => (
                    <span key={t} style={tagStyle}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GAMES */}
        <section
          id="games"
          data-reveal
          style={{ maxWidth: 1180, margin: "0 auto", padding: "60px 24px" }}
        >
          <div
            className="games-card"
            style={{
              border: "1px solid var(--line)",
              borderRadius: 24,
              padding: 44,
              background:
                "linear-gradient(135deg,rgba(var(--glow),.12),transparent 70%), var(--bg-2)",
              position: "relative",
              overflow: "hidden",
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
                background:
                  "radial-gradient(circle,rgba(var(--glow),.25),transparent 70%)",
                filter: "blur(20px)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 22, height: 22 }}
                >
                  <rect x="2" y="6" width="20" height="12" rx="4" />
                  <path d="M7 12h4M9 10v4" />
                  <circle cx="16" cy="11" r="1" />
                  <circle cx="18.5" cy="13.5" r="1" />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono),monospace",
                    fontSize: 13,
                    color: "var(--accent)",
                  }}
                >
                  {c.games.label}
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-space-grotesk),sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(28px,4vw,42px)",
                  letterSpacing: "-.02em",
                  margin: "0 0 14px",
                  maxWidth: 560,
                }}
              >
                {c.games.title}
              </h2>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: "var(--muted)",
                  margin: "0 0 32px",
                  maxWidth: 600,
                }}
              >
                {c.games.desc}
              </p>
              <div className="games-grid">
                {[
                  {
                    id: "game_01",
                    t: c.games.g1t,
                    d: c.games.g1d,
                    tags: ["Flutter", "Flame"],
                  },
                  {
                    id: "game_02",
                    t: c.games.g2t,
                    d: c.games.g2d,
                    tags: ["Flutter", "Dart"],
                  },
                ].map((g) => (
                  <div
                    key={g.id}
                    style={{
                      border: "1px solid var(--line)",
                      borderRadius: 14,
                      padding: 22,
                      background: "rgba(255,255,255,.02)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 14,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains-mono),monospace",
                          fontSize: 12,
                          color: "var(--muted)",
                        }}
                      >
                        // {g.id}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains-mono),monospace",
                          fontSize: 10,
                          color: "var(--accent-2)",
                          padding: "3px 8px",
                          border: "1px solid var(--line)",
                          borderRadius: 6,
                        }}
                      >
                        {c.games.tag}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-space-grotesk),sans-serif",
                        fontSize: 18,
                        fontWeight: 600,
                        marginBottom: 6,
                      }}
                    >
                      {g.t}
                    </div>
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.55,
                        color: "var(--muted)",
                        margin: "0 0 14px",
                      }}
                    >
                      {g.d}
                    </p>
                    <div style={{ display: "flex", gap: 6 }}>
                      {g.tags.map((t) => (
                        <span key={t} style={tagStyle}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          data-reveal
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "60px 24px 80px",
          }}
        >
          <div className="contact-grid">
            <div>
              <div style={eyebrowStyle}>{c.contact.label}</div>
              <h2
                style={{
                  fontFamily: "var(--font-space-grotesk),sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(30px,4.4vw,46px)",
                  letterSpacing: "-.02em",
                  margin: "0 0 16px",
                }}
              >
                {c.contact.title}
              </h2>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: "var(--muted)",
                  margin: "0 0 28px",
                  maxWidth: 420,
                }}
              >
                {c.contact.desc}
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 15px",
                  border: "1px solid var(--line)",
                  borderRadius: 999,
                  background: "rgba(255,255,255,.02)",
                  marginBottom: 28,
                }}
              >
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: "var(--accent-2)",
                    boxShadow: "0 0 10px var(--accent-2)",
                    animation: "pulseGlow 2s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono),monospace",
                    fontSize: 12,
                    color: "var(--fg)",
                  }}
                >
                  {c.contact.avail}
                </span>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {[
                  {
                    href: "https://github.com/kot-uz",
                    label: "github.com/kot-uz",
                    sub: "GitHub",
                    icon: (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        style={{
                          width: 20,
                          height: 20,
                          color: "var(--accent)",
                        }}
                      >
                        <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.47c.53.1.72-.23.72-.5v-1.8c-2.93.64-3.55-1.4-3.55-1.4-.48-1.22-1.17-1.55-1.17-1.55-.96-.66.07-.64.07-.64 1.06.07 1.62 1.09 1.62 1.09.94 1.62 2.47 1.15 3.07.88.1-.68.37-1.15.67-1.42-2.34-.27-4.8-1.17-4.8-5.2 0-1.15.41-2.09 1.08-2.83-.11-.27-.47-1.34.1-2.8 0 0 .88-.28 2.88 1.08a10 10 0 0 1 5.24 0c2-1.36 2.88-1.08 2.88-1.08.57 1.46.21 2.53.1 2.8.67.74 1.08 1.68 1.08 2.83 0 4.04-2.46 4.93-4.81 5.19.38.33.71.97.71 1.96v2.9c0 .28.19.61.73.5A10.5 10.5 0 0 0 12 1.5Z" />
                      </svg>
                    ),
                  },
                  {
                    href: "https://www.linkedin.com/in/konbor",
                    label: "linkedin.com/in/konbor",
                    sub: "LinkedIn",
                    icon: (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        style={{
                          width: 20,
                          height: 20,
                          color: "var(--accent)",
                        }}
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18.34V10.6H5.76v7.74h2.58ZM7.05 9.44a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm11.29 8.9v-4.24c0-2.27-1.21-3.32-2.83-3.32a2.44 2.44 0 0 0-2.21 1.22v-1.05h-2.58c.03.73 0 7.74 0 7.74h2.58v-4.32c0-.23.02-.46.08-.62.18-.46.6-.94 1.31-.94.92 0 1.29.7 1.29 1.73v4.15h2.59Z" />
                      </svg>
                    ),
                  },
                  {
                    href: "mailto:kb3576323@gmail.com",
                    label: "kb3576323@gmail.com",
                    sub: "Email",
                    icon: (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="1.7"
                        style={{ width: 20, height: 20 }}
                      >
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                    ),
                  },
                ].map(({ href, label, sub, icon }) => (
                  <a
                    key={href}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 13,
                      textDecoration: "none",
                      color: "var(--fg)",
                      padding: "14px 16px",
                      border: "1px solid var(--line)",
                      borderRadius: 12,
                      background: "rgba(255,255,255,.02)",
                      transition: "border-color .2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "var(--line)")
                    }
                  >
                    {icon}
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-jetbrains-mono),monospace",
                          fontSize: 14,
                        }}
                      >
                        {label}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>
                        {sub}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <ContactForm c={c.contact} />
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid var(--line)" }}>
          <div
            style={{
              maxWidth: 1180,
              margin: "0 auto",
              padding: "28px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono),monospace",
                fontSize: 12,
                color: "var(--muted)",
              }}
            >
              © 2026 Konstantin Borisov
            </span>
            {/* <span style={{ fontFamily: "var(--font-jetbrains-mono),monospace", fontSize: 12, color: "var(--muted)" }}> */}
            {/* {c.footer.text}<span className="cursor-blink" style={{ color: "var(--accent)" }}>_</span> */}
            {/* </span> */}
          </div>
        </footer>
      </main>
    </div>
  );
}
