import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, GitBranch, Zap, Heart } from "lucide-react";
import HeroReveal, { StaggerGroup, StaggerItem } from "@/components/HeroReveal";
import SiteHeader from "@/components/SiteHeader";
import BahoCareFooter from "@/components/BahoCareFooter";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1587351021355-a479a299d2f9?q=80&w=1200&auto=format&fit=crop",
    label: "Hospital",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    label: "Hardware",
  },
  {
    src: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1200&auto=format&fit=crop",
    label: "Clinic",
  },
  {
    src: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?q=80&w=1200&auto=format&fit=crop",
    label: "Equipment",
  },
];

const TRAITS = [
  { icon: Search, label: "Curious" },
  { icon: GitBranch, label: "Systems thinker" },
  { icon: Zap, label: "Never disengages" },
  { icon: Heart, label: "Cares about health" },
];

export default function LandingPage() {
  return (
    <>
      <SiteHeader dark />
      <main className="flex-1 bg-slate-900 text-white">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-16 items-center">
        <StaggerGroup>
          <StaggerItem className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-teal-light">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-light opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-light" />
            </span>
            Applications open · Kigali, Rwanda
          </StaggerItem>

          <StaggerItem className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            <h1>We need people who ask the second question.</h1>
          </StaggerItem>

          <StaggerItem className="mt-6 text-lg text-slate-300 max-w-xl">
            <p>
              BahoCare is building a clinical field research team in Kigali. We&apos;re
              recruiting ALU students who notice what everyone else walks past —
              and who don&apos;t stop at the first explanation.
            </p>
          </StaggerItem>

          <StaggerItem className="mt-8 flex flex-wrap gap-3">
            <>
              {TRAITS.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                >
                  <Icon className="h-4 w-4 text-teal-light" strokeWidth={1.75} />
                  {label}
                </span>
              ))}
            </>
          </StaggerItem>

          <StaggerItem className="mt-10">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 rounded-lg bg-teal px-6 py-3.5 font-medium text-white transition-colors hover:bg-teal-dark"
            >
              Apply now
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </StaggerItem>
        </StaggerGroup>

        <HeroReveal delay={0.15}>
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 bg-gradient-to-tr from-indigo/25 via-teal/20 to-violet/25 blur-3xl"
            />
            <div className="grid grid-cols-2 gap-4">
            {IMAGES.map((img, i) => (
              <div
                key={img.label}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 ${
                  i % 2 === 1 ? "mt-8" : ""
                }`}
              >
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    sizes="(max-width: 1024px) 45vw, 320px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <span className="absolute bottom-3 left-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  {img.label}
                </span>
              </div>
            ))}
            </div>
          </div>
        </HeroReveal>
      </section>

      <section className="border-t border-white/10 bg-slate-900">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Four roles. One team. A real problem to solve.
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Field Researcher, Research Analyst, IoT/Hardware Engineer, and
            Community Health Liaison — each with a different lens on the same
            work. The application takes about 10 minutes.
          </p>
          <Link
            href="/apply"
            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-teal-light/30 bg-teal/10 px-6 py-3 font-medium text-teal-light transition-colors hover:bg-teal/20"
          >
            Start your application
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </section>
      </main>
      <BahoCareFooter />
    </>
  );
}
