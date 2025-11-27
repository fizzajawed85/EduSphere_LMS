import React, { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FaBell, FaUser, FaCog } from "react-icons/fa";

export default function WorkingNavbar({ sidebarWidth = 256 }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={toggleMobileSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-yellow-400 rounded shadow"
      >
        {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Navbar */}
      <header
        className="fixed top-0 h-16 flex items-center justify-between px-4 z-50
                   bg-white border-b border-gray-300 shadow-sm w-full"
        style={{
          left: sidebarWidth,
          width: `calc(100% - ${sidebarWidth}px)`,
        }}
      >
        {/* Left: Search */}
        <div className="relative flex-1 mr-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded bg-gray-100 text-black placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={18} />
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4 flex-shrink-0 text-black">
          <button className="p-2 rounded hover:bg-gray-200">
            <FaBell size={20} />
          </button>
          <button className="p-2 rounded hover:bg-gray-200">
            <FaCog size={20} />
          </button>
          <button className="p-2 rounded hover:bg-gray-200">
            <FaUser size={20} />
          </button>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}
    </>
  );
}
