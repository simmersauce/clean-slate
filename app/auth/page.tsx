"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Leaf, Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Password strength calculation
const calculatePasswordStrength = (password: string): number => {
  if (!password) return 0

  let strength = 0

  // Length check
  if (password.length >= 8) strength += 25

  // Character variety checks
  if (/[A-Z]/.test(password)) strength += 25
  if (/[0-9]/.test(password)) strength += 25
  if (/[^A-Za-z0-9]/.test(password)) strength += 25

  return strength
}

// Get color based on password strength
const getStrengthColor = (strength: number): string => {
  if (strength < 50) return "#bf616a" // Error red
  if (strength < 75) return "#ebcb8b" // Warning yellow
  return "#a3be8c" // Success green
}

// Get text based on password strength
const getStrengthText = (strength: number): string => {
  if (strength < 25) return "Very Weak"
  if (strength < 50) return "Weak"
  if (strength < 75) return "Good"
  if (strength < 100) return "Strong"
  return "Very Strong"
}

// Sign up form schema
const signUpSchema = z
  .object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, { message: "You must accept the terms and privacy policy" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// Login form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Please enter your password" }),
  rememberMe: z.boolean().optional(),
})

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signup")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Sign up form
  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  })

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  // Handle sign up submission
  const onSignUpSubmit = (data: z.infer<typeof signUpSchema>) => {
    console.log("Sign up data:", data)
    // Here you would typically send the data to your backend
  }

  // Handle login submission
  const onLoginSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log("Login data:", data)
    // Here you would typically send the data to your backend
  }

  // Update password strength when password changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    setPasswordStrength(calculatePasswordStrength(password))
    signUpForm.setValue("password", password)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-[#e5f2f2] p-4 sm:p-6">
      <div className="w-full max-w-md space-y-8 bg-white p-6 sm:p-8 rounded-lg shadow-sm">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-[#5e81ac]" />
            <span className="text-2xl font-bold text-[#2e3440]">CleanSlate</span>
          </div>
          <h1 className="text-2xl font-semibold text-[#2e3440]">Welcome to CleanSlate</h1>
          <p className="text-sm text-gray-500">Make informed choices about your beauty products</p>
        </div>

        <Tabs defaultValue="signup" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signup" className="data-[state=active]:bg-[#5e81ac] data-[state=active]:text-white">
              Sign Up
            </TabsTrigger>
            <TabsTrigger value="login" className="data-[state=active]:bg-[#5e81ac] data-[state=active]:text-white">
              Log In
            </TabsTrigger>
          </TabsList>

          {/* Sign Up Form */}
          <TabsContent value="signup" className="space-y-4">
            <Form {...signUpForm}>
              <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
                <FormField
                  control={signUpForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage className="text-[#bf616a]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage className="text-[#bf616a]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            onChange={handlePasswordChange}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      {field.value && (
                        <div className="space-y-1 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs" style={{ color: getStrengthColor(passwordStrength) }}>
                              {getStrengthText(passwordStrength)}
                            </span>
                            <span className="text-xs text-gray-500">{passwordStrength}%</span>
                          </div>
                          <Progress
                            value={passwordStrength}
                            className="h-1"
                            indicatorClassName="bg-current"
                            style={{ color: getStrengthColor(passwordStrength) }}
                          />
                        </div>
                      )}
                      <FormMessage className="text-[#bf616a]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-[#bf616a]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-[#5e81ac] data-[state=checked]:border-[#5e81ac]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          I accept the{" "}
                          <Link href="#" className="text-[#5e81ac] hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="#" className="text-[#5e81ac] hover:underline">
                            Privacy Policy
                          </Link>
                        </FormLabel>
                        <FormMessage className="text-[#bf616a]" />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-[#5e81ac] hover:bg-[#5e81ac]/90">
                  Create Account
                </Button>
              </form>
            </Form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign up with Google
            </Button>
          </TabsContent>

          {/* Login Form */}
          <TabsContent value="login" className="space-y-4">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage className="text-[#bf616a]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <Link href="#" className="text-xs text-[#5e81ac] hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-[#bf616a]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-[#5e81ac] data-[state=checked]:border-[#5e81ac]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">Remember me</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-[#5e81ac] hover:bg-[#5e81ac]/90">
                  Log In
                </Button>
              </form>
            </Form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Log in with Google
            </Button>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Link href="/" className="text-sm text-[#5e81ac] hover:underline">
            Continue as Guest
          </Link>
        </div>
      </div>
    </div>
  )
}
