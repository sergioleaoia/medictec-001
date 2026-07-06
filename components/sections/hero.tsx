import { WhatsAppButton } from "../primitives/cta";
import { CheckIcon, LogoWord } from "../primitives/icons";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden border-b"
      style={{ borderColor: "var(--line)" }}
    >
      {/* atmosphere — soft brand halo for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[620px] max-w-5xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(20,184,166,0.16) 0%, rgba(20,184,166,0.05) 38%, transparent 72%)",
        }}
      />

      <div className="container-x py-14 text-center sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl">
          {/* brand */}
          <div className="reveal mb-9" style={{ animationDelay: "0ms" }}>
            <span aria-label="Medictec Ambiental" className="inline-flex">
              <LogoWord height={50} />
            </span>
          </div>

          <span
            className="reveal inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-xs font-medium text-[var(--ink-soft)]"
            style={{ borderColor: "var(--line)", animationDelay: "80ms" }}
          >
            <span
              className="dot"
              style={{
                background: "var(--lime)",
                boxShadow: "0 0 0 3px rgba(200,255,110,0.28)",
              }}
            />
            Clientes ativos em +100 cidades do PR e SP
          </span>

          <h1 className="reveal balance mt-6" style={{ animationDelay: "160ms" }}>
            Descarte de Resíduos sem Dor de Cabeça?{" "}
            <span style={{ color: "var(--petrol)" }}>A gente Resolve.</span>
          </h1>

          <p
            className="reveal mx-auto mt-6 max-w-2xl text-lg text-[var(--ink-soft)]"
            style={{ animationDelay: "240ms" }}
          >
            Resíduo de saúde ou industrial: a Medictec coleta, transporta e dá{" "}
            <strong className="font-semibold text-[var(--ink)]">
              o destino certo
            </strong>
            , com documentação em dia e sempre no prazo.
          </p>

          <div
            className="reveal mt-7 flex items-center justify-center gap-2 text-sm text-[var(--ink-soft)]"
            style={{ animationDelay: "300ms" }}
          >
            <span
              className="grid h-5 w-5 shrink-0 place-items-center rounded-full"
              style={{ background: "var(--teal-soft)", color: "var(--petrol)" }}
            >
              <CheckIcon className="h-3 w-3" />
            </span>
            Coletas agendadas conforme sua demanda
          </div>

          <div
            className="reveal mt-8 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "360ms" }}
          >
            <WhatsAppButton variant="primary" />
            <a href="#processo" className="btn btn-ghost btn-sm">
              Ver como funciona
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
