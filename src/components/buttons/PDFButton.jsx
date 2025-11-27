import React from "react";
import { FileText } from "lucide-react";

export default function PDFButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 bg-ecorange text-esblack px-3 py-1 rounded hover:bg-esyellow transition-colors"
    >
      <FileText size={16} /> PDF
    </button>
  );
}
