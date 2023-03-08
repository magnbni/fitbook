"use client";

import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

function UserFeed() {
  useEffect(() => {
    findPosts();
    console.log("hei");
  }, []);
  // Get a reference to the subcollection
  const findPosts = async () => {
    console.log("findPosts");
    const username = await findUser();
    const subcollectionRef = collection(db, "users", username, "posts");

    // Create a query to retrieve all the documents in the subcollection
    const subcollectionQuery = query(subcollectionRef);

    // Retrieve all the documents in the subcollection
    const doc = getDocs(subcollectionQuery)
      .then((querySnapshot) => {
        console.log("førloop");
        querySnapshot.forEach((doc) => {
          console.log("iloop");
          console.log(doc.get("postText"));
        });
      })
      .catch((error) => {
        console.log("hei2");
        console.error("Error getting documents: ", error);
      });
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
      <div className="flex flex-col justify-center w-full px-4 ">
        <div className="p-4 my-2 border-2 rounded ">
          <h4>
            <b>Twitt</b>
          </h4>
          hi
        </div>
        <div className="p-4 my-2 border-2 rounded ">
          <h4>
            <b>Twitt</b>
          </h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolore
          aperiam aspernatur cumque veritatis quia aliquid sapiente quisquam
          sequi voluptatibus, eveniet, a corporis ab dolores cupiditate natus
          perspiciatis rerum est. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Illo assumenda quasi nisi doloribus veniam inventore
          mollitia vero, dolore placeat in incidunt, quas dicta minima natus
          quia, adipisci iusto cum Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Nulla vero porro fuga a blanditiis rerum minima,
          repellat illo nostrum saepe, alias, harum error quidem sint provident
          nemo officia inventore laborum?
        </div>
        <div className="p-4 my-2 border-2 rounded ">
          <h4>
            <b>Twitt</b>
          </h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolore
          aperiam aspernatur cumque veritatis quia aliquid sapiente quisquam
          sequi voluptatibus, eveniet, a corporis ab dolores cupiditate natus
          perspiciatis rerum est.
        </div>
        <div className="p-4 my-2 border-2 rounded ">
          <h4>
            <b>Twitt</b>
          </h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolore
          aperiam aspernatur cumque veritatis quia aliquid sapiente quisquam
          sequi voluptatibus, eveniet, a corporis ab dolores cupiditate natus
          perspiciatis rerum est.
        </div>
        <div className="p-4 my-2 border-2 rounded ">
          <h4>
            <b>Twitt</b>
          </h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolore
          aperiam aspernatur cumque veritatis quia aliquid sapiente quisquam
          sequi voluptatibus, eveniet, a corporis ab dolores cupiditate natus
          perspiciatis rerum est.
        </div>
        <div className="p-4 my-2 border-2 rounded ">
          <h4>
            <b>Twitt</b>
          </h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolore
          aperiam aspernatur cumque veritatis quia aliquid sapiente quisquam
          sequi voluptatibus, eveniet, a corporis ab dolores cupiditate natus
          perspiciatis rerum est.
        </div>
        <div className="p-4 my-2 border-2 rounded ">
          <h4>
            <b>Twitt</b>
          </h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolore
          aperiam aspernatur cumque veritatis quia aliquid sapiente quisquam
          sequi voluptatibus, eveniet, a corporis ab dolores cupiditate natus
          perspiciatis rerum est.
        </div>
        <div className="p-4 my-2 border-2 rounded ">
          <h4>
            <b>Twitt</b>
          </h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolore
          aperiam aspernatur cumque veritatis quia aliquid sapiente quisquam
          sequi voluptatibus, eveniet, a corporis ab dolores cupiditate natus
          perspiciatis rerum est.
        </div>
      </div>
    </div>
  );
}

export default UserFeed;
