"use client";

import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  Timestamp,
} from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import FitbookPostWithImage from "./FitbookPostWithImage";
import FitbookPostWorkout from "./FitbookPostWorkout";
import Post from "./Post";

export class Workout {
  name: string;
  timestampStart: Timestamp;
  timestampEnd: Timestamp;
  exercises: Array<Exercise>;

  constructor(
    name: string,
    timestampStart: Timestamp,
    timestampEnd: Timestamp,
    exercises: Array<Exercise>
  ) {
    this.name = name;
    this.timestampStart = timestampStart;
    this.timestampEnd = timestampEnd;
    this.exercises = exercises;
  }
}

export class Exercise {
  name: string;
  repetition: number;
  sets: number;

  constructor(name: string, repetition: number, sets: number) {
    this.name = name;
    this.repetition = repetition;
    this.sets = sets;
  }
}

function MainFeed() {

  class ImagePost {
    id: string;
    type: string;
    username: string;
    profilepic: string;
    postText: string;
    postPicture: string;
    timestamp: Timestamp;

    constructor(
      id: string,
      type: string,
      username: string,
      profilepic: string,
      postText: string,
      postPicture: string,
      timestamp: Timestamp
    ) {
      this.id = id;
      this.type = type;
      this.username = username;
      this.profilepic = profilepic;
      this.postText = postText;
      this.postPicture = postPicture;
      this.timestamp = timestamp;
    }
  }

  class WorkoutPost {
    id: string;
    type: string;
    username: string;
    profilepic: string;
    workout: Workout;
    timestamp: Timestamp;

    constructor(
      id: string,
      type: string,
      username: string,
      profilepic: string,
      workout: Workout,
      timestamp: Timestamp
    ) {
      this.id = id;
      this.type = type;
      this.username = username;
      this.profilepic = profilepic;
      this.workout = workout;
      this.timestamp = timestamp;
    }
  }

  type CombinedPost = ImagePost | WorkoutPost;

  let imagePosts: ImagePost[];
  let workoutPosts: WorkoutPost[];

  let combinedArray: (ImagePost | WorkoutPost)[] = [];

  const [combinedPosts, setCombinedPosts] = useState<CombinedPost[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      combinedArray = [];
      imagePosts = [];
      workoutPosts = [];
      setCombinedPosts(combinedArray);
      console.log(combinedPosts);
      allPosts();
    }
  }, [session]);

  const findUser = async () => {
    const activeDocRef = doc(db, "activeUsers", "1");
    const activeDocSnap = await getDoc(activeDocRef);

    if (!activeDocSnap.exists()) {
      alert(`Database error`);
      signOut();
    } else {
      const username = activeDocSnap.get("username");

      const userDocRef = doc(db, "users", username);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        await findFriends(userDocRef);
      }
    }
  };

  const findFriends = async (userDocRef: DocumentReference<DocumentData>) => {
    if (userDocRef) {
      const docSnap = await getDoc(userDocRef);
      const username = docSnap.get("username");

      const friendRef = collection(db, "users", username, "friends");
      const postQuery = query(friendRef);
      const querySnapshot = await getDocs(postQuery);
      const friendsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          username: data.username,
        };
      });
      await findImagePosts(friendsData);
      await findWorkoutPosts(friendsData);
    }
  };

  const findImagePosts = async (friends: { username: string }[]) => {
    imagePosts = [];
    for (const { username } of friends) {
      const docRef = doc(db, "users", username);
      const docSnap = await getDoc(docRef);
      const postRef = collection(db, "users", username, "imagePosts");
      const postQuery = query(postRef);

      const querySnapshot = await getDocs(postQuery);
      imagePosts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return new ImagePost(
          doc.id,
          "imagePost",
          username,
          docSnap.get("picture"),
          data.postText,
          data.postPicture,
          data.timestamp
        );
      });
      imagePosts.forEach((post) => {
        if (post.id in combinedArray) {
          console.log("hello");
        } else {
          combinedArray.push(post);
        }
      });
    }
  };

  const findWorkoutPosts = async (friends: { username: string }[]) => {
    workoutPosts = [];
    for (const { username } of friends) {
      const docRef = doc(db, "users", username);
      const docSnap = await getDoc(docRef);
      const postRef = collection(db, "users", username, "workoutPosts");

      const postQuery = query(postRef);

      const querySnapshot = await getDocs(postQuery);
      const workoutPosts = querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const exercisesRef = collection(postRef, doc.id, "Exercises");
        const exercisesSnapshot = await getDocs(exercisesRef);
        const exercises = exercisesSnapshot.docs.map((exerciseDoc) =>{
          return new Exercise(
            data.name,
            data.repetition,
            data.sets
          )
        })      
        console.log(data.workout)
        return new WorkoutPost(
          doc.id,
          "workoutPost",
          username,
          docSnap.get("picture"),
          new Workout(
            data.name,
            data.timestampStart,
            data.timestampEnd,
            exercises
          ),
          data.timestamp
        );
      });
    }
  };

  async function allPosts() {
    combinedArray = [];
    await findUser();
    combinedArray.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
    setCombinedPosts(combinedArray);
  }

  return (
    <div className="flex flex-col w-full pl-4 top-14">
      <Post />
      <div className="flex flex-col w-full pl-4 top-14">
        {combinedPosts.map((post) => {
          if (post.type === "imagePost") {
            return (
              <FitbookPostWithImage
                key={post.id}
                text={(post as ImagePost).postText}
                username={post.username}
                imageUrl={(post as ImagePost).postPicture}
                profilepic={post.profilepic}
              />
            );
          } else if (post.type === "workoutPost") {
            return (
              <FitbookPostWorkout
                key={post.id}
                username={post.username}
                profilepic={post.profilepic}
                workout={(post as WorkoutPost).workout}
              />
            );
          }
          return;
        })}
      </div>
    </div>
  );
}

export default MainFeed;
