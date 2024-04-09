import { Route, Routes } from "react-router-dom";

import { publicRoutes, privateManagerRoutes, privateHRRoutes, privateCommonRoutes, privateCEORoutes } from "@/routes";

import { useSelector } from "react-redux";
import { ReactNode } from "react";

type RouteType = {
    path: string;
    element: ReactNode;
}

const AppRouter = () => {
    const authStatus = useSelector<string>(state => state.auth.status);
    const user = useSelector<string>(state => state.auth.user);

    let routes;
    if (authStatus !== 'succeeded') {
        routes = publicRoutes;
    } else if (user.role === 2) {
        routes = [...privateManagerRoutes, ...privateCommonRoutes];
    } else {
        routes = [...privateHRRoutes, ...privateCommonRoutes];
    }

    return (
        <Routes>
            {routes.map((route: RouteType) => (
                <Route path={route.path} element={route.element} key={route.path} />
            ))}
        </Routes>
    );
}

export default AppRouter;