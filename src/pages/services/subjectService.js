// src/services/subjectService.js
import { getDatabase, ref, push, onValue, remove, set } from "firebase/database";
import app  from "../../firebase/config";

const db = getDatabase(app);

export const subjectService = {
  // Fetch all subjects
  getAllSubjects: () => {
    return new Promise((resolve) => {
      const subjectRef = ref(db, "subjects");
      onValue(subjectRef, (snapshot) => {
        const data = snapshot.val();
        const list = [];
        for (let id in data) {
          list.push({ id, ...data[id] });
        }
        resolve(list);
      });
    });
  },

  // Add a new subject
  addSubject: async (subject) => {
    const subjectRef = ref(db, "subjects");
    const newSubRef = push(subjectRef);
    await set(newSubRef, subject);
    return { id: newSubRef.key, ...subject };
  },

  // Delete a subject
  deleteSubject: async (id) => {
    const subjectRef = ref(db, "subjects/" + id);
    await remove(subjectRef);
  }
};
