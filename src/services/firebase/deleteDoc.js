import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function deleteDocument(id) {
  try {
    const docRef = doc(db, "goal", id);
    // deleteDoc(docRef);
    await updateDoc(docRef, {
      isDelete:true
    })
  } catch (e) {}
}
