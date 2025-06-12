import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { useState } from "react"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-orange-600">Shopee</h1>
                    <p className="text-gray-600">Login to your account</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-center">Sign In</CardTitle>
                        <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="space-y-4">
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
                                    <div className="flex justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <Link to="/forgot-password" className="text-sm text-orange-600 hover:underline">
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1.5 text-gray-400">
                                            <FontAwesomeIcon icon={faLock} />
                                        </span>
                                        <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" className="pl-10" />
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

                                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                                    Login
                                </Button>
                            </div>
                        </form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
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
                            Don't have an account?{" "}
                            <Link to="/register" className="text-orange-600 hover:underline font-medium">
                                Register
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
