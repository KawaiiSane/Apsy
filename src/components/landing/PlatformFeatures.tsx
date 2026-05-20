import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";

const features = [
  {
    icon: "⚑",
    title: "Open Project Boards",
    desc: "Post a research problem, browse open ones. Tagged by vertical, difficulty, and required disciplines.",
  },
  {
    icon: "◉",
    title: "Role Tagging & Matching",
    desc: 'Tag what you bring: "clinical psych + stats" or "NLP + backend." Find your complement.',
  },
  {
    icon: "◈",
    title: "Reading Rooms",
    desc: "Shared paper threads where both disciplines annotate from their lens.",
  },
  {
    icon: "↑",
    title: "Mentorship Tracks",
    desc: "Undergrads connected with grad students who've crossed both worlds.",
  },
];

export function PlatformFeatures() {
  return (
    <section id="platform" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          label="Platform"
          title="Built for serious interdisciplinary work"
          description="Tools and community infrastructure — plus your personal workspace to organize psych and CS work side by side."
          className="mb-12"
        />

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-[var(--color-border)] bg-white p-6 transition hover:border-[var(--color-teal)]/40 hover:bg-[var(--color-card-hover)]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-teal)]/30 bg-[var(--color-teal-dim)] font-serif text-lg text-[var(--color-teal)]">
                {f.icon}
              </div>
              <h3 className="text-sm font-medium">{f.title}</h3>
              <p className="mt-2 text-sm font-light text-[var(--color-text-muted)] leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
          <div className="rounded-lg border border-[var(--color-teal)]/30 bg-[var(--color-teal-dim)] p-6 md:col-span-2">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-teal)]/30 bg-white font-serif text-lg text-[var(--color-teal)]">
                  ≡
                </div>
                <h3 className="text-lg font-medium">Student Workspace</h3>
                <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                  Organize psychology readings, IRB tasks, and research notes alongside CS
                  projects, APIs, and implementation tasks. Link items across disciplines
                  so your bridge projects stay visible.
                </p>
                <Link
                  href="/workspace"
                  className="mt-4 inline-block rounded bg-[var(--color-teal)] px-6 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-teal-light)]"
                >
                  Try the workspace →
                </Link>
              </div>
              <div className="relative h-36 w-full overflow-hidden rounded-lg md:h-32 md:w-48">
                <Image
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80"
                  alt="Laptop with code — computer science work"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
