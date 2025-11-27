import { getDatabase, ref, push, set, update, remove, onValue } from "firebase/database";
import app from "../../firebase/config";

const db = getDatabase(app);

export const teacherService = {
  // Fetch all teachers (callback style)
  fetchTeachers: (callback) => {
    try {
      const teachersRef = ref(db, "teachers");
      onValue(teachersRef, (snapshot) => {
        const data = snapshot.val() || {};
        const teachersList = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        callback(teachersList);
      });
    } catch (error) {
      console.error("Error fetching teachers:", error);
      callback([]);
    }
  },

  // Add new teacher
  addTeacher: async (teacherData) => {
    try {
      const teachersRef = ref(db, "teachers");
      const newTeacherRef = push(teachersRef);
      await set(newTeacherRef, teacherData);
      return { id: newTeacherRef.key, ...teacherData };
    } catch (error) {
      console.error("Error adding teacher:", error);
      throw error;
    }
  },

  // Update teacher by ID
  updateTeacher: async (id, teacherData) => {
    try {
      const teacherRef = ref(db, `teachers/${id}`);
      await update(teacherRef, teacherData);
    } catch (error) {
      console.error("Error updating teacher:", error);
      throw error;
    }
  },

  // Delete teacher by ID
  deleteTeacher: async (id) => {
    try {
      const teacherRef = ref(db, `teachers/${id}`);
      await remove(teacherRef);
    } catch (error) {
      console.error("Error deleting teacher:", error);
      throw error;
    }
  },
};

// Promise-based async helpers for Redux slices
export const fetchTeachersService = async () => {
  let teachersArray = [];
  await new Promise((resolve) => {
    teacherService.fetchTeachers((data) => {
      teachersArray = data;
      resolve();
    });
  });
  return teachersArray;
};

export const addTeacherService = async (teacher) => {
  return await teacherService.addTeacher(teacher);
};

export const updateTeacherService = async (id, data) => {
  return await teacherService.updateTeacher(id, data);
};

export const deleteTeacherService = async (id) => {
  return await teacherService.deleteTeacher(id);
};
