import { useState } from "react";

export default function CollapsibleSection({ title, subtitle, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-panel border border-border rounded-lg mt-4 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4 text-left"
      >
        <div>
          <div className="text-xs text-gray-400">{title}</div>
          {subtitle && <div className="text-sm text-gray-300 mt-0.5">{subtitle}</div>}
        </div>
        <span className="text-gray-400 text-sm ml-2">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}