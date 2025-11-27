import { ref, push, set, update, remove, onValue } from "firebase/database";
import { db } from "../../firebase/config";

export const getSchools = () =>
  new Promise((resolve) => {
    onValue(ref(db, "schools"), (snapshot) => {
      const data = snapshot.val();
      const list = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
      resolve(list);
    });
  });

export const addSchool = async (school) => {
  const newRef = push(ref(db, "schools"));
  await set(newRef, school);
  return { id: newRef.key, ...school };
};

export const updateSchool = async (id, school) => {
  await update(ref(db, `schools/${id}`), school);
  return { id, ...school };
};

export const deleteSchool = async (id) => {
  await remove(ref(db, `schools/${id}`));
};

export const getStaff = () =>
  new Promise((resolve) => {
    onValue(ref(db, "staff"), (snapshot) => {
      const data = snapshot.val();
      const list = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
      resolve(list);
    });
  });

export const addStaff = async (staff) => {
  const newRef = push(ref(db, "staff"));
  await set(newRef, staff);
  return { id: newRef.key, ...staff };
};

export const updateStaff = async (id, staff) => {
  await update(ref(db, `staff/${id}`), staff);
  return { id, ...staff };
};

export const deleteStaff = async (id) => {
  await remove(ref(db, `staff/${id}`));
};

export const getAdmins = () =>
  new Promise((resolve) => {
    onValue(ref(db, "admins"), (snapshot) => {
      const data = snapshot.val();
      const list = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
      resolve(list);
    });
  });

export const addAdmin = async (admin) => {
  const newRef = push(ref(db, "admins"));
  await set(newRef, admin);
  return { id: newRef.key, ...admin };
};

export const deleteAdmin = async (id) => {
  await remove(ref(db, `admins/${id}`));
};

