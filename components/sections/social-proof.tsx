const LOGOS = [
  {
    src: "/cropped-DaVita_TratamentoRenal_azul-1.png",
    alt: "DaVita Tratamento Renal",
    h: 38,
  },
  {
    src: "/HU-UEL-LOGO-1024x709-1.png",
    alt: "Hospital Universitário UEL — Londrina",
    h: 52,
  },
  {
    src: "/138.png",
    alt: "Hospital do Câncer de Londrina",
    h: 52,
  },
];

export function SocialProofSection() {
  return (
    <section
      className="border-b py-8"
      style={{ borderColor: "var(--line)", background: "var(--surface)" }}
    >
      <div className="container-x">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
          Algumas das instituições de saúde que confiam na Medictec
        </p>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-5 sm:gap-x-16">
          {LOGOS.map((logo) => (
            <li key={logo.src} className="flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                style={{ height: logo.h, width: "auto", display: "block" }}
                className="opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
