"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Share, ArrowRight, Plus, Minus, CheckCircle, Save, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

// Sample original product data
const originalProduct = {
  id: 1,
  brand: "Glossier",
  name: "Milky Jelly Cleanser",
  category: "Facial Cleanser",
  size: "177ml / 6 fl oz",
  price: 18,
  image: "/placeholder.svg?height=400&width=400",
  scores: {
    overall: 78,
    safety: 75,
    sustainability: 80,
    ethics: 82,
  },
  ingredients: [
    {
      id: 1,
      name: "Water",
      function: "Solvent",
      safetyLevel: "safe",
    },
    {
      id: 2,
      name: "Glycerin",
      function: "Humectant",
      safetyLevel: "safe",
    },
    {
      id: 3,
      name: "Sodium Lauryl Sulfate",
      function: "Surfactant",
      safetyLevel: "concern",
      concern: "Potential irritant, can be drying",
    },
    {
      id: 4,
      name: "Phenoxyethanol",
      function: "Preservative",
      safetyLevel: "caution",
      concern: "Potential irritant at higher concentrations",
    },
    {
      id: 5,
      name: "Fragrance",
      function: "Fragrance",
      safetyLevel: "concern",
      concern: "Common allergen, undisclosed ingredients",
    },
  ],
}

// Sample alternative products data
const alternativeProducts = [
  {
    id: 2,
    brand: "Youth To The People",
    name: "Superfood Cleanser",
    category: "Facial Cleanser",
    size: "237ml / 8 fl oz",
    price: 36,
    image: "/placeholder.svg?height=400&width=400",
    scores: {
      overall: 94,
      safety: 95,
      sustainability: 92,
      ethics: 94,
    },
    improvements: {
      safety: "+20%",
      sustainability: "+12%",
      ethics: "+12%",
    },
    keyImprovement: "20% safer",
    ingredients: [
      {
        id: 1,
        name: "Water",
        function: "Solvent",
        safetyLevel: "safe",
      },
      {
        id: 2,
        name: "Glycerin",
        function: "Humectant",
        safetyLevel: "safe",
      },
      {
        id: 3,
        name: "Sodium Cocoyl Glutamate",
        function: "Surfactant",
        safetyLevel: "safe",
        benefit: "Gentle, non-irritating surfactant",
      },
      {
        id: 4,
        name: "Sodium Benzoate",
        function: "Preservative",
        safetyLevel: "safe",
        benefit: "Safer preservative alternative",
      },
      {
        id: 5,
        name: "Green Tea Extract",
        function: "Antioxidant",
        safetyLevel: "safe",
        benefit: "Added antioxidant benefits",
      },
    ],
    missingIngredients: ["Sodium Lauryl Sulfate", "Phenoxyethanol", "Fragrance"],
    addedBenefits: [
      "Antioxidant-rich formula",
      "Fragrance-free",
      "Suitable for sensitive skin",
      "Sustainable packaging",
    ],
    reviewHighlights: [
      "Much gentler on my sensitive skin than my previous cleanser",
      "Doesn't strip my skin and leaves it feeling hydrated",
      "Love that it's fragrance-free and still feels luxurious",
    ],
  },
  {
    id: 3,
    brand: "Cocokind",
    name: "Oil to Milk Cleanser",
    category: "Facial Cleanser",
    size: "75ml / 2.5 fl oz",
    price: 18,
    image: "/placeholder.svg?height=400&width=400",
    scores: {
      overall: 90,
      safety: 92,
      sustainability: 95,
      ethics: 88,
    },
    improvements: {
      safety: "+17%",
      sustainability: "+15%",
      ethics: "+6%",
    },
    keyImprovement: "More sustainable",
    ingredients: [
      {
        id: 1,
        name: "Helianthus Annuus (Sunflower) Seed Oil",
        function: "Emollient",
        safetyLevel: "safe",
      },
      {
        id: 2,
        name: "Glycerin",
        function: "Humectant",
        safetyLevel: "safe",
      },
      {
        id: 3,
        name: "Caprylic/Capric Triglyceride",
        function: "Emollient",
        safetyLevel: "safe",
        benefit: "Gentle, non-irritating oil",
      },
      {
        id: 4,
        name: "Potassium Sorbate",
        function: "Preservative",
        safetyLevel: "safe",
        benefit: "Safer preservative alternative",
      },
    ],
    missingIngredients: ["Sodium Lauryl Sulfate", "Phenoxyethanol", "Fragrance"],
    addedBenefits: [
      "Oil-based formula that transforms to milk",
      "Fragrance-free",
      "Recyclable packaging",
      "Woman-owned business",
    ],
    reviewHighlights: [
      "Perfect for removing makeup without stripping my skin",
      "Love the sustainable packaging and brand ethics",
      "Gentle enough for my rosacea-prone skin",
    ],
  },
  {
    id: 4,
    brand: "Krave Beauty",
    name: "Matcha Hemp Hydrating Cleanser",
    category: "Facial Cleanser",
    size: "120ml / 4 fl oz",
    price: 16,
    image: "/placeholder.svg?height=400&width=400",
    scores: {
      overall: 92,
      safety: 94,
      sustainability: 88,
      ethics: 90,
    },
    improvements: {
      safety: "+19%",
      sustainability: "+8%",
      ethics: "+8%",
    },
    keyImprovement: "19% safer",
    ingredients: [
      {
        id: 1,
        name: "Water",
        function: "Solvent",
        safetyLevel: "safe",
      },
      {
        id: 2,
        name: "Glycerin",
        function: "Humectant",
        safetyLevel: "safe",
      },
      {
        id: 3,
        name: "Camellia Sinensis Leaf Powder",
        function: "Antioxidant",
        safetyLevel: "safe",
        benefit: "Antioxidant-rich matcha",
      },
      {
        id: 4,
        name: "Cannabis Sativa (Hemp) Seed Oil",
        function: "Emollient",
        safetyLevel: "safe",
        benefit: "Nourishing plant oil",
      },
    ],
    missingIngredients: ["Sodium Lauryl Sulfate", "Phenoxyethanol", "Fragrance"],
    addedBenefits: [
      "pH-balanced formula (5.0-6.0)",
      "Fragrance-free",
      "Contains antioxidant-rich matcha",
      "Cruelty-free and vegan",
    ],
    reviewHighlights: [
      "Gentle yet effective at removing dirt and makeup",
      "Leaves my skin feeling clean but not tight or dry",
      "The matcha and hemp oil have helped calm my redness",
    ],
  },
  {
    id: 5,
    brand: "Versed",
    name: "Gentle Cycle Milky Cleanser",
    category: "Facial Cleanser",
    size: "150ml / 5 fl oz",
    price: 14.99,
    image: "/placeholder.svg?height=400&width=400",
    scores: {
      overall: 88,
      safety: 90,
      sustainability: 89,
      ethics: 86,
    },
    improvements: {
      safety: "+15%",
      sustainability: "+9%",
      ethics: "+4%",
    },
    keyImprovement: "15% safer",
    ingredients: [
      {
        id: 1,
        name: "Water",
        function: "Solvent",
        safetyLevel: "safe",
      },
      {
        id: 2,
        name: "Glycerin",
        function: "Humectant",
        safetyLevel: "safe",
      },
      {
        id: 3,
        name: "Coco-Glucoside",
        function: "Surfactant",
        safetyLevel: "safe",
        benefit: "Gentle plant-derived surfactant",
      },
      {
        id: 4,
        name: "Oat Amino Acids",
        function: "Skin conditioning",
        safetyLevel: "safe",
        benefit: "Soothing for sensitive skin",
      },
    ],
    missingIngredients: ["Sodium Lauryl Sulfate", "Phenoxyethanol", "Fragrance"],
    addedBenefits: [
      "Creamy, non-foaming formula",
      "Fragrance-free",
      "Climate neutral certified",
      "Recyclable packaging",
    ],
    reviewHighlights: [
      "Perfect for my dry, sensitive skin",
      "Affordable alternative to luxury clean cleansers",
      "Love that it's fragrance-free but still feels luxurious",
    ],
  },
]

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

export default function AlternativesPage() {
  // State for selected alternatives for comparison
  const [selectedAlternatives, setSelectedAlternatives] = useState<number[]>([])

  // State for active comparison product
  const [activeComparison, setActiveComparison] = useState<number | null>(null)

  // State for filter and sort options
  const [filterOption, setFilterOption] = useState("all")
  const [sortOption, setSortOption] = useState("score")

  // State for mobile drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // State for filtered alternatives
  const [filteredAlternatives, setFilteredAlternatives] = useState(alternativeProducts)

  // Handle alternative selection for comparison
  const toggleAlternativeSelection = (id: number) => {
    if (selectedAlternatives.includes(id)) {
      setSelectedAlternatives(selectedAlternatives.filter((altId) => altId !== id))
    } else {
      // Limit to comparing 2 alternatives at a time for simplicity
      if (selectedAlternatives.length < 2) {
        setSelectedAlternatives([...selectedAlternatives, id])
      }
    }
  }

  // Handle setting active comparison
  const setComparisonProduct = (id: number) => {
    setActiveComparison(id)
    setIsDrawerOpen(true)
  }

  // Handle filter change
  const handleFilterChange = (value: string) => {
    setFilterOption(value)

    // Apply filters based on selection
    let filtered = alternativeProducts

    if (value === "safer") {
      filtered = alternativeProducts.filter((product) => product.scores.safety > originalProduct.scores.safety + 10)
    } else if (value === "sustainable") {
      filtered = alternativeProducts.filter(
        (product) => product.scores.sustainability > originalProduct.scores.sustainability + 10,
      )
    } else if (value === "affordable") {
      filtered = alternativeProducts.filter((product) => product.price <= originalProduct.price)
    }

    setFilteredAlternatives(filtered)
  }

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortOption(value)

    // Apply sorting based on selection
    const sorted = [...filteredAlternatives]

    if (value === "score") {
      sorted.sort((a, b) => b.scores.overall - a.scores.overall)
    } else if (value === "price_low") {
      sorted.sort((a, b) => a.price - b.price)
    } else if (value === "price_high") {
      sorted.sort((a, b) => b.price - a.price)
    }

    setFilteredAlternatives(sorted)
  }

  // Get selected alternative product by id
  const getSelectedAlternative = (id: number) => {
    return alternativeProducts.find((product) => product.id === id)
  }

  // Effect to sort alternatives on initial load
  useEffect(() => {
    // Sort by overall score by default
    const sorted = [...alternativeProducts].sort((a, b) => b.scores.overall - a.scores.overall)
    setFilteredAlternatives(sorted)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/product/1" className="text-[#2e3440]">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-[#2e3440]">Cleaner Alternatives</h1>
              <p className="text-xs text-gray-500">
                {originalProduct.brand} {originalProduct.name}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-[#2e3440]">
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24">
        {/* Original Product Panel */}
        <div className="bg-[#e5f2f2] rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <Badge className="absolute top-2 right-2 bg-[#5e81ac]">Currently Viewing</Badge>
            <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center shrink-0">
              <Image
                src={originalProduct.image || "/placeholder.svg"}
                alt={originalProduct.name}
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-600">{originalProduct.brand}</p>
              <h2 className="font-medium text-[#2e3440] truncate">{originalProduct.name}</h2>
              <p className="text-sm">${originalProduct.price.toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#5e81ac]">
                <span className="text-sm font-bold text-[#5e81ac]">{originalProduct.scores.overall}</span>
              </div>
              <span className="text-xs mt-1">Overall</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-600">Safety</span>
              <span className="font-medium">{originalProduct.scores.safety}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-600">Sustainability</span>
              <span className="font-medium">{originalProduct.scores.sustainability}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-600">Ethics</span>
              <span className="font-medium">{originalProduct.scores.ethics}</span>
            </div>
          </div>
        </div>

        {/* Filtering Options */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Tabs defaultValue="all" onValueChange={handleFilterChange} className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" className="data-[state=active]:bg-[#5e81ac] data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="safer" className="data-[state=active]:bg-[#5e81ac] data-[state=active]:text-white">
                  Safer
                </TabsTrigger>
                <TabsTrigger
                  value="sustainable"
                  className="data-[state=active]:bg-[#5e81ac] data-[state=active]:text-white"
                >
                  Sustainable
                </TabsTrigger>
                <TabsTrigger
                  value="affordable"
                  className="data-[state=active]:bg-[#5e81ac] data-[state=active]:text-white"
                >
                  Affordable
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <span className="text-sm whitespace-nowrap">Sort by:</span>
              <Select defaultValue="score" onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Highest Rated</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Alternatives List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredAlternatives.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative p-4 flex items-center justify-center bg-[#e5f2f2]/30">
                <Badge className="absolute top-2 right-2 bg-[#a3be8c]">{product.keyImprovement}</Badge>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                    <h3 className="font-medium text-[#2e3440]">{product.name}</h3>
                    <p className="text-sm">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#5e81ac]">
                    <span className="text-xs font-bold text-[#5e81ac]">{product.scores.overall}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-600">Safety</span>
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-medium">{product.scores.safety}</span>
                      <span className="text-xs text-[#a3be8c]">{product.improvements.safety}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-600">Sustainability</span>
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-medium">{product.scores.sustainability}</span>
                      <span className="text-xs text-[#a3be8c]">{product.improvements.sustainability}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-600">Ethics</span>
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-medium">{product.scores.ethics}</span>
                      <span className="text-xs text-[#a3be8c]">{product.improvements.ethics}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    className="flex-1 bg-[#5e81ac] hover:bg-[#5e81ac]/90"
                    onClick={() => setComparisonProduct(product.id)}
                  >
                    View Details
                  </Button>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`compare-${product.id}`}
                      checked={selectedAlternatives.includes(product.id)}
                      onCheckedChange={() => toggleAlternativeSelection(product.id)}
                      className="data-[state=checked]:bg-[#5e81ac] data-[state=checked]:border-[#5e81ac]"
                    />
                    <Label htmlFor={`compare-${product.id}`} className="text-sm">
                      Compare
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Side-by-Side Comparison (appears when "Compare" is selected) */}
        {selectedAlternatives.length > 0 && (
          <div className="bg-[#e5f2f2] rounded-lg p-4 mb-8">
            <h2 className="text-lg font-bold text-[#2e3440] mb-4">Side-by-Side Comparison</h2>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left font-medium text-gray-600">Product</th>
                    <th className="p-2 text-center font-medium text-gray-600">Original</th>
                    {selectedAlternatives.map((altId) => (
                      <th key={altId} className="p-2 text-center font-medium text-gray-600">
                        Alternative
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Product Row */}
                  <tr className="border-b">
                    <td className="p-2 text-left font-medium">Product</td>
                    <td className="p-2">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mb-1">
                          <Image
                            src={originalProduct.image || "/placeholder.svg"}
                            alt={originalProduct.name}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <p className="text-xs text-center">{originalProduct.brand}</p>
                        <p className="text-xs font-medium text-center">{originalProduct.name}</p>
                      </div>
                    </td>
                    {selectedAlternatives.map((altId) => {
                      const alt = getSelectedAlternative(altId)
                      return (
                        <td key={altId} className="p-2">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mb-1">
                              <Image
                                src={alt?.image || "/placeholder.svg"}
                                alt={alt?.name || ""}
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                            </div>
                            <p className="text-xs text-center">{alt?.brand}</p>
                            <p className="text-xs font-medium text-center">{alt?.name}</p>
                          </div>
                        </td>
                      )
                    })}
                  </tr>

                  {/* Price Row */}
                  <tr className="border-b">
                    <td className="p-2 text-left font-medium">Price</td>
                    <td className="p-2 text-center">${originalProduct.price.toFixed(2)}</td>
                    {selectedAlternatives.map((altId) => {
                      const alt = getSelectedAlternative(altId)
                      return (
                        <td key={altId} className="p-2 text-center">
                          ${alt?.price.toFixed(2)}
                        </td>
                      )
                    })}
                  </tr>

                  {/* Overall Score Row */}
                  <tr className="border-b">
                    <td className="p-2 text-left font-medium">Overall Score</td>
                    <td className="p-2 text-center">{originalProduct.scores.overall}</td>
                    {selectedAlternatives.map((altId) => {
                      const alt = getSelectedAlternative(altId)
                      return (
                        <td key={altId} className="p-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <span>{alt?.scores.overall}</span>
                            <span className="text-xs text-[#a3be8c]">
                              (+{alt?.scores.overall - originalProduct.scores.overall})
                            </span>
                          </div>
                        </td>
                      )
                    })}
                  </tr>

                  {/* Safety Score Row */}
                  <tr className="border-b">
                    <td className="p-2 text-left font-medium">Safety Score</td>
                    <td className="p-2 text-center">{originalProduct.scores.safety}</td>
                    {selectedAlternatives.map((altId) => {
                      const alt = getSelectedAlternative(altId)
                      return (
                        <td key={altId} className="p-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <span>{alt?.scores.safety}</span>
                            <span className="text-xs text-[#a3be8c]">
                              (+{alt?.scores.safety - originalProduct.scores.safety})
                            </span>
                          </div>
                        </td>
                      )
                    })}
                  </tr>

                  {/* Sustainability Score Row */}
                  <tr className="border-b">
                    <td className="p-2 text-left font-medium">Sustainability Score</td>
                    <td className="p-2 text-center">{originalProduct.scores.sustainability}</td>
                    {selectedAlternatives.map((altId) => {
                      const alt = getSelectedAlternative(altId)
                      return (
                        <td key={altId} className="p-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <span>{alt?.scores.sustainability}</span>
                            <span className="text-xs text-[#a3be8c]">
                              (+{alt?.scores.sustainability - originalProduct.scores.sustainability})
                            </span>
                          </div>
                        </td>
                      )
                    })}
                  </tr>

                  {/* Ethics Score Row */}
                  <tr className="border-b">
                    <td className="p-2 text-left font-medium">Ethics Score</td>
                    <td className="p-2 text-center">{originalProduct.scores.ethics}</td>
                    {selectedAlternatives.map((altId) => {
                      const alt = getSelectedAlternative(altId)
                      return (
                        <td key={altId} className="p-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <span>{alt?.scores.ethics}</span>
                            <span className="text-xs text-[#a3be8c]">
                              (+{alt?.scores.ethics - originalProduct.scores.ethics})
                            </span>
                          </div>
                        </td>
                      )
                    })}
                  </tr>

                  {/* Concerning Ingredients Row */}
                  <tr className="border-b">
                    <td className="p-2 text-left font-medium">Concerning Ingredients</td>
                    <td className="p-2">
                      <ul className="list-disc pl-4 text-xs">
                        {originalProduct.ingredients
                          .filter((ing) => ing.safetyLevel === "concern" || ing.safetyLevel === "caution")
                          .map((ing) => (
                            <li key={ing.id} className="mb-1">
                              <span className="font-medium">{ing.name}</span>
                              {ing.concern && <span className="block text-gray-500">{ing.concern}</span>}
                            </li>
                          ))}
                      </ul>
                    </td>
                    {selectedAlternatives.map((altId) => {
                      const alt = getSelectedAlternative(altId)
                      return (
                        <td key={altId} className="p-2">
                          {alt?.ingredients.filter(
                            (ing) => ing.safetyLevel === "concern" || ing.safetyLevel === "caution",
                          ).length === 0 ? (
                            <div className="flex items-center text-xs text-[#a3be8c]">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              <span>No concerning ingredients</span>
                            </div>
                          ) : (
                            <ul className="list-disc pl-4 text-xs">
                              {alt?.ingredients
                                .filter((ing) => ing.safetyLevel === "concern" || ing.safetyLevel === "caution")
                                .map((ing) => (
                                  <li key={ing.id} className="mb-1">
                                    <span className="font-medium">{ing.name}</span>
                                    {ing.concern && <span className="block text-gray-500">{ing.concern}</span>}
                                  </li>
                                ))}
                            </ul>
                          )}
                        </td>
                      )
                    })}
                  </tr>

                  {/* Added Benefits Row */}
                  <tr>
                    <td className="p-2 text-left font-medium">Added Benefits</td>
                    <td className="p-2 text-center">-</td>
                    {selectedAlternatives.map((altId) => {
                      const alt = getSelectedAlternative(altId)
                      return (
                        <td key={altId} className="p-2">
                          <ul className="list-disc pl-4 text-xs">
                            {alt?.addedBenefits.map((benefit, index) => (
                              <li key={index} className="mb-1 text-[#a3be8c]">
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </td>
                      )
                    })}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" className="text-[#5e81ac] border-[#5e81ac]">
                <Save className="h-4 w-4 mr-2" />
                Save Comparison
              </Button>
              <Button variant="outline" className="text-[#5e81ac] border-[#5e81ac]">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="outline" className="text-[#5e81ac] border-[#5e81ac]">
            <Save className="h-4 w-4 mr-2" />
            Save Comparison
          </Button>
          <Button variant="outline" className="text-[#5e81ac] border-[#5e81ac]">
            <Share className="h-4 w-4 mr-2" />
            Share Comparison
          </Button>
          <Button variant="outline" className="text-[#5e81ac] border-[#5e81ac]">
            <Eye className="h-4 w-4 mr-2" />
            View All Alternatives
          </Button>
        </div>
      </main>

      {/* Detailed Comparison Drawer (Mobile) */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>Why It's Better</DrawerTitle>
            <DrawerDescription>
              {getSelectedAlternative(activeComparison || 0)?.brand}{" "}
              {getSelectedAlternative(activeComparison || 0)?.name}
            </DrawerDescription>
          </DrawerHeader>

          {activeComparison && (
            <div className="px-4 overflow-y-auto">
              {/* Score Comparison */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Score Improvement</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Overall</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{originalProduct.scores.overall}</span>
                        <ArrowRight className="h-4 w-4 mx-1 text-gray-400" />
                        <span className="text-sm font-medium">
                          {getSelectedAlternative(activeComparison)?.scores.overall}
                        </span>
                        <span className="text-xs text-[#a3be8c] ml-1">
                          (+
                          {(getSelectedAlternative(activeComparison)?.scores.overall || 0) -
                            originalProduct.scores.overall}
                          )
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={getSelectedAlternative(activeComparison)?.scores.overall}
                      className="h-2"
                      indicatorClassName="bg-[#5e81ac]"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Safety</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{originalProduct.scores.safety}</span>
                        <ArrowRight className="h-4 w-4 mx-1 text-gray-400" />
                        <span className="text-sm font-medium">
                          {getSelectedAlternative(activeComparison)?.scores.safety}
                        </span>
                        <span className="text-xs text-[#a3be8c] ml-1">
                          (+
                          {(getSelectedAlternative(activeComparison)?.scores.safety || 0) -
                            originalProduct.scores.safety}
                          )
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={getSelectedAlternative(activeComparison)?.scores.safety}
                      className="h-2"
                      indicatorClassName="bg-[#a3be8c]"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sustainability</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{originalProduct.scores.sustainability}</span>
                        <ArrowRight className="h-4 w-4 mx-1 text-gray-400" />
                        <span className="text-sm font-medium">
                          {getSelectedAlternative(activeComparison)?.scores.sustainability}
                        </span>
                        <span className="text-xs text-[#a3be8c] ml-1">
                          (+
                          {(getSelectedAlternative(activeComparison)?.scores.sustainability || 0) -
                            originalProduct.scores.sustainability}
                          )
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={getSelectedAlternative(activeComparison)?.scores.sustainability}
                      className="h-2"
                      indicatorClassName="bg-[#ebcb8b]"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Ethics</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{originalProduct.scores.ethics}</span>
                        <ArrowRight className="h-4 w-4 mx-1 text-gray-400" />
                        <span className="text-sm font-medium">
                          {getSelectedAlternative(activeComparison)?.scores.ethics}
                        </span>
                        <span className="text-xs text-[#a3be8c] ml-1">
                          (+
                          {(getSelectedAlternative(activeComparison)?.scores.ethics || 0) -
                            originalProduct.scores.ethics}
                          )
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={getSelectedAlternative(activeComparison)?.scores.ethics}
                      className="h-2"
                      indicatorClassName="bg-[#81a1c1]"
                    />
                  </div>
                </div>
              </div>

              {/* Ingredients Comparison */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Ingredient Improvements</h3>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="removed">
                    <AccordionTrigger className="text-sm font-medium">
                      <div className="flex items-center">
                        <Minus className="h-4 w-4 mr-2 text-[#bf616a]" />
                        Ingredients Removed
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {getSelectedAlternative(activeComparison)?.missingIngredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-[#bf616a] mt-1.5 mr-2"></div>
                            <div>
                              <p className="text-sm font-medium">{ingredient}</p>
                              {originalProduct.ingredients.find((ing) => ing.name === ingredient)?.concern && (
                                <p className="text-xs text-gray-500">
                                  {originalProduct.ingredients.find((ing) => ing.name === ingredient)?.concern}
                                </p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="added">
                    <AccordionTrigger className="text-sm font-medium">
                      <div className="flex items-center">
                        <Plus className="h-4 w-4 mr-2 text-[#a3be8c]" />
                        Better Ingredients Added
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {getSelectedAlternative(activeComparison)
                          ?.ingredients.filter((ing) => ing.benefit)
                          .map((ingredient, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 rounded-full bg-[#a3be8c] mt-1.5 mr-2"></div>
                              <div>
                                <p className="text-sm font-medium">{ingredient.name}</p>
                                <p className="text-xs text-gray-500">{ingredient.benefit}</p>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Added Benefits */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Added Benefits</h3>
                <ul className="space-y-2">
                  {getSelectedAlternative(activeComparison)?.addedBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#a3be8c] mt-0.5 mr-2 shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Customer Reviews */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">What Customers Say</h3>
                <div className="space-y-3">
                  {getSelectedAlternative(activeComparison)?.reviewHighlights.map((review, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg border text-sm italic">
                      "{review}"
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DrawerFooter>
            <Button className="bg-[#5e81ac] hover:bg-[#5e81ac]/90">View Full Details</Button>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
