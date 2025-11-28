import React from "react";

export default function InputField({ label, name, type = "text", value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-esblack mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e)} // form me handleChange use karne ke liye event bhej rahe hain
        className="w-full p-2 rounded bg-eswhite text-esblack border border-gray-300 focus:outline-none focus:ring-2 focus:ring-esyellow"
      />
    </div>
  );
}
