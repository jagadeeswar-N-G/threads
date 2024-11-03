import * as React from "react"
import { useCallback, useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter } from "@/src/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Textarea } from "@/src/components/ui/textarea"
import { ImageIcon, SmileIcon } from "lucide-react"
import { useCurrentUser } from "@/src/hooks/user"
import { useCreateTweet  } from "@/src/hooks/tweet"

const MAX_TWEET_LENGTH = 280

export default function TwitterInputCard() {
  const [tweetContent, setTweetContent] = useState("")
  const {mutate } = useCreateTweet()

  const handleTweetChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweetContent(event.target.value)
  }

  const handleSelectedImage = useCallback(() => {
    const input = document.createElement("input")
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
  }, [])

  const handleTweetSubmit = () => {
    if (tweetContent.trim() && tweetContent.length <= MAX_TWEET_LENGTH) {
      console.log("Tweet submitted:", tweetContent)
      mutate({
        content: tweetContent,
        imageURL: undefined
      })
      setTweetContent("") 
    }
  }

  const remainingCharacters = MAX_TWEET_LENGTH - tweetContent.length
  const isOverLimit = remainingCharacters < 0
  const { user } = useCurrentUser();
  if (!user) {
    return null;
  }
  return (
    <Card className="w-full max-w-[600px]">
      <CardContent className="p-4">
        <div className="flex space-x-4">
        <Avatar className="w-8 h-8">
              <AvatarImage src={user?.profileImageURL} alt={user?.firstName} />
              <AvatarFallback>{user?.firstName.charAt(0)}</AvatarFallback>
            </Avatar>
          <div className="flex-grow">
            <Textarea
              placeholder="What's happening?"
              value={tweetContent}
              onChange={handleTweetChange}
              className="w-full min-h-[100px] bg-white text-lg border-none resize-none focus:ring-0"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center px-4 py-2 border-t">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="text-blue-500" onClick={handleSelectedImage}>
            <ImageIcon className="h-5 w-5" />
            <span className="sr-only">Add image</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-blue-500">
            <SmileIcon className="h-5 w-5" />
            <span className="sr-only">Add emoji</span>
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
            {remainingCharacters}
          </span>
          <Button
            onClick={handleTweetSubmit}
            disabled={tweetContent.length === 0 || isOverLimit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full px-4 py-2"
          >
            Tweet
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}