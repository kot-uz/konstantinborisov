import type { Metadata } from "next";
import { RentalLanding } from "./rental-landing";

const title = "Property rental — landlord management platform";
const description =
  "A property rental management platform for landlords: apartments and leases, rent payment tracking with overdue control, utilities, maintenance requests and contractors. Built with Next.js, React 19, NestJS and PostgreSQL by Konstantin Borisov.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Property rental",
    "Rental management",
    "Landlord dashboard",
    "Rent payments",
    "Next.js",
    "React",
    "NestJS",
    "PostgreSQL",
    "full-stack",
    "Konstantin Borisov",
  ],
  alternates: { canonical: "/rental" },
  openGraph: {
    type: "article",
    url: "https://konstantinborisov.dev/rental",
    title,
    description,
    siteName: "Konstantin Borisov",
    images: [{ url: "/rental/dashboard.png", width: 1200, height: 750, alt: "RentManager dashboard" }],
  },
  robots: { index: true, follow: true },
};

export default function RentalPage() {
  return <RentalLanding />;
}
