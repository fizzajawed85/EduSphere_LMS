// userService.js
import { db } from "../firebase/config";
import { ref, set, get, child, update } from "firebase/database";

/**
 * User profile CRUD in Realtime DB
 */

const rootRef = ref(db);

export async function getUser(uid) {
  const snap = await get(child(rootRef, `users/${uid}`));
  return snap.exists() ? snap.val() : null;
}

export async function updateUser(uid, payload) {
  const userRef = ref(db, `users/${uid}`);
  await update(userRef, { ...payload, updatedAt: new Date().toISOString() });
  const snap = await get(child(rootRef, `users/${uid}`));
  return snap.exists() ? snap.val() : null;
}

export async function setUserProfile(uid, profile) {
  const userRef = ref(db, `users/${uid}`);
  await set(userRef, { ...profile, updatedAt: new Date().toISOString() });
  const snap = await get(child(rootRef, `users/${uid}`));
  return snap.exists() ? snap.val() : null;
}
