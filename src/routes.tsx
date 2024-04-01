import { LandingPage } from "./pages/landing-page"
import { RegisterPage } from "./pages/register-page"
import { SignInPage } from "./pages/signin-page"
import { Dashboard } from "./pages/dashboard"
import { CreateOrganisationPage } from "./pages/org-create"
import { ManagerVacancyRequestsPage } from "./pages/manager/vacancy-requests"
import { FormPage } from "./pages/hr/form/list"
import { CreateFormPage } from "./pages/hr/form/create"
import { Members } from "./pages/hr/structure/members"

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
    { path: '/organisations/:key/forms', element: <FormPage/>},
    { path: '/organisations/:key/forms/create', element: <CreateFormPage/> },
    { path: '/organisations/:key/structure/members', element: <Members/> },
]