"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock, faUser, faStore, faShoppingBag, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons"

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [role, setRole] = useState<"buyer" | "seller">("buyer")

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-orange-600">Shopee</h1>
                    <p className="text-gray-600">Create a new account</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-center">Sign Up</CardTitle>
                        <CardDescription className="text-center">Enter your details to create an account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1.5 text-gray-400">
                                            <FontAwesomeIcon icon={faUser} />
                                        </span>
                                        <Input id="username" placeholder="Enter your username" className="pl-10" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1.5 text-gray-400">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </span>
                                        <Input id="email" type="email" placeholder="Enter your email" className="pl-10" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1.5 text-gray-400">
                                            <FontAwesomeIcon icon={faLock} />
                                        </span>
                                        <Input id="password" type={showPassword ? "text" : "password"} placeholder="Create a password" className="pl-10" />
                                        <Button
                                            variant="ghost"
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 bg-transparent focus:outline-none"
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1.5 text-gray-400">
                                            <FontAwesomeIcon icon={faLock} />
                                        </span>
                                        <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" className="pl-10" />
                                        <Button
                                            variant="ghost"
                                            type="button"
                                            onClick={() => setShowPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 bg-transparent focus:outline-none"
                                        >
                                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Select your role</Label>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <div
                                            className={`border rounded-lg p-4 cursor-pointer transition-all ${role === "buyer" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"
                                                }`}
                                            onClick={() => setRole("buyer")}
                                        >
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                                    <FontAwesomeIcon icon={faShoppingBag} size="lg" />
                                                </div>
                                                <span className="font-medium">Buyer</span>
                                                <p className="text-xs text-center text-gray-500">Shop for products</p>
                                            </div>
                                        </div>

                                        <div
                                            className={`border rounded-lg p-4 cursor-pointer transition-all ${role === "seller" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"
                                                }`}
                                            onClick={() => setRole("seller")}
                                        >
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                                    <FontAwesomeIcon icon={faStore} size="lg" />
                                                </div>
                                                <span className="font-medium">Seller</span>
                                                <p className="text-xs text-center text-gray-500">Sell your products</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        I agree to the{" "}
                                        <Link to="/terms" className="text-orange-600 hover:underline">
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link to="/privacy" className="text-orange-600 hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>

                                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                                    Create Account
                                </Button>
                            </div>
                        </form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="flex items-center justify-center gap-2">
                                <FontAwesomeIcon icon={faFacebook} className="text-blue-600" />
                                Facebook
                            </Button>
                            <Button variant="outline" className="flex items-center justify-center gap-2">
                                <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
                                Google
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-orange-600 hover:underline font-medium">
                                Login
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
