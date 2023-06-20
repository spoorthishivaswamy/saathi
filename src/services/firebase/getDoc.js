import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default async function getDocument() {
  try {
    let row = [];
    const docRef = collection(db, "goal");
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      //  doc.data() is never undefined for query doc snapshots
      let json = { id: doc.id, ...doc.data() };
      row.push(json);
    });
    return row;
  } catch (e) {}
}
