import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-16">
      <div className="absolute inset-0 bg-[linear-gradient(var(--color-border)_0.5px,transparent_0.5px),linear-gradient(90deg,var(--color-border)_0.5px,transparent_0.5px)] bg-size-[60px_60px] opacity-60" />
      <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-[55%] rounded-full bg-[radial-gradient(circle,rgba(29,158,117,0.12)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-teal)]/30 bg-[var(--color-teal-dim)] px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[var(--color-teal)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-teal)]" />
            Open to collaborators · 2026 cohort
          </div>
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            apsylab.org · AiInPsychology(Ψ)
          </p>
          <h1 className="font-serif text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
            Where <em className="text-[var(--color-teal)] not-italic">minds</em>
            <br />
            meet machines
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-[var(--color-text-muted)] leading-relaxed font-light lg:mx-0">
            A research lab where psychology students and engineers build together —
            because the most important AI problems need both a human mind and a
            technical hand.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link
              href="/workspace"
              className="rounded bg-[var(--color-teal)] px-8 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-teal-light)]"
            >
              Open Your Workspace
            </Link>
            <Link
              href="/#research"
              className="rounded border border-[var(--color-border)] bg-white px-8 py-3 text-sm transition hover:border-[var(--color-text-muted)]"
            >
              Explore Research
            </Link>
          </div>
          <div className="mt-12 flex justify-center gap-10 lg:justify-start">
            {[
              { num: "6", label: "Research Verticals" },
              { num: "∞", label: "Open Projects" },
              { num: "2", label: "Disciplines United" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-3xl font-semibold text-[var(--color-teal)]">
                  {stat.num}
                </div>
                <div className="mt-1 text-[0.65rem] uppercase tracking-widest text-[var(--color-text-muted)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-3">
          <div className="relative col-span-2 h-52 overflow-hidden rounded-2xl shadow-lg md:h-64">
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
              alt="Forest path — calm nature for reflective psychology work"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            <span className="absolute bottom-4 left-4 text-sm font-medium text-white">
              Psychology · mind & nature
            </span>
          </div>
          <div className="relative h-40 overflow-hidden rounded-2xl shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1542315192-1f61a1792f33?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Developer workspace with code on screen"
              fill
              className="object-cover"
              sizes="25vw"
            />
            <span className="absolute bottom-3 left-3 text-xs font-medium text-white drop-shadow">
              CS · build & ship
            </span>
          </div>
          <div className="relative h-40 overflow-hidden rounded-2xl shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80"
              alt="Students collaborating at a laptop"
              
              fill
              className="object-cover"
              sizes="25vw"
            />
            <span className="absolute bottom-3 left-3 text-xs font-medium text-white drop-shadow">
              Together · bridge projects
            </span>
          </div>
        </div>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50%] font-serif text-[clamp(8rem,20vw,14rem)] font-light text-[var(--color-teal)]/10 select-none"
      >
        Ψ
      </span>
    </section>
  );
}
