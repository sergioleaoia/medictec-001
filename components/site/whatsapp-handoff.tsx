"use client";

import { useEffect, useState } from "react";
import { LogoWord, CheckIcon, WhatsAppIcon, ArrowOut } from "../primitives/icons";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const REDIRECT_DELAY = 1200;

export function WhatsAppHandoff() {
  // Default genérico (sem e-mail) pro href já ser válido no primeiro render/SSR;
  // a montagem no cliente lê o e-mail do sessionStorage e refina a mensagem.
  const [waUrl, setWaUrl] = useState(() => buildWhatsAppUrl());

  useEffect(() => {
    let email: string | undefined;
    try {
      email = sessionStorage.getItem("medictec_wa_email") ?? undefined;
    } catch {
      email = undefined;
    }
    const url = buildWhatsAppUrl(email);
    // Valor client-only (sessionStorage) sincronizado uma vez na montagem.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWaUrl(url);
    // Encaminha na MESMA aba (não é bloqueado por popup blocker). O botão
    // abaixo é o fallback manual caso o deep-link não dispare sozinho.
    const t = setTimeout(() => {
      window.location.href = url;
    }, REDIRECT_DELAY);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
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

        <h1 className="mt-8">Cadastro confirmado!</h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-[var(--ink-soft)]">
          Estamos abrindo o <strong className="font-semibold text-[var(--ink)]">WhatsApp</strong>{" "}
          com a mensagem pronta. Se não abrir em alguns segundos, toque no botão
          abaixo.
        </p>

        <div className="mt-9 flex justify-center">
          <a
            href={waUrl}
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold text-white transition"
            style={{
              background: "#25D366",
              boxShadow: "0 12px 28px -12px rgba(37,211,102,0.6)",
            }}
          >
            <WhatsAppIcon className="h-5 w-5" />
            Abrir WhatsApp agora
            <ArrowOut className="h-4 w-4 opacity-80" />
          </a>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-[var(--muted)]">
          <span
            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[var(--line-strong)] border-t-[var(--petrol)]"
            aria-hidden
          />
          Abrindo o WhatsApp…
        </p>
      </div>
    </main>
  );
}
