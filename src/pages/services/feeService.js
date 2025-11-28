// src/services/feeService.js
import { ref, push, set, onValue, remove, update } from "firebase/database";
import { db } from "../../firebase/config"; 

export const feeService = {
  getAllFees: () =>
    new Promise((resolve, reject) => {
      const feesRef = ref(db, "fees"); // use db directly
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
    const feesRef = ref(db, "fees");
    const newRef = push(feesRef);
    await set(newRef, fee);
    return { id: newRef.key, ...fee };
  },

  updateFee: async (id, fee) => {
    const feeRef = ref(db, `fees/${id}`);
    await update(feeRef, fee);
    return { id, ...fee };
  },

  deleteFee: async (id) => {
    const feeRef = ref(db, `fees/${id}`);
    await remove(feeRef);
    return id;
  },
};
