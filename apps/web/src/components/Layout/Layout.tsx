import { ReactNode } from "react";
import {
  BsThreadsFill,
  BsFillBookmarkFill,
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsFillPeopleFill,
  BsPersonCircle,
} from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { MdOutlineWork, MdOutlinePersonAddAlt } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import SidebarProfile from "@/src/components/SidebarProfile";
import { useCurrentUser } from "@/src/hooks/user";
import LoginCard from "../LoginCard";

const threadsSidebarButtons = [
  { icon: <GoHomeFill className="w-6 h-6" />, label: "Home", href: "/" },
  {
    icon: <BsFillPeopleFill className="w-6 h-6" />,
    label: "Explore",
    href: "/explore",
  },
  {
    icon: <BsFillBellFill className="w-6 h-6" />,
    label: "Notifications",
    href: "/notifications",
  },
  {
    icon: <BsFillEnvelopeFill className="w-6 h-6" />,
    label: "Messages",
    href: "/messages",
  },
  {
    icon: <BsFillBookmarkFill className="w-6 h-6" />,
    label: "Bookmarks",
    href: "/bookmarks",
  },
  {
    icon: <BsFillPeopleFill className="w-6 h-6" />,
    label: "Lists",
    href: "/lists",
  },
  { icon: <MdOutlineWork className="w-6 h-6" />, label: "Work", href: "/work" },
  {
    icon: <MdOutlinePersonAddAlt className="w-6 h-6" />,
    label: "Communities",
    href: "/communities",
  },
  {
    icon: <BsThreadsFill className="w-6 h-6" />,
    label: "Premium",
    href: "/premium",
  },
  {
    icon: <BsPersonCircle className="w-6 h-6" />,
    label: "Profile",
    href: "/profile",
  },
  { icon: <CiCircleMore className="w-6 h-6" />, label: "More", href: "/more" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const { user } = useCurrentUser();

  return (
    <div className="font-sans h-screen flex">
      <div className="w-1/4 flex flex-col ml-20 pt-8 space-y-4">
        <BsThreadsFill className="w-7 h-7 ml-3 bg-white" />
        {threadsSidebarButtons.map((button) => (
          <Link
            key={button.label}
            href={button.href}
            className="flex items-center space-x-2 text-white hover:bg-gray-800 p-2 rounded w-fit"
          >
            {button.icon}
            <span>{button.label}</span>
          </Link>
        ))}
        <section>
          <Button className="bg-blue-500">Tweet</Button>
        </section>
        {!user && <SidebarProfile />}
      </div>

      <div className="flex-grow flex flex-col h-screen">
        <div className="flex-grow overflow-y-auto border-x-2 border-x-[0.2xp] border-x-white flex justify-center">
          <section className="w-full">{children}</section>
        </div>
      </div>

      <div className="w-1/4 flex flex-col">
        {!user && <LoginCard />}
      </div>
    </div>
  );
}
