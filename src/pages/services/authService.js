// authService.js
import { auth, googleProvider, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";

/**
 * Auth helpers using Firebase Auth + Realtime DB to store minimal user profile
 */

export async function registerWithEmail({ email, password, username, role }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const user = cred.user;
  // save profile in Realtime DB under /users/{uid}
  const userRef = ref(db, `users/${user.uid}`);
  await set(userRef, {
    uid: user.uid,
    email,
    username: username || "",
    role: role || "student",
    createdAt: new Date().toISOString(),
  });
  // set displayName
  await updateProfile(user, { displayName: username || "" });
  return user;
}

export async function loginWithEmail({ email, password }) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function loginWithGoogle() {
  const res = await signInWithPopup(auth, googleProvider);
  // ensure user node exists in RTDB (upsert)
  const user = res.user;
  const userRef = ref(db, `users/${user.uid}`);
  await set(userRef, {
    uid: user.uid,
    email: user.email,
    username: user.displayName || "",
    role: "student",
    lastLogin: new Date().toISOString(),
  });
  return user;
}

export async function logout() {
  await signOut(auth);
  return true;
}

export async function sendReset(email) {
  await sendPasswordResetEmail(auth, email);
  return true;
}

export async function confirmResetPassword(oobCode, newPassword) {
  await confirmPasswordReset(auth, oobCode, newPassword);
  return true;
}
