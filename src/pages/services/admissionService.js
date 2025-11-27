// src/services/admissionService.js
import { getDatabase, ref, push, set, onValue, update, remove } from "firebase/database";
import { db } from "../../firebase/config";

export const admissionService = {
  getAllAdmissions: async () => {
    const snapshot = await new Promise(resolve => {
      const admissionsRef = ref(db, "admissions");
      onValue(admissionsRef, (snap) => resolve(snap.val() || []), { onlyOnce: true });
    });
    return Object.keys(snapshot || {}).map(key => ({ id: key, ...snapshot[key] }));
  },

  addAdmission: async (admission) => {
    const admissionsRef = ref(db, "admissions");
    const newRef = push(admissionsRef);
    await set(newRef, admission);
    return { id: newRef.key, ...admission };
  },

  updateAdmission: async (id, admission) => {
    const admissionRef = ref(db, `admissions/${id}`);
    await update(admissionRef, admission);
    return { id, ...admission };
  },

  deleteAdmission: async (id) => {
    const admissionRef = ref(db, `admissions/${id}`);
    await remove(admissionRef);
  },
};
