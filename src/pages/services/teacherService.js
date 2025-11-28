import { getDatabase, ref, push, set, update, remove, onValue } from "firebase/database";
import app from "../../firebase/config";

const db = getDatabase(app);

export const teacherService = {
  fetchTeachers: async () => {
    const teachersRef = ref(db, "teachers");
    return new Promise((resolve, reject) => {
      onValue(
        teachersRef,
        (snapshot) => {
          const data = snapshot.val() || {};
          const teachersList = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
          resolve(teachersList);
        },
        (error) => reject(error)
      );
    });
  },

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

  updateTeacher: async (id, teacherData) => {
    try {
      const teacherRef = ref(db, `teachers/${id}`);
      await update(teacherRef, teacherData);
    } catch (error) {
      console.error("Error updating teacher:", error);
      throw error;
    }
  },

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

// Redux-friendly promise-based exports
export const fetchTeachersService = async () => {
  return await teacherService.fetchTeachers();
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
