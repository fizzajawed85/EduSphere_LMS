// aiService.js
import { db } from "../../firebase/config";
import { push, ref, get } from "firebase/database";

/**
 * For now we store AI requests in /aiRequests and return a simple mock reply.
 * Later you can replace this with a call to your backend which calls Gemini API.
 */

const aiRef = ref(db, "aiRequests");

export async function askAI(prompt) {
  const newRef = push(aiRef);
  const payload = {
    prompt,
    createdAt: new Date().toISOString(),
    reply: "This is a mock AI reply. Integrate backend for real AI.",
  };
  await push(aiRef, payload);
  return payload.reply;
}

export async function getAIRequests() {
  const snap = await get(aiRef);
  const data = snap.exists() ? snap.val() : {};
  return Object.keys(data).map(k => ({ id: k, ...data[k] }));
}
