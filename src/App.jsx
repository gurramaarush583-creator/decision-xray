import { useState } from "react";
import { scenarios } from "./data/scenarios";
import EvidenceTrail from "./components/EvidenceTrail";
import UncertaintyAnalyzer from "./components/UncertaintyAnalyzer";
import ScenarioPicker from "./components/ScenarioPicker";
import CollapsibleSection from "./components/CollapsibleSection";
import HumanReviewMode from "./components/HumanReviewMode";
import TrustDashboard from "./components/TrustDashboard";
import DecisionInput from "./components/DecisionInput";
import FactorBreakdown from "./components/FactorBreakdown";
import CounterfactualPlayground from "./components/CounterfactualPlayground";

export default function App() {
  const [decisionType, setDecisionType] = useState("");
  const [inputData, setInputData] = useState("");
  const [activeScenario, setActiveScenario] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runAnalysis = async (type, data) => {
    if (!type || !data) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decisionType: type, inputData: data }),
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setResult(json);
    } catch (e) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleScenario = (s) => {
    setActiveScenario(s);
    setDecisionType(s.decisionType);
    setInputData(s.sampleData);
    setResult(null);
    runAnalysis(s.decisionType, s.sampleData);
  };

  const handleManualSubmit = () => {
    setActiveScenario(null);
    runAnalysis(decisionType, inputData);
  };

  const handleRecompute = (newData) => {
    setInputData(newData);
    runAnalysis(activeScenario.decisionType, newData);
  };

  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">
        AI Decision <span className="text-accent">X-Ray</span>
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        See what's really behind an AI's decision — the factors, the uncertainty, and the bias it won't tell you about.
      </p>

      <ScenarioPicker onSelect={handleScenario} />

      <DecisionInput
        decisionType={decisionType}
        setDecisionType={setDecisionType}
        inputData={inputData}
        setInputData={setInputData}
        onSubmit={handleManualSubmit}
        loading={loading}
      />

      {activeScenario && (
        <div className="mt-4">
          <CounterfactualPlayground
            scenario={activeScenario}
            onRecompute={handleRecompute}
            loading={loading}
          />
        </div>
      )}

      {error && <div className="text-bad text-sm mt-3">{error}</div>}

      <FactorBreakdown result={result} />

      {result && (
        <>
          <CollapsibleSection
            title="Uncertainty Analyzer"
            subtitle="Gaps in the data that could change this decision if resolved."
            defaultOpen={true}
          >
            <UncertaintyAnalyzer uncertainty={result?.uncertainty} />
          </CollapsibleSection>

          <CollapsibleSection
            title="Evidence Trail"
            subtitle="Every conclusion traced back to what kind of evidence supports it."
          >
            <EvidenceTrail evidenceTrail={result?.evidenceTrail} />
          </CollapsibleSection>

          <CollapsibleSection title="Trust Score Dashboard">
            <TrustDashboard trustDimensions={result?.trustDimensions} />
          </CollapsibleSection>

          <CollapsibleSection title="Human Review Mode" subtitle="You are the human reviewer.">
            <HumanReviewMode result={result} key={JSON.stringify(result?.decision)} />
          </CollapsibleSection>
        </>
      )}
    </div>
  );
}