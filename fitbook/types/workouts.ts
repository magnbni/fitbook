import { DocumentData, Timestamp } from "firebase/firestore";


export type ExcersiseDto = {
    name: string,
    reps: number,
}


export type SessionDto = {
    name: string,
    img: string,
    excersise: ExcersiseDto[]
}



export type WeekDto = {
    [key: string]: {start: string, end: string, sessionID: string}[];
   
}

export type WorkoutDto = {
    workoutId: string;
    ownerId: string;
    name: string;
    img: string;
    weeks: Record<string,WeekDto>;

}
