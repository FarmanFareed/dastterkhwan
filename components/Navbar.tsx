import Link from "next/link";

const links = [
  { href: "/restaurants", label: "The List" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="border-b border-ink/15">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-2xl italic">
          Dastarkhwan
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-ink/80 transition-colors hover:text-maroon"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
