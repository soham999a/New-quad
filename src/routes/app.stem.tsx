import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/qids/app-shell";

export const Route = createFileRoute("/app/stem")({
  head: () => ({ meta: [{ title: "STEM · STEAM · STREAM — QiDS" }] }),
  component: Stem,
});

const TRACKS = [
  { code: "STEM", expand: "Science · Technology · Engineering · Math", desc: "Core disciplinary foundation for schools and colleges." },
  { code: "STEAM", expand: "+ Arts", desc: "Adds creative practice and design reasoning." },
  { code: "STREAM", expand: "+ Reading & Arts", desc: "Integrates literacy and humanistic reasoning across disciplines." },
];

function Stem() {
  return (
    <AppShell
      eyebrow="EXTENSION · STEM · STEAM · STREAM"
      title="Disciplinary depth, integrated with development."
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
          {TRACKS.map((t) => (
            <div key={t.code} className="bg-background p-8">
              <div className="font-display text-[34px] text-[var(--gold)] mb-2">{t.code}</div>
              <div className="text-[12px] font-mono tracking-wider text-muted-foreground mb-5 uppercase">{t.expand}</div>
              <div className="text-[14px] leading-relaxed text-muted-foreground">{t.desc}</div>
            </div>
          ))}
        </div>

        <div className="col-span-12 border border-border p-10">
          <div className="label-eyebrow-gold mb-4">METHODOLOGY</div>
          <h2 className="font-display text-[26px] leading-tight max-w-2xl mb-6">
            Each disciplinary unit is mapped to one or more quotients.
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {[
              ["Inquiry projects", "IQ · AQ — structured investigation under uncertainty."],
              ["Design studios", "IQ · SQ — collaborative making with constraints."],
              ["Civic labs", "EQ · SQ — community-rooted problem framing."],
              ["Literary studios", "EQ · IQ — interpretive depth and synthesis."],
            ].map(([t, d]) => (
              <div key={t} className="bg-background p-6">
                <div className="text-[15px] mb-2">{t}</div>
                <div className="text-[13px] text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
