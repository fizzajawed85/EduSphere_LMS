import React from "react";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import DataTable from "../../components/tables/DataTable";

const AdminDashboard = () => {
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256; // Sidebar width in px

  const cards = [
    { title: "Total Students", value: 245, color: "bg-esyellow" },
    { title: "Total Teachers", value: 35, color: "bg-esorange" },
    { title: "Total Classes", value: 12, color: "bg-esyellow" },
    { title: "Pending Fees", value: 15, color: "bg-esorange" },
  ];

  const studentPerClass = [
    { class: "Class 1", students: 30 },
    { class: "Class 2", students: 28 },
    { class: "Class 3", students: 25 },
    { class: "Class 4", students: 32 },
    { class: "Class 5", students: 26 },
  ];

  const feeStatus = [
    { name: "Paid", value: 80 },
    { name: "Pending", value: 20 },
  ];

  const COLORS = ["#ffc001", "#ec910d"];

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
      
      {/* Sidebar fixed */}
      <div className="fixed top-0 left-0 h-full w-64 z-40">
        <Sidebar />
      </div>

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>

        {/* Navbar fixed */}
        <div className="fixed top-0 left-0 z-30 w-full" style={{ marginLeft: sidebarWidth, height: 64 }}>
          <Navbar />
        </div>

        {/* Main content */}
        <main className="flex-1 flex flex-col px-6 pt-20">
          <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

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
            {/* Bar Chart */}
            <div className="p-4 bg-white dark:bg-es1b1922 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Students per Class</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={studentPerClass}>
                  <XAxis dataKey="class" stroke={theme === "dark" ? "#fff" : "#000"} />
                  <YAxis stroke={theme === "dark" ? "#fff" : "#000"} />
                  <Tooltip />
                  <Bar dataKey="students" fill="#ffc001" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="p-4 bg-white dark:bg-es1b1922 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Fee Status</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={feeStatus}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {feeStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Students Table */}
          <div className="bg-white dark:bg-es1b1922 p-4 rounded-lg shadow mt-6">
            <h2 className="text-xl font-semibold mb-4">Recent Students</h2>
            <DataTable sliceName="student" />
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

export default AdminDashboard;
