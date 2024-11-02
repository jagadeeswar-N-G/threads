import * as React from "react"
import { Button } from "@/src/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { CalendarIcon, MapPinIcon, LinkIcon } from "lucide-react"

export default function TwitterProfileCard() {
  const user = {
    name: "Jane Doe",
    username: "janedoe",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Software engineer. Coffee enthusiast. Always learning.",
    location: "San Francisco, CA",
    website: "https://janedoe.com",
    joinDate: "September 2010",
    following: 1234,
    followers: 5678,
  }

  return (
    <Card className="w-[350px]">
      <CardHeader className="relative h-32">
        {/* Header image - using a placeholder for now */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600" />
        <Avatar className="w-24 h-24 border-4 border-white absolute -bottom-12 left-4">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="pt-16">
        <div className="flex justify-end">
          <Button variant="outline" className="rounded-full">Edit profile</Button>
        </div>
        <h2 className="text-2xl font-bold mt-2">{user.name}</h2>
        <p className="text-gray-500">@{user.username}</p>
        <p className="mt-2">{user.bio}</p>
        <div className="flex flex-col gap-2 mt-4 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <MapPinIcon size={16} />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <LinkIcon size={16} />
            <a href={user.website} className="text-blue-500 hover:underline">{user.website}</a>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon size={16} />
            <span>Joined {user.joinDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-gray-500">
        <div>
          <span className="font-bold text-black">{user.following}</span> Following
        </div>
        <div>
          <span className="font-bold text-black">{user.followers}</span> Followers
        </div>
      </CardFooter>
    </Card>
  )
}