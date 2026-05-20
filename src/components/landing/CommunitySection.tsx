import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";

const psychSteps = [
  "Browse open project boards and post a research problem you care about",
  "Tag your background — clinical, cognitive, neuro, social, educational",
  "Get matched with an engineering collaborator or team",
  "Lead research design, literature, and evaluation criteria",
  "Co-author outputs: papers, tools, or open datasets",
];

const csSteps = [
  "Browse posted problems or bring a technical idea needing a psych angle",
  "Tag your stack — ML, NLP, systems, frontend, data engineering",
  "Get matched with a psychology researcher or student",
  "Lead implementation, infrastructure, and deployment",
  "Ship real tools with real users — not just side projects",
];

const flow = [
  { icon: "📋", title: "Problem posted", sub: "Psych or CS student" },
  { icon: "🤝", title: "Team matched", sub: "Role-based pairing" },
  { icon: "🔬", title: "Research begins", sub: "Open lab notebook" },
  { icon: "🚀", title: "Output shipped", sub: "Paper / tool / dataset" },
];

export function CommunitySection() {
  return (
    <section
      id="community"
      className="border-t border-[var(--color-border)] bg-white px-6 py-20"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          label="Community"
          title="Two disciplines. One workflow."
          description="APSYLab is structured so psych and engineering students contribute where they're strongest — and grow where they're weakest."
          className="mb-12"
        />

        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          <div className="relative h-48 overflow-hidden rounded-xl lg:h-auto lg:min-h-[280px]">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
              alt="Psychology student reading in a natural setting"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <HowCard
              label="If you study Psychology"
              labelClass="teal"
              title='You bring the "what" and "why"'
              steps={psychSteps}
            />
            <HowCard
              label="If you study Engineering / CS"
              labelClass="amber"
              title='You bring the "how"'
              steps={csSteps}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 md:flex-nowrap">
          {flow.map((node, i) => (
            <div key={node.title} className="flex items-center gap-2">
              <div className="min-w-[120px] rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-center">
                <span className="font-serif text-2xl text-[var(--color-teal)]">
                  {node.icon}
                </span>
                <div className="mt-2 text-sm font-medium">{node.title}</div>
                <div className="text-xs text-[var(--color-text-muted)]">{node.sub}</div>
              </div>
              {i < flow.length - 1 && (
                <span className="hidden text-[var(--color-teal)] md:inline">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowCard({
  label,
  labelClass,
  title,
  steps,
}: {
  label: string;
  labelClass: "teal" | "amber";
  title: string;
  steps: string[];
}) {
  const badge =
    labelClass === "teal"
      ? "bg-[var(--color-teal-dim)] text-[var(--color-teal)] border-[var(--color-teal)]/30"
      : "bg-[var(--color-amber-dim)] text-[var(--color-amber)] border-[var(--color-amber)]/30";

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
      <span
        className={`inline-block rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide ${badge}`}
      >
        {label}
      </span>
      <h3 className="mt-4 text-base font-medium">{title}</h3>
      <ul className="mt-4 space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-sm text-[var(--color-text-muted)]">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-xs font-semibold text-[var(--color-teal)]">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}
