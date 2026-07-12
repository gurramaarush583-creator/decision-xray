const dimLabels = {
  explainability: "Explainability",
  dataCompleteness: "Data Completeness",
  robustness: "Robustness",
  humanOversightNeeded: "Human Oversight Needed",
};

function barColor(key, score) {
  // For humanOversightNeeded, high score is a warning, not a good thing
  const isInverse = key === "humanOversightNeeded";
  const effective = isInverse ? 100 - score : score;
  if (effective > 70) return "bg-good";
  if (effective > 40) return "bg-warn";
  return "bg-bad";
}

export default function TrustDashboard({ trustDimensions }) {
  if (!trustDimensions) return null;

  return (
    <div className="bg-panel border border-border rounded-lg p-4 mt-4">
      <div className="text-xs text-gray-400 mb-3">Trust Score Dashboard</div>
      <div className="space-y-3">
        {Object.entries(trustDimensions).map(([key, dim]) => (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1">
              <span>{dimLabels[key] || key}</span>
              <span>{dim.score}/100</span>
            </div>
            <div className="w-full h-2 bg-bg rounded-full overflow-hidden mb-1">
              <div
                className={`h-full ${barColor(key, dim.score)}`}
                style={{ width: `${dim.score}%` }}
              />
            </div>
            <div className="text-xs text-gray-400">{dim.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}