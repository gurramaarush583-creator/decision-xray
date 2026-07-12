const impactStyles = {
  high: "border-bad text-bad",
  medium: "border-warn text-warn",
  low: "border-gray-500 text-gray-400",
};

const impactLabel = {
  high: "High Impact",
  medium: "Medium Impact",
  low: "Low Impact",
};

export default function UncertaintyAnalyzer({ uncertainty }) {
  if (!uncertainty || uncertainty.length === 0) return null;

  return (
    <div className="bg-panel border border-border rounded-lg p-4 mt-4">
      <div className="text-xs text-gray-400 mb-1">Uncertainty Analyzer</div>
      <div className="text-sm text-gray-300 mb-3">
        Gaps in the data that could change this decision if resolved.
      </div>
      <div className="space-y-2">
        {uncertainty.map((u, i) => (
          <div
            key={i}
            className={`border-l-2 pl-3 py-1 text-sm ${impactStyles[u.impact] || impactStyles.medium}`}
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-200">{u.issue}</span>
              <span className="text-xs uppercase tracking-wide">
                {impactLabel[u.impact] || "Medium Impact"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}