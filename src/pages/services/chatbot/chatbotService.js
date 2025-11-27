// chatbotService.js
import { db } from "../../firebase/config";
import { push, ref, get } from "firebase/database";

const chatsRef = ref(db, "chats");

export async function sendChatMessage(chatRoomId, messageObj) {
  // messageObj: { from, text, createdAt }
  const roomRef = ref(db, `chats/${chatRoomId}`);
  const newRef = await push(roomRef, messageObj);
  return { id: newRef.key, ...messageObj };
}

export async function getChatRoom(chatRoomId) {
  const snap = await get(ref(db, `chats/${chatRoomId}`));
  const data = snap.exists() ? snap.val() : {};
  return Object.keys(data).map(k => ({ id: k, ...data[k] }));
}
