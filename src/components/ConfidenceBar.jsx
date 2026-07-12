export default function ConfidenceBar({ score }) {
  const color = score > 70 ? "bg-good" : score > 40 ? "bg-warn" : "bg-bad";
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span>Confidence</span>
        <span>{score}/100</span>
      </div>
      <div className="w-full h-2 bg-bg rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}