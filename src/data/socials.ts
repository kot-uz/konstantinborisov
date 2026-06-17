import type { SVGProps } from "react";
import { Mail, Send } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";

export type IconComponent = (
  props: SVGProps<SVGSVGElement> & { className?: string }
) => React.JSX.Element;

export type Social = {
  label: string;
  href: string;
  icon: IconComponent;
  value: string;
};

export const email = "hello@konstantinborisov.dev";

export const socials: Social[] = [
  {
    label: "Email",
    href: "mailto:hello@konstantinborisov.dev",
    icon: Mail as unknown as IconComponent,
    value: "hello@konstantinborisov.dev",
  },
  {
    label: "GitHub",
    href: "https://github.com/konstantinborisov",
    icon: GitHubIcon,
    value: "github.com/konstantinborisov",
  },
  {
    label: "Telegram",
    href: "https://t.me/konstantinborisov",
    icon: Send as unknown as IconComponent,
    value: "@konstantinborisov",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/konstantinborisov",
    icon: LinkedInIcon,
    value: "in/konstantinborisov",
  },
];
