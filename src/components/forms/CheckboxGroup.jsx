import React from "react";

export default function CheckboxGroup({ label, options, values, onChange }) {
  const handleCheck = (val) => {
    if (values.includes(val)) {
      onChange(values.filter((v) => v !== val));
    } else {
      onChange([...values, val]);
    }
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
