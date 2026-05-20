import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white px-6 py-12 md:px-16">
      <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-8">
        <div>
          <div className="font-serif text-2xl font-light">APSYLab · Ψ</div>
          <div className="mt-1 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
            AiInPsychology (AIP) · Non-profit
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-faint)]">
            Lab
          </h4>
          <ul className="flex flex-col gap-2 text-sm text-[var(--color-text-muted)]">
            <li>
              <Link href="/workspace" className="hover:text-[var(--color-teal)]">
                Student Workspace
              </Link>
            </li>
            <li>
              <Link href="/#research" className="hover:text-[var(--color-teal)]">
                Research Verticals
              </Link>
            </li>
            <li>
              <a href="mailto:psychologyinai@gmail.com" className="hover:text-[var(--color-teal)]">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-between gap-4 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-faint)]">
        <p>© 2025 APSYLab · apsylab.org · AiInPsychology (AIP)</p>
        <p>Engineer with a Human Mind.</p>
      </div>
    </footer>
  );
}
