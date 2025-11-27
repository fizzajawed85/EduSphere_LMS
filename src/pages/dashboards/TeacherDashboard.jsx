import React from "react";
import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, ResponsiveContainer } from "recharts";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import DataTable from "../../components/tables/DataTable";

const TeacherDashboard = () => {
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256; // Sidebar width in px

  const cards = [
    { title: "Assigned Classes", value: 5, color: "bg-esyellow" },
    { title: "Total Students", value: 120, color: "bg-esorange" },
    { title: "Pending Exams", value: 3, color: "bg-esyellow" },
    { title: "Notifications", value: 7, color: "bg-esorange" },
  ];

  const attendanceData = [
    { day: "Mon", attendance: 90 },
    { day: "Tue", attendance: 85 },
    { day: "Wed", attendance: 88 },
    { day: "Thu", attendance: 92 },
    { day: "Fri", attendance: 87 },
  ];

  const marksPerClass = [
    { class: "Class 1", marks: 75 },
    { class: "Class 2", marks: 82 },
    { class: "Class 3", marks: 78 },
    { class: "Class 4", marks: 85 },
  ];

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
          <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>

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
            {/* Student Attendance */}
            <div className="p-4 bg-white dark:bg-es1b1922 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Student Attendance</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={attendanceData}>
                  <XAxis dataKey="day" stroke={theme === "dark" ? "#fff" : "#000"} />
                  <YAxis stroke={theme === "dark" ? "#fff" : "#000"} />
                  <Tooltip />
                  <Line type="monotone" dataKey="attendance" stroke="#ffc001" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Marks per Class */}
            <div className="p-4 bg-white dark:bg-es1b1922 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Marks per Class</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={marksPerClass}>
                  <XAxis dataKey="class" stroke={theme === "dark" ? "#fff" : "#000"} />
                  <YAxis stroke={theme === "dark" ? "#fff" : "#000"} />
                  <Tooltip />
                  <Bar dataKey="marks" fill="#ec910d" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upcoming Exams Table */}
          <div className="bg-white dark:bg-es1b1922 p-4 rounded-lg shadow mt-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Exams</h2>
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

export default TeacherDashboard;
