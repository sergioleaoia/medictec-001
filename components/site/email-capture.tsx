"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLeadForm } from "./lead-form-modal";
import { trackLeadConverted } from "@/lib/gtm";
import { WhatsAppIcon, ArrowOut } from "../primitives/icons";

const WEBHOOK_URL = "https://hook.us1.make.com/yviggrhrsiv3zus973dpnc9x18rnwcf1";
// Página-ponte que confirma o cadastro e encaminha pro WhatsApp comercial.
const REDIRECT_URL = "/whatsapp-acao/obrigado";
// 1 tentativa + 1 retentativa rápida: na falha total encaminha em ~3s.
const WEBHOOK_RETRY_DELAYS = [1500];
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export function EmailCapture({ label = "Falar no WhatsApp" }: { label?: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { utms } = useLeadForm();

  // Segue o *visual viewport* pra que o teclado/barra do navegador não escondam
  // a base do modal no mobile. Ver lead-form-modal.tsx.
  const [viewport, setViewport] = useState<{ top: number; height: number } | null>(
    () => {
      if (typeof window === "undefined" || !window.visualViewport) return null;
      const vv = window.visualViewport;
      return { top: vv.offsetTop, height: vv.height };
    }
  );

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => setViewport({ top: vv.offsetTop, height: vv.height });
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

  const valid = EMAIL_RE.test(email.trim());
  const emailError =
    touched && email.length > 0 && !valid
      ? "Digite um e-mail válido (ex: nome@empresa.com.br)"
      : undefined;

  const close = useCallback(() => {
    if (!submitting) setOpen(false);
  }, [submitting]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const submit = async () => {
    if (!valid || submitting) return;
    setSubmitting(true);
    setError(null);

    const payload = {
      email: email.trim(),
      source: "whatsapp-acao",
      submittedAt: new Date().toISOString(),
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      utm_source: utms.utm_source ?? "",
      utm_medium: utms.utm_medium ?? "",
      utm_campaign: utms.utm_campaign ?? "",
      utm_term: utms.utm_term ?? "",
      utm_content: utms.utm_content ?? "",
      gclid: utms.gclid ?? "",
      fbclid: utms.fbclid ?? "",
    };

    let delivered = false;
    for (let attempt = 1; attempt <= WEBHOOK_RETRY_DELAYS.length + 1; attempt++) {
      try {
        const res = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        });
        if (!res.ok) throw new Error(`Webhook ${res.status}`);
        delivered = true;
        break;
      } catch (err) {
        console.error(`whatsapp-acao webhook — tentativa ${attempt} falhou`, err);
        if (attempt <= WEBHOOK_RETRY_DELAYS.length) {
          await new Promise((r) =>
            setTimeout(r, WEBHOOK_RETRY_DELAYS[attempt - 1])
          );
        }
      }
    }

    // Mesmo se o webhook falhar após as retentativas, NÃO travamos o usuário:
    // ele segue pra ponte e é encaminhado pro WhatsApp do mesmo jeito.
    if (!delivered) {
      console.warn(
        "whatsapp-acao: webhook não entregue — seguindo para o WhatsApp mesmo assim"
      );
    }

    await trackLeadConverted({
      email: email.trim(),
      phone: "",
      formId: "whatsapp-acao",
    });
    // Passa o e-mail pra ponte montar a mensagem do WhatsApp.
    try {
      sessionStorage.setItem("medictec_wa_email", email.trim());
    } catch {
      /* sessionStorage indisponível — a ponte usa a mensagem genérica */
    }
    window.location.href = REDIRECT_URL;
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn btn-primary"
      >
        <WhatsAppIcon className="h-[18px] w-[18px]" />
        {label}
        <ArrowOut className="h-4 w-4 opacity-70" />
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ec-title"
            className="fixed inset-0 z-50"
          >
          <button
            type="button"
            aria-label="Fechar"
            onClick={close}
            className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-sm"
          />

          <div
            className="absolute inset-x-0 flex items-center justify-center px-4 py-4"
            style={{
              top: viewport ? viewport.top : 0,
              height: viewport ? viewport.height : "100%",
            }}
          >
            <div
              className="relative flex max-h-full w-full max-w-md flex-col overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
              style={{ border: "1px solid var(--line)" }}
            >
              <div
                className="flex shrink-0 items-center justify-between px-6 py-4"
                style={{ background: "var(--paper-deep)" }}
              >
              <div className="flex items-center gap-2">
                <span
                  className="grid h-9 w-9 place-items-center rounded-xl text-white"
                  style={{ background: "var(--petrol)" }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <p
                    id="ec-title"
                    className="text-sm font-semibold text-[var(--petrol-ink)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Condição especial de julho
                  </p>
                  <p className="text-[0.7rem] text-[var(--muted)]">
                    Deixe seu e-mail para começar
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Fechar"
                className="grid h-8 w-8 place-items-center rounded-full text-[var(--muted)] transition hover:bg-white"
              >
                <span className="text-xl leading-none">×</span>
              </button>
            </div>

            <form
              className="min-h-0 flex-1 overflow-y-auto px-6 py-6"
              onSubmit={(e) => {
                e.preventDefault();
                void submit();
              }}
            >
              <p
                className="text-lg font-bold leading-snug text-[var(--ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Digite seu e-mail e desbloqueie sua{" "}
                <span style={{ color: "var(--petrol)" }}>condição especial</span>{" "}
                — fale com nosso time agora mesmo.
              </p>

              <label className="mt-5 block">
                <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                  Seu melhor e-mail
                </span>
                <input
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="seu@email.com"
                  aria-invalid={emailError ? true : undefined}
                  className="mt-1.5 w-full rounded-xl border bg-white px-3.5 py-3 text-base text-[var(--ink)] outline-none transition focus:ring-4"
                  style={{
                    borderColor: emailError ? "#c53030" : "var(--line-strong)",
                    ["--tw-ring-color" as never]: emailError
                      ? "rgba(197,48,48,0.18)"
                      : "var(--teal-soft)",
                  }}
                />
                {emailError ? (
                  <span
                    className="mt-1.5 block text-xs font-medium"
                    style={{ color: "#c53030" }}
                  >
                    {emailError}
                  </span>
                ) : null}
              </label>

              <button
                type="submit"
                disabled={submitting || !valid}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 10px 24px -10px rgba(37,99,235,0.5)",
                }}
              >
                {submitting ? (
                  <>
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                      aria-hidden
                    />
                    Enviando…
                  </>
                ) : (
                  <>
                    <WhatsAppIcon className="h-4 w-4" />
                    Quero a condição especial
                  </>
                )}
              </button>

              {error ? (
                <p
                  className="mt-4 text-xs font-medium"
                  style={{ color: "#c53030" }}
                  role="alert"
                >
                  {error}
                </p>
              ) : (
                <p className="mt-4 text-[0.72rem] text-[var(--muted)]">
                  Resposta imediata pelo time comercial.
                </p>
              )}
            </form>
            </div>
          </div>
          </div>,
          document.body
        )}
    </>
  );
}
