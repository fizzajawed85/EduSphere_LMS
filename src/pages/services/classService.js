import { getDatabase, ref, push, set, update, onValue, remove } from "firebase/database";
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

  updateClass: async (id, classData) => {
    try {
      const classRef = ref(db, `classes/${id}`);
      await update(classRef, classData);
    } catch (error) {
      console.error("Error updating class:", error);
      throw error;
    }
  },

  deleteClass: async (id) => {
    try {
      const classRef = ref(db, `classes/${id}`);
      await remove(classRef);
    } catch (error) {
      console.error("Error deleting class:", error);
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

// Promise-based named export for async/await in slice
export const fetchClassesService = async () => {
  let classesArray = [];
  await new Promise((resolve) => {
    classService.fetchClasses((data) => {
      classesArray = data;
      resolve();
    });
  });
  return classesArray;
};
