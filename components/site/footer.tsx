import { LogoWord } from "../primitives/icons";
import { WhatsAppButton } from "../primitives/cta";

export function Footer() {
  return (
    <footer
      className="border-t pt-14 pb-10"
      style={{ borderColor: "var(--line)", background: "var(--paper)" }}
    >
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <LogoWord />
          <p className="mt-4 max-w-sm text-sm text-[var(--ink-soft)]">
            Coleta, transporte, tratamento e destinação final de resíduos de
            serviços de saúde — operação licenciada com rastreabilidade do
            berço ao destino.
          </p>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Atendimento
          </h4>
          <div className="mt-4">
            <WhatsAppButton label="Falar no WhatsApp" variant="primary" />
          </div>
        </div>

        <div className="lg:col-span-4">
          <h4 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Conformidade
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-[var(--ink-soft)]">
            <li>RDC Anvisa 222/2018 · CONAMA 358/2005</li>
            <li>UTR licenciada IAT/PR</li>
            <li>Frota com autorização INMETRO</li>
            <li>Cadastro SINIR ativo</li>
          </ul>
        </div>
      </div>

      <div
        className="container-x mt-12 flex flex-col gap-4 border-t pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between"
        style={{ borderColor: "var(--line)" }}
      >
        <span>
          © {new Date().getFullYear()} Medictec Ambiental. Todos os direitos
          reservados.
        </span>
        <span>CNPJ disponível mediante solicitação · Curitiba/PR</span>
      </div>
    </footer>
  );
}
