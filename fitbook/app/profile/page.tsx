'use client'

import type { NextPage } from "next";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Feed from "../../components/Feed";

const Profile: NextPage = () => {
  // const pathname = usePathname();
  // const router = useRouter();
  // const { data: session } = useSession()
  // const [active, setActive] = useState(false);  
  // useEffect(() => {
  //   if (!pathname) return;
  //   setActive(pathname.includes('/profile'));
  // }, [pathname]);

  return <div className="w-full flex flex-col">
      <div className="flex flex-row-02 pl-4 pb-2 space-x-4">
        <div className="h-full flex justify float-left"> {/* Modify to show users image and username */}
          <img
                  className="w-50 h-50 rounded-full shadow-inner"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                />
        </div>
        <div className="flex pt-32">
          <p className="text-primary font-black text-xl">Fred Ole</p>
        </div>
      </div>
      <div>
        <Feed/> {/* Customize to only show users posts */}
      </div>     
  </div>;
};

export default Profile;


