const LOGOS = [
  {
    src: "/cropped-DaVita_TratamentoRenal_azul-1.png",
    alt: "DaVita Tratamento Renal",
    h: 56,
  },
  {
    src: "/HU-UEL-LOGO-1024x709-1.png",
    alt: "Hospital Universitário UEL — Londrina",
    h: 76,
  },
  {
    src: "/138.png",
    alt: "Hospital do Câncer de Londrina",
    h: 76,
  },
];

export function SocialProofSection() {
  return (
    <section
      className="border-y py-8"
      style={{
        borderColor: "var(--line)",
        background: "var(--surface)",
      }}
    >
      <div className="container-x">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center lg:gap-14">
          <div className="max-w-xs text-center lg:text-left">
            <span className="eyebrow">Confiança do Mercado</span>
            <p className="mt-1.5 text-sm text-[var(--ink-soft)] sm:text-base">
              Líderes do setor de saúde escolhem a{" "}
              <strong className="font-semibold text-[var(--petrol-ink)]">
                MEDICTEC
              </strong>
              .
            </p>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10">
            {LOGOS.map((logo) => (
              <li key={logo.src} className="flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{ height: logo.h, width: "auto", display: "block" }}
                  className="opacity-75 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
