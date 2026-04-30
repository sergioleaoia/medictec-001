import { PlusIcon } from "../primitives/icons";

const FAQS = [
  {
    q: "Já tenho fornecedor. Trocar dá trabalho?",
    a: "A migração é planejada para não travar sua rotina clínica. Em geral leva 1 a 3 semanas, da vistoria inicial à primeira coleta — sem parar atendimento, sem acúmulo na sala.",
  },
  {
    q: "Vai ficar mais caro do que pago hoje?",
    a: "Preço sem rastreabilidade cobra depois — em passivo ambiental e exposição em fiscalização. O foco é custo total sob controle: frequência adequada ao volume real, embalagens corretas, documentação inclusa.",
  },
  {
    q: "Minha clínica é pequena, gero pouco resíduo.",
    a: "Por isso o plano é sob medida. Frequência mensal ou quinzenal, com bombonas e caixas Descarpak no tamanho certo. Sem contrato inflado para volume que você não gera.",
  },
  {
    q: "Como sei que o descarte é feito certo?",
    a: "Você recebe o MTR (Manifesto de Transporte) emitido na coleta e o CDF (Certificado de Destinação Final) mensal, ambos vinculados ao seu CNPJ no SINIR. É o que a fiscalização pede.",
  },
  {
    q: "Vocês atendem fora da capital?",
    a: "Sim. A operação cobre mais de 100 cidades da região, incluindo localidades onde faltam empresas licenciadas. Confirme a sua no diagnóstico inicial.",
  },
  {
    q: "Quem responde se houver problema na destinação?",
    a: "A geradora responde pelos resíduos até o destino final — por isso operamos com UTR e frota próprias. A cadeia é nossa, e a documentação prova o destino correto.",
  },
];

export function FAQSection() {
  return (
    <section
      id="faq"
      className="py-20 sm:py-28"
      style={{ background: "var(--paper-deep)" }}
    >
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="eyebrow">Dúvidas frequentes</span>
            <h2 className="mt-3 text-[var(--petrol-ink)] balance">
              Respostas diretas para as objeções reais.
            </h2>
            <p className="mt-5 text-[var(--ink-soft)]">
              Se sua dúvida não estiver aqui, peça o diagnóstico no WhatsApp —
              respondemos no mesmo dia útil.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div
              className="divide-y overflow-hidden rounded-3xl border bg-white"
              style={{ borderColor: "var(--line)" }}
            >
              {FAQS.map((f, i) => (
                <details
                  key={f.q}
                  className="faq group"
                  open={i === 0}
                >
                  <summary className="flex items-start justify-between gap-6 px-6 py-5 text-left transition hover:bg-[var(--paper)]">
                    <span className="font-display text-lg font-semibold text-[var(--petrol-ink)]">
                      {f.q}
                    </span>
                    <span
                      className="faq-icon mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[var(--petrol)]"
                      style={{ background: "var(--paper-deep)" }}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-[var(--ink-soft)]">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
