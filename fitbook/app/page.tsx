import type { NextPage } from "next";
import Feed from "../components/Feed";

const Home: NextPage = () => {
  return <>
  <div className="fixed w-6/12 h-screen shadow-xl top-14 inset-x-1/4"></div>
  <Feed />;
  </>
};

export default Home;
