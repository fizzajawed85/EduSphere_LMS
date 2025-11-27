// src/services/syllabusService.js
import { getDatabase, ref, set, push, remove, get, child } from "firebase/database";
import app from "../../firebase/config"; // Firebase config import

const db = getDatabase(app);
const syllabusRef = ref(db, "syllabus");

export const syllabusService = {
  // Fetch all syllabus
  getAllSyllabus: async () => {
    const snapshot = await get(syllabusRef);
    const data = snapshot.val() || {};
    return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
  },

  // Add new syllabus
  addSyllabus: async (syllabusData) => {
    const newRef = push(syllabusRef);
    await set(newRef, syllabusData);
    return { id: newRef.key, ...syllabusData };
  },

  // Update syllabus
  updateSyllabus: async (id, syllabusData) => {
    const updateRef = ref(db, `syllabus/${id}`);
    await set(updateRef, syllabusData);
    return { id, ...syllabusData };
  },

  // Delete syllabus
  deleteSyllabus: async (id) => {
    const deleteRef = ref(db, `syllabus/${id}`);
    await remove(deleteRef);
  },
};
