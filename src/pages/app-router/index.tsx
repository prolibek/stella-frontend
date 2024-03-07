import { Route, Routes } from "react-router-dom";

import { publicRoutes } from "@/routes";
import { privateRoutes } from "../../routes";

import { useSelector } from "react-redux";
import { ReactNode } from "react";

type RouteType = {
    path: string;
    element: ReactNode;
}

const AppRouter = () => {
    const authStatus = useSelector<string>(state => state.auth.status);

    return (
        <Routes>
            {
                (authStatus !== 'succeeded') ?
                publicRoutes.map((route: RouteType) => 
                    <Route
                        path={route.path}
                        element={route.element}
                        key={route.path}
                    />
                ) :
                privateRoutes.map((route: RouteType) => 
                <Route
                    path={route.path}
                    element={route.element}
                    key={route.path}
                />
            )
            }
        </Routes>
    )
}

export default AppRouter;