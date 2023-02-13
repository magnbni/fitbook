import Link from "next/link";
import {
  CalendarDaysIcon,
  ChartBarIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserPlusIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";

function Nav() {
  const iconSize = "h-5 w-5 m-1";
  const links = [
    {
      name: "My profile",
      path: "/myprofile",
      icon: <UserCircleIcon className={iconSize} />,
    },
    {
      name: "Friends",
      path: "/friends",
      icon: <UserPlusIcon className={iconSize} />,
    },
    {
      name: "Groups",
      path: "/groups",
      icon: <UserGroupIcon className={iconSize} />,
    },
    {
      name: "Workouts",
      path: "/workouts",
      icon: <CalendarDaysIcon className={iconSize} />,
    },
    {
      name: "Progression",
      path: "/progression",
      icon: <ChartBarIcon className={iconSize} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <WrenchScrewdriverIcon className={iconSize} />,
    },
  ];

  return (
    <div className="flex flex-col items-center w-full ">
      {links.map((link, index) => (
        <Link
          className="flex items-center w-6/12 p-1 my-2 transition-colors duration-500 ease-in-out bg-white text-black; hover:text-white hover:bg-primary"
          key={index}
          href={link.path}
        >
          {link.icon}
          {link.name}
        </Link>
      ))}
    </div>
  );
}

export default Nav;
