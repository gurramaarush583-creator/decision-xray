import { useState, useEffect, useRef } from "react";

export default function CounterfactualPlayground({ scenario, onRecompute, loading }) {
  const [values, setValues] = useState(() => {
    const initial = {};
    scenario.sliders.forEach((s) => (initial[s.key] = s.default));
    return initial;
  });
  const debounceRef = useRef(null);

  useEffect(() => {
    const initial = {};
    scenario.sliders.forEach((s) => (initial[s.key] = s.default));
    setValues(initial);
  }, [scenario]);

  const handleChange = (key, value) => {
    const updated = { ...values, [key]: value };
    setValues(updated);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const newData = scenario.buildData(updated);
      onRecompute(newData);
    }, 500);
  };

  return (
    <div className="bg-panel border border-border rounded-lg p-4 space-y-4">
      <div className="text-xs text-gray-400">
        Counterfactual Playground — drag to see how the decision changes
      </div>
      {scenario.sliders.map((s) => (
        <div key={s.key}>
          <div className="flex justify-between text-sm mb-1">
            <span>{s.label}</span>
            <span className="text-accent">{values[s.key]}</span>
          </div>
          <input
            type="range"
            min={s.min}
            max={s.max}
            step={s.step}
            value={values[s.key]}
            onChange={(e) => handleChange(s.key, parseFloat(e.target.value))}
            className="w-full accent-accent"
          />
        </div>
      ))}
      {loading && <div className="text-xs text-gray-400">Recalculating...</div>}
    </div>
  );
}