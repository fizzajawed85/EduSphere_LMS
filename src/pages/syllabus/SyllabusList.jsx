// src/pages/syllabus/SyllabusList.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSyllabus, deleteSyllabus } from "../../redux/slices/syllabusSlice";
import { syllabusService } from "../../pages/services/syllabusService";
import SyllabusForm from "./SyllabusForm";
import IconButton from "../../components/buttons/IconButton";
import { FaEdit, FaTrash } from "react-icons/fa";

const SyllabusList = () => {
  const dispatch = useDispatch();

  const syllabusList = useSelector(
    (state) => state.syllabus.syllabusList || []
  );

  const theme = useSelector((state) => state.theme.theme);

  const [editing, setEditing] = useState(null);

  const loadSyllabus = async () => {
    try {
      const data = await syllabusService.getAllSyllabus();
      dispatch(fetchSyllabus(data));
    } catch (err) {
      console.error("Error fetching syllabus:", err);
    }
  };

  useEffect(() => {
    loadSyllabus();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this syllabus?")) {
      await syllabusService.deleteSyllabus(id);
      dispatch(deleteSyllabus(id));
    }
  };

  return (
    <div
      className={`p-4 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      <h1 className="text-3xl font-bold mb-6">Syllabus List</h1>

      <div className="mb-6">
        <SyllabusForm onClose={loadSyllabus} editData={editing} />
      </div>

      <table className="w-full border-collapse shadow-md">
        <thead
          className={`${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200"
          }`}
        >
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Class</th>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {syllabusList.map((syl) => (
            <tr
              key={syl.id}
              className={`${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              } border-b`}
            >
              <td className="p-3">{syl.title}</td>
              <td className="p-3">{syl.className}</td>
              <td className="p-3">{syl.subject}</td>
              <td className="p-3">{syl.description}</td>

              <td className="p-3 flex gap-2">
                <IconButton onClick={() => setEditing(syl)}>
                  <FaEdit />
                </IconButton>

                <IconButton onClick={() => handleDelete(syl.id)}>
                  <FaTrash />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SyllabusList;
