import { DocumentData } from "firebase/firestore";





export type SessionDto = {
    name: string,
    start: number,
    end: number,
}


type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type WeekDto = {
    [day: string]: SessionDto[],
    monday: SessionDto[],
    tuesday: SessionDto[],
    wednesday: SessionDto[],
    thursday: SessionDto[],
    friday: SessionDto[],
    saturday: SessionDto[],
    sunday: SessionDto[],
}

export type WorkoutDto = {
    ownerId: string;
    name: string;
    img: string;
    weeks: Array<WeekDto>;

}
