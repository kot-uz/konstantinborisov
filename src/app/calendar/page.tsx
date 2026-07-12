import type { Metadata } from "next";
import { CalendarLanding } from "./calendar-landing";

const title = "Calendar — full-stack Google Calendar clone";
const description =
  "A full-stack calendar app: own auth, multiple calendars, recurring events, tasks with sharing, file attachments and real-time reminders. Built with NestJS, Prisma, React 19 and WebSockets by Konstantin Borisov.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Calendar app",
    "Google Calendar clone",
    "NestJS",
    "React",
    "Prisma",
    "PostgreSQL",
    "WebSocket",
    "full-stack",
    "Konstantin Borisov",
  ],
  alternates: { canonical: "/calendar" },
  openGraph: {
    type: "article",
    url: "https://konstantinborisov.dev/calendar",
    title,
    description,
    siteName: "Konstantin Borisov",
    images: [{ url: "/calendar/month-view.png", width: 1200, height: 750, alt: "Calendar month view" }],
  },
  robots: { index: true, follow: true },
};

export default function CalendarPage() {
  return <CalendarLanding />;
}
