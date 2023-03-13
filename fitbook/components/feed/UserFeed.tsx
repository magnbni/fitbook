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

function UserFeed() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<
    {
      id: string;
      username: string;
      picture: string;
      postText: string;
      postPicture: string;
      timestamp: Timestamp;
    }[]
  >([]);
  const [userRef, setUserRef] = useState<DocumentReference<DocumentData>>();
  useEffect(() => {
    findUser();
  }, [session]);

  useEffect(() => {
    findPosts();
  }, [userRef]);

  console.log(userRef);
  // Get a reference to the subcollection
  const findPosts = async () => {
    if (userRef) {
      console.log("Finding users");

      const docSnap = await getDoc(userRef);

      const postRef = collection(db, "users", docSnap.get("username"), "posts");

      // Create a query to retrieve all the documents in the subcollection
      const postQuery = query(postRef);

      const querySnapshot = await getDocs(postQuery);

      const posts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          username: docSnap.get("username"),
          picture: docSnap.get("picture"),
          postText: data.postText,
          postPicture: data.postPicture,
          timestamp: data.timestamp,
        };
      });
      setPosts(posts);
      posts.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
    }
  };

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
      }
    }
  };

  return (
    <div className="flex flex-col w-full pl-4 top-14">
    <Post/ >
    <div className="flex flex-col w-full pl-4 top-14">
      {posts.map((post) => {
        return (
          <div className="p-4 my-2 border-2 rounded " key={post.id}>
            {post.postPicture && post.postPicture.length > 0 && (
              <FitbookPostWithImage
                text={post.postText}
                username={post.username}
                imageUrl={post.postPicture}
                profilepic={post.picture}
              />
            )}
          </div>
        );
      })}
    </div>
    </div>
  );
}

export default UserFeed;
