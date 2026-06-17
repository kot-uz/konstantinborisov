import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="About" title="Who I Am" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              I&apos;m a Frontend Developer with a passion for building modern,
              high-performance web applications. With experience spanning React,
              Next.js, and TypeScript, I focus on writing clean, maintainable
              code that scales with product needs.
            </p>
            <p>
              I care deeply about developer experience, accessibility, and
              performance. Beyond the frontend, I have hands-on experience with
              NestJS, PostgreSQL, and Docker — which helps me collaborate
              effectively across the full stack and ship features end-to-end.
            </p>
            <p>
              When I&apos;m not coding, I explore new technologies, contribute to
              open-source projects, and sharpen my architecture skills by
              studying how great teams build great software.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
