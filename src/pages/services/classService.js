// src/pages/services/classService.js
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import app from "../../firebase/config";

const db = getDatabase(app);

export const classService = {
  addClass: async (classData) => {
    try {
      const classRef = ref(db, "classes");
      const newClassRef = push(classRef);
      await set(newClassRef, classData);
      return { id: newClassRef.key, ...classData };
    } catch (error) {
      console.error("Error adding class:", error);
      throw error;
    }
  },

  fetchClasses: (callback) => {
    try {
      const classRef = ref(db, "classes");
      onValue(classRef, (snapshot) => {
        const data = snapshot.val() || {};
        const classList = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        callback(classList);
      });
    } catch (error) {
      console.error("Error fetching classes:", error);
      callback([]);
    }
  },
};

// Promise-based function for Redux async/await
export const fetchClassesService = async () => {
  return new Promise((resolve) => {
    classService.fetchClasses((data) => resolve(data));
  });
};
