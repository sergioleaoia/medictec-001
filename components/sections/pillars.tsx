import Image from "next/image";
import { WhatsAppButton } from "../primitives/cta";

type Benefit = {
  image: string;
  alt: string;
  title: string;
  body: string;
};

const BENEFITS: Benefit[] = [
  {
    image: "/26.jpg",
    alt: "Equipe da Medic Tec operando a autoclave própria para tratamento de resíduos",
    title: "Segurança e Confiabilidade",
    body: "Do recolhimento ao destino final, os resíduos são gerenciados respeitando todas as normas e legislações.",
  },
  {
    image: "/2.jpg",
    alt: "Operador da Medic Tec monitorando o tratamento térmico por software",
    title: "Redução de Custos",
    body: "Você paga pela frequência que precisa, sem comprometer a qualidade ou a segurança.",
  },
  {
    image: "/17.jpg",
    alt: "Vista aérea da sede e da frota própria da Medic Tec Ambiental",
    title: "Pontualidade",
    body: "Nossa frota passa no dia combinado. Sem atraso.",
  },
];

export function PillarsSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="eyebrow">Por que a Medic Tec</span>
          <h2 className="balance mt-3">
            Uma parceria que traz segurança, economia e pontualidade.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {BENEFITS.map((b) => (
            <article
              key={b.title}
              className="card hover-lift flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={b.image}
                  alt={b.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-semibold text-[var(--ink)]">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {b.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <WhatsAppButton variant="primary" />
        </div>
      </div>
    </section>
  );
}
