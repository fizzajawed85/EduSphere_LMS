import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import DataTable from "../../components/tables/DataTable";

const SuperAdminDashboard = () => {
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256; // Desktop sidebar width
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const cards = [
    { title: "Total Schools", value: 15, color: "bg-esyellow" },
    { title: "Total Admins", value: 5, color: "bg-esorange" },
    { title: "Total Teachers", value: 120, color: "bg-esyellow" },
    { title: "Pending Approvals", value: 8, color: "bg-esorange" },
  ];

  const teachersPerSchool = [
    { school: "School A", teachers: 20 },
    { school: "School B", teachers: 25 },
    { school: "School C", teachers: 18 },
  ];

  const pendingApprovals = [
    { name: "Approved", value: 70 },
    { name: "Pending", value: 30 },
  ];

  const COLORS = ["#ffc001", "#ec910d"];

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full z-40 transition-transform duration-300 
                        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-64`}>
        <Sidebar />
      </div>

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col md:ml-64">
        
        {/* Navbar */}
        <div className="fixed top-0 left-0 z-30 w-full" style={{ marginLeft: `0` }}>
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>

        {/* Main content */}
        <main className="flex-1 flex flex-col px-6 pt-20">
          <h1 className="text-3xl font-bold mb-4">Super Admin Dashboard</h1>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {cards.map((card, idx) => (
              <div key={idx} className={`p-4 rounded-lg shadow ${card.color}`}>
                <h2 className="text-lg font-semibold">{card.title}</h2>
                <p className="text-2xl font-bold mt-2">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-4 bg-white dark:bg-es1b1922 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Teachers per School</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={teachersPerSchool}>
                  <XAxis dataKey="school" stroke={theme === "dark" ? "#fff" : "#000"} />
                  <YAxis stroke={theme === "dark" ? "#fff" : "#000"} />
                  <Tooltip />
                  <Bar dataKey="teachers" fill="#ffc001" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-4 bg-white dark:bg-es1b1922 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pendingApprovals}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {pendingApprovals.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Admin Table */}
          <div className="bg-white dark:bg-es1b1922 p-4 rounded-lg shadow mt-6">
            <h2 className="text-xl font-semibold mb-4">Recent Admin Registrations</h2>
            <DataTable sliceName="auth" />
          </div>
        </main>

        {/* Footer */}
        <Footer style={{
          marginLeft: sidebarWidth,
          width: `calc(100% - ${sidebarWidth}px)`,
        }} />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
