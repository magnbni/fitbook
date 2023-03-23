import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, getDoc, getDocs, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";


import { WorkoutDto , WeekDto, SessionDto} from "../../types/workouts"


const days = ["Monday", "Tuesday", "Wednesday", "Thursday" ,"Friday", "Saturday", "Sunday"];
const emptyWeek: WeekDto = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  }

export const WorkoutApi = {

  

  getAllWorkouts: async function (username: string): Promise<WorkoutDto[]> {

  

    const workouts: WorkoutDto[] = [];
    const userDocRef = doc(db, "users", username);
    const workoutColRef = collection(userDocRef, "workouts");
    const querySnapshot = await getDocs(workoutColRef);
    for (const doc of querySnapshot.docs) {
      try {
        const data = doc.data();
        const workout: WorkoutDto = {
          workoutId: doc.id,
          ownerId: data.ownerId,
          name: data.name,
          img: data.img,
          weeks: {}
        }
        const weeksRef = collection(doc.ref, "weeks");
        const weeksQuerySnapshot = await getDocs(weeksRef);
        for (const weekDoc of weeksQuerySnapshot.docs) {
          const week: Record<string, any> = {}
         
          const weekData = weekDoc.data()
          
          week["monday"] = weekData.monday;
          week["tuesday"] = weekData.tuesday;
          week["wednesday"] = weekData.wednesday;
          week["thursday"] = weekData.thursday;
          week["friday"] = weekData.friday;
          week["saturday"] = weekData.saturday;
          week["sunday"] = weekData.sunday;


          workout.weeks[weekDoc.id] = (week as WeekDto);
        }
        workouts.push(workout);
      } catch (error) {
        console.error(error);
      }
    }
    return workouts;
  },

  addWorkout: async function(username: string, name: string, img?: string ): Promise<string[] | null> {
    
    let image = img ?? "/workout.jpg";
 
    const emptyWorkout = {
      ownerId: username,
      name: name,
      img: image,
    }


    const userDocRef = doc(db, "users", username);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const workoutsColRef = collection(userDocRef, "workouts");
      const newWorkoutRef = await addDoc(workoutsColRef, emptyWorkout)
      const workoutDocRef = doc(userDocRef, "workouts", newWorkoutRef.id )
      const weekColRef = collection(workoutDocRef, "weeks");
      const docRef = await addDoc(weekColRef, emptyWeek)

      return [workoutDocRef.id, image,docRef.id]
      
    }

    else {
      return null
    }
    
    
  },

  addWeek:  async function(username: string, workoutID:  string): Promise<string | null> {
    console.log(username," - ", workoutID)
    const userDocRef = doc(db, "users", username);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {

      const workoutDocRef = doc(userDocRef, "workouts", workoutID )
      const weekColRef = collection(workoutDocRef, "weeks");
      const weekQuerySnapshot = await getDocs(weekColRef);
      let highestWeekId = 0;
      weekQuerySnapshot.forEach((doc) => {
        const weekId = parseInt(doc.id);
        if (weekId > highestWeekId) {
          highestWeekId = weekId;
        }
      });

       const newWeekId = (highestWeekId + 1).toString();
      const newWeekRef = doc(weekColRef, newWeekId);
      await setDoc(newWeekRef, emptyWeek);
      return newWeekRef.id
    } else {
      return null
    }
    
    
  },

   deleteWeek:  async function(username: string, workoutID:  string, weekID: string,){
    console.log(username," - ", workoutID)
    const userDocRef = doc(db, "users", username);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists()) {

      const workoutDocRef = doc(userDocRef, "workouts", workoutID )
      const weekDocRef = await deleteDoc(doc(workoutDocRef, "weeks", weekID))
    }
    
    
  },

  addSessionToWorkout:  async function(username: string, workoutID: string, sessionID: string, weekID: string, day: string , start: string, end: string) { 
    const userDocRef = doc(db, "users", username);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const workoutDocRef = doc(userDocRef, "workouts", workoutID)
      const weekDocRef = doc(workoutDocRef, "weeks", weekID); 

      const weekDocSnap = await getDoc(weekDocRef);
      if (weekDocSnap.exists()) {
        const weekData = weekDocSnap.data();
        const dayArray = weekData[day] || []; 
        const updatedDayArray = [...dayArray, {start, end, sessionID}]; 
        await updateDoc(weekDocRef, { [day]: updatedDayArray });
      }
    }
  },
  

};