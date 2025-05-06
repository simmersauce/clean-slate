"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Leaf,
  X,
  Droplets,
  Sun,
  FlaskRoundIcon as Flask,
  Shield,
  Palette,
  Scissors,
  SprayCanIcon as Spray,
} from "lucide-react"
import Link from "next/link"

// Define the form data structure
interface FormData {
  skinType: string
  skinConcerns: string[]
  ageRange: string
  priorities: {
    safety: number
    sustainability: number
    ethical: number
    performance: number
  }
  ingredientsToAvoid: string[]
  productCategories: string[]
}

export default function PreferencesPage() {
  // State for current step
  const [currentStep, setCurrentStep] = useState(1)

  // State for form data
  const [formData, setFormData] = useState<FormData>({
    skinType: "",
    skinConcerns: [],
    ageRange: "",
    priorities: {
      safety: 50,
      sustainability: 50,
      ethical: 50,
      performance: 50,
    },
    ingredientsToAvoid: [],
    productCategories: [],
  })

  // State for new ingredient input
  const [newIngredient, setNewIngredient] = useState("")

  // Handle next step
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  // Handle previous step
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  // Handle form completion
  const handleComplete = () => {
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
  }

  // Handle skin type change
  const handleSkinTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, skinType: value }))
  }

  // Handle skin concerns change
  const handleSkinConcernChange = (value: string) => {
    setFormData((prev) => {
      const concerns = prev.skinConcerns.includes(value)
        ? prev.skinConcerns.filter((item) => item !== value)
        : [...prev.skinConcerns, value]
      return { ...prev, skinConcerns: concerns }
    })
  }

  // Handle age range change
  const handleAgeRangeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, ageRange: value }))
  }

  // Handle priority slider change
  const handlePriorityChange = (key: keyof FormData["priorities"], value: number[]) => {
    setFormData((prev) => ({
      ...prev,
      priorities: {
        ...prev.priorities,
        [key]: value[0],
      },
    }))
  }

  // Handle adding ingredient to avoid
  const handleAddIngredient = () => {
    if (newIngredient.trim() && !formData.ingredientsToAvoid.includes(newIngredient.trim())) {
      setFormData((prev) => ({
        ...prev,
        ingredientsToAvoid: [...prev.ingredientsToAvoid, newIngredient.trim()],
      }))
      setNewIngredient("")
    }
  }

  // Handle removing ingredient to avoid
  const handleRemoveIngredient = (ingredient: string) => {
    setFormData((prev) => ({
      ...prev,
      ingredientsToAvoid: prev.ingredientsToAvoid.filter((item) => item !== ingredient),
    }))
  }

  // Handle product category selection
  const handleCategoryChange = (category: string) => {
    setFormData((prev) => {
      const categories = prev.productCategories.includes(category)
        ? prev.productCategories.filter((item) => item !== category)
        : [...prev.productCategories, category]
      return { ...prev, productCategories: categories }
    })
  }

  // Handle key press for adding ingredients
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddIngredient()
    }
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-[#5e81ac]" />
            <span className="text-xl font-bold text-[#2e3440]">CleanSlate</span>
          </Link>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep === step
                      ? "border-[#5e81ac] bg-[#5e81ac] text-white"
                      : currentStep > step
                        ? "border-[#5e81ac] bg-white text-[#5e81ac]"
                        : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {currentStep > step ? "✓" : step}
                </div>
                <span className={`text-xs mt-2 ${currentStep >= step ? "text-[#2e3440]" : "text-gray-400"}`}>
                  {step === 1 ? "Skin Profile" : step === 2 ? "Values" : "Products"}
                </span>
              </div>
            ))}
            <div className="absolute left-0 right-0 h-0.5 top-5 -z-10">
              <div className="mx-auto max-w-2xl px-14">
                <div className="h-0.5 w-full bg-gray-200">
                  <div
                    className="h-0.5 bg-[#5e81ac] transition-all duration-300"
                    style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Steps */}
        <Card className="bg-[#e5f2f2] border-none shadow-sm">
          <CardContent className="p-6">
            {/* Step 1: Skin Profile */}
            <div className={`space-y-6 ${currentStep === 1 ? "block animate-fadeIn" : "hidden"}`}>
              <h2 className="text-2xl font-bold text-[#2e3440] text-center">Tell us about your skin</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-3">Skin type</h3>
                  <RadioGroup
                    value={formData.skinType}
                    onValueChange={handleSkinTypeChange}
                    className="grid grid-cols-2 gap-3 sm:grid-cols-3"
                  >
                    {["Normal", "Dry", "Oily", "Combination", "Sensitive"].map((type) => (
                      <Label
                        key={type}
                        htmlFor={`skin-${type.toLowerCase()}`}
                        className="flex items-center justify-between p-4 border bg-white rounded-lg cursor-pointer hover:border-[#5e81ac] transition-colors min-h-[44px]"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value={type.toLowerCase()}
                            id={`skin-${type.toLowerCase()}`}
                            className="text-[#5e81ac]"
                          />
                          <span>{type}</span>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Skin concerns</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["Acne", "Aging", "Dryness", "Redness", "Uneven Texture", "Hyperpigmentation"].map((concern) => (
                      <Label
                        key={concern}
                        htmlFor={`concern-${concern.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex items-center justify-between p-4 border bg-white rounded-lg cursor-pointer hover:border-[#5e81ac] transition-colors min-h-[44px]"
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`concern-${concern.toLowerCase().replace(/\s+/g, "-")}`}
                            checked={formData.skinConcerns.includes(concern.toLowerCase())}
                            onCheckedChange={() => handleSkinConcernChange(concern.toLowerCase())}
                            className="text-[#5e81ac] border-gray-300"
                          />
                          <span>{concern}</span>
                        </div>
                      </Label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Age range</h3>
                  <Select value={formData.ageRange} onValueChange={handleAgeRangeChange}>
                    <SelectTrigger className="w-full bg-white min-h-[44px]">
                      <SelectValue placeholder="Select your age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-18">Under 18</SelectItem>
                      <SelectItem value="18-24">18-24</SelectItem>
                      <SelectItem value="25-34">25-34</SelectItem>
                      <SelectItem value="35-44">35-44</SelectItem>
                      <SelectItem value="45-plus">45+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Step 2: Values & Priorities */}
            <div className={`space-y-6 ${currentStep === 2 ? "block animate-fadeIn" : "hidden"}`}>
              <h2 className="text-2xl font-bold text-[#2e3440] text-center">What matters to you?</h2>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium">Ingredient Safety</h3>
                      <span className="text-sm font-medium">{formData.priorities.safety}%</span>
                    </div>
                    <Slider
                      value={[formData.priorities.safety]}
                      onValueChange={(value) => handlePriorityChange("safety", value)}
                      max={100}
                      step={1}
                      className="[&>span]:bg-[#5e81ac]"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium">Sustainability</h3>
                      <span className="text-sm font-medium">{formData.priorities.sustainability}%</span>
                    </div>
                    <Slider
                      value={[formData.priorities.sustainability]}
                      onValueChange={(value) => handlePriorityChange("sustainability", value)}
                      max={100}
                      step={1}
                      className="[&>span]:bg-[#5e81ac]"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium">Ethical Sourcing</h3>
                      <span className="text-sm font-medium">{formData.priorities.ethical}%</span>
                    </div>
                    <Slider
                      value={[formData.priorities.ethical]}
                      onValueChange={(value) => handlePriorityChange("ethical", value)}
                      max={100}
                      step={1}
                      className="[&>span]:bg-[#5e81ac]"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium">Performance/Efficacy</h3>
                      <span className="text-sm font-medium">{formData.priorities.performance}%</span>
                    </div>
                    <Slider
                      value={[formData.priorities.performance]}
                      onValueChange={(value) => handlePriorityChange("performance", value)}
                      max={100}
                      step={1}
                      className="[&>span]:bg-[#5e81ac]"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Ingredients to avoid</h3>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Add ingredient (e.g., parabens)"
                      value={newIngredient}
                      onChange={(e) => setNewIngredient(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="flex-1 bg-white min-h-[44px]"
                    />
                    <Button
                      type="button"
                      onClick={handleAddIngredient}
                      className="bg-[#5e81ac] hover:bg-[#5e81ac]/90 min-h-[44px]"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.ingredientsToAvoid.map((ingredient) => (
                      <Badge key={ingredient} className="bg-[#5e81ac] hover:bg-[#5e81ac]/90 px-3 py-1 text-sm">
                        {ingredient}
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredient(ingredient)}
                          className="ml-2 text-white hover:text-gray-200"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {ingredient}</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Categories of Interest */}
            <div className={`space-y-6 ${currentStep === 3 ? "block animate-fadeIn" : "hidden"}`}>
              <h2 className="text-2xl font-bold text-[#2e3440] text-center">Which products do you use regularly?</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[
                  { name: "Cleansers", icon: <Droplets className="h-6 w-6" /> },
                  { name: "Moisturizers", icon: <Droplets className="h-6 w-6" /> },
                  { name: "Serums", icon: <Flask className="h-6 w-6" /> },
                  { name: "Sunscreen", icon: <Sun className="h-6 w-6" /> },
                  { name: "Makeup", icon: <Palette className="h-6 w-6" /> },
                  { name: "Hair Care", icon: <Scissors className="h-6 w-6" /> },
                  { name: "Body Care", icon: <Spray className="h-6 w-6" /> },
                  { name: "Treatments", icon: <Shield className="h-6 w-6" /> },
                ].map((category) => (
                  <div
                    key={category.name}
                    onClick={() => handleCategoryChange(category.name.toLowerCase())}
                    className={`
                      flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all
                      border min-h-[100px] hover:border-[#5e81ac]
                      ${
                        formData.productCategories.includes(category.name.toLowerCase())
                          ? "bg-[#5e81ac] text-white border-[#5e81ac]"
                          : "bg-white text-[#2e3440] border-gray-200"
                      }
                    `}
                  >
                    <div className="mb-2">{category.icon}</div>
                    <span className="text-center text-sm">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <Button type="button" onClick={handleBack} variant="outline" className="min-h-[44px]">
                  Back
                </Button>
              ) : (
                <div></div>
              )}

              {currentStep < 3 ? (
                <Button type="button" onClick={handleNext} className="bg-[#5e81ac] hover:bg-[#5e81ac]/90 min-h-[44px]">
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleComplete}
                  className="bg-[#5e81ac] hover:bg-[#5e81ac]/90 min-h-[44px]"
                >
                  Complete
                </Button>
              )}
            </div>

            {/* Skip Link */}
            <div className="text-center mt-4">
              <Link href="/" className="text-sm text-[#5e81ac] hover:underline">
                Skip for now
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
