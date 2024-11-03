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
import { CreateTweet, GetAllTweetsQuery } from "@/src/gql/graphql";
import { useGetAllTweets } from "@/src/hooks/tweet";
import { log } from "console";

const tweetss = [
  {
    firstName: "elonmusk",
    handle: "@elonmusk",
    content:
      "To be clear, I'm spending <5% (but actually) of my time on the Twitter acquisition. It ain't rocket science!",
    avatar: "/placeholder.svg?height=40&width=40",
    likes: 454000,
    retweets: 54000,
    replies: 21000,
  },
  {
    firstName: "BillGates",
    handle: "@BillGates",
    content:
      "Everybody asks, how is the next Windows coming along? But nobody asks how is Bill? 😔",
    avatar: "/placeholder.svg?height=40&width=40",
    likes: 112000,
    retweets: 3000,
    replies: 1800,
  },
];

interface FeedCardProps {
  data: GetAllTweetsQuery
}
type CardProps = React.ComponentProps<typeof Card>;

export function FeedCard({ className, ...props }: CardProps) {
const {tweets=[]} = useGetAllTweets()
  console.log(tweets);
  
  return (
    <Card className={cn("rounded-none bg-inherit text-cyan-50",className)} {...props}>
      <CardHeader>
        <CardTitle>Twitter Feed</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {tweets.map((tweet, index) => (
          <div key={index} className="flex space-x-4">
            <Avatar>
              <AvatarImage src={tweet.author.profileImageURL} alt={tweet.author.firstName} />
              <AvatarFallback>{tweet.author.firstName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-semibold">{tweet.author.firstName}</p>
                <p className="text-sm text-muted-foreground">@{tweet.author.firstName}</p>
              </div>
              <p className="text-sm">{tweet.content}</p>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <Button variant="ghost" size="sm" className="px-0">
                  <MessageCircle className="mr-1 h-4 w-4" />
                  {33}
                </Button>
                <Button variant="ghost" size="sm" className="px-0">
                  <Repeat2 className="mr-1 h-4 w-4" />
                  {99}
                </Button>
                <Button variant="ghost" size="sm" className="px-0">
                  <Heart className="mr-1 h-4 w-4" />
                  {1000}
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
