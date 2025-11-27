// src/pages/subjects/SubjectList.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubjects, deleteSubject } from "../../redux/slices/subjectSlice";
import IconButton  from "../../components/buttons/IconButton";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const SubjectList = () => {
  const dispatch = useDispatch();
  const { subjects, loading } = useSelector((state) => state.subjects);
  const theme = useSelector((state) => state.theme.color);

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this subject?")) {
      dispatch(deleteSubject(id));
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className={`p-6 min-h-screen bg-${theme}-100`}>
      <h2 className={`text-2xl font-bold mb-4 text-${theme}-900`}>Subjects List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className={`bg-${theme}-200`}>
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Class</th>
              <th className="py-2 px-4 text-left">Teacher</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.length > 0 ? (
              subjects.map((subj) => (
                <tr key={subj.id} className="border-b">
                  <td className="py-2 px-4">{subj.name}</td>
                  <td className="py-2 px-4">{subj.className || "-"}</td>
                  <td className="py-2 px-4">{subj.teacherAssigned || "-"}</td>
                  <td className="py-2 px-4">{subj.description || "-"}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <IconButton icon={<FiEdit />} onClick={() => alert("Edit coming soon")} />
                    <IconButton icon={<FiTrash2 />} onClick={() => handleDelete(subj.id)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No subjects available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectList;
