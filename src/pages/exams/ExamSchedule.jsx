// src/pages/exam/ExamSchedule.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import DataTable from "../../components/tables/DataTable";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { Search } from "lucide-react";
import { fetchExams, addExam, updateExam, deleteExam } from "../../redux/slices/examSlice";
import { examService } from "../../pages/services/examService";

const ExamSchedule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { examList = [], loading = false } = useSelector((state) => state.exam || {});
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

  const [search, setSearch] = useState("");

  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState("");
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");

  const loadExams = async () => {
    const data = await examService.getAllExams();
    dispatch(fetchExams(data));
  };

  useEffect(() => {
    loadExams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const examData = { title, className, subject, date };

    if (editing) {
      const updated = await examService.updateExam(editing.id, examData);
      dispatch(updateExam(updated));
      setEditing(null);
    } else {
      const added = await examService.addExam(examData);
      dispatch(addExam(added));
    }
    setTitle(""); setClassName(""); setSubject(""); setDate("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this exam?")) {
      await examService.deleteExam(id);
      dispatch(deleteExam(id));
    }
  };

  const handleEdit = (exam) => {
    setEditing(exam);
    setTitle(exam.title);
    setClassName(exam.className);
    setSubject(exam.subject);
    setDate(exam.date);
  };

  const filteredExams = examList.filter((exam) =>
    `${exam.title} ${exam.className} ${exam.subject}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 z-40">
        <Sidebar />
      </div>

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        {/* Navbar */}
        <div className="fixed top-0 left-0 w-full z-30" style={{ marginLeft: sidebarWidth, height: 64 }}>
          <Navbar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 pt-20 overflow-auto">
          {/* Header: Search + Add */}
          <div className={`flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4 p-4 rounded-lg shadow ${
            theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"
          }`}>
            <h2 className="text-2xl font-bold">Exam Schedule</h2>

            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search exams..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-2 py-2 border rounded-md focus:outline-esblue focus:ring-1 focus:ring-esblue"
                />
              </div>

              <PrimaryButton onClick={() => navigate("/exams/add")}>Add Exam</PrimaryButton>
            </div>
          </div>

          {/* Form */}
          <div className={`p-4 rounded-lg shadow-md mb-6 ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded focus:outline-esblue focus:ring-1 focus:ring-esblue"
                required
              />
              <input
                type="text"
                placeholder="Class Name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full p-2 border rounded focus:outline-esblue focus:ring-1 focus:ring-esblue"
                required
              />
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border rounded focus:outline-esblue focus:ring-1 focus:ring-esblue"
                required
              />
              <input
                type="date"
                placeholder="Exam Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded focus:outline-esblue focus:ring-1 focus:ring-esblue"
                required
              />
              <div className="col-span-2">
                <PrimaryButton type="submit">{editing ? "Update Exam" : "Add Exam"}</PrimaryButton>
              </div>
            </form>
          </div>

          {/* Data Table */}
          <div className={`p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
            <DataTable
              loading={loading}
              data={filteredExams}
              columns={[
                { label: "Title", field: "title" },
                { label: "Class", field: "className" },
                { label: "Subject", field: "subject" },
                { label: "Date", field: "date" },
                {
                  label: "Actions",
                  field: "actions",
                  render: (exam) => (
                    <div className="flex gap-2">
                      <PrimaryButton size="sm" onClick={() => handleEdit(exam)}>Edit</PrimaryButton>
                      <PrimaryButton size="sm" variant="danger" onClick={() => handleDelete(exam.id)}>Delete</PrimaryButton>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </main>

        {/* Footer */}
        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
};

export default ExamSchedule;
