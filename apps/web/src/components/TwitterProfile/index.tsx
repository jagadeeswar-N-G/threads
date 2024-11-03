import {
  Calendar,
  Link,
  MapPin,
  MessageCircle,
  Repeat2,
  Heart,
  Share,
} from "lucide-react";
import { Button } from "../ui/button";
import { useCurrentUser } from "@/src/hooks/user";

export default function TwitterProfile() {
  const { user } = useCurrentUser();

  return (
    <div className="max-w-2xl mx-auto text-slate-50 dark:bg-gray-900">
      <div className="relative">
        <img
          src="/placeholder.svg?height=200&width=600"
          alt="Cover"
          className="w-full h-48 object-cover"
        />
        <img
          src={user?.profileImageURL}
          alt="Profile"
          className="absolute bottom-0 left-4 transform translate-y-1/2 w-32 h-32 rounded-full border-2 border-white dark:border-gray-900"
        />
      </div>

      {/* Profile Info */}
      <div className="mt-16 px-4">
        <div className="flex justify-end mb-4">
          <Button variant="outline" className="mr-2">
            Message
          </Button>
          <Button>Follow</Button>
        </div>
        <h1 className="text-2xl font-bold dark:text-white">
          {user?.firstName}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">@{user?.firstName}</p>
        <p className="mt-2 dark:text-gray-300">
          Web developer, coffee enthusiast, and amateur photographer. Always
          learning, always creating.
        </p>
        <div className="flex items-center mt-2 text-gray-500 dark:text-gray-400">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="mr-4">San Francisco, CA</span>
          <Link className="w-4 h-4 mr-1" />
          <span className="mr-4">jane-doe.com</span>
          <Calendar className="w-4 h-4 mr-1" />
          <span>Joined September 2010</span>
        </div>
        <div className="flex mt-4 text-gray-500 dark:text-gray-400">
          <span className="mr-4">
            <strong>1,234</strong> Following
          </span>
          <span>
            <strong>5,678</strong> Followers
          </span>
        </div>
      </div>

      {/* Tweets */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700">
        {user?.tweets?.map((tweet, index) => (
          <div
            key={index}
            className="px-4 py-6 border-b border-gray-200 dark:border-gray-700"
          >
            <p className="dark:text-white">{tweet.content}</p>
            <div className="mt-4 flex justify-between text-gray-500 dark:text-gray-400">
              <button className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                <span>23</span>
              </button>
              <button className="flex items-center">
                <Repeat2 className="w-4 h-4 mr-1" />
                <span>5</span>
              </button>
              <button className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                <span>87</span>
              </button>
              <button>
                <Share className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
