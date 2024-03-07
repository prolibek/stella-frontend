import { LandingPage } from "@/pages/landing-page"
import { RegisterPage } from "@/pages/register-page"
import { SignInPage } from "@/pages/signin-page"
import { Dashboard } from "./pages/dashboard"

export const publicRoutes = [
    { path: '/', element: <LandingPage/> },
    { path: '/register', element: <RegisterPage/> },
    { path: '/sign-in', element: <SignInPage/> }
]

export const privateRoutes = [
    { path: '/dashboard', element: <Dashboard/>},
]