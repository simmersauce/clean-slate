import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Leaf, Search, Barcode, ClipboardList, Star, Instagram, Twitter, Facebook, ChevronRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-[#5e81ac]" />
            <span className="text-xl font-bold">CleanSlate</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:text-[#5e81ac] transition-colors">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-[#5e81ac] transition-colors">
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-[#5e81ac] transition-colors">
              How It Works
            </Link>
          </nav>
          <Button className="bg-[#5e81ac] hover:bg-[#5e81ac]/90">Sign Up / Log In</Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-[#e5f2f2]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Beauty Ingredients, Decoded
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Make informed choices about your skincare and beauty products with ingredient analysis you can trust
              </p>
              <div className="w-full max-w-md space-y-2">
                <div className="flex w-full max-w-md items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search for a product or ingredient..."
                      className="pl-8 rounded-l-md"
                    />
                  </div>
                  <Button className="bg-[#5e81ac] hover:bg-[#5e81ac]/90 rounded-l-none">
                    <Barcode className="mr-2 h-4 w-4" />
                    Scan Barcode
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white" id="how-it-works">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Simple steps to make informed decisions about your beauty products
                </p>
              </div>
            </div>
            <div className="mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-3 md:gap-12 lg:max-w-5xl xl:gap-16 pt-8">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e5f2f2]">
                  <Search className="h-8 w-8 text-[#5e81ac]" />
                </div>
                <h3 className="text-xl font-bold">Search Products</h3>
                <p className="text-gray-500">
                  Find products by name or scan barcodes for instant information about what's in your beauty products.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e5f2f2]">
                  <ClipboardList className="h-8 w-8 text-[#5e81ac]" />
                </div>
                <h3 className="text-xl font-bold">Analyze Ingredients</h3>
                <p className="text-gray-500">
                  Understand what's in your products with our comprehensive ingredient database and analysis tools.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e5f2f2]">
                  <Leaf className="h-8 w-8 text-[#5e81ac]" />
                </div>
                <h3 className="text-xl font-bold">Find Cleaner Options</h3>
                <p className="text-gray-500">
                  Discover safer alternatives that match your preferences and needs without harmful ingredients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why CleanSlate Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#e5f2f2]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why CleanSlate</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Our platform offers comprehensive beauty product analysis to help you make better choices
                </p>
              </div>
            </div>
            <div className="mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-12 lg:max-w-6xl pt-8">
              <div className="flex flex-col space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5e81ac]">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">Safety Analysis</h3>
                <p className="text-gray-500">
                  Comprehensive safety ratings for thousands of ingredients based on scientific research.
                </p>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5e81ac]">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">Sustainability Info</h3>
                <p className="text-gray-500">
                  Details on ethical sourcing, environmental impact, and cruelty-free certifications.
                </p>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5e81ac]">
                  <Search className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">Personalized Recommendations</h3>
                <p className="text-gray-500">
                  Get product suggestions tailored to your skin type, concerns, and ingredient preferences.
                </p>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5e81ac]">
                  <ClipboardList className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">Educational Resources</h3>
                <p className="text-gray-500">
                  Learn about ingredients, formulations, and how to read product labels effectively.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Users Say</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Hear from people who have transformed their beauty routines with CleanSlate
                </p>
              </div>
            </div>
            <div className="mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:max-w-5xl pt-8">
              <div className="flex flex-col justify-between p-6 bg-[#e5f2f2] rounded-lg">
                <div>
                  <div className="flex space-x-1 mb-2">
                    <Star className="h-5 w-5 fill-[#5e81ac] text-[#5e81ac]" />
                    <Star className="h-5 w-5 fill-[#5e81ac] text-[#5e81ac]" />
                    <Star className="h-5 w-5 fill-[#5e81ac] text-[#5e81ac]" />
                    <Star className="h-5 w-5 fill-[#5e81ac] text-[#5e81ac]" />
                    <Star className="h-5 w-5 fill-[#5e81ac] text-[#5e81ac]" />
                  </div>
                  <p className="text-gray-500 mb-4">
                    "CleanSlate has completely changed how I shop for skincare. I now understand what I'm putting on my
                    skin and feel confident in my choices."
                  </p>
                </div>
                <div>
                  <p className="font-bold">Sarah T.</p>
                  <p className="text-sm text-gray-500">Skincare Enthusiast</p>
                </div>
              </div>
              <div className="flex flex-col justify-between p-6 bg-[#e5f2f2] rounded-lg">
                <div>
                  <div className="flex space-x-1 mb-2">
                    <Star className="h-5 w-5 fill-[#5e81ac] text-[#5e81ac]" />
                    <Star className="h-5 w-5 fill-[#5e81ac] text-[#5e81ac]" />
                    <Star className="h-5 w-5 fill-[#5e81ac] text-[#5e81ac]" />
                    <Star className="h-5 w-5 fill-[#5e81ac] text-[#5e81ac]" />
                    <Star className="h-5 w-5 fill-[#5e81ac] text-[#5e81ac]" />
                  </div>
                  <p className="text-gray-500 mb-4">
                    "As someone with sensitive skin, CleanSlate has been a game-changer. I've found products that work
                    without causing irritation."
                  </p>
                </div>
                <div>
                  <p className="font-bold">Michael R.</p>
                  <p className="text-sm text-gray-500">Sensitive Skin Advocate</p>
                </div>
              </div>
              <div className="flex flex-col justify-between p-6 bg-[#e5f2f2] rounded-lg">
                <div>
                  <div className="flex space-x-1 mb-2">
                    <Star className="h-5 w-5 fill-[#5e81ac] text-[#5e81ac]" />
                    <Star className="h-5 w-5 fill-[#5e81ac] text-[#5e81ac]" />
                    <Star className="h-5 w-5 fill-[#5e81ac] text-[#5e81ac]" />
                    <Star className="h-5 w-5 fill-[#5e81ac] text-[#5e81ac]" />
                    <Star className="h-5 w-5 fill-[#5e81ac] text-[#5e81ac]" />
                  </div>
                  <p className="text-gray-500 mb-4">
                    "The barcode scanning feature is brilliant! I use it every time I shop and have discovered so many
                    better alternatives."
                  </p>
                </div>
                <div>
                  <p className="font-bold">Jamie L.</p>
                  <p className="text-sm text-gray-500">Clean Beauty Convert</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#5e81ac] text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Decode Your Beauty Products?
                </h2>
                <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                  Join thousands of users making informed choices about their beauty and skincare products
                </p>
              </div>
              <Button className="bg-white text-[#5e81ac] hover:bg-white/90">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-white py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-[#5e81ac]" />
            <span className="text-lg font-semibold">CleanSlate</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="#" className="text-gray-500 hover:text-[#5e81ac]">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-[#5e81ac]">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-[#5e81ac]">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
