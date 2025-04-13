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
  Users,
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
import { Avatar, AvatarFallback } from "../ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"

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
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-center text-destructive">Startup Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center pt-2">
            <p className="text-muted-foreground">The startup you're looking for doesn't exist or has been removed.</p>
          </CardContent>
          <CardFooter className="flex justify-center pt-2 pb-6">
            <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
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

  // Parse services into array
  const servicesList = startup.services.split(",").map((service) => service.trim())

  return (
    <div className="container min-h-screen mx-auto px-4 py-8 max-w-6xl">
      <Button
        variant="ghost"
        className="mb-6 hover:bg-slate-100 transition-colors"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Startups
      </Button>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content - 2/3 width on medium screens and up */}
        <div className="md:col-span-2 space-y-6">
          <Card className="overflow-hidden border-0 shadow-md">
            <div className="h-24 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
            <CardHeader className="-mt-12 pb-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20 border-4 border-white bg-white shadow-md">
                  <AvatarImage src={startup.image} alt="Startup Logo" /> 
                  <AvatarFallback className="bg-teal-100 text-teal-700 text-2xl font-bold">
                    {startup.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="pt-10">
                  <CardTitle className="text-3xl font-bold">{startup.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1 text-sm">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    {startup.address}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Building className="h-5 w-5 mr-2 text-teal-600" />
                About
              </h3>
              <p className="text-muted-foreground leading-relaxed">{startup.description}</p>

              <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-teal-600" />
                Services Offered
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {servicesList.map((service, index) => (
                  <Badge key={index} variant="secondary" className="bg-teal-50 text-teal-700 hover:bg-teal-100">
                    {service}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-lg bg-slate-100 p-1">
              <TabsTrigger
                value="reviews"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm"
              >
                <Star className="h-4 w-4 mr-2" />
                Reviews ({reviews.length})
              </TabsTrigger>
              <TabsTrigger
                value="info"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm"
              >
                <Globe className="h-4 w-4 mr-2" />
                Contact Information
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="space-y-4 pt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold flex items-center">
                  <Users className="h-5 w-5 mr-2 text-teal-600" />
                  Customer Reviews
                </h3>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-teal-600 hover:bg-teal-700">
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
                            className="focus-visible:ring-teal-500"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="rating">Rating</Label>
                          <Select value={rating} onValueChange={setRating}>
                            <SelectTrigger className="focus-visible:ring-teal-500">
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
                            className="focus-visible:ring-teal-500"
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
                        <Button type="submit" disabled={isSubmitting} className="bg-teal-600 hover:bg-teal-700">
                          {isSubmitting ? "Submitting..." : "Submit Review"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {reviews.length === 0 ? (
                <Card className="border border-dashed border-slate-200 bg-slate-50">
                  <CardContent className="py-12 text-center">
                    <Star className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                    <p className="text-muted-foreground">No reviews yet. Be the first to leave a review!</p>
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      variant="outline"
                      className="mt-4 border-teal-200 text-teal-700 hover:bg-teal-50"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Review
                    </Button>
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

            <TabsContent value="info" className="pt-6">
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-xl">
                    <Phone className="h-5 w-5 mr-2 text-teal-600" />
                    Contact Information
                  </CardTitle>
                  <CardDescription>Get in touch with {startup.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <Mail className="h-5 w-5 mr-3 text-teal-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a
                          href={`mailto:${startup.email}`}
                          className="font-medium hover:text-teal-600 transition-colors"
                        >
                          {startup.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <Phone className="h-5 w-5 mr-3 text-teal-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <a
                          href={`tel:${startup.contact}`}
                          className="font-medium hover:text-teal-600 transition-colors"
                        >
                          {startup.contact}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <Globe className="h-5 w-5 mr-3 text-teal-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Website</p>
                        <a
                          href={startup.website.startsWith("https") ? startup.website : `https://${startup.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:text-teal-600 transition-colors"
                        >
                          {startup.website.slice(0,20)}....
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <Clock className="h-5 w-5 mr-3 text-teal-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Operating Hours</p>
                        <p className="font-medium">{startup.operatingHours}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 pb-6">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700" asChild>
                    <a
                      href={startup.website.startsWith("http") ? startup.website : `https://${startup.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 1/3 width on medium screens and up */}
        <div className="space-y-6">
          <Card className="border-0 shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 py-4">
              <CardTitle className="text-center text-white">Startup Overview</CardTitle>
            </div>
            <CardContent className="space-y-4 pt-6">
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                <span className="text-muted-foreground flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  Average Rating
                </span>
                <div className="flex items-center bg-teal-50 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-bold text-teal-700">{avgRating}</span>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                <span className="text-muted-foreground flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Total Reviews
                </span>
                <div className="bg-teal-50 px-3 py-1 rounded-full">
                  <span className="font-bold text-teal-700">{reviews.length}</span>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                <span className="text-muted-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Founded
                </span>
                <div className="bg-teal-50 px-3 py-1 rounded-full">
                  <span className="font-bold text-teal-700">2020</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-6">
              <Button
                className="w-full bg-white border-teal-200 text-teal-700 hover:bg-teal-50"
                variant="outline"
                asChild
              >
                <a href={`tel:${startup.contact}`} className="flex items-center justify-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Now
                </a>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <Briefcase className="h-5 w-5 mr-2 text-teal-600" />
                Key Services
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-2">
                {servicesList.slice(0, 6).map((service, index) => (
                  <div key={index} className="flex items-center p-3 bg-slate-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 mr-2 text-teal-600" />
                    <span className="text-sm">{service}</span>
                  </div>
                ))}
              </div>
              {servicesList.length > 6 && (
                <p className="text-center text-sm text-muted-foreground mt-3">
                  +{servicesList.length - 6} more services
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

