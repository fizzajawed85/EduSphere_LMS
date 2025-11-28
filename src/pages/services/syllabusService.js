/// src/pages/services/syllabusService.js
import { getDatabase, ref, push, set, remove, get } from "firebase/database";
import app from "../../firebase/config"; // Firebase config

const db = getDatabase(app);
const syllabusRef = ref(db, "syllabus");

export const syllabusService = {
  getAllSyllabus: async () => {
    const snapshot = await get(syllabusRef);
    const data = snapshot.val() || {};
    return Object.keys(data).map(key => ({ id: key, ...data[key] }));
  },

  addSyllabus: async (data) => {
    const newRef = push(syllabusRef);
    await set(newRef, data);
    return { id: newRef.key, ...data };
  },

  updateSyllabus: async (id, data) => {
    const updateRef = ref(db, `syllabus/${id}`);
    await set(updateRef, data);
    return { id, ...data };
  },

  deleteSyllabus: async (id) => {
    const deleteRef = ref(db, `syllabus/${id}`);
    await remove(deleteRef);
  },
};
