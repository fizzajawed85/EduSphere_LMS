// src/pages/services/resultService.js
import { getDatabase, ref, set, push, remove, get } from "firebase/database";
import app from "../../firebase/config";

const db = getDatabase(app);
const resultRef = ref(db, "results"); // separate "results" node

export const resultService = {
  getAllResults: async () => {
    const snapshot = await get(resultRef);
    const data = snapshot.val() || {};
    return Object.keys(data).map(key => ({ id: key, ...data[key] }));
  },

  addResult: async (result) => {
    const newRef = push(resultRef);
    await set(newRef, result);
    return { id: newRef.key, ...result };
  },

  updateResult: async (id, result) => {
    const updateRef = ref(db, `results/${id}`);
    await set(updateRef, result);
    return { id, ...result };
  },

  deleteResult: async (id) => {
    const delRef = ref(db, `results/${id}`);
    await remove(delRef);
  },
};
