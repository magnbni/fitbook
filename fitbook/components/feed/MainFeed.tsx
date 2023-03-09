"use client";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
} from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import FitbookPostWithImage from "./FitbookPostWithImage";

function UserFeed() {
  const [friends, setFriends] = useState<
    { username: string; profilepic: string }[]
  >([]);
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
  }, []);

  const findPosts = async () => {
    findFriends();
    for (const { username, profilepic } of friends) {
      const postRef = collection(db, "users", username, "posts");
      const postQuery = query(postRef);

      const querySnapshot = await getDocs(postQuery);

      const posts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          username: username,
          profilepic: profilepic,
          postText: data.postText,
          postPicture: data.postPicture,
          timestamp: data.timestamp,
        };
      });
      posts.push(...posts);
    }
    setPosts(posts);
    posts.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
  };

  // Get a reference to the subcollection
  const findFriends = async () => {
    const username = await findUser();

    const friendRef = collection(db, "users", username, "friends");

    // Create a query to retrieve all the documents in the subcollection
    const postQuery = query(friendRef);

    const querySnapshot = await getDocs(postQuery);

    const friends = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        username: data.username,
        profilepic: data.picture,
      };
    });
    setFriends(friends);
  };

  const { data: session } = useSession();
  const findUser = async () => {
    if (session) {
      const docRef = doc(db, "activeUsers", "1");
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        alert(`Database error`);
        signOut();
      } else {
        return docSnap.get("username");
      }
    } else { //DETTE ER IKKE BRA <3
      const docRef = doc(db, "activeUsers", "1");
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        alert(`Database error`);
        signOut();
      } else {
        return docSnap.get("username");
      }
    }
  };

  return (
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
  );
}

export default UserFeed;
