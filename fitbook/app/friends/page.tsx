import type { NextPage } from "next";
import Friend from "../../components/friends/Friend";
import SearchFriend from "../../components/friends/SearchFriend";
import { db, firebase } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getDatabase, ref, onValue, child, get} from "firebase/database"



const fetchfriends = async() => {


  const docRef = doc(db, "activeusers", "1");
  const docSnap = await getDoc(docRef)

  console.log(docSnap.data())




}


const Friends: NextPage = () => {

  fetchfriends();
  let data = [{

    username: "hei",
    name:"lars",
    img:"awkd"

  }];
  return (
    <div className="w-full">
      <SearchFriend />
      <p className="font-light" style={{ marginTop: "30px" }}>
        Your friends:
      </p>
      {data.map((obj) => {
        return (
          <Friend
            key={obj.username}
            name={obj.name}
            userName={obj.username}
            img={obj.img}
          />
        );
      })}
    </div>
  );
};

export default Friends;
