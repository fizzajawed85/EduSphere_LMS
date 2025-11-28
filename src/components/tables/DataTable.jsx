// src/components/tables/DataTable.jsx
import React from "react";
import { useSelector } from "react-redux";

export default function DataTable({ columns = [], data = [] }) {
  const theme = useSelector((state) => state.theme.mode);

  const tableBg = theme === "dark" ? "bg-es1b1922 border-gray-700" : "bg-eswhite border-gray-200";
  const theadBg = theme === "dark" ? "bg-gray-800" : "bg-gray-100";
  const theadText = theme === "dark" ? "text-esyellow" : "text-esblack";
  const rowText = theme === "dark" ? "text-eswhite" : "text-esblack";
  const rowHover = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50";
  const emptyText = theme === "dark" ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`w-full overflow-x-auto rounded-lg shadow ${tableBg}`}>
      <table className="w-full text-left">
        <thead className={theadBg}>
          <tr>
            {columns.map((col, i) => (
              <th key={i} className={`p-3 font-semibold ${theadText}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={`p-4 text-center ${emptyText}`}>
                No data found
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                className={`border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"} ${rowHover}`}
              >
                {columns.map((col, j) => {
                  const fieldName = col.field || col.key; // fallback
                  return (
                    <td key={j} className={`p-3 ${rowText}`}>
                      {col.render ? col.render(row[fieldName], row) : row[fieldName] || ""}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
