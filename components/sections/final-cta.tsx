import Image from "next/image";
import { WhatsAppButton } from "../primitives/cta";

export function FinalCTA() {
  return (
    <section id="experiencia" className="px-4 py-20 sm:py-24">
      <div
        className="container-x relative isolate overflow-hidden rounded-[30px] px-7 py-14 sm:px-12 sm:py-16"
        style={{
          background:
            "linear-gradient(145deg, var(--petrol) 0%, var(--petrol-deep) 60%, #052422 100%)",
        }}
      >
        {/* soft glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(20,184,166,0.28) 0%, transparent 66%)",
          }}
        />

        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          {/* ---------- Text ---------- */}
          <div>
            <span
              className="text-[0.72rem] font-semibold uppercase tracking-[0.16em]"
              style={{ color: "var(--lime)" }}
            >
              Sobre a Medic Tec
            </span>
            <h2 className="mt-3 text-white balance">
              Há décadas cuidando do descarte de resíduos de empresas como a
              sua.
            </h2>
            <p className="mt-5 max-w-lg text-white/75">
              De pequenas clínicas a grandes hospitais, laboratórios e
              indústrias.
            </p>

            <div className="mt-8">
              <div className="text-sm font-medium text-white/60">
                Clientes ativos em
              </div>
              <div
                className="font-display text-[2.75rem] font-semibold leading-none text-white"
                style={{ letterSpacing: "-0.03em" }}
              >
                +100
              </div>
              <div className="mt-1.5 text-sm text-white/70">
                cidades do PR e SP
              </div>
            </div>

            <div className="mt-9">
              <WhatsAppButton variant="primary" />
            </div>
          </div>

          {/* ---------- HQ facade photo ---------- */}
          <div
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px]"
            style={{ border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <Image
              src="/foto fachada medictec.jpg"
              alt="Fachada da sede da Medic Tec Ambiental"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
