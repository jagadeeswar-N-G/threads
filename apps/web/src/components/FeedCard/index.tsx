import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

const tweets = [
  {
    username: "elonmusk",
    handle: "@elonmusk",
    content:
      "To be clear, I'm spending <5% (but actually) of my time on the Twitter acquisition. It ain't rocket science!",
    avatar: "/placeholder.svg?height=40&width=40",
    likes: 454000,
    retweets: 54000,
    replies: 21000,
  },
  {
    username: "BillGates",
    handle: "@BillGates",
    content:
      "Everybody asks, how is the next Windows coming along? But nobody asks how is Bill? 😔",
    avatar: "/placeholder.svg?height=40&width=40",
    likes: 112000,
    retweets: 3000,
    replies: 1800,
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export function FeedCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[400px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Twitter Feed</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {tweets.map((tweet, index) => (
          <div key={index} className="flex space-x-4">
            <Avatar>
              <AvatarImage src={tweet.avatar} alt={tweet.username} />
              <AvatarFallback>{tweet.username[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-semibold">{tweet.username}</p>
                <p className="text-sm text-muted-foreground">{tweet.handle}</p>
              </div>
              <p className="text-sm">{tweet.content}</p>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <Button variant="ghost" size="sm" className="px-0">
                  <MessageCircle className="mr-1 h-4 w-4" />
                  {tweet.replies.toLocaleString()}
                </Button>
                <Button variant="ghost" size="sm" className="px-0">
                  <Repeat2 className="mr-1 h-4 w-4" />
                  {tweet.retweets.toLocaleString()}
                </Button>
                <Button variant="ghost" size="sm" className="px-0">
                  <Heart className="mr-1 h-4 w-4" />
                  {tweet.likes.toLocaleString()}
                </Button>
                <Button variant="ghost" size="sm" className="px-0">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
