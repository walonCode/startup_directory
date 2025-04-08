"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Building, Mail, Globe, MapPin, Phone, Clock, ExternalLink, Star, ChevronRight, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

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
}

interface StartupCardProps {
  startup: Startup
  viewType?: "grid" | "list"
}

export default function StartupCard({ startup, viewType = "grid" }: StartupCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

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

  if (viewType === "list") {
    return (
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 bg-primary/5 flex items-center justify-center p-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Building className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{startup.name}</h3>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{startup.address}</span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${isFavorite ? "text-red-500" : "text-muted-foreground"}`}
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
              <span className="ml-2 text-sm">
                {rating} ({reviewCount} reviews)
              </span>
            </div>

            <p className="text-muted-foreground mb-4">{truncateDescription(startup.description, 150)}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {servicesList.slice(0, 3).map((service, index) => (
                <Badge key={index} variant="secondary">
                  {service}
                </Badge>
              ))}
              {servicesList.length > 3 && <Badge variant="outline">+{servicesList.length - 3} more</Badge>}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="mr-4">{startup.contact}</span>
                <Globe className="h-4 w-4 mr-1 text-muted-foreground" />
                <a
                  href={startup.website.startsWith("https") ? startup.website : `https://${startup.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {displayWebsite}
                </a>
              </div>

              <Button asChild>
                <Link to={`startup/${startup._id}`}>
                  View Details
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
      <CardHeader className="pb-2 relative">
        <Button
          variant="ghost"
          size="icon"
          className={`absolute right-4 top-4 rounded-full ${isFavorite ? "text-red-500" : "text-muted-foreground"}`}
          onClick={toggleFavorite}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`} />
          <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
        </Button>

        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <Building className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>{startup.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {startup.address}
            </CardDescription>
          </div>
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
            {rating} ({reviewCount})
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4">{truncateDescription(startup.description, 100)}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {servicesList.slice(0, 3).map((service, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
          {servicesList.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{servicesList.length - 3}
            </Badge>
          )}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{startup.contact}</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href={`mailto:${startup.email}`} className="text-primary hover:underline truncate max-w-[200px]">
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
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="truncate" title={startup.operatingHours}>
              {startup.operatingHours}
            </span>
          </div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex justify-between pt-4">
        <Button variant="outline" size="sm" asChild>
          <a
            href={startup.website.startsWith("http") ? startup.website : `https://${startup.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Globe className="mr-1 h-4 w-4" />
            Website
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </Button>

        <Button size="sm" asChild>
          <Link to={`startup/${startup._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

