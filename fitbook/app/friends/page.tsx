"use client"

import type { NextPage } from "next";
import Friend, { User } from "../../components/friends/Friend";
import SearchFriend from "../../components/friends/SearchFriend";
import { db, firebase } from "../../firebase";
import { collection, doc, Firestore, getDocs, getDoc, onSnapshot, query, where, QuerySnapshot } from "firebase/firestore";
import { getDatabase, ref, onValue, child, get } from "firebase/database"
import { useState, useEffect } from "react";

let users: User[] = [{
  userID: "string",
  name: "string",
  userName: "string",
  img: "string"
}];

let fetch: User[] = [];
let friends:any = []



const Friends: NextPage = () => {
  
  let friendsobj:any[] = [];
  const activeUserRef = doc(db, 'activeUsers', "1");
  const AllUsersRef = collection(db, "users");
  
  const [users, setusers] = useState<User[]>([]);

  useEffect(() => {
    FriendsOfactiveUser();
    console.log("Hei her har stud.ass vært og facka")
  }, []);



  
  let FriendsOfactiveUser = async () => {
    const docSnap = await getDoc(activeUserRef);
    const FriendsOfActiveUserRef = collection(db, "users", docSnap.get("username"), "friends");

    const FriendsOfActiveUserDocs = await getDocs(FriendsOfActiveUserRef).then((snapshot) => {

      friends = snapshot.docs.map(doc => doc.data().username)

    })
    console.log(friends)

    const FriendsOfActiveUserQuery = query(AllUsersRef, where("username", "in", friends))

    const resultofQuery = await getDocs(FriendsOfActiveUserQuery).then((snapshot) => {
      friendsobj = snapshot.docs.map(doc => doc.data())
      console.log(friendsobj)
    })

    console.log(friendsobj)


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
    setusers(friendsobj)
  }

  return (
    <div className="w-full">
      <SearchFriend />
      <p className="font-light" style={{ marginTop: "30px" }}>
        Your friends:
      </p>
      {users.map((user: any) => (
        console.log("hei"),
        console.log(user),
        <Friend
          key={user.userID}
          userID={user.userID}
          name={user.username}
          userName={user.username}
          img={user.picture}
        />
      ))}
    </div>
  );
};

export default Friends;
