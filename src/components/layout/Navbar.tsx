import Link from "next/link";

const links = [
  { href: "/#research", label: "Research" },
  { href: "/#community", label: "Community" },
  { href: "/#platform", label: "Platform" },
  { href: "/workspace", label: "Workspace" },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-[var(--color-border)] bg-white/85 px-6 py-4 backdrop-blur-lg md:px-16">
      <Link href="/" className="flex items-center gap-3">
        <span className="font-serif text-2xl font-semibold text-[var(--color-teal)]">
          Ψ
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-wide">APSYLab</span>
          <span className="text-[0.65rem] font-light uppercase tracking-widest text-[var(--color-text-muted)]">
            AiInPsychology · AIP
          </span>
        </div>
      </Link>
      <ul className="hidden items-center gap-8 md:flex">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/workspace"
            className="rounded bg-[var(--color-teal)] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-teal-light)]"
          >
            Open Workspace
          </Link>
        </li>
      </ul>
      <Link
        href="/workspace"
        className="rounded bg-[var(--color-teal)] px-4 py-2 text-sm font-medium text-white md:hidden"
      >
        Workspace
      </Link>
    </nav>
  );
}
