import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExams, addExam, updateExam, deleteExam } from "../../redux/slices/examSlice";
import { examService } from "../../pages/services/examService";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import IconButton from "../../components/buttons/IconButton";
import { FaEdit, FaTrash } from "react-icons/fa";

const ExamResult = () => {
  const dispatch = useDispatch();
  const { examList } = useSelector((state) => state.exam);
  const theme = useSelector(state => state.theme.mode);

  const [editing, setEditing] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [examId, setExamId] = useState("");
  const [marks, setMarks] = useState("");

  const loadExams = async () => {
    const data = await examService.getAllExams();
    dispatch(fetchExams(data));
  };

  useEffect(() => {
    loadExams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultData = { studentName, examId, marks };
    if (editing) {
      const updated = await examService.updateExam(editing.id, resultData);
      dispatch(updateExam(updated));
      setEditing(null);
    } else {
      const added = await examService.addExam(resultData);
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
      await examService.deleteExam(id);
      dispatch(deleteExam(id));
    }
  };

  return (
    <div className={`p-4 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6">Exam Results</h1>
      
      <form className="mb-6 p-4 rounded shadow-md" onSubmit={handleSubmit}>
        <InputField label="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
        <SelectField 
          label="Select Exam" 
          value={examId} 
          onChange={(e) => setExamId(e.target.value)} 
          options={examList.map(exam => ({ value: exam.id, label: exam.title }))} 
          required 
        />
        <InputField label="Marks" value={marks} onChange={(e) => setMarks(e.target.value)} type="number" required />
        <PrimaryButton type="submit">{editing ? "Update Result" : "Add Result"}</PrimaryButton>
      </form>

      <table className="w-full border-collapse shadow-md">
        <thead className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200"}`}>
          <tr>
            <th className="p-3 text-left">Student</th>
            <th className="p-3 text-left">Exam</th>
            <th className="p-3 text-left">Marks</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {examList.map((result) => (
            <tr key={result.id} className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} border-b`}>
              <td className="p-3">{result.studentName}</td>
              <td className="p-3">{examList.find(e => e.id === result.examId)?.title || "-"}</td>
              <td className="p-3">{result.marks}</td>
              <td className="p-3 flex gap-2">
                <IconButton onClick={() => handleEdit(result)}><FaEdit /></IconButton>
                <IconButton onClick={() => handleDelete(result.id)}><FaTrash /></IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamResult;
