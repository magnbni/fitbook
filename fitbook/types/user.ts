import { Workout } from "./workouts";


export interface User {
    id: String,
    username: String,
    password: String,
    img: String,
    workouts: Array<Workout>,
    
}