// src/services/feeService.js
import { getDatabase, ref, push, set, onValue, remove, update } from "firebase/database";
import { db } from "../../firebase/config";

export const feeService = {
  getAllFees: async () => {
    const snapshot = await new Promise((resolve) => {
      const feesRef = ref(db, "fees");
      onValue(feesRef, (snap) => resolve(snap.val() || []), { onlyOnce: true });
    });
    return Object.keys(snapshot || {}).map(key => ({ id: key, ...snapshot[key] }));
  },

  addFee: async (fee) => {
    const feesRef = ref(db, "fees");
    const newFeeRef = push(feesRef);
    await set(newFeeRef, fee);
    return { id: newFeeRef.key, ...fee };
  },

  updateFee: async (id, fee) => {
    const feeRef = ref(db, `fees/${id}`);
    await update(feeRef, fee);
    return { id, ...fee };
  },

  deleteFee: async (id) => {
    const feeRef = ref(db, `fees/${id}`);
    await remove(feeRef);
  },

  addSubmission: async (submission) => {
    const submissionsRef = ref(db, "feeSubmissions");
    const newRef = push(submissionsRef);
    await set(newRef, submission);
    return { id: newRef.key, ...submission };
  },

  addVoucher: async (voucher) => {
    const vouchersRef = ref(db, "feeVouchers");
    const newRef = push(vouchersRef);
    await set(newRef, voucher);
    return { id: newRef.key, ...voucher };
  },
};
