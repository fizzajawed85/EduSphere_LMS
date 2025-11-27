import React from "react";

export default function RadioGroup({ label, options, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-esblack dark:text-white mb-2">{label}</label>
      <div className="flex gap-4">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-1 text-esblack dark:text-white"
          >
            <input
              type="radio"
              name={label}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange(e.target.value)}
              className="accent-esyellow"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

