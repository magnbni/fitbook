"use client";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import React, { useRef } from "react";
import { db } from "../../firebase";





const SearchFriend = () => {

  let possibleUser: String = "";
  const AllUsersRef = collection(db, "users");
  const activeUserRef = doc(db, 'activeUsers', "1");
  


  
  const addUser = async(TheUsername : string) =>{


    const docSnap = await getDoc(activeUserRef);
    const FriendsOfActiveUserRef = doc(db, "users", docSnap.get("username"), "friends", TheUsername);

    let docdata = {
      username: TheUsername
    }

    await setDoc(FriendsOfActiveUserRef,docdata).then(()=>{
      window.location.reload();
    })
  }



  //const inputRef = useRef(document.createElement("input"));


  return (
    <div className="flex items-center p-3 transition-colors duration-500 ease-in-out bg-green-50 my-2 rounded text-black">
      <input
        className="bg-green-50 w-full hover: cursor-pointer outline-none"
        type="text"
        name="name"
        placeholder="fill in username..."
        //ref={inputRef}
        onChange={(e)=>{
          possibleUser = e.currentTarget.value;
        }}
      />
      <button
        onClick={async()=>{

          let containsUser = false;
          console.log(possibleUser)
          const AllusersData = await getDocs(AllUsersRef);

          AllusersData.forEach(user => {
            if(user.data().username == possibleUser){
              containsUser = true;         
              addUser(user.data().username)   
            }

          })
          containsUser
          ? alert(`@${possibleUser} is now added to your friendlist.`)
          : alert("Fant ikke brukeren, kanskje du har skrevet brukernavnet feil?.");
        }}
        
        className="bg-white object-right w-36 rounded text-primary p-2 font-black shadow-md"
      >
        Add friend
      </button>
    </div>
  );
};

export default SearchFriend;
