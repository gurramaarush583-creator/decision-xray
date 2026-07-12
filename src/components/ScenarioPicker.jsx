import { scenarios } from "../data/scenarios";

export default function ScenarioPicker({ onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {scenarios.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s)}
          className="px-3 py-2 text-sm border border-border rounded-md bg-panel hover:border-accent transition-colors"
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}