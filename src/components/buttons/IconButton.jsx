import React from "react";

export default function IconButton({ icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded bg-eswhite text-esblack hover:bg-gray-200 transition-colors"
    >
      {icon}
    </button>
  );
}
