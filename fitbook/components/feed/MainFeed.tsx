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
import { UserApi } from "../../utils/api/UserApi";
import FitbookPostWithImage from "./FitbookPostWithImage";
import FitbookPostWorkout from "./FitbookPostWorkout";
import Post from "./Post";

export class Exercise {
  name: string;
  reps: number;
  sets: number;

  constructor(name: string, reps: number, sets: number) {
    this.name = name;
    this.reps = reps;
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
    exercises: Array<Exercise>;
    timestamp: Timestamp;

    constructor(
      id: string,
      type: string,
      username: string,
      profilepic: string,
      exercises: Exercise[],
      timestamp: Timestamp
    ) {
      this.id = id;
      this.type = type;
      this.username = username;
      this.profilepic = profilepic;
      this.exercises = exercises;
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
    const username = await UserApi.getUserName();

    const userDocRef = doc(db, "users", username);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      await findFriends(userDocRef);
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
      workoutPosts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const exercisesArray: Exercise[] = [];
        data.exercises.forEach((element: Exercise) => {
          exercisesArray.push(
            new Exercise(element.name, element.reps, element.sets)
          );
        });

      return new WorkoutPost(
        doc.id,
        "workoutPost",
        username,
        docSnap.get("picture"),
        exercisesArray,
        data.timestamp
      );
      });
    }
  };

  async function allPosts() {
    combinedArray = [];
    await findUser();
    console.log(workoutPosts)
    combinedArray.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
    setCombinedPosts(combinedArray);
  }

  return (
    <div className="flex flex-col w-full pl-4 top-14">
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
                exercises={(post as WorkoutPost).exercises}
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
