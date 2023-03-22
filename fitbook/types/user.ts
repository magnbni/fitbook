import { Workout } from "./workouts";


export interface User {
    username: string,
    password: string,
    img: string,
    active: string;
    workouts: Array<Workout>,
    followers: Array<UserPublic>
    follows: Array<UserPublic>
    
}

export interface UserPublic {
    username: string,
    img: string,
}