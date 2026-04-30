import {
  CalendarIcon,
  ChatIcon,
  DocIcon,
  SlidersIcon,
} from "../primitives/icons";
import { WhatsAppButton } from "../primitives/cta";

type Pillar = {
  icon: typeof CalendarIcon;
  title: string;
  body: string;
  image: string | null;
  placeholderName: string;
};

const PILLARS: Pillar[] = [
  {
    icon: CalendarIcon,
    title: "Coletas agendadas",
    body: "Sem atrasos. Nossa equipe passa nos dias combinados, com total regularidade.",
    image: "/7.jpg",
    placeholderName: "/pillar-coletas-agendadas.jpg",
  },
  {
    icon: SlidersIcon,
    title: "Planos sob medida",
    body: "Mensal, quinzenal ou semanal — tudo depende da sua real necessidade.",
    image: "/foto fachada medictec.jpg",
    placeholderName: "/pillar-planos-sob-medida.jpg",
  },
  {
    icon: DocIcon,
    title: "Documentação em dia",
    body: "Acompanhamos toda a parte legal e mantemos você protegido.",
    image: "/2.jpg",
    placeholderName: "/pillar-documentacao-em-dia.jpg",
  },
  {
    icon: ChatIcon,
    title: "Suporte de verdade",
    body: "Estamos a uma mensagem ou ligação de distância. Sem protocolo, sem espera.",
    image: "/31.jpg",
    placeholderName: "/pillar-suporte-de-verdade.jpg",
  },
];

export function PillarsSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Como atendemos</span>
          <h2 className="balance mt-3 text-[var(--petrol-ink)]">
            Coleta no Dia Combinado, Documentação em Dia e Suporte Que Atende.
          </h2>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--line)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--teal-soft) 0%, var(--paper-deep) 100%)",
                  }}
                >
                  {p.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-content-center gap-1 px-3 text-center">
                      <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        Foto · placeholder
                      </span>
                      <code className="text-[0.7rem] text-[var(--petrol)]">
                        {p.placeholderName}
                      </code>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl"
                    style={{
                      background: "var(--teal-soft)",
                      color: "var(--petrol)",
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <h3 className="mt-5 text-lg font-semibold text-[var(--petrol-ink)]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {p.body}
                  </p>
                </div>

                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full opacity-0 transition group-hover:opacity-100"
                  style={{ background: "var(--lime)", filter: "blur(28px)" }}
                />
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <WhatsAppButton label="Falar no WhatsApp" variant="accent" />
        </div>
      </div>
    </section>
  );
}
