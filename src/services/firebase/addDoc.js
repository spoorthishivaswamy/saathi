import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function addDocument(json) {
  try {
    const docRef = await setDoc(
      doc(db, "goal", "goal" + Math.random() * 100),
      json
    );
    console.log("Document written");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


