// src/pages/services/studentService.js
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import app from "../../firebase/config";

const db = getDatabase(app);

// Add student
export const addStudentToDB = async (studentData) => {
  try {
    const studentsRef = ref(db, "students");
    const newStudentRef = push(studentsRef);
    await set(newStudentRef, studentData);
    return { success: true };
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

// Fetch all students
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

// ✅ Grouped export for easier imports
export const studentService = {
  addStudent: addStudentToDB,
  fetchStudents: fetchStudentsFromDB,
};
