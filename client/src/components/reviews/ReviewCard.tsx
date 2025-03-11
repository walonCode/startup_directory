import { useState } from "react"
import { Star, Heart, ThumbsDown, ThumbsUp, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Separator } from "../ui/separator"

interface Review {
  _id?: string
  startupId: string | undefined
  rating: number
  comment: string
  user: string
  createdAt?: string
}

export default function ReviewCard({ review }: { review: Review }) {
  const { user, rating, comment } = review

  // For demo purposes, we'll use state to track reactions
  const [reactions, setReactions] = useState({
    likes: Math.floor(Math.random() * 10),
    dislikes: Math.floor(Math.random() * 3),
    loves: Math.floor(Math.random() * 5),
  })

  const [activeReaction, setActiveReaction] = useState<"likes" | "dislikes" | "loves" | null>(null)

  const handleReaction = (type: "likes" | "dislikes" | "loves") => {
    if (activeReaction === type) {
      setReactions((prev) => ({
        ...prev,
        [type]: Math.max(prev[type] - 1, 0), // Ensure count doesn’t go below 0
      }));
      setActiveReaction(null);
    } else {
      const updatedReactions = { ...reactions };
      if (activeReaction) {
        updatedReactions[activeReaction] = Math.max(updatedReactions[activeReaction] - 1, 0);
      }
      updatedReactions[type] = updatedReactions[type] + 1;
      setReactions(updatedReactions);
      setActiveReaction(type);
    }
  };

  // Generate a random date if not provided
  const reviewDate = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary">
                {user.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium">{user}</h4>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>{reviewDate}</span>
                <span className="mx-2">•</span>
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Report Review</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="px-4 py-2">
        <p className="text-gray-700">{comment}</p>
      </CardContent>

      <Separator />

      <CardFooter className="px-4 py-3 flex justify-between">
        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 h-8 px-2 ${activeReaction === "loves" ? "text-red-500 bg-red-50" : ""}`}
            onClick={() => handleReaction("loves")}
          >
            <Heart size={16} className={activeReaction === "loves" ? "fill-red-500" : ""} />
            <span>{reactions.loves}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 h-8 px-2 ${activeReaction === "likes" ? "text-blue-500 bg-blue-50" : ""}`}
            onClick={() => handleReaction("likes")}
          >
            <ThumbsUp size={16} />
            <span>{reactions.likes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 h-8 px-2 ${activeReaction === "dislikes" ? "text-red-500 bg-red-50" : ""}`}
            onClick={() => handleReaction("dislikes")}
          >
            <ThumbsDown size={16} />
            <span>{reactions.dislikes}</span>
          </Button>
        </div>

        <Badge variant="outline" className="text-xs">
          Verified Review
        </Badge>
      </CardFooter>
    </Card>
  )
}

