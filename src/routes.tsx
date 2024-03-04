import { LandingPage } from "@/pages/landing-page"
import { RegisterPage } from "@/pages/register-page"

export const publicRoutes = [
    { path: '/', element: <LandingPage/> },
    { path: '/register', element: <RegisterPage/> }
]

export const privateRoutes = []