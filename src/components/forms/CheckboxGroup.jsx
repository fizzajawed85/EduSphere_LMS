import React from "react";

export default function CheckboxGroup({ label, name, options, values, onChange }) {
  const handleCheck = (val) => {
    let updatedValues = values.includes(val)
      ? values.filter((v) => v !== val)
      : [...values, val];

    // Send event-like object
    onChange({ target: { name, value: updatedValues } });
  };

  return (
    <div className="mb-4">
      <label className="block text-esblack mb-2">{label}</label>
      <div className="flex gap-4 bg-eswhite p-3 rounded border border-gray-300">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-esblack">
            <input
              type="checkbox"
              checked={values.includes(opt.value)}
              onChange={() => handleCheck(opt.value)}
              className="accent-esyellow"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
