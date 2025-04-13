import { useState, useEffect } from "react"
import { useAppSelector } from "../../hooks/storeHooks"
import { allStartup } from "../../store/features/startupSlice"
import StartupCard from "./StartupCard"
import { Search, Filter, ArrowUpDown, Building, X, Sparkles } from 'lucide-react'
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
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { Card, CardContent, CardHeader } from "../ui/card"
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

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const totalPages = Math.ceil(filteredStartups.length / itemsPerPage)
  const paginatedStartups = filteredStartups.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const nextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToPage = (_page:number) => setCurrentPage(_page);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header Section */}
        <div className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Discover Amazing Startups</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            Explore Startups
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover innovative startups and businesses that are changing <b>Sierra Leone. </b> 
            Connect with them and explore their services.
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <Card className="mb-8 shadow-lg border-0 bg-white/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search startups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/80 backdrop-blur-sm border-0 shadow-sm"
                />
              </div>
              
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 bg-white/80 backdrop-blur-sm">
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
                  <SelectTrigger className="w-[180px] bg-white/80 backdrop-blur-sm">
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
                  <TabsList className="bg-white/80 backdrop-blur-sm">
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
                  <Badge key={service} variant="secondary" className="flex items-center gap-1 bg-white/80 backdrop-blur-sm">
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">
            {isLoading ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              `${filteredStartups.length} ${filteredStartups.length === 1 ? 'startup' : 'startups'} found`
            )}
          </h2>
          
          {/* Mobile View Type Toggle */}
          <Tabs value={viewType} onValueChange={(value) => setViewType(value as "grid" | "list")} className="md:hidden">
            <TabsList className="bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Startups Grid/List */}
        {isLoading ? (
          <div className={`grid gap-6 ${viewType === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
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
            {paginatedStartups.map((startup) => (
              <StartupCard 
                key={startup._id} 
                startup={startup} 
                viewType={viewType}
              />
            ))}
          </div>
        ) : (
          <Card className="w-full border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Building className="h-16 w-16 text-muted-foreground mb-6" />
              <h3 className="text-2xl font-semibold mb-3">No startups found</h3>
              <p className="text-muted-foreground text-center max-w-md mb-8">
                We couldn't find any startups matching your search criteria. Try adjusting your filters or search term.
              </p>
              <Button onClick={clearFilters} size="lg" className="px-8">
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
        
        {/* Pagination Controls */}
        {filteredStartups.length > 0 && (
          <div className="flex justify-between items-center mt-12 bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
            <Button 
              onClick={prevPage} 
              disabled={currentPage === 1}
              variant="outline"
              className="bg-white/80"
            >
              Previous
            </Button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Select 
                value={currentPage.toString()} 
                onValueChange={(value) => goToPage(Number(value))}
              >
                <SelectTrigger className="w-[70px] bg-white/80">
                  {currentPage}
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <SelectItem key={i} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={nextPage} 
              disabled={currentPage === totalPages}
              variant="outline"
              className="bg-white/80"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}