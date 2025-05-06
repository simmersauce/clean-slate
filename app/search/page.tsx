"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Leaf, Search, SlidersHorizontal, X, ChevronDown, Plus, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Sample data for search results
const searchResults = [
  {
    id: 1,
    brand: "Glossier",
    name: "Milky Jelly Cleanser",
    category: "Facial Cleanser",
    price: 18,
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 92,
    safetyScore: 95,
    sustainabilityScore: 88,
    ethicsScore: 90,
    badges: ["Cruelty-Free", "Vegan"],
  },
  {
    id: 2,
    brand: "The Ordinary",
    name: "Niacinamide 10% + Zinc 1%",
    category: "Serum",
    price: 5.9,
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 88,
    safetyScore: 90,
    sustainabilityScore: 85,
    ethicsScore: 87,
    badges: ["Cruelty-Free", "Vegan", "Fragrance-Free"],
  },
  {
    id: 3,
    brand: "CeraVe",
    name: "Moisturizing Cream",
    category: "Moisturizer",
    price: 16.99,
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 95,
    safetyScore: 98,
    sustainabilityScore: 90,
    ethicsScore: 92,
    badges: ["Fragrance-Free"],
  },
  {
    id: 4,
    brand: "Paula's Choice",
    name: "2% BHA Liquid Exfoliant",
    category: "Exfoliant",
    price: 29.5,
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 90,
    safetyScore: 92,
    sustainabilityScore: 87,
    ethicsScore: 89,
    badges: ["Cruelty-Free", "Fragrance-Free"],
  },
  {
    id: 5,
    brand: "La Roche-Posay",
    name: "Toleriane Double Repair Face Moisturizer",
    category: "Moisturizer",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 91,
    safetyScore: 94,
    sustainabilityScore: 86,
    ethicsScore: 88,
    badges: ["Fragrance-Free"],
  },
  {
    id: 6,
    brand: "Drunk Elephant",
    name: "C-Firma Day Serum",
    category: "Serum",
    price: 78,
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 89,
    safetyScore: 91,
    sustainabilityScore: 84,
    ethicsScore: 90,
    badges: ["Cruelty-Free"],
  },
  {
    id: 7,
    brand: "Youth To The People",
    name: "Superfood Cleanser",
    category: "Facial Cleanser",
    price: 36,
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 94,
    safetyScore: 96,
    sustainabilityScore: 92,
    ethicsScore: 93,
    badges: ["Vegan", "Cruelty-Free"],
  },
  {
    id: 8,
    brand: "First Aid Beauty",
    name: "Ultra Repair Cream",
    category: "Moisturizer",
    price: 34,
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 93,
    safetyScore: 95,
    sustainabilityScore: 89,
    ethicsScore: 91,
    badges: ["Fragrance-Free"],
  },
  {
    id: 9,
    brand: "Kiehl's",
    name: "Ultra Facial Cream",
    category: "Moisturizer",
    price: 32,
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 87,
    safetyScore: 89,
    sustainabilityScore: 83,
    ethicsScore: 86,
    badges: [],
  },
]

// Sample categories for filters
const categories = ["Skincare", "Makeup", "Hair", "Body", "Fragrance", "Tools & Accessories"]

// Sample skin concerns for filters
const skinConcerns = [
  "Sensitive Skin",
  "Acne-Prone",
  "Dryness",
  "Aging",
  "Redness",
  "Hyperpigmentation",
  "Uneven Texture",
]

// Sample ingredients for "free from" and "must include" filters
const commonIngredients = [
  "Parabens",
  "Sulfates",
  "Phthalates",
  "Fragrance",
  "Alcohol",
  "Silicones",
  "Mineral Oil",
  "Hyaluronic Acid",
  "Niacinamide",
  "Vitamin C",
  "Retinol",
  "Salicylic Acid",
]

// Filter state interface
interface FilterState {
  categories: string[]
  ratings: {
    overall: number[]
    safety: number[]
    sustainability: number[]
    ethics: number[]
  }
  concerns: string[]
  priceRange: number[]
  freeFrom: string[]
  mustInclude: string[]
}

export default function SearchPage() {
  // State for search query
  const [searchQuery, setSearchQuery] = useState("cleanser")

  // State for filter panel visibility
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // State for sort option
  const [sortOption, setSortOption] = useState("relevance")

  // State for filters
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    ratings: {
      overall: [0],
      safety: [0],
      sustainability: [0],
      ethics: [0],
    },
    concerns: [],
    priceRange: [0, 100],
    freeFrom: [],
    mustInclude: [],
  })

  // State for new ingredient inputs
  const [newFreeFromIngredient, setNewFreeFromIngredient] = useState("")
  const [newMustIncludeIngredient, setNewMustIncludeIngredient] = useState("")

  // State for filtered results
  const [filteredResults, setFilteredResults] = useState(searchResults)

  // State for loading more results
  const [visibleResults, setVisibleResults] = useState(6)

  // State for showing no results
  const [showNoResults, setShowNoResults] = useState(false)

  // Toggle category filter
  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  // Toggle concern filter
  const toggleConcern = (concern: string) => {
    setFilters((prev) => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter((c) => c !== concern)
        : [...prev.concerns, concern],
    }))
  }

  // Handle rating slider change
  const handleRatingChange = (type: keyof FilterState["ratings"], value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [type]: value,
      },
    }))
  }

  // Handle price range slider change
  const handlePriceRangeChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: value,
    }))
  }

  // Add ingredient to "free from" list
  const addFreeFromIngredient = () => {
    if (newFreeFromIngredient && !filters.freeFrom.includes(newFreeFromIngredient)) {
      setFilters((prev) => ({
        ...prev,
        freeFrom: [...prev.freeFrom, newFreeFromIngredient],
      }))
      setNewFreeFromIngredient("")
    }
  }

  // Remove ingredient from "free from" list
  const removeFreeFromIngredient = (ingredient: string) => {
    setFilters((prev) => ({
      ...prev,
      freeFrom: prev.freeFrom.filter((i) => i !== ingredient),
    }))
  }

  // Add ingredient to "must include" list
  const addMustIncludeIngredient = () => {
    if (newMustIncludeIngredient && !filters.mustInclude.includes(newMustIncludeIngredient)) {
      setFilters((prev) => ({
        ...prev,
        mustInclude: [...prev.mustInclude, newMustIncludeIngredient],
      }))
      setNewMustIncludeIngredient("")
    }
  }

  // Remove ingredient from "must include" list
  const removeMustIncludeIngredient = (ingredient: string) => {
    setFilters((prev) => ({
      ...prev,
      mustInclude: prev.mustInclude.filter((i) => i !== ingredient),
    }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      categories: [],
      ratings: {
        overall: [0],
        safety: [0],
        sustainability: [0],
        ethics: [0],
      },
      concerns: [],
      priceRange: [0, 100],
      freeFrom: [],
      mustInclude: [],
    })
  }

  // Apply filters
  const applyFilters = () => {
    // In a real app, this would filter the results based on the filter state
    // For this demo, we'll just close the filter panel
    setIsFilterOpen(false)
  }

  // Load more results
  const loadMoreResults = () => {
    setVisibleResults((prev) => Math.min(prev + 3, searchResults.length))
  }

  // Toggle no results state (for demonstration)
  const toggleNoResults = () => {
    setShowNoResults(!showNoResults)
  }

  // Handle sort change
  const handleSortChange = (option: string) => {
    setSortOption(option)
    // In a real app, this would sort the results
  }

  // Handle key press for adding ingredients
  const handleKeyPress = (e: React.KeyboardEvent, type: "freeFrom" | "mustInclude") => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (type === "freeFrom") {
        addFreeFromIngredient()
      } else {
        addMustIncludeIngredient()
      }
    }
  }

  // Effect to update filtered results
  useEffect(() => {
    // In a real app, this would filter the results based on the filter state
    // For this demo, we'll just use the sample data
    setFilteredResults(showNoResults ? [] : searchResults)
  }, [showNoResults])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center gap-2">
          <Link href="/dashboard" className="md:hidden">
            <ArrowLeft className="h-5 w-5 text-[#2e3440]" />
          </Link>

          <Link href="/dashboard" className="flex items-center gap-2 mr-4">
            <Leaf className="h-5 w-5 text-[#5e81ac]" />
            <span className="text-lg font-bold hidden md:inline">CleanSlate</span>
          </Link>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-full bg-gray-50"
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="ml-2" onClick={() => setIsFilterOpen(true)}>
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto bg-[#e5f2f2]">
              <SheetHeader className="mb-4">
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>

              <div className="space-y-6">
                {/* Categories */}
                <Accordion type="single" collapsible defaultValue="categories">
                  <AccordionItem value="categories" className="border-b border-gray-200">
                    <AccordionTrigger className="text-lg font-medium py-2">Categories</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                              checked={filters.categories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                              className="data-[state=checked]:bg-[#5e81ac] data-[state=checked]:border-[#5e81ac]"
                            />
                            <Label
                              htmlFor={`category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                              className="text-sm cursor-pointer"
                            >
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Ratings */}
                <Accordion type="single" collapsible defaultValue="ratings">
                  <AccordionItem value="ratings" className="border-b border-gray-200">
                    <AccordionTrigger className="text-lg font-medium py-2">Ratings</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label className="text-sm">Overall Score</Label>
                            <span className="text-sm">{filters.ratings.overall[0]}+</span>
                          </div>
                          <Slider
                            value={filters.ratings.overall}
                            onValueChange={(value) => handleRatingChange("overall", value)}
                            max={100}
                            step={5}
                            className="[&>span]:bg-[#5e81ac]"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label className="text-sm">Safety Score</Label>
                            <span className="text-sm">{filters.ratings.safety[0]}+</span>
                          </div>
                          <Slider
                            value={filters.ratings.safety}
                            onValueChange={(value) => handleRatingChange("safety", value)}
                            max={100}
                            step={5}
                            className="[&>span]:bg-[#a3be8c]"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label className="text-sm">Sustainability Score</Label>
                            <span className="text-sm">{filters.ratings.sustainability[0]}+</span>
                          </div>
                          <Slider
                            value={filters.ratings.sustainability}
                            onValueChange={(value) => handleRatingChange("sustainability", value)}
                            max={100}
                            step={5}
                            className="[&>span]:bg-[#ebcb8b]"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label className="text-sm">Ethics Score</Label>
                            <span className="text-sm">{filters.ratings.ethics[0]}+</span>
                          </div>
                          <Slider
                            value={filters.ratings.ethics}
                            onValueChange={(value) => handleRatingChange("ethics", value)}
                            max={100}
                            step={5}
                            className="[&>span]:bg-[#81a1c1]"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Concerns */}
                <Accordion type="single" collapsible defaultValue="concerns">
                  <AccordionItem value="concerns" className="border-b border-gray-200">
                    <AccordionTrigger className="text-lg font-medium py-2">Skin Concerns</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 gap-2">
                        {skinConcerns.map((concern) => (
                          <div key={concern} className="flex items-center space-x-2">
                            <Checkbox
                              id={`concern-${concern.toLowerCase().replace(/\s+/g, "-")}`}
                              checked={filters.concerns.includes(concern)}
                              onCheckedChange={() => toggleConcern(concern)}
                              className="data-[state=checked]:bg-[#5e81ac] data-[state=checked]:border-[#5e81ac]"
                            />
                            <Label
                              htmlFor={`concern-${concern.toLowerCase().replace(/\s+/g, "-")}`}
                              className="text-sm cursor-pointer"
                            >
                              {concern}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Price Range */}
                <Accordion type="single" collapsible defaultValue="price">
                  <AccordionItem value="price" className="border-b border-gray-200">
                    <AccordionTrigger className="text-lg font-medium py-2">Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm">${filters.priceRange[0]}</span>
                          <span className="text-sm">${filters.priceRange[1]}</span>
                        </div>
                        <Slider
                          value={filters.priceRange}
                          onValueChange={handlePriceRangeChange}
                          min={0}
                          max={100}
                          step={1}
                          className="[&>span]:bg-[#5e81ac]"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Free From */}
                <Accordion type="single" collapsible defaultValue="freeFrom">
                  <AccordionItem value="freeFrom" className="border-b border-gray-200">
                    <AccordionTrigger className="text-lg font-medium py-2">Free From</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="Add ingredient to avoid"
                            value={newFreeFromIngredient}
                            onChange={(e) => setNewFreeFromIngredient(e.target.value)}
                            onKeyDown={(e) => handleKeyPress(e, "freeFrom")}
                            className="flex-1 bg-white"
                          />
                          <Button
                            type="button"
                            onClick={addFreeFromIngredient}
                            className="bg-[#5e81ac] hover:bg-[#5e81ac]/90"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {filters.freeFrom.map((ingredient) => (
                            <Badge key={ingredient} className="bg-[#5e81ac] hover:bg-[#5e81ac]/90 px-3 py-1 text-sm">
                              {ingredient}
                              <button
                                type="button"
                                onClick={() => removeFreeFromIngredient(ingredient)}
                                className="ml-2 text-white hover:text-gray-200"
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove {ingredient}</span>
                              </button>
                            </Badge>
                          ))}
                        </div>

                        <div className="mt-2">
                          <p className="text-sm font-medium mb-2">Common ingredients to avoid:</p>
                          <div className="flex flex-wrap gap-2">
                            {commonIngredients.slice(0, 6).map((ingredient) => (
                              <button
                                key={ingredient}
                                type="button"
                                onClick={() => {
                                  if (!filters.freeFrom.includes(ingredient)) {
                                    setFilters((prev) => ({
                                      ...prev,
                                      freeFrom: [...prev.freeFrom, ingredient],
                                    }))
                                  }
                                }}
                                className="text-xs px-3 py-1 bg-white border border-gray-200 rounded-full hover:border-[#5e81ac] hover:text-[#5e81ac]"
                              >
                                {ingredient}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Must Include */}
                <Accordion type="single" collapsible defaultValue="mustInclude">
                  <AccordionItem value="mustInclude" className="border-b border-gray-200">
                    <AccordionTrigger className="text-lg font-medium py-2">Must Include</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="Add required ingredient"
                            value={newMustIncludeIngredient}
                            onChange={(e) => setNewMustIncludeIngredient(e.target.value)}
                            onKeyDown={(e) => handleKeyPress(e, "mustInclude")}
                            className="flex-1 bg-white"
                          />
                          <Button
                            type="button"
                            onClick={addMustIncludeIngredient}
                            className="bg-[#5e81ac] hover:bg-[#5e81ac]/90"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {filters.mustInclude.map((ingredient) => (
                            <Badge key={ingredient} className="bg-[#a3be8c] hover:bg-[#a3be8c]/90 px-3 py-1 text-sm">
                              {ingredient}
                              <button
                                type="button"
                                onClick={() => removeMustIncludeIngredient(ingredient)}
                                className="ml-2 text-white hover:text-gray-200"
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove {ingredient}</span>
                              </button>
                            </Badge>
                          ))}
                        </div>

                        <div className="mt-2">
                          <p className="text-sm font-medium mb-2">Popular beneficial ingredients:</p>
                          <div className="flex flex-wrap gap-2">
                            {commonIngredients.slice(6).map((ingredient) => (
                              <button
                                key={ingredient}
                                type="button"
                                onClick={() => {
                                  if (!filters.mustInclude.includes(ingredient)) {
                                    setFilters((prev) => ({
                                      ...prev,
                                      mustInclude: [...prev.mustInclude, ingredient],
                                    }))
                                  }
                                }}
                                className="text-xs px-3 py-1 bg-white border border-gray-200 rounded-full hover:border-[#a3be8c] hover:text-[#a3be8c]"
                              >
                                {ingredient}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Filter Actions */}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={clearFilters} className="flex-1">
                    Clear Filters
                  </Button>
                  <Button onClick={applyFilters} className="flex-1 bg-[#5e81ac] hover:bg-[#5e81ac]/90">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Sort and Results Count */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center">
            <p className="text-sm text-gray-600">
              {filteredResults.length} products found for "{searchQuery}"
            </p>
            <Button variant="link" size="sm" onClick={toggleNoResults} className="text-[#5e81ac] ml-2 p-0 h-auto">
              {showNoResults ? "Show Results" : "Show No Results"}
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <span>Sort: {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSortChange("relevance")}>
                <div className="flex items-center gap-2">
                  {sortOption === "relevance" && <Check className="h-4 w-4" />}
                  <span className={sortOption === "relevance" ? "font-medium" : ""}>Relevance</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("rating")}>
                <div className="flex items-center gap-2">
                  {sortOption === "rating" && <Check className="h-4 w-4" />}
                  <span className={sortOption === "rating" ? "font-medium" : ""}>Rating (High to Low)</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("price_low")}>
                <div className="flex items-center gap-2">
                  {sortOption === "price_low" && <Check className="h-4 w-4" />}
                  <span className={sortOption === "price_low" ? "font-medium" : ""}>Price (Low to High)</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("price_high")}>
                <div className="flex items-center gap-2">
                  {sortOption === "price_high" && <Check className="h-4 w-4" />}
                  <span className={sortOption === "price_high" ? "font-medium" : ""}>Price (High to Low)</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search Results */}
        {filteredResults.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.slice(0, visibleResults).map((product) => (
                <div
                  key={product.id}
                  className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-[200px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button className="bg-white text-[#5e81ac] hover:bg-white/90">Quick View</Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{product.brand}</p>
                        <h3 className="font-medium text-[#2e3440]">{product.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                      </div>
                      <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#5e81ac]">
                        <span className="text-xs font-bold text-[#5e81ac]">{product.overallScore}</span>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-3">
                      <div className="w-2 h-2 rounded-full bg-[#a3be8c]" title={`Safety: ${product.safetyScore}`}></div>
                      <div
                        className="w-2 h-2 rounded-full bg-[#ebcb8b]"
                        title={`Sustainability: ${product.sustainabilityScore}`}
                      ></div>
                      <div className="w-2 h-2 rounded-full bg-[#81a1c1]" title={`Ethics: ${product.ethicsScore}`}></div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <p className="font-medium">${product.price.toFixed(2)}</p>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {product.badges.map((badge) => (
                          <span key={badge} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {visibleResults < filteredResults.length && (
              <div className="flex justify-center mt-8">
                <Button onClick={loadMoreResults} className="bg-[#5e81ac] hover:bg-[#5e81ac]/90">
                  Load More
                </Button>
              </div>
            )}
          </>
        ) : (
          /* No Results State */
          <div className="text-center py-12 px-4">
            <div className="max-w-md mx-auto">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-[#2e3440] mb-2">No products found</h2>
              <p className="text-gray-600 mb-6">
                We couldn't find any products matching "{searchQuery}". Try adjusting your search or filters.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Try searching for:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {["cleanser", "moisturizer", "serum", "sunscreen"].map((term) => (
                      <Button
                        key={term}
                        variant="outline"
                        onClick={() => {
                          setSearchQuery(term)
                          setShowNoResults(false)
                        }}
                        className="text-[#5e81ac] border-[#5e81ac]"
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Or browse by category:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {categories.slice(0, 4).map((category) => (
                      <Button
                        key={category}
                        variant="outline"
                        onClick={() => {
                          toggleCategory(category)
                          setShowNoResults(false)
                        }}
                        className="text-[#5e81ac] border-[#5e81ac]"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
