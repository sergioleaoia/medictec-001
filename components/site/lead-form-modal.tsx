"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowOut, CheckIcon, WhatsAppIcon } from "../primitives/icons";

const WEBHOOK_URL = "https://hook.us1.make.com/gc7warvx88aragvqlu6ibu25tlqopb2f";
const THANK_YOU_URL =
  "https://relacionamento.ambientalmedictec.com.br/obrigado";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

type UTMs = Partial<Record<(typeof UTM_KEYS)[number], string>>;

type Ctx = { open: () => void; utms: UTMs };
const LeadFormCtx = createContext<Ctx | null>(null);

export function useLeadForm() {
  const ctx = useContext(LeadFormCtx);
  if (!ctx) {
    throw new Error("useLeadForm must be used within LeadFormProvider");
  }
  return ctx;
}

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const utmsRef = useRef<UTMs>({});
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("medictec_utms");
      const fromStored: UTMs = stored ? JSON.parse(stored) : {};
      const params = new URLSearchParams(window.location.search);
      const fromUrl: UTMs = {};
      for (const key of UTM_KEYS) {
        const v = params.get(key);
        if (v) fromUrl[key] = v;
      }
      const merged: UTMs = { ...fromStored, ...fromUrl };
      utmsRef.current = merged;
      if (Object.keys(merged).length > 0) {
        sessionStorage.setItem("medictec_utms", JSON.stringify(merged));
      }
    } catch {
      /* swallow — no SSR, no storage permission, etc. */
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <LeadFormCtx.Provider value={{ open, utms: utmsRef.current }}>
      {children}
      {isOpen && <LeadFormModal onClose={close} utms={utmsRef.current} />}
    </LeadFormCtx.Provider>
  );
}

function maskBRPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const SECTORS = [
  { value: "industria", label: "Indústria" },
  { value: "saude", label: "Saúde" },
  { value: "outro", label: "Outro" },
];

const EMAIL_RE =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function LeadFormModal({
  onClose,
  utms,
}: {
  onClose: () => void;
  utms: UTMs;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [phone, setPhone] = useState("");
  const [sector, setSector] = useState("");
  const [company, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const phoneDigits = phone.replace(/\D/g, "");
  const emailValid = EMAIL_RE.test(email.trim());
  const emailError =
    emailTouched && email.length > 0 && !emailValid
      ? "Digite um e-mail válido (ex: nome@empresa.com.br)"
      : undefined;
  const step1Valid =
    firstName.trim().length >= 2 && emailValid && phoneDigits.length >= 10;
  const step2Valid = sector !== "" && company.trim().length >= 2;

  const handleSubmit = async () => {
    if (!step2Valid || submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    const sectorLabel =
      SECTORS.find((s) => s.value === sector)?.label ?? sector;

    const payload = {
      firstName: firstName.trim(),
      email: email.trim(),
      phone,
      phoneDigits,
      sector,
      sectorLabel,
      company: company.trim(),
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

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      if (!res.ok) throw new Error(`Webhook ${res.status}`);
      window.location.href = THANK_YOU_URL;
    } catch (err) {
      console.error("Lead webhook failed", err);
      setSubmitting(false);
      setSubmitError(
        "Não conseguimos enviar agora. Verifique sua conexão e tente novamente."
      );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-form-title"
      className="fixed inset-0 z-50 grid place-items-end p-0 sm:place-items-center sm:p-4"
    >
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-sm"
      />

      <div
        className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] sm:rounded-3xl"
        style={{ border: "1px solid var(--line)" }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
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
                id="lead-form-title"
                className="text-sm font-semibold text-[var(--petrol-ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Falar com a Medictec
              </p>
              <p className="text-[0.7rem] text-[var(--muted)]">
                Etapa {step} de 2
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar formulário"
            className="grid h-8 w-8 place-items-center rounded-full text-[var(--muted)] transition hover:bg-white"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        <div
          className="h-1 w-full"
          style={{ background: "var(--paper-deep)" }}
        >
          <div
            className="h-full transition-all duration-300"
            style={{
              width: step === 1 ? "50%" : "100%",
              background: "var(--teal)",
            }}
          />
        </div>

        <form
          className="px-6 py-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (step === 1 && step1Valid) setStep(2);
            else if (step === 2) void handleSubmit();
          }}
        >
          {step === 1 ? (
            <div className="space-y-4">
              <Field
                label="Primeiro nome"
                name="firstName"
                value={firstName}
                onChange={setFirstName}
                placeholder="Seu primeiro nome"
                autoFocus
              />
              <Field
                label="E-mail"
                name="email"
                type="email"
                value={email}
                onChange={setEmail}
                onBlur={() => setEmailTouched(true)}
                placeholder="seu@email.com"
                error={emailError}
              />
              <Field
                label="WhatsApp"
                name="phone"
                inputMode="tel"
                value={phone}
                onChange={(v) => setPhone(maskBRPhone(v))}
                placeholder="(00) 00000-0000"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                  Qual seu ramo de atividade?
                </label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {SECTORS.map((s) => {
                    const active = sector === s.value;
                    return (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => setSector(s.value)}
                        className="flex items-center justify-center rounded-xl border px-3 py-2.5 text-sm font-medium transition"
                        style={{
                          borderColor: active
                            ? "var(--petrol)"
                            : "var(--line-strong)",
                          background: active
                            ? "var(--teal-soft)"
                            : "transparent",
                          color: active
                            ? "var(--petrol-ink)"
                            : "var(--ink-soft)",
                        }}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <Field
                label="Nome da sua empresa"
                name="company"
                value={company}
                onChange={setCompany}
                placeholder="Razão social ou nome fantasia"
                autoFocus
              />
            </div>
          )}

          <div className="mt-7 flex items-center gap-3">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={submitting}
                className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--petrol)] disabled:opacity-40"
              >
                ← Voltar
              </button>
            )}
            <button
              type="submit"
              disabled={
                submitting || (step === 1 ? !step1Valid : !step2Valid)
              }
              className="ml-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                background: "var(--petrol)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.18), 0 10px 28px -14px rgba(14,79,76,0.65)",
              }}
            >
              {step === 1 ? (
                <>
                  Continuar <ArrowOut className="h-4 w-4" />
                </>
              ) : submitting ? (
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
                  Falar com a Medictec
                </>
              )}
            </button>
          </div>

          {submitError ? (
            <p
              className="mt-4 text-xs font-medium"
              style={{ color: "#c53030" }}
              role="alert"
            >
              {submitError}
            </p>
          ) : (
            <p className="mt-4 flex items-center gap-2 text-[0.72rem] text-[var(--muted)]">
              <CheckIcon
                className="h-3.5 w-3.5"
                style={{ color: "var(--petrol)" }}
              />
              Resposta Imediata
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  inputMode,
  autoFocus,
  error,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  inputMode?: "tel" | "email" | "text";
  autoFocus?: boolean;
  error?: string;
}) {
  const errorColor = "#c53030";
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
        {label}
      </span>
      <input
        name={name}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        aria-invalid={error ? true : undefined}
        className="mt-1.5 w-full rounded-xl border bg-white px-3.5 py-3 text-base text-[var(--ink)] outline-none transition focus:ring-4"
        style={{
          borderColor: error ? errorColor : "var(--line-strong)",
          boxShadow: undefined,
          ["--tw-ring-color" as never]: error
            ? "rgba(197,48,48,0.18)"
            : "var(--teal-soft)",
        }}
      />
      {error ? (
        <span
          className="mt-1.5 block text-xs font-medium"
          style={{ color: errorColor }}
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}
