"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  Building,
  Mail,
  Globe,
  MapPin,
  Phone,
  Clock,
  Briefcase,
  ArrowLeft,
  Loader2,
  CheckCircle,
  X,
  ImageIcon,
} from "lucide-react"
import { Button } from "../ui/button"
import { useAppDispatch } from "../../hooks/storeHooks"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { fetchStartups } from "../../store/features/startupSlice"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Alert, AlertDescription } from "../ui/alert"
import { Separator } from "../ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import axios from "axios"

// Define service categories with their display names
const SERVICE_CATEGORIES = [
  { value: "CROWD_FUNDING", label: "Crowd Funding" },
  { value: "AI_ML", label: "AI/ML" },
  { value: "AR_VR", label: "AR/VR" },
  { value: "HEALTHCARE", label: "Healthcare" },
  { value: "E_COMMERCE", label: "E-Commerce" },
  { value: "FINTECH", label: "Fintech" },
  { value: "TECHNOLOGY", label: "Technology" },
  { value: "FOOD", label: "Food" },
  { value: "CLOUD_COMPUTING", label: "Cloud Computing" },
  { value: "CYBER_SECURITY", label: "Cybersecurity" },
  { value: "BIOTECHNOLOGY", label: "Biotechnology" },
  { value: "SOFTWARE_DEVELOPMENT", label: "Software Development" },
  { value: "BLOCKCHAIN", label: "Blockchain" },
  { value: "HEALTHTECH", label: "Health Tech" },
  { value: "MEDICAL_DEVICES", label: "Medical Devices" },
  { value: "MENTAL_HEALTH", label: "Mental Health" },
  { value: "EDUCATION", label: "Education" },
]

let BASE_URL
if (import.meta.env.VITE_NODE_ENV === "development") {
  BASE_URL = "http://localhost:3000/api/startups"
} else {
  BASE_URL = "https://startup-directory-server.vercel.app/api/startups"
}

const CreateStartup = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    services: "",
    email: "",
    contact: "",
    address: "",
    operatingHours: "",
    website: "",
    logo: null as File | null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, services: value }))

    // Clear error when user selects a value
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: "" }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, logo: "Please upload an image file" }))
      return
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, logo: "Image size should be less than 5MB" }))
      return
    }

    // Clear any previous errors
    if (errors.logo) {
      setErrors((prev) => ({ ...prev, logo: "" }))
    }

    // Update form data
    setFormData((prev) => ({ ...prev, logo: file }))

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, logo: null }))
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Basic validation
    if (!formData.name.trim()) newErrors.name = "Startup name is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.services) newErrors.services = "Please select a service category"

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Contact validation
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required"
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.contact)) {
      newErrors.contact = "Please enter a valid phone number"
    }

    // Address validation
    if (!formData.address.trim()) newErrors.address = "Address is required"

    // Operating hours validation
    if (!formData.operatingHours.trim()) newErrors.operatingHours = "Operating hours are required"

    // Website validation
    if (!formData.website.trim()) {
      newErrors.website = "Website URL is required"
    } else if (!/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}([/\w-]*)*\/?$/.test(formData.website)) {
      newErrors.website = "Please enter a valid website URL"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      // If there are validation errors, switch to the tab with the first error
      const errorFields = Object.keys(errors)

      if (errorFields.some((field) => ["name", "description", "services"].includes(field))) {
        setActiveTab("basic")
      } else if (errorFields.some((field) => ["email", "contact", "website"].includes(field))) {
        setActiveTab("contact")
      } else if (errorFields.some((field) => ["address", "operatingHours"].includes(field))) {
        setActiveTab("location")
      }

      return
    }

    try {
      setIsSubmitting(true)
      // Create FormData object to handle text and file data
      const submissionData = new FormData();
      submissionData.append("name", formData.name);
      submissionData.append("description", formData.description);
      submissionData.append("services", formData.services);
      submissionData.append("email", formData.email);
      submissionData.append("contact", formData.contact);
      submissionData.append("address", formData.address);
      submissionData.append("operatingHours", formData.operatingHours);
      submissionData.append("website", formData.website);
      if (formData.logo) {
        submissionData.append("logo", formData.logo);
      }

      const response = await axios.post(BASE_URL, submissionData)
      if(response.status === 201) {
        setSuccess(true)
        await dispatch(fetchStartups())
        setFormData({
          name: "",
          description: "",
          services: "",
          email: "",
          contact: "",
          address: "",
          operatingHours: "",
          website: "",
          logo: null,
        })
        setImagePreview(null)
        navigate("/")
      }
    
    } catch (error) {
      console.error("Failed to create startup:", error)
      setErrors({ submit: "Failed to create startup. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const goToNextTab = () => {
    if (activeTab === "basic") setActiveTab("contact")
    else if (activeTab === "contact") setActiveTab("location")
  }

  const goToPrevTab = () => {
    if (activeTab === "location") setActiveTab("contact")
    else if (activeTab === "contact") setActiveTab("basic")
  }

  return (
    <div className="min-h-screen container mx-auto px-4 py-8 max-w-3xl">
      <Button
        variant="ghost"
        className="mb-6 hover:bg-slate-100 transition-colors flex items-center"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Startups
      </Button>

      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="h-16 bg-gradient-to-r from-teal-500 to-emerald-600"></div>
        <CardHeader className="text-center relative pb-2">
          <div className="mx-auto bg-white p-4 rounded-full shadow-md absolute -top-10 left-1/2 transform -translate-x-1/2">
            <Building className="h-8 w-8 text-teal-600" />
          </div>
          <div className="mt-8">
            <CardTitle className="text-3xl font-bold">Create a Startup</CardTitle>
            <CardDescription className="text-slate-500 mt-2">
              Fill out the form below to add your startup to our directory
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-3 p-1 bg-slate-100 rounded-lg">
                <TabsTrigger
                  value="basic"
                  className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm"
                >
                  <Building className="h-4 w-4" />
                  <span className="hidden sm:inline">Basic Info</span>
                  <span className="sm:hidden">Basic</span>
                </TabsTrigger>
                <TabsTrigger
                  value="contact"
                  className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm"
                >
                  <Mail className="h-4 w-4" />
                  <span className="hidden sm:inline">Contact</span>
                  <span className="sm:hidden">Contact</span>
                </TabsTrigger>
                <TabsTrigger
                  value="location"
                  className="flex items-center gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm"
                >
                  <MapPin className="h-4 w-4" />
                  <span className="hidden sm:inline">Location</span>
                  <span className="sm:hidden">Location</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <CardContent className="pt-6">
              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium flex items-center">
                    Startup Name <span className="text-destructive ml-1">*</span>
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-600" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your startup name"
                      className={`pl-10 focus-visible:ring-teal-500 ${
                        errors.name ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium flex items-center">
                    Description <span className="text-destructive ml-1">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Briefly describe your startup and what it does"
                    className={`min-h-[120px] focus-visible:ring-teal-500 ${
                      errors.description ? "border-destructive focus-visible:ring-destructive" : ""
                    }`}
                  />
                  {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="services" className="text-sm font-medium flex items-center">
                    Service Category <span className="text-destructive ml-1">*</span>
                  </Label>
                  <Select value={formData.services} onValueChange={handleSelectChange}>
                    <SelectTrigger
                      id="services"
                      className={`focus-visible:ring-teal-500 ${
                        errors.services ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 text-teal-600" />
                        <SelectValue placeholder="Select a service category" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {SERVICE_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.services && <p className="text-destructive text-sm">{errors.services}</p>}
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor="logo" className="text-sm font-medium flex items-center">
                    Startup Logo
                  </Label>
                  <div className="flex flex-col gap-4">
                    {imagePreview ? (
                      <div className="relative w-full max-w-[200px] h-[200px] border rounded-lg overflow-hidden">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Logo preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                        >
                          <X className="h-4 w-4 text-gray-700" />
                        </button>
                      </div>
                    ) : (
                      <div
                        className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-3 rounded-full bg-slate-100">
                            <ImageIcon className="h-6 w-6 text-teal-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Click to upload logo</p>
                            <p className="text-xs text-slate-500">SVG, PNG, JPG (max. 5MB)</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      id="logo"
                      name="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {errors.logo && <p className="text-destructive text-sm">{errors.logo}</p>}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="button"
                    onClick={goToNextTab}
                    className="bg-teal-600 hover:bg-teal-700 transition-colors"
                  >
                    Continue to Contact
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center">
                    Email Address <span className="text-destructive ml-1">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-600" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your business email"
                      className={`pl-10 focus-visible:ring-teal-500 ${
                        errors.email ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-sm font-medium flex items-center">
                    Contact Number <span className="text-destructive ml-1">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-600" />
                    <Input
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="Enter your contact number"
                      className={`pl-10 focus-visible:ring-teal-500 ${
                        errors.contact ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                    />
                  </div>
                  {errors.contact && <p className="text-destructive text-sm">{errors.contact}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm font-medium flex items-center">
                    Website URL <span className="text-destructive ml-1">*</span>
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-600" />
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="Enter your website URL"
                      className={`pl-10 focus-visible:ring-teal-500 ${
                        errors.website ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                    />
                  </div>
                  {errors.website && <p className="text-destructive text-sm">{errors.website}</p>}
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goToPrevTab}
                    className="border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={goToNextTab}
                    className="bg-teal-600 hover:bg-teal-700 transition-colors"
                  >
                    Continue to Location
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="location" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium flex items-center">
                    Business Address <span className="text-destructive ml-1">*</span>
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-600" />
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your business address"
                      className={`pl-10 focus-visible:ring-teal-500 ${
                        errors.address ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                    />
                  </div>
                  {errors.address && <p className="text-destructive text-sm">{errors.address}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operatingHours" className="text-sm font-medium flex items-center">
                    Operating Hours <span className="text-destructive ml-1">*</span>
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-600" />
                    <Input
                      id="operatingHours"
                      name="operatingHours"
                      value={formData.operatingHours}
                      onChange={handleChange}
                      placeholder="e.g. Mon-Fri: 9 AM - 5 PM"
                      className={`pl-10 focus-visible:ring-teal-500 ${
                        errors.operatingHours ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                    />
                  </div>
                  {errors.operatingHours && <p className="text-destructive text-sm">{errors.operatingHours}</p>}
                </div>

                {errors.submit && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertDescription>{errors.submit}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="bg-green-50 text-green-700 border-green-200 mt-4">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <AlertDescription>Startup created successfully! Redirecting...</AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goToPrevTab}
                    className="border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-teal-600 hover:bg-teal-700 transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Startup"
                    )}
                  </Button>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </form>

        <Separator />

        <CardFooter className="flex justify-center p-6 bg-slate-50">
          <p className="text-sm text-slate-500">
            By submitting this form, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CreateStartup
