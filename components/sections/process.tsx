import { TruckIcon, AutoclaveIcon, DocIcon, RouteIcon } from "../primitives/icons";
import { WhatsAppButton } from "../primitives/cta";

const STEPS = [
  {
    n: "01",
    icon: RouteIcon,
    title: "Coleta programada",
    body: "Frequência sob medida (semanal, quinzenal ou mensal).",
  },
  {
    n: "02",
    icon: TruckIcon,
    title: "Transporte com frota própria",
    body: "Frota própria especializada para o transporte de resíduos de serviços de saúde.",
  },
  {
    n: "03",
    icon: AutoclaveIcon,
    title: "Tratamento na UTR",
    body: "Autoclavagem ou incineração conforme classificação.",
  },
  {
    n: "04",
    icon: DocIcon,
    title: "Documentação completa",
    body: "MTR e Certificado de Destinação Final vinculados ao CNPJ do gerador.",
  },
];

export function ProcessSection() {
  return (
    <section id="processo" className="py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="eyebrow">Como funciona</span>
          <h2 className="mt-3 text-[var(--petrol-ink)]">
            Da coleta ao destino final, sem ponta solta.
          </h2>
          <p className="mt-4 text-[var(--ink-soft)]">
            Cada etapa é executada com estrutura própria.
          </p>
        </div>

        <ol className="mt-14 grid gap-3 lg:grid-cols-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isLast = i === STEPS.length - 1;
            return (
              <li key={s.n} className="relative">
                <div
                  className="relative h-full rounded-3xl border bg-white p-6 transition hover:-translate-y-0.5"
                  style={{
                    borderColor: "var(--line)",
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="font-display text-[2.25rem] font-semibold leading-none"
                      style={{
                        color: "transparent",
                        WebkitTextStroke: "1.2px var(--petrol)",
                      }}
                    >
                      {s.n}
                    </span>
                    <span
                      className="grid h-11 w-11 place-items-center rounded-2xl"
                      style={{
                        background: "var(--paper-deep)",
                        color: "var(--petrol)",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg text-[var(--petrol-ink)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--ink-soft)]">
                    {s.body}
                  </p>
                </div>

                {!isLast && (
                  <span
                    aria-hidden
                    className="absolute right-[-10px] top-1/2 hidden h-px w-5 -translate-y-1/2 lg:block"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--petrol) 0%, transparent 100%)",
                    }}
                  />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-12 flex justify-center">
          <WhatsAppButton label="Falar no WhatsApp" variant="accent" />
        </div>
      </div>
    </section>
  );
}
