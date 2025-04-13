"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Mail, Globe, MapPin, Phone, Clock, ExternalLink, Star, ChevronRight, Heart,} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export interface Startup {
  _id?: string
  name: string
  description: string
  services: string
  email: string
  contact: string
  address: string
  website: string
  operatingHours: string
  image?: string // URL for the company logo
  coverImage?: string // URL for the company cover image
}

interface StartupCardProps {
  startup: Startup
  viewType?: "grid" | "list"
}

export default function StartupCard({ startup, viewType = "grid" }: StartupCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Generate random rating for demo purposes
  const rating = (Math.random() * 2 + 3).toFixed(1) // Random rating between 3.0 and 5.0
  const reviewCount = Math.floor(Math.random() * 50) + 5 // Random review count between 5 and 55

  // Format website URL for display
  const displayWebsite = startup.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

  // Format services as array
  const servicesList = startup.services
    .split(",")
    .map((service) => service.trim())
    .filter(Boolean)

  // Truncate description
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (viewType === "list") {
    return (
      <Card className="overflow-hidden transition-all hover:shadow-lg border-0 shadow-md group">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 relative">
            {startup.coverImage && !imageError ? (
              <img
                src={startup.coverImage}
                alt={startup.name}
                className="w-full h-full object-cover absolute inset-0"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-teal-500 to-emerald-600" />
            )}
            <div className="relative flex items-center justify-center p-6 min-h-[200px] md:min-h-full">
              <Avatar className="w-24 h-24 border-4 border-white/20 shadow-xl transition-transform group-hover:scale-110">
                <AvatarImage src={startup.image} alt={startup.name} />
                <AvatarFallback className="bg-white/10 text-white text-2xl font-semibold">
                  {getInitials(startup.name)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold group-hover:text-teal-600 transition-colors">{startup.name}</h3>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{startup.address}</span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${isFavorite ? "text-red-500 bg-red-50" : "text-muted-foreground hover:bg-red-50 hover:text-red-500"}`}
                onClick={toggleFavorite}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`} />
                <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
              </Button>
            </div>

            <div className="flex items-center mt-2 mb-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Number.parseInt(rating)
                        ? "text-yellow-500 fill-yellow-500"
                        : star - 0.5 <= Number.parseFloat(rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm font-medium">
                {rating} <span className="text-muted-foreground font-normal">({reviewCount} reviews)</span>
              </span>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              {truncateDescription(startup.description, 150)}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {servicesList.slice(0, 3).map((service, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors"
                >
                  {service}
                </Badge>
              ))}
              {servicesList.length > 3 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="cursor-help">
                      +{servicesList.length - 3} more
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      {servicesList.slice(3).map((service, index) => (
                        <p key={index} className="text-sm">
                          {service}
                        </p>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1 text-teal-600" />
                  <span>{startup.contact}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1 text-teal-600" />
                  <a
                    href={startup.website.startsWith("https") ? startup.website : `https://${startup.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {displayWebsite}
                  </a>
                </div>
              </div>

              <Button asChild className="bg-teal-600 hover:bg-teal-700 transition-colors">
                <Link to={`startup/${startup._id}`} className="gap-1">
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border-0 shadow-md h-full flex flex-col group">
      <div className="absolute right-4 top-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full ${
            isFavorite
              ? "text-red-500 bg-white/80 backdrop-blur-sm shadow-sm"
              : "text-muted-foreground bg-white/80 backdrop-blur-sm shadow-sm hover:text-red-500"
          }`}
          onClick={toggleFavorite}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`} />
          <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
        </Button>
      </div>

      <div className="h-32 relative">
        {startup.coverImage && !imageError ? (
          <img
            src={startup.coverImage}
            alt={startup.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-teal-500 to-emerald-600" />
        )}
        <div className="absolute -bottom-6 left-4">
          <Avatar className="w-12 h-12 border-2 border-white shadow-lg">
            <AvatarImage src={startup.image} alt={startup.name} />
            <AvatarFallback className="bg-teal-100 text-teal-700 font-semibold">
              {getInitials(startup.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <CardHeader className="pb-2 pt-8">
        <div>
          <CardTitle className="group-hover:text-teal-600 transition-colors">{startup.name}</CardTitle>
          <CardDescription className="flex items-center mt-1">
            <MapPin className="h-3 w-3 mr-1" />
            {startup.address}
          </CardDescription>
        </div>

        <div className="flex items-center mt-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= Number.parseInt(rating)
                    ? "text-yellow-500 fill-yellow-500"
                    : star - 0.5 <= Number.parseFloat(rating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm">
            <span className="font-medium">{rating}</span> <span className="text-muted-foreground">({reviewCount})</span>
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4 leading-relaxed">{truncateDescription(startup.description, 100)}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {servicesList.slice(0, 3).map((service, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors"
            >
              {service}
            </Badge>
          ))}
          {servicesList.length > 3 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-xs cursor-help">
                  +{servicesList.length - 3}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  {servicesList.slice(3).map((service, index) => (
                    <p key={index} className="text-sm">
                      {service}
                    </p>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-teal-600" />
            <span>{startup.contact}</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2 text-teal-600" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`mailto:${startup.email}`}
                    className="text-teal-600 hover:underline truncate max-w-[200px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {startup.email}
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{startup.email}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-teal-600" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="truncate max-w-[200px]">{startup.operatingHours}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{startup.operatingHours}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex justify-between pt-4">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800 transition-colors"
        >
          <a
            href={startup.website.startsWith("https") ? startup.website : `https://${startup.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Globe className="mr-1 h-4 w-4" />
            Website
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </Button>

        <Button size="sm" asChild className="bg-teal-600 hover:bg-teal-700 transition-colors">
          <Link to={`startup/${startup._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}