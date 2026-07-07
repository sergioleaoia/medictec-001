import type { Metadata } from "next";
import { LogoWord, CheckIcon, InstagramIcon } from "@/components/primitives/icons";

export const metadata: Metadata = {
  title: "Obrigado — Medic Tec Ambiental",
  robots: { index: false, follow: false },
};

const INSTAGRAM = "https://www.instagram.com/medictecambiental/";

export default function Obrigado() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      {/* soft brand halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[520px] max-w-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(20,184,166,0.16) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-lg">
        <div className="flex justify-center">
          <LogoWord height={42} />
        </div>

        <div
          className="mx-auto mt-10 grid h-16 w-16 place-items-center rounded-full"
          style={{ background: "var(--teal-soft)", color: "var(--petrol)" }}
        >
          <CheckIcon className="h-8 w-8" />
        </div>

        <h1 className="mt-8">Obrigado!</h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-[var(--ink-soft)]">
          Nosso time já está entrando em contato com você pelo{" "}
          <strong className="font-semibold text-[var(--ink)]">WhatsApp</strong>,
          no número cadastrado.
        </p>

        <div className="mt-9 flex justify-center">
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <InstagramIcon className="h-[18px] w-[18px]" />
            Seguir no Instagram
          </a>
        </div>
      </div>
    </main>
  );
}
