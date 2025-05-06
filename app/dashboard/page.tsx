"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Leaf, Search, User, Bell, Camera, Home, Scan, Compass, Bookmark, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// Sample data for recently viewed products
const recentlyViewedProducts = [
  {
    id: 1,
    brand: "Glossier",
    name: "Milky Jelly Cleanser",
    image: "/placeholder.svg?height=120&width=120",
    overallScore: 92,
    safetyScore: 95,
    sustainabilityScore: 88,
    ethicsScore: 90,
  },
  {
    id: 2,
    brand: "The Ordinary",
    name: "Niacinamide 10% + Zinc 1%",
    image: "/placeholder.svg?height=120&width=120",
    overallScore: 88,
    safetyScore: 90,
    sustainabilityScore: 85,
    ethicsScore: 87,
  },
  {
    id: 3,
    brand: "CeraVe",
    name: "Moisturizing Cream",
    image: "/placeholder.svg?height=120&width=120",
    overallScore: 95,
    safetyScore: 98,
    sustainabilityScore: 90,
    ethicsScore: 92,
  },
  {
    id: 4,
    brand: "Paula's Choice",
    name: "2% BHA Liquid Exfoliant",
    image: "/placeholder.svg?height=120&width=120",
    overallScore: 90,
    safetyScore: 92,
    sustainabilityScore: 87,
    ethicsScore: 89,
  },
  {
    id: 5,
    brand: "La Roche-Posay",
    name: "Toleriane Double Repair Face Moisturizer",
    image: "/placeholder.svg?height=120&width=120",
    overallScore: 91,
    safetyScore: 94,
    sustainabilityScore: 86,
    ethicsScore: 88,
  },
]

// Sample data for recommended products
const recommendedProducts = [
  {
    id: 1,
    brand: "Youth To The People",
    name: "Superfood Cleanser",
    image: "/placeholder.svg?height=200&width=200",
    overallScore: 94,
    reason: "Great for sensitive skin",
  },
  {
    id: 2,
    brand: "Drunk Elephant",
    name: "Protini Polypeptide Cream",
    image: "/placeholder.svg?height=200&width=200",
    overallScore: 92,
    reason: "Matches your ingredient preferences",
  },
  {
    id: 3,
    brand: "Krave Beauty",
    name: "Great Barrier Relief",
    image: "/placeholder.svg?height=200&width=200",
    overallScore: 95,
    reason: "Highly rated for sustainability",
  },
  {
    id: 4,
    brand: "Biossance",
    name: "Squalane + Vitamin C Rose Oil",
    image: "/placeholder.svg?height=200&width=200",
    overallScore: 93,
    reason: "Addresses your skin concerns",
  },
]

// Sample data for educational articles
const educationalArticles = [
  {
    id: 1,
    title: "Understanding Parabens in Skincare",
    description: "Learn about parabens, their uses, and potential concerns in beauty products.",
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    id: 2,
    title: "The Truth About 'Clean Beauty'",
    description: "Separating fact from fiction in the clean beauty movement and what it means for you.",
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    id: 3,
    title: "Decoding Skincare Ingredients",
    description: "A beginner's guide to understanding the ingredient list on your beauty products.",
    image: "/placeholder.svg?height=150&width=300",
  },
]

// Score color mapping function
const getScoreColor = (score: number) => {
  if (score >= 90) return "bg-[#a3be8c]"
  if (score >= 75) return "bg-[#ebcb8b]"
  return "bg-[#bf616a]"
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-[#5e81ac]" />
            <span className="text-xl font-bold">CleanSlate</span>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products or ingredients..."
                className="pl-10 pr-4 py-2 w-full border rounded-full bg-gray-50"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
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

      {/* Mobile Search (only visible on mobile) */}
      <div className="md:hidden px-4 py-3 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search products or ingredients..."
            className="pl-10 pr-4 py-2 w-full border rounded-full bg-gray-50"
          />
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#e5f2f2] to-white py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-[#2e3440] mb-2">
                  Analyze ingredients in your beauty products
                </h1>
                <p className="text-gray-600 mb-4 md:mb-0">
                  Scan, search, or browse to discover what's in your products
                </p>
              </div>
              <Button className="bg-[#5e81ac] hover:bg-[#5e81ac]/90 text-white px-6 py-6 rounded-full flex items-center gap-2">
                <Camera className="h-5 w-5" />
                <span className="font-medium">Scan Product</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Recently Viewed Section */}
        <section className="py-6 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#2e3440]">Recently Viewed</h2>
              <Link href="#" className="text-[#5e81ac] text-sm font-medium flex items-center">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-4 min-w-max">
                {recentlyViewedProducts.map((product) => (
                  <div key={product.id} className="w-[200px] bg-white border rounded-lg overflow-hidden shadow-sm">
                    <div className="p-4 flex items-center justify-center">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={120}
                        height={120}
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 pt-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-medium text-gray-500">{product.brand}</p>
                          <h3 className="font-medium text-[#2e3440] line-clamp-1">{product.name}</h3>
                        </div>
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#5e81ac]">
                          <span className="text-xs font-bold text-[#5e81ac]">{product.overallScore}</span>
                        </div>
                      </div>
                      <div className="flex gap-1 mt-3">
                        <Badge className="bg-[#a3be8c] hover:bg-[#a3be8c] text-white text-xs px-2">
                          S: {product.safetyScore}
                        </Badge>
                        <Badge className="bg-[#ebcb8b] hover:bg-[#ebcb8b] text-white text-xs px-2">
                          Su: {product.sustainabilityScore}
                        </Badge>
                        <Badge className="bg-[#81a1c1] hover:bg-[#81a1c1] text-white text-xs px-2">
                          E: {product.ethicsScore}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Personalized Recommendations */}
        <section className="py-6 px-4 bg-[#e5f2f2]">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#2e3440]">Recommended for You</h2>
              <Link href="#" className="text-[#5e81ac] text-sm font-medium flex items-center">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-1/3 p-4 flex items-center justify-center bg-white">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={120}
                        height={120}
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-medium text-gray-500">{product.brand}</p>
                          <h3 className="font-medium text-[#2e3440]">{product.name}</h3>
                        </div>
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#5e81ac]">
                          <span className="text-xs font-bold text-[#5e81ac]">{product.overallScore}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{product.reason}</p>
                      <div className="mt-3">
                        <Button variant="outline" size="sm" className="text-[#5e81ac] border-[#5e81ac]">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Educational Section */}
        <section className="py-6 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#2e3440]">Learn About Ingredients</h2>
              <Link href="#" className="text-[#5e81ac] text-sm font-medium flex items-center">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {educationalArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-[#2e3440] mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{article.description}</p>
                    <Link href="#" className="text-[#5e81ac] text-sm font-medium">
                      Read More
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40">
        <div className="flex justify-around items-center h-16">
          <button
            className={`flex flex-col items-center justify-center w-full h-full ${activeTab === "home" ? "text-[#5e81ac]" : "text-gray-500"}`}
            onClick={() => setActiveTab("home")}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            className={`flex flex-col items-center justify-center w-full h-full ${activeTab === "scan" ? "text-[#5e81ac]" : "text-gray-500"}`}
            onClick={() => setActiveTab("scan")}
          >
            <Scan className="h-5 w-5" />
            <span className="text-xs mt-1">Scan</span>
          </button>
          <button
            className={`flex flex-col items-center justify-center w-full h-full ${activeTab === "discover" ? "text-[#5e81ac]" : "text-gray-500"}`}
            onClick={() => setActiveTab("discover")}
          >
            <Compass className="h-5 w-5" />
            <span className="text-xs mt-1">Discover</span>
          </button>
          <button
            className={`flex flex-col items-center justify-center w-full h-full ${activeTab === "saved" ? "text-[#5e81ac]" : "text-gray-500"}`}
            onClick={() => setActiveTab("saved")}
          >
            <Bookmark className="h-5 w-5" />
            <span className="text-xs mt-1">Saved</span>
          </button>
          <button
            className={`flex flex-col items-center justify-center w-full h-full ${activeTab === "profile" ? "text-[#5e81ac]" : "text-gray-500"}`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>

      {/* Add padding at the bottom on mobile to account for the navigation bar */}
      <div className="h-16 md:h-0 block"></div>
    </div>
  )
}
