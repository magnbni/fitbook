import type { NextPage } from "next";
import Feed from "../components/Feed";
import Nav from "../components/Nav";

const Home: NextPage = () => {
  return (
    <div className="mt-14 flex justify-center ">
      <div className="w-3/12 flex justify-center fixed left-0">
        <Nav />
      </div>
      <div className="w-6/12 flex justify-center">
        <Feed />
      </div>
      <div className="w-3/12 flex justify-center fixed right-0 ">
        {" "}
        left panel
      </div>
    </div>
  );
};

export default Home;
