import { addDoc, collection, doc, DocumentData, DocumentReference, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase";


import { WorkoutDto , WeekDto, SessionDto} from "../../types/workouts"


const days = ["Monday", "Tuesday", "Wednesday", "Thursday" ,"Friday", "Saturday", "Sunday"];


export const WorkoutApi = {

  

  getAllWorkouts: async function (username: string): Promise<WorkoutDto[]> {

    const getSession = async (weekDocRef: DocumentReference<DocumentData>, day: string) => {
          const sessions: SessionDto[] = [];
          const dayRef = collection(weekDocRef, day);
          const dayQuerySnapshot = await getDocs(dayRef);
          for (const sessionDoc of dayQuerySnapshot.docs) {
            const sessionData = sessionDoc.data();
            const session: SessionDto = {
              name: sessionData.name,
              start: sessionData.start,
              end: sessionData.end,
            };
            sessions.push(session)
          }
          return sessions
    }

    const workouts: WorkoutDto[] = [];
    const userDocRef = doc(db, "users", username);
    const workoutColRef = collection(userDocRef, "workouts");
    const querySnapshot = await getDocs(workoutColRef);
    for (const doc of querySnapshot.docs) {
      try {
        const data = doc.data();
        const workout: WorkoutDto = {
          ownerId: data.username,
          name: data.name,
          img: data.img,
          weeks: []
        }
        const weeksRef = collection(doc.ref, "weeks");
        const weeksQuerySnapshot = await getDocs(weeksRef);
        for (const weekDoc of weeksQuerySnapshot.docs) {
          const week: Record<string, any> = {}
         
        

          for (const day of days) {
            getSession(weekDoc.ref,day).then((res) => {
              week[day.toLowerCase()]=res
            }).catch((err) => console.log(err))
          }
          console.log(week)

          workout.weeks.push(week as WeekDto);
        }
        workouts.push(workout);
      } catch (error) {
        console.error(error);
      }
    }
    return workouts;
  },
  addWorkout: async function(username: string, name: string, img?: "string" ) {
    
    let image = img ?? "/workout.jpg";
    const emptyWeek: WeekDto = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    }
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
      await addDoc(weekColRef, emptyWeek)
    }
    
  },
  getAllSessions: async function (username: string): Promise<SessionDto[]> {
    const getSession = async (weekDocRef: DocumentReference<DocumentData>, day: string) => {
          const sessionsInDay: SessionDto[] = [];
          const dayRef = collection(weekDocRef, day);
          
          const dayQuerySnapshot = await getDocs(dayRef);
          for (const dayDoc of dayQuerySnapshot.docs) {
            const dayData = dayDoc.data();
            if (dayData.name && dayData.start && dayData.end) {
              const session: SessionDto = {
                name: dayData.name,
                start: dayData.start,
                end: dayData.end,
              };
              sessions.push(session);
            }
          }
      return sessionsInDay;
    } 

    let sessions: SessionDto[] = [];
    const userDocRef = doc(db, "users", username);
    const workoutColRef = collection(userDocRef, "workouts");
    const querySnapshot = await getDocs(workoutColRef);
    for (const doc of querySnapshot.docs) {
      try { 
        const weeksRef = collection(doc.ref, "weeks");
        const weeksQuerySnapshot = await getDocs(weeksRef);
        for (const weekDoc of weeksQuerySnapshot.docs) {
          
          for (const day of days) {
            getSession(weekDoc.ref,day).then( (res) => {
              sessions = [...sessions, ...res];
              }).catch((err) => console.log(err))
          }      
          
        }
      } catch (error) {
        console.error(error);
      }
    }
    return sessions;
  }


};