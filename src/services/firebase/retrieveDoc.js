import { collection, getDocs } from "@firebase/firestore";
import { db } from "../../firebase";

 export default async function getDoc (){
   let row = [];
   const docRef = collection(db, "goal");
   try {
     const querySnapshot = await getDocs(docRef);
     querySnapshot.forEach((doc) => {
       //  doc.data() is never undefined for query doc snapshots
       let json = doc.data();
       return json;
     });
   }catch(e){

   }
 };