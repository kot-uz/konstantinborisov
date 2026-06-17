import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Experience" title="Work History" />
        </Reveal>

        <div className="relative">
          {/* Vertical rail */}
          <div
            className="absolute top-2 bottom-2 left-3 w-px bg-border"
            aria-hidden
          />

          <ol className="space-y-10">
            {experience.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <li className="relative pl-10">
                  {/* Timeline dot */}
                  <span
                    className="absolute left-0 top-1.5 flex size-6 items-center justify-center rounded-full border-2 border-primary bg-background"
                    aria-hidden
                  >
                    <span className="size-2 rounded-full bg-primary" />
                  </span>

                  <div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="text-base font-semibold">{item.role}</h3>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-sm font-medium text-primary">
                        {item.company}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {item.period}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {item.highlights.map((h, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
