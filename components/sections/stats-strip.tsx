const STATS = [
  { k: "100+", label: "Cidades atendidas no PR e SP" },
  { k: "INMETRO", label: "Frota com autorização ANTT" },
];

export function StatsStrip() {
  return (
    <section
      className="border-y"
      style={{
        background: "var(--surface)",
        borderColor: "var(--line)",
      }}
    >
      <div className="container-x grid gap-0 divide-y divide-[var(--line)] py-2 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="flex items-baseline gap-3 px-4 py-5 sm:px-6"
          >
            <span
              className="font-display text-2xl font-semibold text-[var(--petrol-ink)] sm:text-3xl"
              style={{ letterSpacing: "-0.04em" }}
            >
              {s.k}
            </span>
            <span className="text-sm text-[var(--ink-soft)]">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
