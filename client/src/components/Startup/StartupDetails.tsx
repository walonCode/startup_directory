"use client"

import type React from "react"

import { useAppSelector, useAppDispatch } from "../../hooks/storeHooks"
import { selectStartupById } from "../../store/features/startupSlice"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { postReview, selectReviewsByStartupId } from "../../store/features/reviewSlice"
import ReviewCard from "../reviews/ReviewCard"
import {
  Building,
  Mail,
  Globe,
  MapPin,
  Phone,
  Clock,
  Briefcase,
  Star,
  PlusCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
} from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Alert, AlertDescription } from "../ui/alert"

export default function StartupDetails() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()

  // Fetch startup details
  const startup = useAppSelector((state) => selectStartupById(state, id))

  // Fetch reviews
  const reviews = useAppSelector((state) => selectReviewsByStartupId(state, id)) || []

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!id || !name || !comment || !rating) {
      setError("Please fill in all fields")
      return
    }

    try {
      setIsSubmitting(true)
      setError("")

      const data = {
        startupId: id,
        user: name,
        comment,
        rating: Number(rating),
      }

      await dispatch(postReview(data)).unwrap()

      // Reset form fields
      setName("")
      setComment("")
      setRating("")
      setSuccess("Your review has been submitted successfully!")

      // Close modal after a short delay
      setTimeout(() => {
        setIsModalOpen(false)
        setSuccess("")
      }, 2000)
    } catch (error) {
      console.error(error)
      setError("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!startup) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-destructive">Startup Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">The startup you're looking for doesn't exist or has been removed.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
      : "No ratings yet"

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Button variant="ghost" className="mb-6" onClick={() => window.history.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Startups
      </Button>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content - 2/3 width on medium screens and up */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-3xl">{startup.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    {startup.address}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3">About</h3>
              <p className="text-muted-foreground">{startup.description}</p>

              <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-primary" />
                Services Offered
              </h3>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p>{startup.services}</p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="reviews">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reviews">
                <Star className="h-4 w-4 mr-2" />
                Reviews ({reviews.length})
              </TabsTrigger>
              <TabsTrigger value="info">
                <Globe className="h-4 w-4 mr-2" />
                Contact Information
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Review
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Add a Review</DialogTitle>
                      <DialogDescription>Share your experience with {startup.name}</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={onSubmit}>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Your Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="rating">Rating</Label>
                          <Select value={rating} onValueChange={setRating}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a rating" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">⭐⭐⭐⭐⭐ - Excellent</SelectItem>
                              <SelectItem value="4">⭐⭐⭐⭐ - Very Good</SelectItem>
                              <SelectItem value="3">⭐⭐⭐ - Good</SelectItem>
                              <SelectItem value="2">⭐⭐ - Fair</SelectItem>
                              <SelectItem value="1">⭐ - Poor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="comment">Your Review</Label>
                          <Textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write your review here..."
                            rows={4}
                          />
                        </div>

                        {error && (
                          <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}

                        {success && (
                          <Alert variant="default" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <AlertDescription>{success}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Submit Review"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {reviews.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">No reviews yet. Be the first to leave a review!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="info" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Get in touch with {startup.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-3 bg-muted/50 rounded-lg">
                      <Mail className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a href={`mailto:${startup.email}`} className="font-medium hover:text-primary">
                          {startup.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-muted/50 rounded-lg">
                      <Phone className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{startup.contact}</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-muted/50 rounded-lg">
                      <Globe className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Website</p>
                        <a
                          href={startup.website.startsWith("http") ? startup.website : `https://${startup.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:text-primary"
                        >
                          {startup.website}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-muted/50 rounded-lg">
                      <Clock className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Operating Hours</p>
                        <p className="font-medium">{startup.operatingHours}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Location</h3>
                    <div className="bg-muted h-[200px] rounded-lg flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-muted-foreground" />
                      <span className="ml-2 text-muted-foreground">Map view would go here</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 1/3 width on medium screens and up */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Startup Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground">Average Rating</span>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-bold">{avgRating}</span>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground">Total Reviews</span>
                <span className="font-bold">{reviews.length}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground">Founded</span>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="font-bold">2020</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                <Globe className="h-4 w-4 mr-2" />
                Visit Website
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {startup.services.split(",").map((service, index) => (
                  <Badge key={index} variant="secondary">
                    {service.trim()}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

