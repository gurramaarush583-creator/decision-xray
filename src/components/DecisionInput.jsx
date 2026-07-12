export default function DecisionInput({
  decisionType,
  setDecisionType,
  inputData,
  setInputData,
  onSubmit,
  loading,
}) {
  return (
    <div className="bg-panel border border-border rounded-lg p-4 space-y-3">
      <input
        className="w-full bg-bg border border-border rounded-md p-2 text-sm"
        placeholder="Decision type (e.g. loan approval)"
        value={decisionType}
        onChange={(e) => setDecisionType(e.target.value)}
      />
      <textarea
        className="w-full bg-bg border border-border rounded-md p-2 text-sm h-32"
        placeholder="Paste case/applicant data here..."
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <button
        onClick={onSubmit}
        disabled={loading}
        className="w-full py-2 bg-accent rounded-md font-semibold disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Run X-Ray"}
      </button>
    </div>
  );
}