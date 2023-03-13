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
import Post from "./Post";

function MainFeed() {
  class ImagePost {
    id: string;
    username: string;
    profilepic: string;
    postText: string;
    postPicture: string;
    timestamp: Timestamp;

    constructor(
      id: string,
      username: string,
      profilepic: string,
      postText: string,
      postPicture: string,
      timestamp: Timestamp
    ) {
      this.id = id;
      this.username = username;
      this.profilepic = profilepic;
      this.postText = postText;
      this.postPicture = postPicture;
      this.timestamp = timestamp;
    }
  }

  class WorkoutPost {
    id: string;
    username: string;
    profilepic: string;
    workout: string;
    timestamp: Timestamp;

    constructor(
      id: string,
      username: string,
      profilepic: string,
      workout: string,
      timestamp: Timestamp
    ) {
      this.id = id;
      this.username = username;
      this.profilepic = profilepic;
      this.workout = workout;
      this.timestamp = timestamp;
    }
  }

  type CombinedPost = ImagePost | WorkoutPost;

  const [imagePosts, setImagePosts] = useState<ImagePost[]>([]);
  const [workoutPosts, setWorkoutPosts] = useState<WorkoutPost[]>([]);
  const [combinedPosts, setCombinedPosts] = useState<CombinedPost[]>([]);
  const [friends, setFriends] = useState<{ username: string }[]>([]);

  const { data: session } = useSession();

  const [userRef, setUserRef] = useState<DocumentReference<DocumentData>>();

  useEffect(() => {
    console.log("finding posts");
    allPosts();
  }, []);

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
        setUserRef(userDocRef);
        console.log("user set");
      }
    }
  };

  const findFriends = async () => {
    console.log("friends");
    if (userRef) {
      console.log("hello");
      const docSnap = await getDoc(userRef);
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
      setFriends(friendsData);
    }
  };

  const findImagePosts = async () => {
    console.log("findimg");
    for (const { username } of friends) {
      console.log(username);
      const docRef = doc(db, "users", username);
      const docSnap = await getDoc(docRef);
      const postRef = collection(db, "users", username, "imagePosts");
      const postQuery = query(postRef);

      const querySnapshot = await getDocs(postQuery);

      const posts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          username: username,
          profilepic: docSnap.get("picture"),
          postText: data.postText,
          postPicture: data.postPicture,
          timestamp: data.timestamp,
        };
      });
      setImagePosts((prevPosts) => [...prevPosts, ...posts]);
    }
    setImagePosts((prevPosts) =>
      [...prevPosts].sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)
    );
  };

  const findWorkoutPosts = async () => {
    for (const { username } of friends) {
      const docRef = doc(db, "users", username);
      const docSnap = await getDoc(docRef);
      const postRef = collection(db, "users", username, "workoutPosts");
      const postQuery = query(postRef);

      const querySnapshot = await getDocs(postQuery);

      const posts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          username: data.username,
          profilepic: data.profilepic,
          workout: data.workout,
          timestamp: data.timestamp,
        };
      });
      setWorkoutPosts((prevPosts) => [...prevPosts, ...posts]);
    }
    setWorkoutPosts((prevPosts) =>
      [...prevPosts].sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)
    );
  };

  async function allPosts() {
    await findUser();
    await findFriends();
    await findImagePosts();
    await findWorkoutPosts();
    console.log("hei");
    console.log("hhh");
    const combinedArray = [...imagePosts, ...workoutPosts];
    console.log(combinedArray);
    // Sort the combined array by timestamp
    combinedArray.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
    setCombinedPosts(combinedArray);
  }

  return (
    <div className="flex flex-col w-full pl-4 top-14">
      {/* <Post /> */}
      <div className="flex flex-col w-full pl-4 top-14">
        {combinedPosts.map((post) => {
          if (post instanceof ImagePost) {
            return (
              <FitbookPostWithImage
                text={post.postText}
                username={post.username}
                imageUrl={post.postPicture}
                profilepic={post.profilepic}
              />
            );
          } else if (post instanceof WorkoutPost) {
            return;
          }
          return;
        })}
      </div>
    </div>
  );
}

export default MainFeed;
