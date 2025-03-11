"use client"

import { useState, useEffect } from "react"
import { useAppSelector } from "../../hooks/storeHooks"
import { allStartup } from "../../store/features/startupSlice"
import StartupCard from "./StartupCard"
import { Search, Filter, ArrowUpDown, Building, X } from 'lucide-react'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Startup } from "./StartupCard"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../ui/select"
import { Badge } from "../ui/badge"
import { Tabs,  TabsList, TabsTrigger } from "../ui/tabs"
import { Card, CardContent,  CardHeader,} from "../ui/card"
import { Skeleton } from "../ui/skeleton"

// Extract unique services from startups for filtering
const extractServices = (startups: Startup[]) => {
  const servicesSet = new Set<string>()
  
  startups.forEach(startup => {
    const servicesList = startup.services.split(',').map((s: string) => s.trim())
    servicesList.forEach((service: string) => {
      if (service) servicesSet.add(service)
    })
  })
  
  return Array.from(servicesSet)
}

export default function ViewList() {
  const startups = useAppSelector(allStartup)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>("name")
  const [isLoading, setIsLoading] = useState(true)
  const [viewType, setViewType] = useState<"grid" | "list">("grid")
  
  // Extract all unique services for filtering
  const allServices = extractServices(startups)
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Filter and sort startups
  const filteredStartups = startups
    .filter(startup => {
      // Search filter
      const matchesSearch = 
        startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startup.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Services filter
      const matchesServices = 
        selectedServices.length === 0 || 
        selectedServices.some(service => 
          startup.services.toLowerCase().includes(service.toLowerCase())
        )
      
      return matchesSearch && matchesServices
    })
    .sort((a, b) => {
      // Sort logic
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })
  
  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    )
  }
  
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedServices([])
    setSortBy("name")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Explore Startups</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover innovative startups and businesses that are changing <b>Sierra Leone. </b> 
          Connect with them and explore their services.
        </p>
      </div>
      
      {/* Search and Filter Section */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search startups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                    {selectedServices.length > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {selectedServices.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Filter by Service</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {allServices.map((service) => (
                    <DropdownMenuCheckboxItem
                      key={service}
                      checked={selectedServices.includes(service)}
                      onCheckedChange={() => toggleService(service)}
                    >
                      {service}
                    </DropdownMenuCheckboxItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={clearFilters}>
                    Clear Filters
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    <span>Sort By</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>
              
              <Tabs value={viewType} onValueChange={(value) => setViewType(value as "grid" | "list")} className="hidden md:flex">
                <TabsList>
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {/* Active Filters */}
          {selectedServices.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedServices.map(service => (
                <Badge key={service} variant="secondary" className="flex items-center gap-1">
                  {service}
                  <button 
                    onClick={() => toggleService(service)}
                    className="ml-1 rounded-full hover:bg-muted p-0.5"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {service} filter</span>
                  </button>
                </Badge>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-xs h-7 px-2"
              >
                Clear all
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Results Summary */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {isLoading ? (
            <Skeleton className="h-6 w-32" />
          ) : (
            `${filteredStartups.length} ${filteredStartups.length === 1 ? 'startup' : 'startups'} found`
          )}
        </h2>
        
        {/* Mobile View Type Toggle */}
        <Tabs value={viewType} onValueChange={(value) => setViewType(value as "grid" | "list")} className="md:hidden">
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Startups Grid/List */}
      {isLoading ? (
        <div className={`grid gap-6 ${viewType === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredStartups.length > 0 ? (
        <div className={`grid gap-6 ${viewType === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredStartups.map((startup) => (
            <StartupCard 
              key={startup._id} 
              startup={startup} 
              viewType={viewType}
            />
          ))}
        </div>
      ) : (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No startups found</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              We couldn't find any startups matching your search criteria. Try adjusting your filters or search term.
            </p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
