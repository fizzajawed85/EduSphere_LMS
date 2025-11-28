// src/pages/services/studentService.js
import { getDatabase, ref, push, set, onValue, update } from "firebase/database";
import app from "../../firebase/config";

const db = getDatabase(app);

// Add student
export const addStudentToDB = async (studentData) => {
  const studentsRef = ref(db, "students");
  const newStudentRef = push(studentsRef);
  await set(newStudentRef, studentData);
  return { id: newStudentRef.key, ...studentData };
};

// Fetch all students with real-time updates
export const fetchStudentsFromDB = (callback) => {
  const studentsRef = ref(db, "students");
  onValue(studentsRef, (snapshot) => {
    const data = snapshot.val();
    const studentsArray = data
      ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
      : [];
    callback(studentsArray);
  });
};

// Update student (for transfer)
export const updateStudentClass = async (studentId, newClass) => {
  const studentRef = ref(db, `students/${studentId}`);
  await update(studentRef, { className: newClass });
};

export const studentService = {
  addStudent: addStudentToDB,
  fetchStudents: fetchStudentsFromDB,
  updateStudentClass,
};
