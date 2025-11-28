import React from "react";

export default function DatePicker({ label, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-esblack mb-1">{label}</label>
      <input
        type="date"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)} // send only date string
        className="w-full p-2 rounded bg-eswhite text-esblack border border-gray-300 focus:outline-none focus:ring-2 focus:ring-esyellow"
      />
    </div>
  );
}

