import { DocumentData, Timestamp } from "firebase/firestore";


export type ExcersiseDto = {
    name: string,
    reps: string,
    sets: string
}


export type SessionDto = {
    sessionID: string,
    name: string,
    img: string,
    excersise: Record<string,ExcersiseDto>
}



export type WeekDto = {
    [key: string]: {
      name: string;start: string, end: string, sessionID: string
}[];
   
}

export type WorkoutDto = {
    workoutId: string;
    ownerId: string;
    name: string;
    img: string;
    weeks: Record<string,WeekDto>;

}
