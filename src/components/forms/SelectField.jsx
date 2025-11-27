import React, { useState } from "react";
import { ChevronDown } from "lucide-react"; // already installed icon

export default function CustomSelect({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (val) => {
    onChange(val);
    setOpen(false);
  };

  const selectedLabel = options.find(opt => (opt.value ?? opt) === value)?.label ?? value;

  return (
    <div className="mb-4 relative">
      <label className="block text-esblack dark:text-eswhite mb-1">{label}</label>
      
      {/* Select Box */}
      <div 
        className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-eswhite dark:bg-esblack text-esblack dark:text-eswhite cursor-pointer flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <span>{selectedLabel || "Select..."}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 w-full mt-1 rounded shadow bg-eswhite dark:bg-esblack border border-gray-300 dark:border-gray-700">
          {options.map(opt => {
            const val = opt.value ?? opt;
            const label = opt.label ?? opt;
            return (
              <div
                key={val}
                onClick={() => handleSelect(val)}
                className="p-2 hover:bg-esyellow hover:text-esblack dark:hover:text-esblack cursor-pointer"
              >
                {label}
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}

