"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Leaf,
  ArrowLeft,
  Share,
  Bookmark,
  CheckCircle,
  AlertTriangle,
  Info,
  ChevronRight,
  Home,
  Scan,
  Compass,
  User,
  Droplets,
  LeafIcon,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample product data
const productData = {
  id: 1,
  brand: "Glossier",
  name: "Milky Jelly Cleanser",
  category: "Facial Cleanser",
  size: "177ml / 6 fl oz",
  price: 18,
  image: "/placeholder.svg?height=400&width=400",
  scores: {
    overall: 92,
    safety: 95,
    sustainability: 88,
    ethics: 90,
  },
  highlights: [
    {
      type: "positive",
      text: "Fragrance-free formula",
      icon: "CheckCircle",
    },
    {
      type: "positive",
      text: "Suitable for sensitive skin",
      icon: "CheckCircle",
    },
    {
      type: "warning",
      text: "Contains phenoxyethanol (preservative)",
      icon: "AlertTriangle",
    },
    {
      type: "positive",
      text: "Cruelty-free and vegan",
      icon: "CheckCircle",
    },
  ],
  description:
    "A pH-balanced daily face wash that's gentle enough to use morning and night. The conditioning cleansing agents won't leave your skin feeling tight or dry, and the light gel texture transforms into a creamy lather that dissolves away makeup and grime.",
  ingredients: [
    {
      id: 1,
      name: "Water",
      scientificName: "Aqua/Eau",
      function: "Solvent",
      safetyLevel: "safe",
      safetyScore: 100,
      description:
        "Water serves as the primary solvent in many skincare formulations, dissolving other ingredients and creating a base for the product.",
      sustainabilityInfo:
        "Water usage in cosmetics production can have environmental impacts. Some brands implement water conservation practices.",
      potentialConcerns: "None for the ingredient itself. Some may be concerned about the purity of water used.",
    },
    {
      id: 2,
      name: "Glycerin",
      scientificName: "Glycerol",
      function: "Humectant",
      safetyLevel: "safe",
      safetyScore: 95,
      description:
        "Glycerin is a humectant that attracts and retains moisture in the skin, helping to keep it hydrated and soft.",
      sustainabilityInfo:
        "Can be derived from plant oils (vegetable glycerin) or animal fats, or synthesized. Plant-derived is more sustainable.",
      potentialConcerns: "Very rarely may cause mild irritation in extremely sensitive individuals.",
    },
    {
      id: 3,
      name: "Poloxamer 184",
      scientificName: "Poloxamer 184",
      function: "Surfactant",
      safetyLevel: "caution",
      safetyScore: 75,
      description:
        "A mild surfactant that helps cleanse the skin by removing dirt, oil, and makeup without stripping the skin's natural moisture.",
      sustainabilityInfo: "Synthetic ingredient with moderate environmental impact.",
      potentialConcerns: "May cause mild irritation in some individuals with very sensitive skin.",
    },
    {
      id: 4,
      name: "Phenoxyethanol",
      scientificName: "2-Phenoxyethanol",
      function: "Preservative",
      safetyLevel: "caution",
      safetyScore: 70,
      description: "A preservative that prevents the growth of bacteria and fungi in cosmetic products.",
      sustainabilityInfo: "Synthetic compound with moderate environmental impact.",
      potentialConcerns:
        "Potential skin irritation at higher concentrations. Some concerns about endocrine disruption, though evidence is limited.",
    },
    {
      id: 5,
      name: "Propanediol",
      scientificName: "1,3-Propanediol",
      function: "Solvent/Humectant",
      safetyLevel: "safe",
      safetyScore: 90,
      description:
        "A natural alternative to propylene glycol that helps products spread easily and enhances the delivery of other ingredients.",
      sustainabilityInfo: "Can be derived from corn glucose through a sustainable fermentation process.",
      potentialConcerns: "Generally considered safe with minimal concerns.",
    },
    {
      id: 6,
      name: "Allantoin",
      scientificName: "5-Ureidohydantoin",
      function: "Skin Conditioning",
      safetyLevel: "safe",
      safetyScore: 95,
      description:
        "A compound that soothes and protects the skin, promoting cell regeneration and healing. It has anti-irritant properties.",
      sustainabilityInfo:
        "Can be extracted from plants like comfrey or synthesized in a lab. Plant-derived sources are more sustainable.",
      potentialConcerns: "Generally considered very safe with minimal concerns.",
    },
    {
      id: 7,
      name: "Sodium Hyaluronate",
      scientificName: "Hyaluronic Acid Sodium Salt",
      function: "Humectant",
      safetyLevel: "safe",
      safetyScore: 98,
      description:
        "A salt form of hyaluronic acid that can hold up to 1000 times its weight in water, providing intense hydration to the skin.",
      sustainabilityInfo:
        "Traditionally derived from animal sources, but now commonly produced through bacterial fermentation.",
      potentialConcerns:
        "None significant. Some may experience temporary skin tightness if used in very dry environments without a moisturizer to seal it in.",
    },
  ],
}

// Get safety color based on safety level
const getSafetyColor = (safetyLevel: string) => {
  switch (safetyLevel) {
    case "safe":
      return "bg-[#a3be8c]"
    case "caution":
      return "bg-[#ebcb8b]"
    case "concern":
      return "bg-[#bf616a]"
    default:
      return "bg-gray-400"
  }
}

// Get safety text based on safety level
const getSafetyText = (safetyLevel: string) => {
  switch (safetyLevel) {
    case "safe":
      return "Safe for most skin types"
    case "caution":
      return "May cause sensitivity for some"
    case "concern":
      return "Potential concern for health or environment"
    default:
      return "Unknown safety profile"
  }
}

export default function ProductDetailPage() {
  const [activeTab, setActiveTab] = useState("ingredients")
  const [selectedIngredient, setSelectedIngredient] = useState<number | null>(null)
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [mobileNavTab, setMobileNavTab] = useState("home")

  // Refs for score tooltips
  const safetyScoreRef = useRef<HTMLDivElement>(null)
  const sustainabilityScoreRef = useRef<HTMLDivElement>(null)
  const ethicsScoreRef = useRef<HTMLDivElement>(null)

  // Handle ingredient click
  const handleIngredientClick = (id: number) => {
    setSelectedIngredient(id)
    setIsIngredientModalOpen(true)
  }

  // Get selected ingredient data
  const getSelectedIngredient = () => {
    return productData.ingredients.find((ingredient) => ingredient.id === selectedIngredient)
  }

  // Toggle save product
  const toggleSave = () => {
    setIsSaved(!isSaved)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/search" className="text-[#2e3440]">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-[#5e81ac]" />
              <span className="text-lg font-bold hidden sm:inline">CleanSlate</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-[#2e3440]">
              <Share className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#2e3440]"
              onClick={toggleSave}
              aria-label={isSaved ? "Unsave product" : "Save product"}
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? "fill-[#5e81ac] text-[#5e81ac]" : ""}`} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        {/* Product Basics Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="bg-[#e5f2f2] rounded-lg p-6 w-full max-w-[300px] aspect-square flex items-center justify-center">
              <Image
                src={productData.image || "/placeholder.svg"}
                alt={productData.name}
                width={250}
                height={250}
                className="object-contain"
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="mb-4">
              <Badge variant="outline" className="mb-2 text-xs">
                {productData.category}
              </Badge>
              <h2 className="text-sm text-gray-600 mb-1">{productData.brand}</h2>
              <h1 className="text-2xl font-bold text-[#2e3440] mb-2">{productData.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{productData.size}</span>
                <span className="text-lg font-medium">${productData.price.toFixed(2)}</span>
              </div>
            </div>

            {/* Score Section */}
            <div className="bg-[#e5f2f2] rounded-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center justify-center">
                  <div className="relative flex items-center justify-center w-20 h-20 rounded-full border-4 border-[#5e81ac]">
                    <span className="text-2xl font-bold text-[#5e81ac]">{productData.scores.overall}</span>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <TooltipProvider>
                    <div className="space-y-3 w-full">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1 cursor-help" ref={safetyScoreRef}>
                                <span className="text-sm font-medium">Safety</span>
                                <Info className="h-3 w-3 text-gray-400" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p className="text-xs max-w-[200px]">
                                Safety score evaluates potential health risks based on ingredient safety profiles and
                                concentrations.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                          <span className="text-sm font-medium">{productData.scores.safety}</span>
                        </div>
                        <Progress value={productData.scores.safety} className="h-2" indicatorClassName="bg-[#a3be8c]" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1 cursor-help" ref={sustainabilityScoreRef}>
                                <span className="text-sm font-medium">Sustainability</span>
                                <Info className="h-3 w-3 text-gray-400" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p className="text-xs max-w-[200px]">
                                Sustainability score measures environmental impact, including packaging, ingredient
                                sourcing, and manufacturing practices.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                          <span className="text-sm font-medium">{productData.scores.sustainability}</span>
                        </div>
                        <Progress
                          value={productData.scores.sustainability}
                          className="h-2"
                          indicatorClassName="bg-[#ebcb8b]"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1 cursor-help" ref={ethicsScoreRef}>
                                <span className="text-sm font-medium">Ethics</span>
                                <Info className="h-3 w-3 text-gray-400" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p className="text-xs max-w-[200px]">
                                Ethics score evaluates cruelty-free status, fair trade practices, and corporate social
                                responsibility.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                          <span className="text-sm font-medium">{productData.scores.ethics}</span>
                        </div>
                        <Progress value={productData.scores.ethics} className="h-2" indicatorClassName="bg-[#81a1c1]" />
                      </div>
                    </div>
                  </TooltipProvider>
                </div>
              </div>
            </div>

            {/* Highlights Section */}
            <div className="mb-6">
              <h2 className="text-lg font-medium text-[#2e3440] mb-3">Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {productData.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      highlight.type === "positive" ? "bg-[#a3be8c]/10" : "bg-[#d08770]/10"
                    }`}
                  >
                    {highlight.type === "positive" ? (
                      <CheckCircle className="h-5 w-5 text-[#a3be8c] shrink-0" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-[#d08770] shrink-0" />
                    )}
                    <span className="text-sm">{highlight.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <Tabs defaultValue="ingredients" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger
              value="ingredients"
              className="data-[state=active]:bg-[#5e81ac] data-[state=active]:text-white"
            >
              Ingredients
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-[#5e81ac] data-[state=active]:text-white">
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="alternatives"
              className="data-[state=active]:bg-[#5e81ac] data-[state=active]:text-white"
            >
              Alternatives
            </TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-[#5e81ac] data-[state=active]:text-white">
              Details
            </TabsTrigger>
          </TabsList>

          {/* Ingredients Tab Content */}
          <TabsContent value="ingredients" className="mt-0">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-[#2e3440]">Full Ingredient List</h2>
                <Link href="/ingredients/1" className="text-[#5e81ac] text-sm font-medium flex items-center">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="space-y-2">
                {productData.ingredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="border rounded-lg p-4 flex items-center justify-between cursor-pointer hover:border-[#5e81ac] transition-colors"
                    onClick={() => handleIngredientClick(ingredient.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getSafetyColor(ingredient.safetyLevel)}`}></div>
                      <div>
                        <h3 className="font-medium text-[#2e3440]">{ingredient.name}</h3>
                        <p className="text-sm text-gray-500">{ingredient.function}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Reviews Tab Content (placeholder) */}
          <TabsContent value="reviews" className="mt-0">
            <div className="bg-[#e5f2f2] rounded-lg p-6 text-center">
              <h2 className="text-lg font-medium text-[#2e3440] mb-2">Reviews Coming Soon</h2>
              <p className="text-gray-600">We're currently collecting user reviews for this product.</p>
            </div>
          </TabsContent>

          {/* Alternatives Tab Content (placeholder) */}
          <TabsContent value="alternatives" className="mt-0">
            <div className="bg-[#e5f2f2] rounded-lg p-6 text-center">
              <h2 className="text-lg font-medium text-[#2e3440] mb-2">Alternatives Coming Soon</h2>
              <p className="text-gray-600">We're analyzing similar products to suggest cleaner alternatives.</p>
            </div>
          </TabsContent>

          {/* Details Tab Content */}
          <TabsContent value="details" className="mt-0">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-[#2e3440] mb-2">Product Description</h2>
                <p className="text-gray-600">{productData.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#e5f2f2] rounded-lg p-4 flex flex-col items-center text-center">
                  <Droplets className="h-8 w-8 text-[#5e81ac] mb-2" />
                  <h3 className="font-medium text-[#2e3440] mb-1">Skin Type</h3>
                  <p className="text-sm text-gray-600">All Skin Types</p>
                </div>
                <div className="bg-[#e5f2f2] rounded-lg p-4 flex flex-col items-center text-center">
                  <LeafIcon className="h-8 w-8 text-[#5e81ac] mb-2" />
                  <h3 className="font-medium text-[#2e3440] mb-1">Sustainability</h3>
                  <p className="text-sm text-gray-600">Recyclable Packaging</p>
                </div>
                <div className="bg-[#e5f2f2] rounded-lg p-4 flex flex-col items-center text-center">
                  <ShieldCheck className="h-8 w-8 text-[#5e81ac] mb-2" />
                  <h3 className="font-medium text-[#2e3440] mb-1">Certifications</h3>
                  <p className="text-sm text-gray-600">Cruelty-Free, Vegan</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Ingredient Detail Modal */}
        <Dialog open={isIngredientModalOpen} onOpenChange={setIsIngredientModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-[#2e3440]">{getSelectedIngredient()?.name}</DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                {getSelectedIngredient()?.scientificName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <h3 className="text-sm font-medium text-gray-500">What It Does</h3>
                <p className="text-[#2e3440]">{getSelectedIngredient()?.description}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Safety Assessment</h3>
                  <Badge
                    className={`${
                      getSelectedIngredient()?.safetyLevel === "safe"
                        ? "bg-[#a3be8c]"
                        : getSelectedIngredient()?.safetyLevel === "caution"
                          ? "bg-[#ebcb8b]"
                          : "bg-[#bf616a]"
                    } text-white`}
                  >
                    {getSelectedIngredient()?.safetyLevel && getSafetyText(getSelectedIngredient()?.safetyLevel || "")}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">Safety Score:</span>
                  <span className="font-medium">{getSelectedIngredient()?.safetyScore}/100</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Sustainability</h3>
                <p className="text-[#2e3440]">{getSelectedIngredient()?.sustainabilityInfo}</p>
              </div>

              {getSelectedIngredient()?.potentialConcerns && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-[#d08770]" />
                    Potential Concerns
                  </h3>
                  <p className="text-[#2e3440]">{getSelectedIngredient()?.potentialConcerns}</p>
                </div>
              )}

              <div className="flex justify-end">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>

      {/* Action Buttons (fixed at bottom on mobile) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:hidden">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-[#5e81ac] text-[#5e81ac]"
            onClick={toggleSave}
            aria-label={isSaved ? "Unsave product" : "Save product"}
          >
            <Bookmark className={`h-5 w-5 mr-2 ${isSaved ? "fill-[#5e81ac]" : ""}`} />
            {isSaved ? "Saved" : "Save Product"}
          </Button>
          <Button className="flex-1 bg-[#5e81ac] hover:bg-[#5e81ac]/90">Find Cleaner Alternatives</Button>
        </div>
      </div>

      {/* Desktop Action Buttons */}
      <div className="hidden md:flex gap-3 container mx-auto px-4 py-6">
        <Button
          variant="outline"
          className="border-[#5e81ac] text-[#5e81ac]"
          onClick={toggleSave}
          aria-label={isSaved ? "Unsave product" : "Save product"}
        >
          <Bookmark className={`h-5 w-5 mr-2 ${isSaved ? "fill-[#5e81ac]" : ""}`} />
          {isSaved ? "Saved" : "Save Product"}
        </Button>
        <Button className="bg-[#5e81ac] hover:bg-[#5e81ac]/90">Find Cleaner Alternatives</Button>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40 mt-16">
        <div className="flex justify-around items-center h-16">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center justify-center w-full h-full ${mobileNavTab === "home" ? "text-[#5e81ac]" : "text-gray-500"}`}
            onClick={() => setMobileNavTab("home")}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            href="#"
            className={`flex flex-col items-center justify-center w-full h-full ${mobileNavTab === "scan" ? "text-[#5e81ac]" : "text-gray-500"}`}
            onClick={() => setMobileNavTab("scan")}
          >
            <Scan className="h-5 w-5" />
            <span className="text-xs mt-1">Scan</span>
          </Link>
          <Link
            href="/discover"
            className={`flex flex-col items-center justify-center w-full h-full ${mobileNavTab === "discover" ? "text-[#5e81ac]" : "text-gray-500"}`}
            onClick={() => setMobileNavTab("discover")}
          >
            <Compass className="h-5 w-5" />
            <span className="text-xs mt-1">Discover</span>
          </Link>
          <Link
            href="#"
            className={`flex flex-col items-center justify-center w-full h-full ${mobileNavTab === "saved" ? "text-[#5e81ac]" : "text-gray-500"}`}
            onClick={() => setMobileNavTab("saved")}
          >
            <Bookmark className="h-5 w-5" />
            <span className="text-xs mt-1">Saved</span>
          </Link>
          <Link
            href="#"
            className={`flex flex-col items-center justify-center w-full h-full ${mobileNavTab === "profile" ? "text-[#5e81ac]" : "text-gray-500"}`}
            onClick={() => setMobileNavTab("profile")}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
