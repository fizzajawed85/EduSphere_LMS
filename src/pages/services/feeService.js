// src/services/feeService.js
import { getDatabase, ref, push, set, onValue, remove, update } from "firebase/database";
import { db } from "../../firebase/config"; // make sure your firebase config exports 'db'

const feesRef = ref(getDatabase(db), "fees");

export const feeService = {
  getAllFees: () =>
    new Promise((resolve, reject) => {
      onValue(
        feesRef,
        (snapshot) => {
          const data = snapshot.val();
          const feesArray = data
            ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
            : [];
          resolve(feesArray);
        },
        (error) => reject(error)
      );
    }),

  addFee: async (fee) => {
    const newRef = push(feesRef);
    await set(newRef, fee);
    return { id: newRef.key, ...fee };
  },

  updateFee: async (id, fee) => {
    const feeRef = ref(getDatabase(db), `fees/${id}`);
    await update(feeRef, fee);
    return { id, ...fee };
  },

  deleteFee: async (id) => {
    const feeRef = ref(getDatabase(db), `fees/${id}`);
    await remove(feeRef);
    return id;
  },
};
