import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { socials } from "@/data/socials";

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Get In Touch"
            subtitle="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {socials.map((social, i) => {
            const Icon = social.icon;
            const isExternal = !social.href.startsWith("mailto");
            return (
              <Reveal key={social.label} delay={i * 0.08}>
                <a
                  href={social.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                  aria-label={`${social.label}: ${social.value}`}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{social.label}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {social.value}
                    </p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
