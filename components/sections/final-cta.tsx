import { WhatsAppButton } from "../primitives/cta";
import { Biohazard, CheckIcon } from "../primitives/icons";

const PROMISES = [
  "Diagnóstico técnico gratuito (sem formulário longo)",
  "Proposta sob medida — frequência, embalagens e custo",
  "Migração organizada do fornecedor atual",
];

export function FinalCTA() {
  return (
    <section className="relative px-4 py-20 sm:py-28">
      <div
        className="container-x relative overflow-hidden rounded-[36px] border px-7 py-14 sm:px-12 sm:py-16"
        style={{
          background:
            "linear-gradient(140deg, var(--petrol) 0%, var(--petrol-deep) 70%, #021c1a 100%)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div className="hairline-grid pointer-events-none absolute inset-0 opacity-[0.08]" />
        <Biohazard
          className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 text-[var(--lime)] opacity-10"
          aria-hidden
        />

        <div className="relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span
              className="text-[0.72rem] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--lime)" }}
            >
              Próximo passo
            </span>
            <h2 className="mt-3 text-white">
              Em uma conversa, você sai com diagnóstico e plano sob medida.
            </h2>
            <p className="mt-5 max-w-lg text-white/75">
              Atendimento direto pelo time técnico-comercial — sem
              transferência, sem chamado em fila. Para clínicas, hospitais e
              laboratórios em mais de 100 cidades.
            </p>

            <ul className="mt-8 space-y-3">
              {PROMISES.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-3 text-sm text-white/85"
                >
                  <span
                    className="grid h-6 w-6 place-items-center rounded-full"
                    style={{ background: "var(--lime)" }}
                  >
                    <CheckIcon
                      className="h-3.5 w-3.5"
                      style={{ color: "var(--petrol-ink)" }}
                    />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div
              className="rounded-3xl border p-6 sm:p-7"
              style={{
                borderColor: "rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/55">
                Atendimento
              </div>
              <div className="mt-4">
                <WhatsAppButton
                  label="Falar no WhatsApp"
                  variant="accent"
                  className="w-full justify-center"
                />
              </div>

              <div
                className="mt-5 border-t pt-5 text-xs text-white/55"
                style={{ borderColor: "rgba(255,255,255,0.10)" }}
              >
                Horário comercial · Resposta no mesmo dia útil.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
