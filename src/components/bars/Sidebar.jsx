import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home, Users, UserCheck, ClipboardList, BookOpen,
  DollarSign, User, GraduationCap,
  Menu, X, Award, Book, Calendar, ChevronDown, ChevronUp
} from "lucide-react";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActiveGroup = (base) => location.pathname.startsWith(base);

  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-esyellow rounded shadow"
        onClick={toggleMobileSidebar}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`
          fixed top-0 left-0 h-full bg-esblack text-eswhite border-r border-gray-800 z-40
          w-64 md:w-64 transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          flex flex-col
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-700 flex-shrink-0">
          <GraduationCap size={28} className="text-esyellow" />
          <span className="font-bold text-esyellow text-lg">EduSphere</span>
        </div>

        {/* Scrollable Menu */}
        <nav className="mt-4 flex-1 overflow-y-auto px-1">
          {/* Dashboard as Dropdown */}
          <SidebarGroup
            base="/dashboard"
            icon={Home}
            label="Dashboard"
            active={isActiveGroup("/dashboard")}
            items={[
              { name: "Super Admin", path: "/dashboard/superadmin" },
              { name: "Admin", path: "/dashboard/admin" },
              { name: "Teacher", path: "/dashboard/teacher" },
              { name: "Student", path: "/dashboard/student" },
              { name: "Parent", path: "/dashboard/parent" }
            ]}
          />

          {/* Students */}
          <SidebarGroup
            base="/students"
            icon={Users}
            label="Students"
            active={isActiveGroup("/students")}
            items={[
              { name: "Student List", path: "/students/list" },
              { name: "Add Student", path: "/students/add" },
              { name: "Transfer", path: "/students/transfer" }
            ]}
          />

          {/* Teachers */}
          <SidebarGroup
            base="/teachers"
            icon={UserCheck}
            label="Teachers"
            active={isActiveGroup("/teachers")}
            items={[
              { name: "Teacher List", path: "/teachers/list" },
              { name: "Add Teacher", path: "/teachers/add" },
              { name: "Allocation", path: "/teachers/allocation" }
            ]}
          />

          {/* Classes */}
          <SidebarGroup
            base="/classes"
            icon={ClipboardList}
            label="Classes"
            active={isActiveGroup("/classes")}
            items={[
              { name: "Class List", path: "/classes/list" },
              { name: "Add Class", path: "/classes/add" }
            ]}
          />

          {/* Subjects */}
          <SidebarGroup
            base="/subjects"
            icon={Book}
            label="Subjects"
            active={isActiveGroup("/subjects")}
            items={[
              { name: "Subject List", path: "/subjects/list" },
              { name: "Add Subject", path: "/subjects/add" }
            ]}
          />

          {/* Syllabus */}
          <SidebarGroup
            base="/syllabus"
            icon={BookOpen}
            label="Syllabus"
            active={isActiveGroup("/syllabus")}
            items={[
              { name: "Syllabus List", path: "/syllabus/list" },
              { name: "Add Syllabus", path: "/syllabus/add" }
            ]}
          />

          {/* Exams */}
          <SidebarGroup
            base="/exams"
            icon={Calendar}
            label="Exams"
            active={isActiveGroup("/exams")}
            items={[
              { name: "Exam Schedule", path: "/exams/schedule" },
              { name: "Exam Results", path: "/exams/results" },
              { name: "AI Exam Generator", path: "/exams/ai-generator" }
            ]}
          />

          {/* Fees */}
          <SidebarGroup
            base="/fees"
            icon={DollarSign}
            label="Fees"
            active={isActiveGroup("/fees")}
            items={[
              { name: "Fee Structure", path: "/fees/structure" },
              { name: "Fee Submission", path: "/fees/submission" },
              { name: "Fee Voucher", path: "/fees/voucher" },
              { name: "AI Fee Prediction", path: "/fees/ai-prediction" }
            ]}
          />

          {/* Admissions */}
          <SidebarGroup
            base="/admissions"
            icon={User}
            label="Admissions"
            active={isActiveGroup("/admissions")}
            items={[{ name: "Admission Form", path: "/admissions/add" }]}
          />

          {/* School */}
          <SidebarGroup
            base="/school"
            icon={Award}
            label="School"
            active={isActiveGroup("/school")}
            items={[
              { name: "School Registration", path: "/school/registration" },
              { name: "Admin Staff", path: "/school/admin-staff" }
            ]}
          />
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}
    </>
  );
}

/* ---------------- Sidebar Components ---------------- */

function SidebarLink({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 transition-colors hover:bg-gray-800 ${
          isActive ? "bg-gray-800" : ""
        }`
      }
    >
      <Icon size={18} className="text-esyellow" />
      <span>{label}</span>
    </NavLink>
  );
}

function SidebarGroup({ base, icon: Icon, label, items, active }) {
  const [open, setOpen] = useState(active);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-800"
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className="text-esyellow" />
          <span>{label}</span>
        </div>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {open && (
        <div className="ml-6 mt-1 flex flex-col max-h-60 overflow-y-auto">
          {items.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `p-2 text-sm rounded transition-colors hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
