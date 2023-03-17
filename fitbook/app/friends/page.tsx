"use client"

import type { NextPage } from "next";
import Friend, { User } from "../../components/friends/Friend";
import SearchFriend from "../../components/friends/SearchFriend";
import { db, firebase } from "../../firebase";
import { collection, doc, Firestore, getDocs, getDoc, onSnapshot, query, where, QuerySnapshot } from "firebase/firestore";
import { getDatabase, ref, onValue, child, get } from "firebase/database"
import { useState } from "react";

let users: User[] = [{
  userID: "string",
  name: "string",
  userName: "string",
  img: "string"
}];

let fetch: User[] = [];
let friends:any = []



const Friends: NextPage = () => {

  const activeUserRef = doc(db, 'activeUsers', "1");
  const AllUsersRef = collection(db, "users");

  const [users, setusers] = useState({});


  let FriendsOfactiveUser = async () => {
    const docSnap = await getDoc(activeUserRef);
    const FriendsOfActiveUserRef = collection(db, "users", docSnap.get("username"), "friends");

    const FriendsOfActiveUserDocs = await getDocs(FriendsOfActiveUserRef).then((snapshot) => {

      friends = snapshot.docs.map(doc => doc.data())

    })
    console.log(friends)

    //legg inn where filtrering på denne under. () gjort??
    const FriendsOfActiveUserQuery = query(AllUsersRef, where("username", "in", friends))

    let friendsobj:any[] = [];
    const resultofQuery = await getDocs(FriendsOfActiveUserQuery).then((snapshot) => {
      friendsobj = snapshot.docs.map(doc => doc.data())
    })
    console.log(friendsobj)
    console.log(FriendsOfActiveUserQuery)


    onSnapshot(FriendsOfActiveUserQuery, (snapshot) => {
      fetch = [];
      snapshot.docs.forEach((doc) => {
        fetch.push(
          {
            userID: doc.data().username,
            name: doc.data().username,
            userName: doc.data().username,
            img: doc.data().picture
          })
      })
      console.log(fetch)
    })

  }

  FriendsOfactiveUser();

  return (
    <div className="w-full">
      <SearchFriend />
      <p className="font-light" style={{ marginTop: "30px" }}>
        Your friends:
      </p>
      {friendsobj.map((user: User) => (
        console.log("hei"),
        <Friend
          key={user.userID}
          userID={user.userID}
          name={user.name}
          userName={user.userID}
          img={user.img}
        />
      ))}
    </div>
  );
};

export default Friends;
