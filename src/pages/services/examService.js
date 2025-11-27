// src/services/examService.js
import { getDatabase, ref, set, push, remove, update, get, child } from "firebase/database";
import  app  from "../../firebase/config";

const db = getDatabase(app);
const examRef = ref(db, "exams");

export const examService = {
  getAllExams: async () => {
    const snapshot = await get(examRef);
    const data = snapshot.val() || {};
    return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
  },
  addExam: async (exam) => {
    const newRef = push(examRef);
    await set(newRef, exam);
    return { id: newRef.key, ...exam };
  },
  updateExam: async (id, exam) => {
    const updateRef = ref(db, `exams/${id}`);
    await update(updateRef, exam);
    return { id, ...exam };
  },
  deleteExam: async (id) => {
    const delRef = ref(db, `exams/${id}`);
    await remove(delRef);
  },
};
