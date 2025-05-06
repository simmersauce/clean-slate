"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Filter, ChevronDown, ChevronUp, AlertCircle, Info, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf } from "lucide-react"

// Sample product data
const productData = {
  id: 1,
  brand: "Glossier",
  name: "Milky Jelly Cleanser",
  category: "Facial Cleanser",
}

// Sample ingredient data
const ingredientsData = [
  {
    id: 1,
    name: "Water",
    scientificName: "Aqua/Eau",
    synonyms: ["Purified Water", "Distilled Water"],
    function: "Solvent",
    description:
      "Water serves as the primary solvent in many skincare formulations, dissolving other ingredients and creating a base for the product.",
    safetyLevel: "safe", // safe, caution, concern
    safetyScore: 100,
    safetyDetails: "Water is completely safe for topical use and is essential for most skincare formulations.",
    evidenceLevel: "High",
    sustainabilityInfo:
      "Water usage in cosmetics production can have environmental impacts. Some brands implement water conservation practices.",
    ethicalInfo: "No ethical concerns with water itself, though water scarcity can be an issue in some regions.",
    potentialConcerns: "None for the ingredient itself. Some may be concerned about the purity of water used.",
    commonIn: ["Cleansers", "Toners", "Moisturizers", "Serums"],
    pairedWith: ["Glycerin", "Hyaluronic Acid", "Preservatives"],
    alternatives: [],
    isAllergen: false,
  },
  {
    id: 2,
    name: "Glycerin",
    scientificName: "Glycerol",
    synonyms: ["Glycerine", "Vegetable Glycerin"],
    function: "Humectant",
    description:
      "Glycerin is a humectant that attracts and retains moisture in the skin, helping to keep it hydrated and soft.",
    safetyLevel: "safe",
    safetyScore: 95,
    safetyDetails: "Glycerin is considered very safe for all skin types and is widely used in skincare and cosmetics.",
    evidenceLevel: "High",
    sustainabilityInfo:
      "Can be derived from plant oils (vegetable glycerin) or animal fats, or synthesized. Plant-derived is more sustainable.",
    ethicalInfo: "Vegetable glycerin is considered more ethical than animal-derived glycerin.",
    potentialConcerns: "Very rarely may cause mild irritation in extremely sensitive individuals.",
    commonIn: ["Moisturizers", "Cleansers", "Serums", "Toners"],
    pairedWith: ["Hyaluronic Acid", "Ceramides", "Fatty Alcohols"],
    alternatives: ["Propanediol", "Butylene Glycol", "Hyaluronic Acid"],
    isAllergen: false,
  },
  {
    id: 3,
    name: "Sodium Lauryl Sulfate",
    scientificName: "Sodium Dodecyl Sulfate",
    synonyms: ["SLS", "Sodium Dodecyl Sulfate"],
    function: "Surfactant",
    description: "A cleansing agent that creates foam and removes oil and dirt from the skin.",
    safetyLevel: "concern",
    safetyScore: 60,
    safetyDetails:
      "Can be harsh and stripping for many skin types. May cause irritation, especially for sensitive skin.",
    evidenceLevel: "Medium",
    sustainabilityInfo:
      "Typically derived from coconut or palm oil, which raises sustainability concerns related to deforestation.",
    ethicalInfo: "Palm oil sourcing can be associated with deforestation and habitat destruction.",
    potentialConcerns: "Skin irritation, dryness, disruption of skin barrier, potential eye irritation.",
    commonIn: ["Cleansers", "Shampoos", "Body Washes", "Toothpastes"],
    pairedWith: ["Cocamidopropyl Betaine", "Glycerin", "Other surfactants"],
    alternatives: ["Sodium Cocoyl Isethionate", "Cocamidopropyl Betaine", "Decyl Glucoside"],
    isAllergen: true,
  },
  {
    id: 4,
    name: "Phenoxyethanol",
    scientificName: "2-Phenoxyethanol",
    synonyms: ["Phenoxetol", "PhE"],
    function: "Preservative",
    description: "A preservative that prevents the growth of bacteria and fungi in cosmetic products.",
    safetyLevel: "caution",
    safetyScore: 75,
    safetyDetails:
      "Generally considered safe at low concentrations (under 1%), but may cause irritation in some individuals.",
    evidenceLevel: "Medium",
    sustainabilityInfo: "Synthetic compound with moderate environmental impact.",
    ethicalInfo: "No significant ethical concerns.",
    potentialConcerns:
      "Potential skin irritation at higher concentrations. Some concerns about endocrine disruption, though evidence is limited.",
    commonIn: ["Moisturizers", "Serums", "Cleansers", "Makeup"],
    pairedWith: ["Ethylhexylglycerin", "Other preservatives"],
    alternatives: ["Sodium Benzoate", "Potassium Sorbate", "Benzyl Alcohol"],
    isAllergen: true,
  },
  {
    id: 5,
    name: "Hyaluronic Acid",
    scientificName: "Sodium Hyaluronate",
    synonyms: ["HA", "Hyaluronan"],
    function: "Humectant",
    description:
      "A powerful humectant that can hold up to 1000 times its weight in water, providing intense hydration to the skin.",
    safetyLevel: "safe",
    safetyScore: 98,
    safetyDetails: "Extremely safe for all skin types. Naturally occurs in the human body.",
    evidenceLevel: "High",
    sustainabilityInfo:
      "Traditionally derived from animal sources (rooster combs), but now commonly produced through bacterial fermentation.",
    ethicalInfo:
      "Modern production methods are generally considered ethical. Look for vegan-certified products if concerned.",
    potentialConcerns:
      "None significant. Some may experience temporary skin tightness if used in very dry environments without a moisturizer to seal it in.",
    commonIn: ["Serums", "Moisturizers", "Sheet Masks", "Eye Creams"],
    pairedWith: ["Glycerin", "Ceramides", "Peptides", "Vitamin B5"],
    alternatives: ["Glycerin", "Sodium PCA", "Beta-Glucan"],
    isAllergen: false,
  },
  {
    id: 6,
    name: "Fragrance",
    scientificName: "Parfum",
    synonyms: ["Parfum", "Aroma", "Fragrance Mix"],
    function: "Fragrance",
    description: "A mixture of natural or synthetic compounds added to provide a pleasant scent to the product.",
    safetyLevel: "concern",
    safetyScore: 50,
    safetyDetails:
      "Fragrances are among the most common causes of allergic reactions in skincare. Companies aren't required to disclose specific fragrance ingredients.",
    evidenceLevel: "High",
    sustainabilityInfo:
      "Natural fragrances may involve harvesting of plants, sometimes unsustainably. Synthetic fragrances may have environmental persistence issues.",
    ethicalInfo: "Some natural fragrances may involve animal testing or animal-derived ingredients.",
    potentialConcerns:
      "Skin irritation, allergic reactions, photosensitivity, potential hormone disruption from certain fragrance compounds.",
    commonIn: ["Moisturizers", "Cleansers", "Body Lotions", "Hair Products"],
    pairedWith: ["Masking agents", "Stabilizers"],
    alternatives: [
      "Fragrance-free formulations",
      "Products with essential oils (though these can also cause reactions)",
    ],
    isAllergen: true,
  },
  {
    id: 7,
    name: "Niacinamide",
    scientificName: "Nicotinamide",
    synonyms: ["Vitamin B3", "Nicotinic Acid Amide"],
    function: "Skin Conditioning",
    description:
      "A form of vitamin B3 that helps improve skin barrier function, reduces inflammation, and can help with hyperpigmentation and acne.",
    safetyLevel: "safe",
    safetyScore: 95,
    safetyDetails: "Very safe for most skin types. Some people may experience mild flushing at high concentrations.",
    evidenceLevel: "High",
    sustainabilityInfo: "Synthetic ingredient with minimal environmental impact.",
    ethicalInfo: "No significant ethical concerns.",
    potentialConcerns: "Temporary flushing or redness in some individuals, especially at concentrations above 5%.",
    commonIn: ["Serums", "Moisturizers", "Treatments", "Toners"],
    pairedWith: ["Hyaluronic Acid", "Peptides", "Antioxidants"],
    alternatives: ["Vitamin C", "Licorice Root Extract", "Alpha Arbutin"],
    isAllergen: false,
  },
  {
    id: 8,
    name: "Retinol",
    scientificName: "Vitamin A",
    synonyms: ["Vitamin A", "Retinyl Palmitate", "Retinaldehyde"],
    function: "Anti-aging",
    description:
      "A vitamin A derivative that promotes cell turnover, stimulates collagen production, and helps reduce signs of aging.",
    safetyLevel: "caution",
    safetyScore: 70,
    safetyDetails:
      "Generally safe when used properly, but can cause irritation, dryness, and increased sun sensitivity. Not recommended during pregnancy.",
    evidenceLevel: "High",
    sustainabilityInfo: "Typically synthesized in laboratories with moderate environmental impact.",
    ethicalInfo: "Some forms may be tested on animals for safety assessment.",
    potentialConcerns:
      "Skin irritation, dryness, peeling, increased sun sensitivity. Contraindicated during pregnancy due to potential teratogenic effects (though topical absorption is minimal).",
    commonIn: ["Anti-aging Serums", "Night Creams", "Treatments", "Eye Creams"],
    pairedWith: ["Hyaluronic Acid", "Ceramides", "Peptides", "Moisturizing ingredients"],
    alternatives: ["Bakuchiol", "Peptides", "Vitamin C", "Niacinamide"],
    isAllergen: false,
  },
  {
    id: 9,
    name: "Salicylic Acid",
    scientificName: "2-Hydroxybenzoic Acid",
    synonyms: ["BHA", "Beta Hydroxy Acid"],
    function: "Exfoliant",
    description:
      "A beta hydroxy acid that exfoliates inside pores, making it effective for treating acne and blackheads.",
    safetyLevel: "caution",
    safetyScore: 80,
    safetyDetails:
      "Safe when used at appropriate concentrations (0.5-2% in OTC products). May cause dryness or irritation in some individuals.",
    evidenceLevel: "High",
    sustainabilityInfo: "Originally derived from willow bark, now often synthesized. Moderate environmental impact.",
    ethicalInfo: "No significant ethical concerns.",
    potentialConcerns:
      "Skin dryness, irritation, increased sun sensitivity. Not recommended during pregnancy in high concentrations.",
    commonIn: ["Acne Treatments", "Exfoliants", "Toners", "Spot Treatments"],
    pairedWith: ["Glycerin", "Hyaluronic Acid", "Niacinamide", "Centella Asiatica"],
    alternatives: ["Glycolic Acid", "Mandelic Acid", "Azelaic Acid", "Tea Tree Oil"],
    isAllergen: false,
  },
  {
    id: 10,
    name: "Cetearyl Alcohol",
    scientificName: "Cetostearyl Alcohol",
    synonyms: ["Cetostearyl Alcohol", "C16-18 Alcohols"],
    function: "Emollient/Emulsifier",
    description:
      "A fatty alcohol that helps stabilize formulations and provides a smooth texture. Despite the 'alcohol' in the name, it's not drying.",
    safetyLevel: "safe",
    safetyScore: 90,
    safetyDetails:
      "Generally very safe for most skin types. Not to be confused with drying alcohols like ethanol or isopropyl alcohol.",
    evidenceLevel: "High",
    sustainabilityInfo:
      "Typically derived from plant oils like coconut or palm. Sustainability depends on sourcing practices.",
    ethicalInfo: "Palm-derived versions may have ethical concerns related to deforestation.",
    potentialConcerns: "Rarely may cause irritation in extremely sensitive individuals.",
    commonIn: ["Moisturizers", "Conditioners", "Creams", "Lotions"],
    pairedWith: ["Other emulsifiers", "Emollients", "Humectants"],
    alternatives: ["Cetyl Alcohol", "Stearyl Alcohol", "Plant Oils"],
    isAllergen: false,
  },
]

// Filter types
type FilterType = "all" | "concern" | "safe" | "sustainable"

export default function IngredientsPage() {
  // State for search query
  const [searchQuery, setSearchQuery] = useState("")

  // State for filter type
  const [filterType, setFilterType] = useState<FilterType>("all")

  // State for expanded ingredient
  const [expandedIngredient, setExpandedIngredient] = useState<number | null>(null)

  // State for filtered ingredients
  const [filteredIngredients, setFilteredIngredients] = useState(ingredientsData)

  // Filter ingredients based on search query and filter type
  useEffect(() => {
    let filtered = ingredientsData

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (ingredient) =>
          ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ingredient.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ingredient.synonyms.some((synonym) => synonym.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply type filter
    if (filterType === "concern") {
      filtered = filtered.filter(
        (ingredient) => ingredient.safetyLevel === "concern" || ingredient.safetyLevel === "caution",
      )
    } else if (filterType === "safe") {
      filtered = filtered.filter((ingredient) => ingredient.safetyLevel === "safe")
    } else if (filterType === "sustainable") {
      // In a real app, this would filter based on sustainability data
      // For this demo, we'll just show a subset
      filtered = filtered.filter((_, index) => index % 2 === 0)
    }

    setFilteredIngredients(filtered)
  }, [searchQuery, filterType])

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

  // Toggle expanded ingredient
  const toggleIngredient = (id: number) => {
    setExpandedIngredient(expandedIngredient === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/search" className="text-[#2e3440]">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-[#2e3440]">Ingredients</h1>
                <p className="text-sm text-gray-500">
                  {productData.brand} {productData.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-[#2e3440]">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-[#2e3440]">
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Filter Options */}
        <div className="mb-6 space-y-4">
          <Tabs defaultValue="all" onValueChange={(value) => setFilterType(value as FilterType)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="data-[state=active]:bg-[#5e81ac] data-[state=active]:text-white">
                All
              </TabsTrigger>
              <TabsTrigger value="concern" className="data-[state=active]:bg-[#5e81ac] data-[state=active]:text-white">
                Concerning
              </TabsTrigger>
              <TabsTrigger value="safe" className="data-[state=active]:bg-[#5e81ac] data-[state=active]:text-white">
                Safe
              </TabsTrigger>
              <TabsTrigger
                value="sustainable"
                className="data-[state=active]:bg-[#5e81ac] data-[state=active]:text-white"
              >
                Sustainable
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-md"
            />
          </div>
        </div>

        {/* Safety Key */}
        <div className="mb-6 p-4 bg-[#e5f2f2] rounded-lg">
          <h2 className="text-sm font-medium mb-2">Safety Indicators</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#a3be8c]"></div>
              <span className="text-sm">Safe for most skin types</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ebcb8b]"></div>
              <span className="text-sm">May cause sensitivity for some</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#bf616a]"></div>
              <span className="text-sm">Potential concern for health or environment</span>
            </div>
          </div>
        </div>

        {/* Ingredient List */}
        {filteredIngredients.length > 0 ? (
          <div className="space-y-4">
            {filteredIngredients.map((ingredient) => (
              <div key={ingredient.id} className="border rounded-lg overflow-hidden bg-white">
                <div
                  className="p-4 flex items-start justify-between cursor-pointer"
                  onClick={() => toggleIngredient(ingredient.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-4 h-4 rounded-full mt-1 ${getSafetyColor(ingredient.safetyLevel)}`}></div>
                    <div>
                      <h3 className="font-medium text-[#2e3440]">{ingredient.name}</h3>
                      <p className="text-sm text-gray-500">{ingredient.function}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    {expandedIngredient === ingredient.id ? (
                      <ChevronUp className="h-5 w-5 text-[#5e81ac]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#5e81ac]" />
                    )}
                  </Button>
                </div>

                {expandedIngredient === ingredient.id && (
                  <div className="border-t p-4 bg-[#e5f2f2]">
                    <div className="space-y-4">
                      {/* Scientific Name and Synonyms */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Scientific Name</h4>
                        <p className="text-[#2e3440]">{ingredient.scientificName}</p>
                        {ingredient.synonyms.length > 0 && (
                          <div className="mt-2">
                            <h4 className="text-sm font-medium text-gray-500">Also Known As</h4>
                            <p className="text-[#2e3440]">{ingredient.synonyms.join(", ")}</p>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">What It Does</h4>
                        <p className="text-[#2e3440]">{ingredient.description}</p>
                      </div>

                      {/* Safety Assessment */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-sm font-medium text-gray-500">Safety Assessment</h4>
                          <Badge
                            className={`${
                              ingredient.safetyLevel === "safe"
                                ? "bg-[#a3be8c]"
                                : ingredient.safetyLevel === "caution"
                                  ? "bg-[#ebcb8b]"
                                  : "bg-[#bf616a]"
                            } text-white`}
                          >
                            {getSafetyText(ingredient.safetyLevel)}
                          </Badge>
                        </div>
                        <p className="text-[#2e3440]">{ingredient.safetyDetails}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-gray-500">Evidence Level:</span>
                          <Badge variant="outline" className="text-xs">
                            {ingredient.evidenceLevel}
                          </Badge>
                        </div>
                      </div>

                      {/* Sustainability and Ethics */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 flex items-center gap-1">
                            <Leaf className="h-4 w-4" />
                            Sustainability
                          </h4>
                          <p className="text-[#2e3440] text-sm">{ingredient.sustainabilityInfo}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Ethics</h4>
                          <p className="text-[#2e3440] text-sm">{ingredient.ethicalInfo}</p>
                        </div>
                      </div>

                      {/* Potential Concerns */}
                      {ingredient.potentialConcerns && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4 text-[#bf616a]" />
                            Potential Concerns
                          </h4>
                          <p className="text-[#2e3440]">{ingredient.potentialConcerns}</p>
                          {ingredient.isAllergen && <Badge className="mt-2 bg-[#bf616a]">Common Allergen</Badge>}
                        </div>
                      )}

                      {/* Related Information */}
                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-500 mb-3">Related Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h5 className="text-xs font-medium text-gray-500">Common In</h5>
                            <ul className="text-sm space-y-1 mt-1">
                              {ingredient.commonIn.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium text-gray-500">Often Paired With</h5>
                            <ul className="text-sm space-y-1 mt-1">
                              {ingredient.pairedWith.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          {ingredient.alternatives.length > 0 && (
                            <div>
                              <h5 className="text-xs font-medium text-gray-500">Alternatives</h5>
                              <ul className="text-sm space-y-1 mt-1">
                                {ingredient.alternatives.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Learn More Link */}
                      <div className="flex justify-end">
                        <Button variant="link" className="text-[#5e81ac] p-0 h-auto">
                          <span>Learn More</span>
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Info className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#2e3440] mb-2">No ingredients found</h2>
            <p className="text-gray-600 mb-4">We couldn't find any ingredients matching your search criteria.</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setFilterType("all")
              }}
              className="bg-[#5e81ac] hover:bg-[#5e81ac]/90"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </main>

      {/* Bottom Action Button (only for concerning ingredients) */}
      {expandedIngredient !== null &&
        filteredIngredients.find((i) => i.id === expandedIngredient)?.safetyLevel === "concern" && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
            <Button className="w-full bg-[#5e81ac] hover:bg-[#5e81ac]/90">
              Find Products Without {filteredIngredients.find((i) => i.id === expandedIngredient)?.name}
            </Button>
          </div>
        )}
    </div>
  )
}
