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
import InputField from "../../components/forms/InputField";
import CustomSelect from "../../components/forms/SelectField";

// Result slice
import {
  fetchResultsThunk,
  addResultThunk,
  updateResultThunk,
  deleteResultThunk,
} from "../../redux/slices/resultSlice";
import { fetchExamsThunk } from "../../redux/slices/examSlice";

const ExamResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { examList = [] } = useSelector((state) => state.exam || {});
  const { resultList = [], loading = false } = useSelector(
    (state) => state.result || {}
  );
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [examId, setExamId] = useState("");
  const [marks, setMarks] = useState("");

  // Fetch exams and results
  useEffect(() => {
    dispatch(fetchExamsThunk());
    dispatch(fetchResultsThunk());
  }, [dispatch]);

  const resetForm = () => {
    setStudentName("");
    setExamId("");
    setMarks("");
    setEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentName || !examId || !marks) return;

    const resultData = { studentName, examId, marks };

    try {
      if (editing) {
        await dispatch(updateResultThunk({ id: editing.id, resultData })).unwrap();
      } else {
        await dispatch(addResultThunk(resultData)).unwrap();
      }
      resetForm();
    } catch (err) {
      console.error("Failed to save result:", err);
      alert("Error saving result. Check console.");
    }
  };

  const handleEdit = (result) => {
    setEditing(result);
    setStudentName(result.studentName);
    setExamId(result.examId);
    setMarks(result.marks);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this result?")) return;
    try {
      await dispatch(deleteResultThunk(id)).unwrap();
    } catch (err) {
      console.error("Failed to delete result:", err);
    }
  };

  const filteredResults = resultList.filter(
    (result) =>
      result?.examId &&
      `${result.studentName} ${examList.find((e) => e.id === result.examId)?.title || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"
      }`}
    >
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 z-40">
        <Sidebar />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        <div
          className="fixed top-0 left-0 w-full z-30"
          style={{ marginLeft: sidebarWidth, height: 64 }}
        >
          <Navbar />
        </div>

        <main className="flex-1 p-6 pt-20 overflow-auto">
          {/* Header */}
          <div
            className={`flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4 p-4 rounded-lg shadow ${
              theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"
            }`}
          >
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
              <PrimaryButton onClick={() => navigate("/exam-results/add")}>
                Add Result
              </PrimaryButton>
            </div>
          </div>

          {/* Form */}
          <div
            className={`p-4 rounded-lg shadow-md mb-6 ${
              theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"
            }`}
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Student Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
              <CustomSelect
                label="Select Exam"
                value={examId}
                onChange={(val) => setExamId(val)}
                options={examList.map((exam) => ({ value: exam.id, label: exam.title }))}
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

          {/* Table */}
          <div
            className={`p-4 rounded-lg shadow-md ${
              theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"
            }`}
          >
            <DataTable
              loading={loading}
              data={filteredResults}
              columns={[
                { label: "Student", field: "studentName" },
                {
                  label: "Exam",
                  field: "exam",
                  render: (result) => {
                    const exam = examList.find((e) => e.id === result?.examId);
                    return exam?.title || "-";
                  },
                },
                { label: "Marks", field: "marks" },
                {
                  label: "Actions",
                  field: "actions",
                  render: (result) => (
                    <div className="flex gap-2">
                      <PrimaryButton size="sm" onClick={() => handleEdit(result)}>
                        Edit
                      </PrimaryButton>
                      <PrimaryButton size="sm" variant="danger" onClick={() => handleDelete(result.id)}>
                        Delete
                      </PrimaryButton>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </main>

        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
};

export default ExamResult;
