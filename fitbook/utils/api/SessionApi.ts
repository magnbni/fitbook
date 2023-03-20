import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";


import {  ExcersiseDto, SessionDto} from "../../types/workouts"


const days = ["Monday", "Tuesday", "Wednesday", "Thursday" ,"Friday", "Saturday", "Sunday"];


export const SessionApi = {

  
  getAllSessions: async function (username: string): Promise<Record<string, SessionDto>> {
    const sessions:  Record<string, SessionDto> = {}
    const userDocRef = doc(db, "users", username);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const sessionsColRef = collection(userDocRef, "sessions");
      const querySnapshot = await getDocs(sessionsColRef);

      for (const doc of querySnapshot.docs) {
        try {
          const data = doc.data();
          const session: SessionDto = {
            sessionID: doc.id,
            name: data.name,
            img: data.img,
            excersise: {}
          }

          const excersiseRef = collection(doc.ref, "excersise");
          const excersiseQuerySnapshot = await getDocs(excersiseRef);

          for (const excersiseDoc of excersiseQuerySnapshot.docs) {

            const excersiseData = excersiseDoc.data();
            const excersise = {
              name: excersiseData.name,
              reps: excersiseData.reps,
            }

            session.excersise[excersiseDoc.id] = excersise
          
          }

            sessions[doc.id] = session


          } catch (error) {
            console.error(error);
          }
      } 

    }

    return sessions;
    
  }, 



  createSession: async function(username: string, name: string, img?: string ) {
    
    let image = img ?? "/session.jpg";

    const emptySession = {
      name: name,
      img: image,
    }
    const userDocRef = doc(db, "users", username);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const sessionsColRef = collection(userDocRef, "sessions");
      const newWorkoutRef = await addDoc(sessionsColRef, emptySession)
      
    }
    
  },

  addExcersise: async function(username: string, session: string, name: string , reps: string) { 

    const userDocRef = doc(db, "users", username);
    const userDocSnap = await getDoc(userDocRef);

    const ovelse: ExcersiseDto= {
      name: name,
      reps: reps,
    }

    if (userDocSnap.exists()) {
      const sessionsDocRef = doc(userDocRef, "sessions", session);
      const excersiseColRef = collection(sessionsDocRef, "excersise")
      const newExcersise = await addDoc(excersiseColRef, ovelse)
    
      return newExcersise.id
    }
  }


};