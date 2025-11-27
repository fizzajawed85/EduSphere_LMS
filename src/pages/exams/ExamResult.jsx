// src/pages/exam/ExamResult.jsx
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
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";

const ExamResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { examList = [], loading = false } = useSelector((state) => state.exam || {});
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [examId, setExamId] = useState("");
  const [marks, setMarks] = useState("");

  const loadExams = async () => {
    const data = await fetchExams(); // make sure your service returns exam results
    dispatch(fetchExams(data));
  };

  useEffect(() => {
    loadExams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultData = { studentName, examId, marks };

    if (editing) {
      const updated = await updateExam(editing.id, resultData);
      dispatch(updateExam(updated));
      setEditing(null);
    } else {
      const added = await addExam(resultData);
      dispatch(addExam(added));
    }

    setStudentName(""); setExamId(""); setMarks("");
  };

  const handleEdit = (result) => {
    setEditing(result);
    setStudentName(result.studentName);
    setExamId(result.examId);
    setMarks(result.marks);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this result?")) {
      await deleteExam(id);
      dispatch(deleteExam(id));
    }
  };

  const filteredResults = examList.filter((result) =>
    `${result.studentName} ${examList.find(e => e.id === result.examId)?.title || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
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
            <h2 className="text-2xl font-bold">Exam Results</h2>

            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search results..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-2 py-2 border rounded-md focus:outline-esblue focus:ring-1 focus:ring-esblue"
                />
              </div>

              <PrimaryButton onClick={() => navigate("/exam-results/add")}>Add Result</PrimaryButton>
            </div>
          </div>

          {/* Form */}
          <div className={`p-4 rounded-lg shadow-md mb-6 ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Student Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
              <SelectField
                label="Select Exam"
                value={examId}
                onChange={(e) => setExamId(e.target.value)}
                options={examList.map(exam => ({ value: exam.id, label: exam.title }))}
                required
              />
              <InputField
                label="Marks"
                type="number"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                required
              />
              <div className="col-span-3">
                <PrimaryButton type="submit">{editing ? "Update Result" : "Add Result"}</PrimaryButton>
              </div>
            </form>
          </div>

          {/* Data Table */}
          <div className={`p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
            <DataTable
              loading={loading}
              data={filteredResults}
              columns={[
                { label: "Student", field: "studentName" },
                {
                  label: "Exam",
                  field: "exam",
                  render: (result) => examList.find(e => e.id === result.examId)?.title || "-"
                },
                { label: "Marks", field: "marks" },
                {
                  label: "Actions",
                  field: "actions",
                  render: (result) => (
                    <div className="flex gap-2">
                      <PrimaryButton size="sm" onClick={() => handleEdit(result)}>Edit</PrimaryButton>
                      <PrimaryButton size="sm" variant="danger" onClick={() => handleDelete(result.id)}>Delete</PrimaryButton>
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

export default ExamResult;
