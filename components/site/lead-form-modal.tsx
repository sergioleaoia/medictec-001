"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ArrowOut, CheckIcon, WhatsAppIcon } from "../primitives/icons";
import { trackLeadConverted } from "@/lib/gtm";

const WEBHOOK_URL =
  "https://leaomarketeria.app.n8n.cloud/webhook/medictec-automacao-lp001";
const THANK_YOU_URL = "/obrigado";
// 1 tentativa + 2 retentativas; ms de espera antes da 2ª e da 3ª tentativa.
const WEBHOOK_RETRY_DELAYS = [2000, 3000];

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
  const [utms, setUtms] = useState<UTMs>({});
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
      // Client-only values (URL + sessionStorage) synced once on mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUtms(merged);
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
    <LeadFormCtx.Provider value={{ open, utms }}>
      {children}
      {isOpen && <LeadFormModal onClose={close} utms={utms} />}
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

const WASTE_TYPES = [
  { value: "saude_hospitalar", label: "Saúde/Hospitalar" },
  { value: "industrial", label: "Industrial" },
  { value: "organico_domiciliar", label: "Orgânico/Domiciliar" },
  { value: "reciclavel", label: "Reciclável" },
  { value: "outro", label: "Outro" },
];

const PERIODICITY = [
  { value: "semanal", label: "Semanal" },
  { value: "quinzenal", label: "Quinzenal" },
  { value: "mensal", label: "Mensal" },
  { value: "nao_sei", label: "Ainda não sei" },
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
  const [wasteType, setWasteType] = useState("");
  const [periodicity, setPeriodicity] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Amarra o modal ao *visual viewport* (a área de fato visível). No mobile o
  // `position: fixed` usa o layout viewport, então quando o teclado sobe — ou a
  // barra do navegador aparece — a base do modal (com o botão de envio) fica
  // atrás do teclado e trava. Acompanhando o visualViewport o modal sempre cabe
  // na parte visível da tela.
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
    const update = () =>
      setViewport({ top: vv.offsetTop, height: vv.height });
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

  const phoneDigits = phone.replace(/\D/g, "");
  const emailValid = EMAIL_RE.test(email.trim());
  const emailError =
    emailTouched && email.length > 0 && !emailValid
      ? "Digite um e-mail válido (ex: nome@empresa.com.br)"
      : undefined;
  const step1Valid =
    firstName.trim().length >= 2 && emailValid && phoneDigits.length >= 10;
  const step2Valid = wasteType !== "" && periodicity !== "";

  const handleSubmit = async () => {
    if (!step2Valid || submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    const wasteTypeLabel =
      WASTE_TYPES.find((w) => w.value === wasteType)?.label ?? wasteType;
    const periodicityLabel =
      PERIODICITY.find((p) => p.value === periodicity)?.label ?? periodicity;

    const payload = {
      // Contato
      name: firstName.trim(),
      email: email.trim(),
      phone, // formatado: (11) 99999-8888
      phoneDigits, // só dígitos: 11999998888
      whatsapp: phoneDigits ? `55${phoneDigits}` : "", // com DDI: 5511999998888
      // Qualificação
      wasteType, // valor: saude_hospitalar | industrial | organico_domiciliar | reciclavel | outro
      wasteTypeLabel, // rótulo exibido
      periodicity, // valor: semanal | quinzenal | mensal | nao_sei
      periodicityLabel, // rótulo exibido
      // Meta
      source: "lp-medictec01",
      submittedAt: new Date().toISOString(),
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      // Rastreamento
      utm_source: utms.utm_source ?? "",
      utm_medium: utms.utm_medium ?? "",
      utm_campaign: utms.utm_campaign ?? "",
      utm_term: utms.utm_term ?? "",
      utm_content: utms.utm_content ?? "",
      gclid: utms.gclid ?? "",
      fbclid: utms.fbclid ?? "",
    };

    // Entrega o lead com retentativas: falhas transitórias de rede não perdem
    // o lead. Só mostra erro depois de esgotar as tentativas.
    let delivered = false;
    const totalAttempts = WEBHOOK_RETRY_DELAYS.length + 1;
    for (let attempt = 1; attempt <= totalAttempts; attempt++) {
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
        console.error(`Lead webhook — tentativa ${attempt} falhou`, err);
        if (attempt <= WEBHOOK_RETRY_DELAYS.length) {
          await new Promise((r) =>
            setTimeout(r, WEBHOOK_RETRY_DELAYS[attempt - 1])
          );
        }
      }
    }

    if (!delivered) {
      setSubmitting(false);
      setSubmitError(
        "Não conseguimos enviar após algumas tentativas. Verifique sua conexão e tente novamente."
      );
      return;
    }

    // Envio confirmado (200): dispara a conversão no dataLayer e só navega
    // depois que o GTM confirmar o disparo das tags (ou o timeout).
    await trackLeadConverted({
      email: email.trim(),
      phone: phoneDigits ? `+55${phoneDigits}` : phone,
    });
    window.location.href = THANK_YOU_URL;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-form-title"
      className="fixed inset-0 z-50"
    >
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
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
                id="lead-form-title"
                className="text-sm font-semibold text-[var(--petrol-ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Falar com a Medic Tec
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
          className="h-1 w-full shrink-0"
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
          className="min-h-0 flex-1 overflow-y-auto px-6 py-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (step === 1 && step1Valid) setStep(2);
            else if (step === 2) void handleSubmit();
          }}
        >
          {step === 1 ? (
            <div className="space-y-4">
              <Field
                label="Nome"
                name="firstName"
                value={firstName}
                onChange={setFirstName}
                placeholder="Seu nome"
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
                label="Celular (WhatsApp)"
                name="phone"
                inputMode="tel"
                value={phone}
                onChange={(v) => setPhone(maskBRPhone(v))}
                placeholder="(00) 00000-0000"
              />
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                  Tipo de resíduo que você gera
                </label>
                <SelectGrid
                  options={WASTE_TYPES}
                  value={wasteType}
                  onChange={setWasteType}
                  cols={2}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                  Periodicidade de coleta
                </label>
                <SelectGrid
                  options={PERIODICITY}
                  value={periodicity}
                  onChange={setPeriodicity}
                  cols={2}
                />
              </div>
            </div>
          )}

          <div className="mt-7">
            <button
              type="submit"
              disabled={
                submitting || (step === 1 ? !step1Valid : !step2Valid)
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
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
                  Falar com a Medic Tec
                </>
              )}
            </button>
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={submitting}
                className="mt-3 w-full text-sm font-medium text-[var(--muted)] transition hover:text-[var(--petrol)] disabled:opacity-40"
              >
                ← Voltar
              </button>
            )}
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

          <p
            className="mt-4 border-t pt-4 text-sm leading-relaxed text-[var(--muted)]"
            style={{ borderColor: "var(--line)" }}
          >
            Para vagas de emprego,{" "}
            <a
              href="https://relacionamento.medictec.com.br/vagas-emprego"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--petrol)] underline underline-offset-2 hover:text-[var(--petrol-deep)]"
            >
              acesse aqui
            </a>
            .
          </p>
        </form>
        </div>
      </div>
    </div>
  );
}

function SelectGrid({
  options,
  value,
  onChange,
  cols,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  cols: 2 | 3;
}) {
  return (
    <div
      className={`mt-2 grid gap-2 ${cols === 3 ? "grid-cols-3" : "grid-cols-2"}`}
    >
      {options.map((o, i) => {
        const active = value === o.value;
        const spanFull =
          cols === 2 && options.length % 2 === 1 && i === options.length - 1;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`flex items-center justify-center rounded-xl border px-3 py-3 text-sm font-medium transition ${
              spanFull ? "col-span-2" : ""
            }`}
            style={{
              borderColor: active ? "var(--petrol)" : "var(--line-strong)",
              background: active ? "var(--teal-soft)" : "transparent",
              color: active ? "var(--petrol-ink)" : "var(--ink-soft)",
            }}
          >
            {o.label}
          </button>
        );
      })}
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
