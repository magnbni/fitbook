"use client";

import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import FitbookPostWithImage from "./FitbookPostWithImage";

function UserFeed() {
  const [posts, setPosts] = useState<
    { id: string; postText: string; postPicture: string }[]
  >([]);
  const [username, setUsername] = useState("");
  const [userPic, setUserpic] = useState("");
  useEffect(() => {
    findPosts();
  }, []);

  // Get a reference to the subcollection
  const findPosts = async () => {
    const username = await findUser();
    setUsername(username);
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);
    setUserpic(docSnap.get("picture"));

    const postRef = collection(db, "users", username, "posts");

    // Create a query to retrieve all the documents in the subcollection
    const postQuery = query(postRef);

    const querySnapshot = await getDocs(postQuery);

    const posts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        postText: data.postText,
        postPicture: data.postPicture,
      };
    });
    setPosts(posts);
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
                username={username}
                imageUrl={post.postPicture}
                profilepic={userPic}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default UserFeed;
