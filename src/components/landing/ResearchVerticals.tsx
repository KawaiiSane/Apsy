import { VERTICALS } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ResearchVerticals() {
  return (
    <section id="research" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          label="Research"
          title="Six verticals. One shared mission."
          description="Each vertical brings a different lens to human-centered AI. Projects span from early-stage hypothesis to deployed tools."
          className="mb-12"
        />
        <div className="grid gap-px overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-3">
          {VERTICALS.map((v) => (
            <article
              key={v.num}
              className="bg-white p-6 transition-colors hover:bg-[var(--color-card-hover)]"
            >
              <span className="text-[0.65rem] font-medium uppercase tracking-widest text-[var(--color-text-faint)]">
                {v.num}
              </span>
              <h3 className="mt-2 text-base font-medium">{v.name}</h3>
              <p className="mt-2 text-sm font-light text-[var(--color-text-muted)] leading-relaxed">
                {v.desc}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {v.tags.map((tag, ti) => (
                  <span
                    key={tag}
                    className={`rounded px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide ${
                      ti === 1
                        ? "border border-[var(--color-amber)]/30 bg-[var(--color-amber-dim)] text-[var(--color-amber)]"
                        : "border border-[var(--color-teal)]/30 bg-[var(--color-teal-dim)] text-[var(--color-teal)]"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
