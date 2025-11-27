import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExams, addExam, updateExam, deleteExam } from "../../redux/slices/examSlice";
import { examService } from "../../pages/services/examService";
import InputField from "../../components/forms/InputField";
import DatePicker from "../../components/forms/DatePicker";
import SelectField from "../../components/forms/SelectField";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import IconButton from "../../components/buttons/IconButton";
import { FaEdit, FaTrash } from "react-icons/fa";

const ExamSchedule = () => {
  const dispatch = useDispatch();
  const { examList } = useSelector((state) => state.exam);
  const theme = useSelector(state => state.theme.mode);

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

  return (
    <div className={`p-4 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6">Exam Schedule</h1>
      
      <form className="mb-6 p-4 rounded shadow-md" onSubmit={handleSubmit}>
        <InputField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <InputField label="Class Name" value={className} onChange={(e) => setClassName(e.target.value)} required />
        <InputField label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        <DatePicker label="Exam Date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <PrimaryButton type="submit">{editing ? "Update Exam" : "Add Exam"}</PrimaryButton>
      </form>

      <table className="w-full border-collapse shadow-md">
        <thead className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200"}`}>
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Class</th>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {examList.map((exam) => (
            <tr key={exam.id} className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} border-b`}>
              <td className="p-3">{exam.title}</td>
              <td className="p-3">{exam.className}</td>
              <td className="p-3">{exam.subject}</td>
              <td className="p-3">{exam.date}</td>
              <td className="p-3 flex gap-2">
                <IconButton onClick={() => handleEdit(exam)}><FaEdit /></IconButton>
                <IconButton onClick={() => handleDelete(exam.id)}><FaTrash /></IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamSchedule;
