"use client"

import type { NextPage } from "next";
import Friend from "../../components/friends/Friend";
import SearchFriend from "../../components/friends/SearchFriend";
import { db, firebase } from "../../firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import { getDatabase, ref, onValue, child, get} from "firebase/database"
import { useState } from "react";


type User = {

  user_id: string,
}


const Friends: NextPage = () => {


  let users: User[] = [];

  const [users1, setusers] = useState(users);

  const colRef = collection(db, 'users');
  getDocs(colRef).then((snapshot)=>{

    snapshot.docs.forEach((doc) => {

      users.push({
        ...doc.data(), user_id: doc.id
      })
    })

    setusers(users)

  })
    return (
      <div className="w-full">
        <SearchFriend />
        <p className="font-light" style={{ marginTop: "30px" }}>
          Your friends:
        </p>
        {users1.map((user) => {
          return (
            <Friend
              key={user.user_id}
              name={user.user_id}
              userName={user.user_id}
              img={user.user_id}
            />
          );
        })}
      </div>
    );  
};

export default Friends;
