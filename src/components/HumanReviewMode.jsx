import { useState } from "react";

export default function HumanReviewMode({ result }) {
  const [reviewerDecision, setReviewerDecision] = useState(null); // "uphold" | "override"
  const [justification, setJustification] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!result) return null;

  const handleSubmit = () => {
    if (!reviewerDecision || !justification.trim()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setReviewerDecision(null);
    setJustification("");
    setSubmitted(false);
  };

  return (
    <div className="bg-panel border border-border rounded-lg p-4 mt-4">
      <div className="text-xs text-gray-400 mb-1">Human Review Mode</div>
      <div className="text-sm text-gray-300 mb-3">
        You are the human reviewer. The AI has made its call — do you uphold it or override it?
      </div>

      <div className="border border-border rounded-md p-3 mb-3 bg-bg">
        <div className="text-xs text-gray-400 mb-1">AI Decision</div>
        <div className="text-sm font-semibold">{result.decision}</div>
        <div className="text-xs text-gray-400 mt-1">Confidence: {result.confidenceScore}/100</div>
      </div>

      {!submitted ? (
        <>
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setReviewerDecision("uphold")}
              className={`flex-1 py-2 rounded-md text-sm border ${
                reviewerDecision === "uphold"
                  ? "bg-good text-black border-good"
                  : "border-border bg-bg"
              }`}
            >
              Uphold AI Decision
            </button>
            <button
              onClick={() => setReviewerDecision("override")}
              className={`flex-1 py-2 rounded-md text-sm border ${
                reviewerDecision === "override"
                  ? "bg-accent text-black border-accent"
                  : "border-border bg-bg"
              }`}
            >
              Override Decision
            </button>
          </div>

          <textarea
            className="w-full bg-bg border border-border rounded-md p-2 text-sm h-20"
            placeholder="Explain your reasoning as the human reviewer..."
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={!reviewerDecision || !justification.trim()}
            className="w-full mt-2 py-2 bg-accent rounded-md text-sm font-semibold disabled:opacity-40"
          >
            Submit Review
          </button>
        </>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-border rounded-md p-3 bg-bg">
              <div className="text-xs text-gray-400 mb-1">AI Reasoning</div>
              <div className="text-sm">{result.decision}</div>
              <div className="text-xs text-gray-400 mt-1">
                Top factor: {result.factors?.[0]?.name}
              </div>
            </div>
            <div className="border border-border rounded-md p-3 bg-bg">
              <div className="text-xs text-gray-400 mb-1">Human Reasoning</div>
              <div className="text-sm">
                {reviewerDecision === "uphold" ? "Upheld AI decision" : "Overrode AI decision"}
              </div>
              <div className="text-xs text-gray-400 mt-1">{justification}</div>
            </div>
          </div>

          {reviewerDecision === "override" && (
            <div className="text-xs text-warn border-l-2 border-warn pl-2">
              This case is now flagged as a human-AI disagreement — exactly the kind of case
              that should be logged for review in a real system.
            </div>
          )}

          <button
            onClick={handleReset}
            className="text-xs text-gray-400 underline"
          >
            Reset review
          </button>
        </div>
      )}
    </div>
  );
}