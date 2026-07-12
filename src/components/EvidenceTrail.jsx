const typeConfig = {
  observed_fact: { label: "Observed Fact", color: "text-good border-good", icon: "●" },
  inference: { label: "Inference", color: "text-warn border-warn", icon: "◆" },
  assumption: { label: "Assumption", color: "text-bad border-bad", icon: "▲" },
};

export default function EvidenceTrail({ evidenceTrail }) {
  if (!evidenceTrail || evidenceTrail.length === 0) return null;

  return (
    <div className="bg-panel border border-border rounded-lg p-4 mt-4">
      <div className="text-xs text-gray-400 mb-1">Evidence Trail</div>
      <div className="text-sm text-gray-300 mb-3">
        Every conclusion traced back to what kind of evidence supports it.
      </div>

      <div className="flex gap-4 mb-3 text-xs">
        {Object.entries(typeConfig).map(([key, cfg]) => (
          <div key={key} className={`flex items-center gap-1 ${cfg.color}`}>
            <span>{cfg.icon}</span>
            <span>{cfg.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {evidenceTrail.map((e, i) => {
          const cfg = typeConfig[e.type] || typeConfig.inference;
          return (
            <div key={i} className={`border-l-2 pl-3 py-1 ${cfg.color}`}>
              <div className="text-sm text-gray-200">
                <span className="mr-2">{cfg.icon}</span>
                {e.claim}
              </div>
              <div className="text-xs text-gray-400 mt-0.5 ml-4">{e.detail}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}