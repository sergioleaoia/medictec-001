import { LogoWord, InstagramIcon } from "../primitives/icons";

const INSTAGRAM = "https://www.instagram.com/medictecambiental/";

export function Footer() {
  return (
    <footer
      className="border-t py-10"
      style={{ borderColor: "var(--line)", background: "var(--surface)" }}
    >
      <div className="container-x flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:gap-4 sm:text-left">
        <div className="flex items-center gap-4">
          <LogoWord height={36} />
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Medictec Ambiental"
            className="grid h-9 w-9 place-items-center rounded-full border text-[var(--ink-soft)] transition hover:border-[var(--petrol)] hover:text-[var(--petrol)]"
            style={{ borderColor: "var(--line-strong)" }}
          >
            <InstagramIcon className="h-[18px] w-[18px]" />
          </a>
        </div>
        <span className="text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} Medictec Ambiental. Todos os direitos
          reservados.
        </span>
      </div>
    </footer>
  );
}
