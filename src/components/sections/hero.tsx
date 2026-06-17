import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      {/* Blue radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.546 0.245 264.4 / 0.12), transparent)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-32 text-center sm:px-6">
        <Reveal delay={0}>
          <p className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            Available for opportunities
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            {site.name}
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-4 text-2xl font-semibold text-muted-foreground sm:text-3xl">
            {site.title}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {site.description}
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-base")}
            >
              View Projects
            </a>
            <a
              href="#contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 px-8 text-base"
              )}
            >
              Contact Me
            </a>
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground/50 transition-colors hover:text-muted-foreground"
        aria-label="Scroll to About section"
      >
        <ArrowDown className="size-6" />
      </a>
    </section>
  );
}
