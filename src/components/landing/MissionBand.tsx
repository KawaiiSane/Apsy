import Image from "next/image";

export function MissionBand() {
  return (
    <div className="border-y border-[var(--color-border)] bg-white py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1.2fr_1fr]">
        <blockquote className="border-l-2 border-[var(--color-teal)] pl-6 font-serif text-2xl font-light italic leading-snug md:text-3xl">
          &ldquo;Psychology gives AI its{" "}
          <span className="text-[var(--color-teal)] not-italic">purpose</span>. Engineering
          gives psychology its{" "}
          <span className="text-[var(--color-teal)] not-italic">scale</span>.&rdquo;
        </blockquote>
        <div className="space-y-6">
          <p className="text-[var(--color-text-muted)] leading-relaxed font-light">
            APSYLab is an open research initiative under the non-profit{" "}
            <strong className="font-medium text-[var(--color-text)]">
              AiInPsychology (AIP)
            </strong>
            . We believe meaningful AI systems can only be built when disciplines
            converge — structured projects, shared tools, and a community fluent in
            both the science of mind and the science of machines.
          </p>
          <div className="relative h-44 overflow-hidden rounded-xl">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80"
              alt="Students working together outdoors"
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
