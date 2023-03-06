


export interface Workout {
    name: String;
    img: String;
    week: Array<WorkoutDay>;

}

export interface WorkoutDay {
    day: string,
    sessions: Array<Session>,
}


export interface Session {
    name: String;
    img: String;
    start: Number;
    end: Number;
}