"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Leaf, Search, User, Bell, ChevronRight, ArrowUp, Home, Scan, Compass, Bookmark, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// Sample data for trending ingredients
const trendingIngredients = [
  {
    id: 1,
    name: "Niacinamide",
    image: "/placeholder.svg?height=80&width=80",
    trending: "up",
  },
  {
    id: 2,
    name: "Bakuchiol",
    image: "/placeholder.svg?height=80&width=80",
    trending: "up",
  },
  {
    id: 3,
    name: "Hyaluronic Acid",
    image: "/placeholder.svg?height=80&width=80",
    trending: "up",
  },
  {
    id: 4,
    name: "Peptides",
    image: "/placeholder.svg?height=80&width=80",
    trending: "up",
  },
  {
    id: 5,
    name: "Vitamin C",
    image: "/placeholder.svg?height=80&width=80",
    trending: "up",
  },
  {
    id: 6,
    name: "Ceramides",
    image: "/placeholder.svg?height=80&width=80",
    trending: "up",
  },
]

// Sample data for clean beauty collections
const cleanBeautyCollections = [
  {
    id: 1,
    name: "Fragrance-Free Favorites",
    description: "Perfect for sensitive skin and fragrance allergies",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 12,
  },
  {
    id: 2,
    name: "Sustainable Packaging",
    description: "Eco-friendly products with minimal environmental impact",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 8,
  },
  {
    id: 3,
    name: "Vegan & Cruelty-Free",
    description: "Beauty without animal ingredients or testing",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 15,
  },
  {
    id: 4,
    name: "Pregnancy-Safe Skincare",
    description: "Gentle formulations safe for expecting mothers",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 10,
  },
]

// Sample data for educational content
const educationalContent = [
  {
    id: 1,
    title: "Understanding Clean Beauty: Beyond the Marketing",
    excerpt:
      "What does 'clean beauty' really mean? We break down the science and marketing to help you make informed choices.",
    image: "/placeholder.svg?height=200&width=400",
    readTime: 5,
  },
  {
    id: 2,
    title: "The Truth About Parabens in Skincare",
    excerpt:
      "Are parabens really harmful? We examine the research and evidence behind this controversial preservative.",
    image: "/placeholder.svg?height=200&width=400",
    readTime: 7,
  },
  {
    id: 3,
    title: "How to Read a Skincare Ingredient List",
    excerpt: "Decode complex ingredient labels with our comprehensive guide to understanding what's in your products.",
    image: "/placeholder.svg?height=200&width=400",
    readTime: 6,
  },
]

// Sample data for new arrivals
const newArrivals = [
  {
    id: 1,
    brand: "Glossier",
    name: "Milky Jelly Cleanser",
    image: "/placeholder.svg?height=200&width=200",
    overallScore: 92,
  },
  {
    id: 2,
    brand: "The Ordinary",
    name: "Niacinamide 10% + Zinc 1%",
    image: "/placeholder.svg?height=200&width=200",
    overallScore: 88,
  },
  {
    id: 3,
    brand: "CeraVe",
    name: "Moisturizing Cream",
    image: "/placeholder.svg?height=200&width=200",
    overallScore: 95,
  },
  {
    id: 4,
    brand: "Paula's Choice",
    name: "2% BHA Liquid Exfoliant",
    image: "/placeholder.svg?height=200&width=200",
    overallScore: 90,
  },
  {
    id: 5,
    brand: "La Roche-Posay",
    name: "Toleriane Double Repair Face Moisturizer",
    image: "/placeholder.svg?height=200&width=200",
    overallScore: 91,
  },
]

// Sample data for personalized recommendation
const personalizedRecommendation = {
  id: 1,
  brand: "Youth To The People",
  name: "Superfood Cleanser",
  image: "/placeholder.svg?height=200&width=200",
  overallScore: 94,
  reason: "Based on your skin concerns (sensitivity, dryness) and preference for natural ingredients",
}

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState("discover")
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll event to add shadow to header when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`sticky top-0 z-40 w-full bg-white transition-shadow ${isScrolled ? "shadow-sm" : ""}`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-[#5e81ac]" />
            <span className="text-xl font-bold">CleanSlate</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Search className="h-5 w-5 text-[#2e3440]" />
            </button>
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5 text-[#2e3440]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="pb-20 md:pb-10">
        {/* Featured Section */}
        <section className="relative h-[300px] md:h-[400px] overflow-hidden">
          <Image
            src="/placeholder.svg?height=800&width=1200"
            alt="Summer Essentials"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Summer Essentials</h1>
            <p className="text-white/90 mb-4 max-w-md">
              Protect and nourish your skin with our curated collection of summer-ready products
            </p>
            <Button className="bg-[#5e81ac] hover:bg-[#5e81ac]/90 w-fit">Explore Collection</Button>
          </div>
        </section>

        {/* Trending Ingredients */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#2e3440]">Trending Ingredients</h2>
              <Link href="#" className="text-[#5e81ac] text-sm font-medium flex items-center">
                See All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-4 min-w-max">
                {trendingIngredients.map((ingredient) => (
                  <Link href="#" key={ingredient.id} className="flex flex-col items-center w-20">
                    <div className="relative mb-2">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-[#e5f2f2] flex items-center justify-center">
                        <Image
                          src={ingredient.image || "/placeholder.svg"}
                          alt={ingredient.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 bg-[#a3be8c] rounded-full p-1">
                        <ArrowUp className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <span className="text-xs text-center">{ingredient.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Clean Beauty Collections */}
        <section className="py-8 px-4 bg-[#e5f2f2]">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#2e3440]">Clean Beauty Collections</h2>
              <Link href="#" className="text-[#5e81ac] text-sm font-medium flex items-center">
                See All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cleanBeautyCollections.map((collection) => (
                <Card key={collection.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-[3/2] relative">
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-[#2e3440] mb-1">{collection.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{collection.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {collection.productCount} Products
                      </Badge>
                      <Button variant="link" className="p-0 h-auto text-[#5e81ac]">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Educational Content */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#2e3440]">Learn About Clean Beauty</h2>
              <Link href="#" className="text-[#5e81ac] text-sm font-medium flex items-center">
                See All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {educationalContent.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-[2/1] relative">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-[#2e3440] mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{article.readTime} min read</span>
                      </div>
                      <Button variant="link" className="p-0 h-auto text-[#5e81ac]">
                        Read
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-8 px-4 bg-[#e5f2f2]">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#2e3440]">New on CleanSlate</h2>
              <Link href="#" className="text-[#5e81ac] text-sm font-medium flex items-center">
                See All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-4 min-w-max">
                {newArrivals.map((product) => (
                  <Card key={product.id} className="w-[200px] overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4 flex items-center justify-center bg-white">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={120}
                        height={120}
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <p className="text-xs text-gray-500">{product.brand}</p>
                          <h3 className="font-medium text-[#2e3440] text-sm line-clamp-2">{product.name}</h3>
                        </div>
                        <div className="relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#5e81ac]">
                          <span className="text-xs font-bold text-[#5e81ac]">{product.overallScore}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Personalized Recommendation */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <h2 className="text-xl font-bold text-[#2e3440] mb-4">For Your Skin Concerns</h2>

            <Card className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 p-6 flex items-center justify-center bg-white">
                  <Image
                    src={personalizedRecommendation.image || "/placeholder.svg"}
                    alt={personalizedRecommendation.name}
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{personalizedRecommendation.brand}</p>
                      <h3 className="font-medium text-[#2e3440] text-lg">{personalizedRecommendation.name}</h3>
                    </div>
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#5e81ac]">
                      <span className="text-xs font-bold text-[#5e81ac]">
                        {personalizedRecommendation.overallScore}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{personalizedRecommendation.reason}</p>
                  <Button className="bg-[#5e81ac] hover:bg-[#5e81ac]/90">View Product</Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40">
        <div className="flex justify-around items-center h-16">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center justify-center w-full h-full ${activeTab === "home" ? "text-[#5e81ac]" : "text-gray-500"}`}
            onClick={() => setActiveTab("home")}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            href="#"
            className={`flex flex-col items-center justify-center w-full h-full ${activeTab === "scan" ? "text-[#5e81ac]" : "text-gray-500"}`}
            onClick={() => setActiveTab("scan")}
          >
            <Scan className="h-5 w-5" />
            <span className="text-xs mt-1">Scan</span>
          </Link>
          <Link
            href="/discover"
            className={`flex flex-col items-center justify-center w-full h-full ${activeTab === "discover" ? "text-[#5e81ac]" : "text-gray-500"}`}
            onClick={() => setActiveTab("discover")}
          >
            <Compass className="h-5 w-5" />
            <span className="text-xs mt-1">Discover</span>
          </Link>
          <Link
            href="#"
            className={`flex flex-col items-center justify-center w-full h-full ${activeTab === "saved" ? "text-[#5e81ac]" : "text-gray-500"}`}
            onClick={() => setActiveTab("saved")}
          >
            <Bookmark className="h-5 w-5" />
            <span className="text-xs mt-1">Saved</span>
          </Link>
          <Link
            href="#"
            className={`flex flex-col items-center justify-center w-full h-full ${activeTab === "profile" ? "text-[#5e81ac]" : "text-gray-500"}`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
