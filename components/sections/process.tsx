"use client";

import { useEffect, useRef, useState } from "react";
import {
  TruckIcon,
  AutoclaveIcon,
  DocIcon,
  RouteIcon,
} from "../primitives/icons";
import { WhatsAppButton } from "../primitives/cta";

const STEPS = [
  {
    n: "1",
    icon: RouteIcon,
    title: "Coleta programada",
    body: "Frequência sob medida — semanal, quinzenal ou mensal.",
  },
  {
    n: "2",
    icon: TruckIcon,
    title: "Transporte próprio",
    body: "Frota especializada e licenciada para resíduos de saúde.",
  },
  {
    n: "3",
    icon: AutoclaveIcon,
    title: "Tratamento na UTR",
    body: "Autoclavagem ou incineração conforme a classificação.",
  },
  {
    n: "4",
    icon: DocIcon,
    title: "Documentação completa",
    body: "MTR e CDF vinculados ao CNPJ do gerador, no SINIR.",
  },
];

export function ProcessSection() {
  const railRef = useRef<HTMLDivElement>(null);
  // fallback-visible on SSR / no-JS; the scroll handler takes over on mount
  const [fill, setFill] = useState(0);
  const [active, setActive] = useState(STEPS.length);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const nodes = Array.from(rail.querySelectorAll<HTMLElement>("[data-node]"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = rail.getBoundingClientRect();
      if (reduce) {
        setFill(rect.height);
        setActive(STEPS.length);
        return;
      }
      const activeY = window.innerHeight * 0.62;
      setFill(Math.max(0, Math.min(rect.height, activeY - rect.top)));
      let count = 0;
      for (const node of nodes) {
        const r = node.getBoundingClientRect();
        if (r.top + r.height / 2 <= activeY) count++;
      }
      setActive(count);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update); // initial, deferred out of effect body
    if (!reduce) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="processo"
      className="border-y py-20 sm:py-24"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          {/* ---------- Heading (left) ---------- */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <span className="eyebrow">Como funciona</span>
            <h2 className="mt-3 balance">
              Da coleta ao destino final, sem ponta solta.
            </h2>
            <p className="mt-4 text-[var(--ink-soft)]">
              Cada etapa é executada com estrutura própria — a cadeia inteira é
              nossa.
            </p>
            <div className="mt-8 hidden lg:block">
              <WhatsAppButton variant="primary" />
            </div>
          </div>

          {/* ---------- Timeline (right) ---------- */}
          <div ref={railRef} className="relative">
            {/* base rail */}
            <span
              aria-hidden
              className="absolute bottom-5 top-5 w-[2px]"
              style={{ left: "21px", background: "var(--line-strong)" }}
            />
            {/* scroll-driven fill */}
            <span
              aria-hidden
              className="absolute top-5 w-[2px]"
              style={{
                left: "21px",
                height: Math.max(0, fill - 20),
                background: "var(--petrol)",
              }}
            />

            <ol className="space-y-9">
              {STEPS.map((s, i) => {
                const on = i < active;
                const Icon = s.icon;
                return (
                  <li
                    key={s.n}
                    className="relative pl-16"
                    style={{
                      opacity: on ? 1 : 0.4,
                      transform: on ? "none" : "translateY(10px)",
                      transition: "opacity 0.5s ease, transform 0.5s ease",
                    }}
                  >
                    <span
                      data-node
                      className="absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full font-display text-lg font-semibold transition-colors duration-300"
                      style={{
                        background: on ? "var(--petrol)" : "var(--surface)",
                        color: on ? "#ffffff" : "var(--muted)",
                        boxShadow: on
                          ? "none"
                          : "inset 0 0 0 2px var(--line-strong)",
                      }}
                    >
                      {s.n}
                    </span>
                    <div className="pt-1">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-[var(--petrol)]" />
                        <h3 className="font-semibold text-[var(--ink)]">
                          {s.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                        {s.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* CTA — mobile only (desktop CTA lives in the sticky heading) */}
        <div className="mt-12 flex justify-center lg:hidden">
          <WhatsAppButton variant="primary" />
        </div>
      </div>
    </section>
  );
}
