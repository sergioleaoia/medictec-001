import type { Metadata } from "next";
import Image from "next/image";
import { LogoWord } from "@/components/primitives/icons";
import { EmailCapture } from "@/components/site/email-capture";

export const metadata: Metadata = {
  title: "Condição especial de julho — Medictec Ambiental",
  description:
    "Fale agora com nosso time e garanta a condição especial para fechar seu contrato de coleta de resíduos em julho.",
  robots: { index: false, follow: false },
};

export default function WhatsappAcao() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      {/* soft brand halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[560px] max-w-4xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(20,184,166,0.16) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-2xl">
        <div className="flex justify-center">
          <LogoWord height={44} />
        </div>

        <span
          className="reveal mt-10 inline-flex items-center gap-2 rounded-full border bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]"
          style={{ borderColor: "var(--line)", animationDelay: "0ms" }}
        >
          <span
            className="dot"
            style={{
              background: "var(--amber)",
              boxShadow: "0 0 0 3px rgba(245,184,64,0.28)",
            }}
          />
          Condição especial · Somente em julho
        </span>

        <h1 className="reveal balance mt-6" style={{ animationDelay: "80ms" }}>
          Fale agora com nosso time e garanta a{" "}
          <span style={{ color: "var(--petrol)" }}>condição especial</span> para
          fechar em julho.
        </h1>

        <p
          className="reveal mx-auto mt-5 max-w-xl text-lg text-[var(--ink-soft)]"
          style={{ animationDelay: "160ms" }}
        >
          Coleta licenciada de resíduos — de saúde ou industrial. Condição
          exclusiva para contratos fechados este mês.
        </p>

        <div
          className="reveal mt-9 flex justify-center"
          style={{ animationDelay: "240ms" }}
        >
          <EmailCapture label="Falar no WhatsApp" />
        </div>

        <p
          className="reveal mt-6 text-sm text-[var(--muted)]"
          style={{ animationDelay: "320ms" }}
        >
          Atendimento imediato pelo time comercial.
        </p>

        <div
          className="reveal mt-10 overflow-hidden rounded-2xl"
          style={{
            animationDelay: "400ms",
            border: "1px solid var(--line)",
            boxShadow: "0 24px 60px -30px rgba(14,79,76,0.35)",
          }}
        >
          <div className="relative aspect-[16/10] w-full">
            <Image
              src="/foto fachada medictec.jpg"
              alt="Fachada da sede da Medictec Ambiental"
              fill
              sizes="(max-width: 768px) 90vw, 42rem"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
