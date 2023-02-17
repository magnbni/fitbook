import type { NextPage } from "next";
import Friend from "../../components/friends/Friend";
import SearchFriend from "../../components/friends/SearchFriend";

const Friends: NextPage = () => {
  const data = [
    {
      name: "Petter",
      username: "muscleman13",
      img: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    },
    {
      name: "Nils",
      username: "nils_armstrong",
      img: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    },
    {
      name: "Pedro",
      username: "sensei",
      img: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    },
  ];

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
