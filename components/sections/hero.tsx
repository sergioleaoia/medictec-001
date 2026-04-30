import { WhatsAppButton } from "../primitives/cta";
import { ArrowOut, CheckIcon } from "../primitives/icons";

const HERO_POINTS = [
  "Coletas agendadas conforme sua demanda",
  "Conformidade com a legislação vigente",
  "Suporte direto, sem burocracia",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden"
      style={{
        backgroundImage: "url('/foto fachada medictec.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(100deg, rgba(2,20,19,0.97) 0%, rgba(2,20,19,0.93) 45%, rgba(4,36,34,0.75) 70%, rgba(4,36,34,0.35) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,20,19,0.55) 0%, transparent 30%, transparent 70%, rgba(2,20,19,0.75) 100%)",
        }}
      />

      <div className="container-x relative grid gap-10 py-20 sm:py-24 lg:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur">
            <span
              className="dot"
              style={{
                background: "var(--lime)",
                boxShadow: "0 0 0 4px rgba(200,255,110,0.18)",
              }}
            />
            Coleta licenciada de RSS — Grupos A, B e E
          </div>

          <h1 className="balance mt-5 text-white">
            Descarte de Resíduos sem Dor de Cabeça?{" "}
            <span className="mt-2 block">
              <span className="swipe-highlight">A Medictec Resolve.</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/85">
            Coletamos, transportamos e damos destino correto aos resíduos do
            seu estabelecimento — com{" "}
            <strong className="font-semibold text-white">UTR própria</strong> e{" "}
            <strong className="font-semibold text-white">
              frota licenciada
            </strong>
            . Você foca no que importa; o resto é com a gente.
          </p>

          <ul className="mt-8 grid max-w-xl gap-2.5">
            {HERO_POINTS.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2.5 text-base text-white/90"
              >
                <span
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                  style={{
                    background: "var(--lime)",
                    color: "var(--petrol-ink)",
                  }}
                >
                  <CheckIcon className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <WhatsAppButton label="Falar no WhatsApp" variant="accent" />
            <a
              href="https://relacionamento.medictec.com.br/vagas-emprego"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                background: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.35)",
              }}
            >
              Vagas de Emprego
              <ArrowOut className="h-4 w-4 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
