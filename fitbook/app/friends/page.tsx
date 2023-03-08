"use client"

import type { NextPage } from "next";
import Friend, {User} from "../../components/friends/Friend";
import SearchFriend from "../../components/friends/SearchFriend";
import { db, firebase } from "../../firebase";
import { collection, doc, Firestore, getDocs, onSnapshot} from "firebase/firestore";
import { getDatabase, ref, onValue, child, get} from "firebase/database"
import { useState } from "react";


const Friends: NextPage = () => {


  let users: User[] = [];

  //const [users1, setusers] = useState<[]>([]);
  const colRef = collection(db, 'users');

  onSnapshot(colRef, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      users.push({
        ...doc.data(),
        userID: "",
        name: "",
        userName: "",
        img: ""
      })
    })
  })
    return (
      <div className="w-full">
        <SearchFriend />
        <p className="font-light" style={{ marginTop: "30px" }}>
          Your friends:
        </p>
        {users.map((user: User) => {
          return (
            <Friend
              key={user.userID}
              userID = {user.userID}
              name={user.name}
              userName={user.userID}
              img={user.img}
            />
          );
        })}
      </div>
    );  
};

export default Friends;
