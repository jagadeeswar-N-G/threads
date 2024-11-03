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
import { useGetAllTweets } from "@/src/hooks/tweet";

type CardProps = React.ComponentProps<typeof Card>;

export function FeedCard({ className, ...props }: CardProps) {
  const { tweets = [] } = useGetAllTweets();
  return (
    <Card
      className={cn("rounded-none bg-inherit text-cyan-50", className)}
      {...props}
    >
      <CardHeader>
        <CardTitle>Twitter Feed</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {tweets.map((tweet, index) => (
          <div key={index} className="flex space-x-4">
            <Avatar>
              <AvatarImage
                src={tweet.author.profileImageURL}
                alt={tweet.author.firstName}
              />
              <AvatarFallback>{tweet.author.firstName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-semibold">
                  {tweet.author.firstName}
                </p>
                <p className="text-sm text-muted-foreground">
                  @{tweet.author.firstName}
                </p>
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
