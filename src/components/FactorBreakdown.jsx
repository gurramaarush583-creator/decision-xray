import ConfidenceBar from "./ConfidenceBar";

const dirColor = {
  positive: "text-good",
  negative: "text-bad",
  neutral: "text-warn",
};

export default function FactorBreakdown({ result }) {
  if (!result) return null;

  return (
    <div className="bg-panel border border-border rounded-lg p-4 mt-4 space-y-5">
      <div>
        <div className="text-xs text-gray-400 mb-1">AI Decision</div>
        <div className="text-lg font-semibold">{result.decision}</div>
      </div>

      <ConfidenceBar score={result.confidenceScore} />

      <div>
        <div className="text-xs text-gray-400 mb-2">Contributing Factors</div>
        <div className="space-y-2">
          {result.factors?.map((f, i) => (
            <div key={i} className="flex justify-between text-sm border-b border-border pb-1">
              <span className={dirColor[f.direction]}>{f.name}</span>
              <span>{f.weight}%</span>
            </div>
          ))}
        </div>
      </div>


      <div>
        <div className="text-xs text-gray-400 mb-2">Potential Bias Flags</div>
        <ul className="text-sm list-disc list-inside text-bad space-y-1">
          {result.biasFlags?.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>

      {result.alternateOutcome && (
        <div className="border-t border-border pt-3">
          <div className="text-xs text-gray-400 mb-1">Alternate Outcome</div>
          <div className="text-sm">
            If <span className="text-accent">{result.alternateOutcome.changedFactor}</span> changed:{" "}
            <span className="font-semibold">{result.alternateOutcome.newDecision}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">{result.alternateOutcome.explanation}</div>
        </div>
      )}
    </div>
  );
}