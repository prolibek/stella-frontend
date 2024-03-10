import { LandingPage } from "@/pages/landing-page"
import { RegisterPage } from "@/pages/register-page"
import { SignInPage } from "@/pages/signin-page"
import { Dashboard } from "./pages/dashboard"
import { CreateOrganisationPage } from "./pages/org-create"
import { ManagerVacancyRequestsPage } from "./pages/manager-pages/vacancy-requests"

export const publicRoutes = [
    { path: '/', element: <LandingPage/> },
    { path: '/register', element: <RegisterPage/> },
    { path: '/sign-in', element: <SignInPage/> }
]

export const privateCommonRoutes = [
    { path: '/dashboard', element: <Dashboard/>},
    { path: '/create-organisation', element: <CreateOrganisationPage/>},
]

export const privateManagerRoutes = [
    { path: '/organisations/:key/vacancy-requests', element: <ManagerVacancyRequestsPage/>}
]

export const privateHRRoutes = [

]