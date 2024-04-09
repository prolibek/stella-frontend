import { LandingPage } from "./pages/landing-page"
import { RegisterPage } from "./pages/register-page"
import { SignInPage } from "./pages/signin-page"
import { Dashboard } from "./pages/dashboard"
import { CreateOrganisationPage } from "./pages/org-create"
import { ManagerVacancyRequestsPage } from "./pages/manager/vacancy-requests/list"
import { FormPage } from "./pages/hr/form/list"
import { CreateFormPage } from "./pages/hr/form/create"
import { Members } from "./pages/hr/structure/members"
import { AcceptInvite } from "./features/accept-invite"
import { OrganisationInformationPage } from "./pages/hr/structure/information"

export const publicRoutes = [
    { path: '/', element: <LandingPage/> },
    { path: '/register', element: <RegisterPage/> },
    { path: '/sign-in', element: <SignInPage/> }
]

export const privateCommonRoutes = [
    { path: '/dashboard', element: <Dashboard/>},
    { path: '/create-organisation', element: <CreateOrganisationPage/>},
    { path: '/organisations/:key/join', element: <AcceptInvite/> }
]

export const privateManagerRoutes = [
    { path: '/organisations/:key/vacancy-requests', element: <ManagerVacancyRequestsPage/>}
]

export const privateHRRoutes = [
    { path: '/organisations/:key/forms', element: <FormPage/>},
    { path: '/organisations/:key/forms/create', element: <CreateFormPage/> },
    { path: '/organisations/:key/structure/members', element: <Members/> },
    { path: '/organisations/:key/structure/information', element: <OrganisationInformationPage/> }
]

export const privateCEORoutes = [...privateManagerRoutes,  ...privateManagerRoutes]