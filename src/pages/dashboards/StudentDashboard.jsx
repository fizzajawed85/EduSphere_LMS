import React from "react";
import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import DataTable from "../../components/tables/DataTable";

const StudentDashboard = () => {
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256; // Sidebar width in px

  const cards = [
    { title: "Attendance %", value: "92%", color: "bg-esyellow" },
    { title: "Subjects Enrolled", value: 8, color: "bg-esorange" },
    { title: "Upcoming Exams", value: 3, color: "bg-esyellow" },
    { title: "Pending Fees", value: "$150", color: "bg-esorange" },
  ];

  const marksProgress = [
    { subject: "Math", marks: 85 },
    { subject: "Science", marks: 78 },
    { subject: "English", marks: 92 },
    { subject: "History", marks: 88 },
    { subject: "Physics", marks: 80 },
  ];

  const feeStatus = [
    { name: "Paid", value: 70 },
    { name: "Pending", value: 30 },
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
        <main className="flex-1 flex flex-col px-6 pt-20 space-y-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>

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
            {/* Marks Progress */}
            <div className="p-4 bg-white dark:bg-es1b1922 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Marks Progress</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={marksProgress}>
                  <XAxis dataKey="subject" stroke={theme === "dark" ? "#fff" : "#000"} />
                  <YAxis stroke={theme === "dark" ? "#fff" : "#000"} />
                  <Tooltip />
                  <Line type="monotone" dataKey="marks" stroke="#ffc001" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Fee Status */}
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

          {/* Upcoming Assignments Table */}
          <div className="bg-white dark:bg-es1b1922 p-4 rounded-lg shadow mt-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Assignments</h2>
            <DataTable sliceName="exam" />
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

export default StudentDashboard;
