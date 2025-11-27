import React from "react";
import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import DataTable from "../../components/tables/DataTable";

const ParentDashboard = () => {
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256; // Sidebar width in px

  const cards = [
    { title: "Child Attendance", value: "90%", color: "bg-esyellow" },
    { title: "Subjects Enrolled", value: 6, color: "bg-esorange" },
    { title: "Pending Fees", value: "$200", color: "bg-esyellow" },
    { title: "Notifications", value: 5, color: "bg-esorange" },
  ];

  const childMarks = [
    { subject: "Math", marks: 82 },
    { subject: "Science", marks: 76 },
    { subject: "English", marks: 88 },
    { subject: "History", marks: 80 },
  ];

  const feeStatus = [
    { name: "Paid", value: 60 },
    { name: "Pending", value: 40 },
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
          <h1 className="text-3xl font-bold mb-4">Parent Dashboard</h1>

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
            {/* Child Marks Line Chart */}
            <div className="p-4 bg-white dark:bg-es1b1922 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Child Marks</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={childMarks}>
                  <XAxis dataKey="subject" stroke={theme === "dark" ? "#fff" : "#000"} />
                  <YAxis stroke={theme === "dark" ? "#fff" : "#000"} />
                  <Tooltip />
                  <Line type="monotone" dataKey="marks" stroke="#ffc001" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Fee Status Pie Chart */}
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

          {/* Recent Notifications Table */}
          <div className="bg-white dark:bg-es1b1922 p-4 rounded-lg shadow mt-6">
            <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
            <DataTable sliceName="ai" /> {/* ai slice for notifications */}
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

export default ParentDashboard;
