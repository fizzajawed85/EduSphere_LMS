import React from "react";
import { Search } from "lucide-react";

export default function TableHeader({ title, search, setSearch, actions }) {
  return (
    <div className="flex justify-between items-center mb-4 bg-gray-100 dark:bg-es1b1922 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold text-esblack dark:text-white">{title}</h2>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search size={18} className="absolute left-2 top-2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white text-esblack dark:bg-gray-700 dark:text-white pl-8 pr-3 py-2 rounded focus:outline-none border border-gray-300 dark:border-gray-600"
            placeholder="Search..."
          />
        </div>

        {actions && <div>{actions}</div>}
      </div>
    </div>
  );
}
