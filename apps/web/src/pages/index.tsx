import localFont from "next/font/local";
import {
  BsThreadsFill,
  BsFillBookmarkFill,
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsFillPeopleFill,
  BsPersonCircle,
} from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { MdOutlineWork } from "react-icons/md";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { FeedCard } from "@/src/components/FeedCard";
import LoginCard from "@/src/components/LoginCard";
import { useCurrentUser } from "@/src/hooks/user";
import SidebarProfile from "@/src/components/SidebarProfile";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface ThreadsSidebarButtons {
  icon: JSX.Element;
  label: string;
  href: string;
}

const threadsSidebarButtons: ThreadsSidebarButtons[] = [
  {
    icon: <GoHomeFill className="w-6 h-6" />,
    label: "Home",
    href: "/",
  },
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
  {
    icon: <MdOutlineWork className="w-6 h-6" />,
    label: "Work",
    href: "/work",
  },
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
  {
    icon: <CiCircleMore className="w-6 h-6" />,
    label: "More",
    href: "/more",
  },
];

export default function Home() {
  const { user } = useCurrentUser();

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}
    >
      <div className="grid grid-cols-12 w-full h-screen px-56">
        <div className="col-span-3 flex flex-col pt-8 space-y-4">
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
          {!user && <SidebarProfile/>}
        </div>
        <div className="col-span-6 border-x-2 border-x-[0.2xp] border-x-white flex justify-center">
          <section className="h-fit">
            {" "}
            <FeedCard className="m-6" />
          </section>
        </div>
        <div className="col-span-3">
          {!user && <LoginCard />}
        </div>
      </div>
    </div>
  );
}
