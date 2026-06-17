import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://konstantinborisov.dev"),
  title: "Konstantin Borisov — Frontend Engineer · Team Lead",
  description:
    "Frontend Engineer & Team Lead. Building fast, polished web interfaces with React and Vue since 2019.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Vue",
    "Team Lead",
    "Konstantin Borisov",
  ],
  authors: [{ name: "Konstantin Borisov", url: "https://konstantinborisov.dev" }],
  creator: "Konstantin Borisov",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://konstantinborisov.dev",
    title: "Konstantin Borisov — Frontend Engineer · Team Lead",
    description:
      "Frontend Engineer & Team Lead. Building fast, polished web interfaces with React and Vue since 2019.",
    siteName: "Konstantin Borisov",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
