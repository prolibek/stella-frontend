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
import { ApplicationHRPage } from "./pages/hr/applications"
import { EditFormPage } from "./pages/hr/form/edit"
import { VacancyListHRPage } from "./pages/hr/vacancies/list"
import { VacancyDetailPage } from "./pages/hr/vacancies/detail"

export const publicRoutes = [
    { path: '/', element: <LandingPage/> },
    { path: '/register', element: <RegisterPage/> },
    { path: '/sign-in', element: <SignInPage/> }
]

export const privateCommonRoutes = [
    { path: '/', element: <LandingPage/> },
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
    { path: '/organisations/:key/forms/:id/edit', element: <EditFormPage/> },

    { path: '/organisations/:key/structure/members', element: <Members/> },
    { path: '/organisations/:key/structure/information', element: <OrganisationInformationPage/> },
    
    { path: '/organisations/:key/applications', element: <ApplicationHRPage/>},

    { path: '/organisations/:key/vacancies', element: <VacancyListHRPage/> },
    { path: '/organisations/:key/vacancies/:id', element: <VacancyDetailPage/> },
]

export const privateCEORoutes = [...privateManagerRoutes,  ...privateManagerRoutes]