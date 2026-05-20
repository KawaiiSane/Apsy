interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <div className="section-label mb-3 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-teal)]">
        {label}
      </div>
      <h2
        className="font-serif text-3xl font-light leading-tight text-[var(--color-text)] md:text-4xl"
        dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }}
      />
      {description && (
        <p className="mt-4 max-w-xl text-[var(--color-text-muted)] leading-relaxed font-light">
          {description}
        </p>
      )}
    </div>
  );
}
