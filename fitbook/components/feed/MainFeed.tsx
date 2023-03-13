"use client";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
} from "firebase/firestore";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import FitbookPostWithImage from "./FitbookPostWithImage";
import Post from "./Post";

function MainFeed() {
  const [posts, setPosts] = useState<
    {
      id: string;
      username: string;
      profilepic: string;
      postText: string;
      postPicture: string;
      timestamp: Timestamp;
    }[]
  >([]);
  useEffect(() => {
    findPosts();

    const startTime = window.performance.now();

    return () => {
      const endTime = window.performance.now();

      if (endTime - startTime < 100) {
        findPosts();
      }
    };
  }, []);

  async function findPosts() {
    const friends = await findFriends();
    const newPosts: {
      id: string;
      username: string;
      profilepic: string;
      postText: string;
      postPicture: string;
      timestamp: Timestamp;
    }[] = [];
    for (const { username } of friends) {
      const docRef = doc(db, "users", username);
      const docSnap = await getDoc(docRef);
      const postRef = collection(db, "users", username, "posts");
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
      newPosts.push(...posts);
    }
    newPosts.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
    setPosts(newPosts);
  }

  // Get a reference to the subcollection
  async function findFriends() {
    const username = await findUser();

    const friendRef = collection(db, "users", username, "friends");

    // Create a query to retrieve all the documents in the subcollection
    const postQuery = query(friendRef);

    const querySnapshot = await getDocs(postQuery);

    const friends = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        username: data.username,
      };
    });
    return friends;
  }

  const findUser = async () => {
      const docRef = doc(db, "activeUsers", "1");
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        alert(`Database error`);
        signOut();
      } else {
        return docSnap.get("username");
      }
    }

  return (
    <div className="flex flex-col w-full pl-4 top-14">
      {/* <Post /> */}
      <div className="flex flex-col w-full pl-4 top-14">
        {posts.map((post) => {
          return (
            <div className="p-4 my-2 border-2 rounded " key={post.id}>
              {post.postPicture && post.postPicture.length > 0 && (
                <FitbookPostWithImage
                  text={post.postText}
                  username={post.username}
                  imageUrl={post.postPicture}
                  profilepic={post.profilepic}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainFeed;
