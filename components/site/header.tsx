import { LogoWord } from "../primitives/icons";
import { WhatsAppButton } from "../primitives/cta";

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md">
      <div
        className="border-b"
        style={{
          background: "color-mix(in srgb, var(--paper) 85%, transparent)",
          borderColor: "var(--line)",
        }}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <a href="#top" className="shrink-0">
            <LogoWord />
          </a>

          <WhatsAppButton label="Falar no WhatsApp" variant="primary" />
        </div>
      </div>
    </header>
  );
}
