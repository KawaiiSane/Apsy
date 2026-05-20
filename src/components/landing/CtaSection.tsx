import Link from "next/link";

export function CtaSection() {
  return (
    <section
      id="join"
      className="relative overflow-hidden px-6 py-24 text-center"
    >
      <div className="absolute top-1/2 left-1/2 h-72 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(29,158,117,0.1),transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-xl">
        <div className="font-serif text-5xl text-[var(--color-teal)]/50">Ψ</div>
        <h2 className="mt-4 font-serif text-3xl font-light md:text-4xl">
          Ready to bring your mind to the machine?
        </h2>
        <p className="mt-4 text-[var(--color-text-muted)] font-light">
          APSYLab is open to students, researchers, and practitioners across
          psychology and engineering. No gatekeeping. Serious work only.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/workspace"
            className="rounded bg-[var(--color-teal)] px-8 py-3 text-sm font-medium text-white hover:bg-[var(--color-teal-light)]"
          >
            Start in Workspace
          </Link>
          <a
            href="mailto:psychologyinai@gmail.com"
            className="rounded border border-[var(--color-border)] bg-white px-8 py-3 text-sm hover:border-[var(--color-text-muted)]"
          >
            Apply to Join
          </a>
        </div>
      </div>
    </section>
  );
}
