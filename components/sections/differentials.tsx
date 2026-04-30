import { CheckIcon } from "../primitives/icons";

const COMPARISON = [
  {
    pillar: "Cadeia operacional",
    them: "Coleta terceirizada, tratamento em parceiros não declarados.",
    us: "UTR e frota próprias — sem repassar etapas críticas.",
  },
  {
    pillar: "Tratamento",
    them: "Método único forçado para baratear contrato.",
    us: "Autoclave ou incineração conforme classificação técnica.",
  },
  {
    pillar: "Documentação",
    them: "MTR genérico e atrasado, CDF dependente de terceiros.",
    us: "MTR/CDF em seu CNPJ, emitidos por coleta no SINIR.",
  },
  {
    pillar: "Cobertura",
    them: "Atende capital e descarta cidades menores.",
    us: "Operação ativa em mais de 100 cidades da região.",
  },
  {
    pillar: "Suporte",
    them: "Atendimento por chamado, sem responsável definido.",
    us: "Time técnico-comercial direto, sem escalada burocrática.",
  },
];

export function DifferentialsSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="eyebrow">Por que migrar</span>
            <h2 className="mt-3 text-[var(--petrol-ink)] balance">
              O que muda quando o fornecedor é dono da operação.
            </h2>
            <p className="mt-5 text-[var(--ink-soft)]">
              A maior parte dos contratos de RSS está com empresas que
              terceirizam ou tratamento ou transporte. A responsabilidade
              regulatória, no entanto, continua sua. Aqui, a operação é
              integrada — ponta a ponta.
            </p>

            <div
              className="mt-8 overflow-hidden rounded-3xl border"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface)",
              }}
            >
              <blockquote className="p-6 sm:p-8">
                <p className="font-display text-xl text-[var(--petrol-ink)] leading-snug">
                  &ldquo;Trocamos de fornecedor em três semanas, sem parar a
                  rotina das salas. O que mais pesou foi receber o CDF mensal
                  sem ter que cobrar.&rdquo;
                </p>
                <footer
                  className="mt-5 flex items-center gap-3 border-t pt-5"
                  style={{ borderColor: "var(--line)" }}
                >
                  <div
                    className="h-10 w-10 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--teal), var(--petrol))",
                    }}
                  />
                  <div className="text-sm">
                    <div className="font-semibold text-[var(--ink)]">
                      [Cliente — confirmar autorização]
                    </div>
                    <div className="text-[var(--muted)]">
                      Responsável técnica · Clínica multiespecialidade
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              className="overflow-hidden rounded-3xl border"
              style={{ borderColor: "var(--line)" }}
            >
              <div
                className="grid grid-cols-[1fr_1fr_1fr] border-b text-[0.72rem] font-semibold uppercase tracking-[0.14em]"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--paper-deep)",
                }}
              >
                <div className="px-5 py-4 text-[var(--muted)]">Critério</div>
                <div className="px-5 py-4 text-[var(--muted)]">
                  Fornecedor comum
                </div>
                <div
                  className="px-5 py-4 text-white"
                  style={{ background: "var(--petrol)" }}
                >
                  Medictec Ambiental
                </div>
              </div>

              <div className="divide-y" style={{ borderColor: "var(--line)" }}>
                {COMPARISON.map((row, i) => (
                  <div
                    key={row.pillar}
                    className="grid grid-cols-[1fr_1fr_1fr] items-stretch text-sm"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <div className="bg-white px-5 py-4 font-semibold text-[var(--ink)]">
                      {row.pillar}
                    </div>
                    <div className="bg-white px-5 py-4 text-[var(--muted)] line-through decoration-[var(--line-strong)] decoration-[1px]">
                      {row.them}
                    </div>
                    <div
                      className="px-5 py-4 text-[var(--ink)]"
                      style={{
                        background:
                          i % 2 === 0
                            ? "color-mix(in srgb, var(--teal-soft) 60%, white)"
                            : "color-mix(in srgb, var(--teal-soft) 35%, white)",
                      }}
                    >
                      <span className="flex gap-2">
                        <CheckIcon
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: "var(--petrol)" }}
                        />
                        {row.us}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
