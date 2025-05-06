"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Leaf,
  Grid,
  List,
  Filter,
  ChevronDown,
  Heart,
  Clock,
  Folder,
  Plus,
  Pencil,
  Share,
  MoreHorizontal,
  Trash,
  Check,
  Home,
  Scan,
  Compass,
  Bookmark,
  User,
  Search,
  MoveRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

// Sample collections data
const defaultCollections = [
  {
    id: "all",
    name: "All Saved Products",
    icon: <Bookmark className="h-4 w-4" />,
    count: 15,
    isDefault: true,
    color: "#5e81ac",
  },
  {
    id: "favorites",
    name: "Favorites",
    icon: <Heart className="h-4 w-4" />,
    count: 8,
    isDefault: true,
    color: "#bf616a",
  },
  {
    id: "want-to-try",
    name: "Want to Try",
    icon: <Clock className="h-4 w-4" />,
    count: 5,
    isDefault: true,
    color: "#ebcb8b",
  },
]

const customCollections = [
  {
    id: "skincare-routine",
    name: "Skincare Routine",
    icon: <Folder className="h-4 w-4" />,
    count: 6,
    isDefault: false,
    description: "My daily skincare products",
    isPublic: false,
    color: "#a3be8c",
  },
  {
    id: "clean-makeup",
    name: "Clean Makeup",
    icon: <Folder className="h-4 w-4" />,
    count: 4,
    isDefault: false,
    description: "Makeup products with clean ingredients",
    isPublic: true,
    color: "#b48ead",
  },
]

// Sample products data
const savedProducts = [
  {
    id: 1,
    brand: "Glossier",
    name: "Milky Jelly Cleanser",
    category: "Facial Cleanser",
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 92,
    collections: ["all", "favorites", "skincare-routine"],
    dateAdded: "2023-10-15",
  },
  {
    id: 2,
    brand: "The Ordinary",
    name: "Niacinamide 10% + Zinc 1%",
    category: "Serum",
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 88,
    collections: ["all", "skincare-routine"],
    dateAdded: "2023-09-22",
  },
  {
    id: 3,
    brand: "CeraVe",
    name: "Moisturizing Cream",
    category: "Moisturizer",
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 95,
    collections: ["all", "favorites", "skincare-routine"],
    dateAdded: "2023-11-05",
  },
  {
    id: 4,
    brand: "Paula's Choice",
    name: "2% BHA Liquid Exfoliant",
    category: "Exfoliant",
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 90,
    collections: ["all", "want-to-try"],
    dateAdded: "2023-10-30",
  },
  {
    id: 5,
    brand: "La Roche-Posay",
    name: "Toleriane Double Repair Face Moisturizer",
    category: "Moisturizer",
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 91,
    collections: ["all", "want-to-try"],
    dateAdded: "2023-11-12",
  },
  {
    id: 6,
    brand: "Drunk Elephant",
    name: "C-Firma Day Serum",
    category: "Serum",
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 89,
    collections: ["all", "want-to-try"],
    dateAdded: "2023-10-18",
  },
  {
    id: 7,
    brand: "Youth To The People",
    name: "Superfood Cleanser",
    category: "Facial Cleanser",
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 94,
    collections: ["all", "favorites", "skincare-routine"],
    dateAdded: "2023-09-15",
  },
  {
    id: 8,
    brand: "First Aid Beauty",
    name: "Ultra Repair Cream",
    category: "Moisturizer",
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 93,
    collections: ["all", "favorites"],
    dateAdded: "2023-11-01",
  },
  {
    id: 9,
    brand: "Kiehl's",
    name: "Ultra Facial Cream",
    category: "Moisturizer",
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 87,
    collections: ["all", "want-to-try"],
    dateAdded: "2023-10-25",
  },
  {
    id: 10,
    brand: "Fenty Beauty",
    name: "Pro Filt'r Soft Matte Foundation",
    category: "Makeup",
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 86,
    collections: ["all", "clean-makeup"],
    dateAdded: "2023-11-08",
  },
  {
    id: 11,
    brand: "Tower 28",
    name: "SOS Daily Rescue Facial Spray",
    category: "Facial Spray",
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 95,
    collections: ["all", "favorites", "skincare-routine"],
    dateAdded: "2023-10-10",
  },
  {
    id: 12,
    brand: "ILIA",
    name: "Super Serum Skin Tint SPF 40",
    category: "Makeup",
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 92,
    collections: ["all", "favorites", "clean-makeup"],
    dateAdded: "2023-09-28",
  },
  {
    id: 13,
    brand: "Kosas",
    name: "Revealer Concealer",
    category: "Makeup",
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 90,
    collections: ["all", "clean-makeup"],
    dateAdded: "2023-10-05",
  },
  {
    id: 14,
    brand: "Saie",
    name: "Slip Tint",
    category: "Makeup",
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 91,
    collections: ["all", "clean-makeup"],
    dateAdded: "2023-11-15",
  },
  {
    id: 15,
    brand: "Farmacy",
    name: "Green Clean Makeup Removing Balm",
    category: "Cleanser",
    image: "/placeholder.svg?height=300&width=300",
    overallScore: 93,
    collections: ["all", "favorites", "skincare-routine"],
    dateAdded: "2023-10-20",
  },
]

// Color options for collection labels
const colorOptions = [
  { name: "Blue", value: "#5e81ac" },
  { name: "Red", value: "#bf616a" },
  { name: "Yellow", value: "#ebcb8b" },
  { name: "Green", value: "#a3be8c" },
  { name: "Purple", value: "#b48ead" },
  { name: "Teal", value: "#88c0d0" },
]

export default function SavedProductsPage() {
  // State for view mode (grid or list)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // State for active collection
  const [activeCollection, setActiveCollection] = useState("all")

  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState(savedProducts)

  // State for selected products (for bulk actions)
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  // State for sort option
  const [sortOption, setSortOption] = useState("date_desc")

  // State for new collection
  const [newCollection, setNewCollection] = useState({
    name: "",
    description: "",
    isPublic: false,
    color: "#5e81ac",
  })

  // State for edit collection
  const [editCollection, setEditCollection] = useState<any>(null)

  // State for mobile navigation
  const [activeTab, setActiveTab] = useState("saved")

  // State for search query
  const [searchQuery, setSearchQuery] = useState("")

  // Get active collection data
  const getActiveCollectionData = () => {
    const defaultCollection = defaultCollections.find((collection) => collection.id === activeCollection)
    if (defaultCollection) return defaultCollection

    const customCollection = customCollections.find((collection) => collection.id === activeCollection)
    if (customCollection) return customCollection

    return defaultCollections[0]
  }

  // Handle collection change
  const handleCollectionChange = (collectionId: string) => {
    setActiveCollection(collectionId)
    setSelectedProducts([])
  }

  // Handle product selection
  const toggleProductSelection = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  // Handle select all products
  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    }
  }

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortOption(value)
  }

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // Handle new collection submit
  const handleNewCollectionSubmit = () => {
    // In a real app, this would save the new collection to the database
    console.log("New collection:", newCollection)
    // Reset form
    setNewCollection({
      name: "",
      description: "",
      isPublic: false,
      color: "#5e81ac",
    })
  }

  // Handle edit collection submit
  const handleEditCollectionSubmit = () => {
    // In a real app, this would update the collection in the database
    console.log("Edit collection:", editCollection)
    // Reset form
    setEditCollection(null)
  }

  // Handle remove product from collection
  const handleRemoveFromCollection = (productId: number) => {
    // In a real app, this would remove the product from the collection in the database
    console.log("Remove product", productId, "from collection", activeCollection)
  }

  // Handle move product to collection
  const handleMoveToCollection = (productId: number, collectionId: string) => {
    // In a real app, this would move the product to the specified collection in the database
    console.log("Move product", productId, "to collection", collectionId)
  }

  // Handle bulk move to collection
  const handleBulkMoveToCollection = (collectionId: string) => {
    // In a real app, this would move all selected products to the specified collection in the database
    console.log("Move products", selectedProducts, "to collection", collectionId)
    // Clear selection after action
    setSelectedProducts([])
  }

  // Handle bulk remove
  const handleBulkRemove = () => {
    // In a real app, this would remove all selected products from the active collection in the database
    console.log("Remove products", selectedProducts, "from collection", activeCollection)
    // Clear selection after action
    setSelectedProducts([])
  }

  // Effect to filter products based on active collection and search query
  useEffect(() => {
    let filtered = savedProducts.filter((product) => product.collections.includes(activeCollection))

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply sorting
    if (sortOption === "date_desc") {
      filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    } else if (sortOption === "date_asc") {
      filtered.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime())
    } else if (sortOption === "score_desc") {
      filtered.sort((a, b) => b.overallScore - a.overallScore)
    } else if (sortOption === "score_asc") {
      filtered.sort((a, b) => a.overallScore - b.overallScore)
    } else if (sortOption === "name_asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortOption === "name_desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name))
    }

    setFilteredProducts(filtered)
  }, [activeCollection, searchQuery, sortOption])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-[#5e81ac]" />
            <span className="text-xl font-bold">CleanSlate</span>
          </div>
          <h1 className="text-lg font-bold text-[#2e3440] hidden sm:block">Saved Products</h1>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex border rounded-md overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className={viewMode === "grid" ? "bg-[#5e81ac]" : ""}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className={viewMode === "list" ? "bg-[#5e81ac]" : ""}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Sort</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleSortChange("date_desc")}>
                  <div className="flex items-center gap-2">
                    {sortOption === "date_desc" && <Check className="h-4 w-4" />}
                    <span className={sortOption === "date_desc" ? "font-medium" : ""}>Newest First</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("date_asc")}>
                  <div className="flex items-center gap-2">
                    {sortOption === "date_asc" && <Check className="h-4 w-4" />}
                    <span className={sortOption === "date_asc" ? "font-medium" : ""}>Oldest First</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSortChange("score_desc")}>
                  <div className="flex items-center gap-2">
                    {sortOption === "score_desc" && <Check className="h-4 w-4" />}
                    <span className={sortOption === "score_desc" ? "font-medium" : ""}>Highest Score</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("score_asc")}>
                  <div className="flex items-center gap-2">
                    {sortOption === "score_asc" && <Check className="h-4 w-4" />}
                    <span className={sortOption === "score_asc" ? "font-medium" : ""}>Lowest Score</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSortChange("name_asc")}>
                  <div className="flex items-center gap-2">
                    {sortOption === "name_asc" && <Check className="h-4 w-4" />}
                    <span className={sortOption === "name_asc" ? "font-medium" : ""}>Name (A-Z)</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("name_desc")}>
                  <div className="flex items-center gap-2">
                    {sortOption === "name_desc" && <Check className="h-4 w-4" />}
                    <span className={sortOption === "name_desc" ? "font-medium" : ""}>Name (Z-A)</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Collection Management (Sidebar) */}
          <div className="w-full md:w-64 shrink-0">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search saved products..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border rounded-md"
                />
              </div>
            </div>

            <div className="space-y-6">
              {/* Default Collections */}
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-2">Collections</h2>
                <ul className="space-y-1">
                  {defaultCollections.map((collection) => (
                    <li key={collection.id}>
                      <button
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors ${
                          activeCollection === collection.id
                            ? "bg-[#e5f2f2] text-[#5e81ac] font-medium"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleCollectionChange(collection.id)}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: collection.color }}></div>
                          <div className="flex items-center gap-2">
                            {collection.icon}
                            <span>{collection.name}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {collection.count}
                        </Badge>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Custom Collections */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-medium text-gray-500">My Collections</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Collection</DialogTitle>
                        <DialogDescription>Create a new collection to organize your saved products.</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="collection-name">Collection Name</Label>
                          <Input
                            id="collection-name"
                            placeholder="e.g., Summer Skincare"
                            value={newCollection.name}
                            onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="collection-description">Description (Optional)</Label>
                          <Textarea
                            id="collection-description"
                            placeholder="Describe your collection..."
                            value={newCollection.description}
                            onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Collection Color</Label>
                          <div className="flex flex-wrap gap-2">
                            {colorOptions.map((color) => (
                              <button
                                key={color.value}
                                type="button"
                                className={`w-6 h-6 rounded-full border-2 ${
                                  newCollection.color === color.value ? "border-black" : "border-transparent"
                                }`}
                                style={{ backgroundColor: color.value }}
                                onClick={() => setNewCollection({ ...newCollection, color: color.value })}
                                title={color.name}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="collection-public"
                            checked={newCollection.isPublic}
                            onCheckedChange={(checked) => setNewCollection({ ...newCollection, isPublic: checked })}
                          />
                          <Label htmlFor="collection-public">Make collection public</Label>
                        </div>
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                          onClick={handleNewCollectionSubmit}
                          disabled={!newCollection.name}
                          className="bg-[#5e81ac] hover:bg-[#5e81ac]/90"
                        >
                          Create Collection
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {customCollections.length > 0 ? (
                  <ul className="space-y-1">
                    {customCollections.map((collection) => (
                      <li key={collection.id}>
                        <div className="flex items-center justify-between">
                          <button
                            className={`flex-1 flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors ${
                              activeCollection === collection.id
                                ? "bg-[#e5f2f2] text-[#5e81ac] font-medium"
                                : "hover:bg-gray-100"
                            }`}
                            onClick={() => handleCollectionChange(collection.id)}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: collection.color }}></div>
                              <div className="flex items-center gap-2">
                                {collection.icon}
                                <span>{collection.name}</span>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {collection.count}
                            </Badge>
                          </button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => setEditCollection(collection)}
                                className="flex items-center gap-2"
                              >
                                <Pencil className="h-4 w-4" />
                                <span>Edit Collection</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-red-500">
                                <Trash className="h-4 w-4" />
                                <span>Delete Collection</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-6 px-4 bg-gray-50 rounded-lg">
                    <Folder className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-2">No custom collections yet</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-[#5e81ac] hover:bg-[#5e81ac]/90">
                          Create Collection
                        </Button>
                      </DialogTrigger>
                      <DialogContent>{/* Same content as above */}</DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active Collection View */}
          <div className="flex-1">
            <div className="bg-[#e5f2f2] rounded-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-[#2e3440]">{getActiveCollectionData().name}</h2>
                    <Badge variant="outline" className="text-xs">
                      {filteredProducts.length} products
                    </Badge>
                  </div>
                  {getActiveCollectionData().description && (
                    <p className="text-sm text-gray-600 mt-1">{getActiveCollectionData().description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {!getActiveCollectionData().isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#5e81ac] border-[#5e81ac]"
                      onClick={() => setEditCollection(getActiveCollectionData())}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="text-[#5e81ac] border-[#5e81ac]">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Grid/List */}
            {filteredProducts.length > 0 ? (
              <>
                {/* View Mode Toggle (Mobile Only) */}
                <div className="flex sm:hidden justify-end mb-4">
                  <div className="flex border rounded-md overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="icon"
                      className={viewMode === "grid" ? "bg-[#5e81ac]" : ""}
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="icon"
                      className={viewMode === "list" ? "bg-[#5e81ac]" : ""}
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Grid View */}
                {viewMode === "grid" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
                          selectedProducts.includes(product.id) ? "ring-2 ring-[#5e81ac]" : ""
                        }`}
                      >
                        <div className="relative">
                          <div className="absolute top-2 left-2 z-10">
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={() => toggleProductSelection(product.id)}
                              className="h-5 w-5 data-[state=checked]:bg-[#5e81ac] data-[state=checked]:border-[#5e81ac]"
                            />
                          </div>
                          <div className="relative p-4 flex items-center justify-center bg-[#e5f2f2]/30 h-[200px]">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={150}
                              height={150}
                              className="object-contain max-h-[150px]"
                            />
                            <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                              <div className="flex gap-2">
                                <Link href={`/product/${product.id}`}>
                                  <Button className="bg-white text-[#5e81ac] hover:bg-white/90">View Details</Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <p className="text-sm text-gray-600">{product.brand}</p>
                              <h3 className="font-medium text-[#2e3440]">{product.name}</h3>
                              <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                            </div>
                            <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#5e81ac]">
                              <span className="text-xs font-bold text-[#5e81ac]">{product.overallScore}</span>
                            </div>
                          </div>

                          {/* Collection Tags */}
                          <div className="flex flex-wrap gap-1 mt-3">
                            {product.collections
                              .filter((c) => c !== "all" && c !== activeCollection)
                              .map((collectionId) => {
                                const collection = [...defaultCollections, ...customCollections].find(
                                  (c) => c.id === collectionId,
                                )
                                return (
                                  collection && (
                                    <Badge
                                      key={collectionId}
                                      className="text-xs"
                                      style={{
                                        backgroundColor: `${collection.color}20`,
                                        color: collection.color,
                                        borderColor: `${collection.color}40`,
                                      }}
                                    >
                                      {collection.name}
                                    </Badge>
                                  )
                                )
                              })}
                          </div>

                          {/* Quick Actions */}
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-xs text-gray-500">
                              Added {new Date(product.dateAdded).toLocaleDateString()}
                            </span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleRemoveFromCollection(product.id)}
                                  className="flex items-center gap-2 text-red-500"
                                >
                                  <Trash className="h-4 w-4" />
                                  <span>Remove from Collection</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <MoveRight className="h-4 w-4" />
                                  <span>Move to Collection</span>
                                </DropdownMenuItem>
                                {customCollections.map((collection) => (
                                  <DropdownMenuItem
                                    key={collection.id}
                                    className="pl-8"
                                    onClick={() => handleMoveToCollection(product.id, collection.id)}
                                  >
                                    {collection.name}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* List View */}
                {viewMode === "list" && (
                  <div className="space-y-4">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
                          selectedProducts.includes(product.id) ? "ring-2 ring-[#5e81ac]" : ""
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative sm:w-[150px] p-4 flex items-center justify-center bg-[#e5f2f2]/30">
                            <div className="absolute top-2 left-2 z-10">
                              <Checkbox
                                checked={selectedProducts.includes(product.id)}
                                onCheckedChange={() => toggleProductSelection(product.id)}
                                className="h-5 w-5 data-[state=checked]:bg-[#5e81ac] data-[state=checked]:border-[#5e81ac]"
                              />
                            </div>
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={100}
                              height={100}
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="text-sm text-gray-600">{product.brand}</p>
                                <h3 className="font-medium text-[#2e3440]">{product.name}</h3>
                                <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                              </div>
                              <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#5e81ac]">
                                <span className="text-xs font-bold text-[#5e81ac]">{product.overallScore}</span>
                              </div>
                            </div>

                            {/* Collection Tags */}
                            <div className="flex flex-wrap gap-1 mt-3">
                              {product.collections
                                .filter((c) => c !== "all" && c !== activeCollection)
                                .map((collectionId) => {
                                  const collection = [...defaultCollections, ...customCollections].find(
                                    (c) => c.id === collectionId,
                                  )
                                  return (
                                    collection && (
                                      <Badge
                                        key={collectionId}
                                        className="text-xs"
                                        style={{
                                          backgroundColor: `${collection.color}20`,
                                          color: collection.color,
                                          borderColor: `${collection.color}40`,
                                        }}
                                      >
                                        {collection.name}
                                      </Badge>
                                    )
                                  )
                                })}
                            </div>

                            {/* Quick Actions */}
                            <div className="flex justify-between items-center mt-3">
                              <span className="text-xs text-gray-500">
                                Added {new Date(product.dateAdded).toLocaleDateString()}
                              </span>
                              <div className="flex gap-2">
                                <Link href={`/product/${product.id}`}>
                                  <Button size="sm" className="bg-[#5e81ac] hover:bg-[#5e81ac]/90">
                                    View Details
                                  </Button>
                                </Link>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => handleRemoveFromCollection(product.id)}
                                      className="flex items-center gap-2 text-red-500"
                                    >
                                      <Trash className="h-4 w-4" />
                                      <span>Remove from Collection</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="flex items-center gap-2">
                                      <MoveRight className="h-4 w-4" />
                                      <span>Move to Collection</span>
                                    </DropdownMenuItem>
                                    {customCollections.map((collection) => (
                                      <DropdownMenuItem
                                        key={collection.id}
                                        className="pl-8"
                                        onClick={() => handleMoveToCollection(product.id, collection.id)}
                                      >
                                        {collection.name}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bulk Actions Bar */}
                {selectedProducts.length > 0 && (
                  <div className="fixed bottom-16 md:bottom-4 left-0 right-0 z-30 px-4">
                    <div className="container mx-auto">
                      <div className="bg-[#5e81ac] text-white rounded-lg p-3 shadow-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{selectedProducts.length} selected</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-white border-white hover:bg-[#5e81ac]/80"
                            onClick={handleSelectAll}
                          >
                            {selectedProducts.length === filteredProducts.length ? "Deselect All" : "Select All"}
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-white border-white hover:bg-[#5e81ac]/80"
                              >
                                Move To
                              </Button>
                            </SheetTrigger>
                            <SheetContent side="bottom" className="h-[300px]">
                              <SheetHeader>
                                <SheetTitle>Move to Collection</SheetTitle>
                                <SheetDescription>
                                  Select a collection to move {selectedProducts.length} products to.
                                </SheetDescription>
                              </SheetHeader>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-6">
                                {[...defaultCollections, ...customCollections]
                                  .filter((c) => c.id !== activeCollection)
                                  .map((collection) => (
                                    <button
                                      key={collection.id}
                                      className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-[#e5f2f2] transition-colors"
                                      onClick={() => handleBulkMoveToCollection(collection.id)}
                                    >
                                      <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center mb-2"
                                        style={{ backgroundColor: collection.color }}
                                      >
                                        {collection.icon}
                                      </div>
                                      <span className="font-medium">{collection.name}</span>
                                      <span className="text-xs text-gray-500">{collection.count} products</span>
                                    </button>
                                  ))}
                              </div>
                              <SheetFooter>
                                <SheetClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </SheetClose>
                              </SheetFooter>
                            </SheetContent>
                          </Sheet>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-white border-white hover:bg-[#5e81ac]/80"
                            onClick={handleBulkRemove}
                          >
                            Remove
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-white border-white hover:bg-[#5e81ac]/80"
                            onClick={() => setSelectedProducts([])}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-12 px-4 bg-[#e5f2f2]/30 rounded-lg">
                {searchQuery ? (
                  <>
                    <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-[#2e3440] mb-2">No products found</h2>
                    <p className="text-gray-600 mb-6">
                      We couldn't find any products matching "{searchQuery}" in this collection.
                    </p>
                    <Button onClick={() => setSearchQuery("")} className="bg-[#5e81ac] hover:bg-[#5e81ac]/90">
                      Clear Search
                    </Button>
                  </>
                ) : (
                  <>
                    <Bookmark className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-[#2e3440] mb-2">No saved products yet</h2>
                    <p className="text-gray-600 mb-6">Start exploring and save products to build your collection.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link href="/search">
                        <Button className="bg-[#5e81ac] hover:bg-[#5e81ac]/90">Discover Products</Button>
                      </Link>
                      <Link href="/scan">
                        <Button variant="outline" className="text-[#5e81ac] border-[#5e81ac]">
                          Scan a Product
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Edit Collection Modal */}
      {editCollection && (
        <Dialog open={!!editCollection} onOpenChange={() => setEditCollection(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Collection</DialogTitle>
              <DialogDescription>Update your collection details and manage products.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-collection-name">Collection Name</Label>
                <Input
                  id="edit-collection-name"
                  value={editCollection.name}
                  onChange={(e) => setEditCollection({ ...editCollection, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-collection-description">Description (Optional)</Label>
                <Textarea
                  id="edit-collection-description"
                  value={editCollection.description || ""}
                  onChange={(e) => setEditCollection({ ...editCollection, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Collection Color</Label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      className={`w-6 h-6 rounded-full border-2 ${
                        editCollection.color === color.value ? "border-black" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setEditCollection({ ...editCollection, color: color.value })}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-collection-public"
                  checked={editCollection.isPublic || false}
                  onCheckedChange={(checked) => setEditCollection({ ...editCollection, isPublic: checked })}
                />
                <Label htmlFor="edit-collection-public">Make collection public</Label>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={handleEditCollectionSubmit}
                disabled={!editCollection.name}
                className="bg-[#5e81ac] hover:bg-[#5e81ac]/90"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

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
            href="/scan"
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
            href="/saved"
            className={`flex flex-col items-center justify-center w-full h-full ${activeTab === "saved" ? "text-[#5e81ac]" : "text-gray-500"}`}
            onClick={() => setActiveTab("saved")}
          >
            <Bookmark className="h-5 w-5" />
            <span className="text-xs mt-1">Saved</span>
          </Link>
          <Link
            href="/profile"
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
