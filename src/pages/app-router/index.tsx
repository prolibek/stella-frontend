import { Route, Routes } from "react-router-dom";

import { publicRoutes } from "@/routes";

const AppRouter = () => {
    return (
        <Routes>
            {
                publicRoutes.map((route) => 
                    <Route
                        path={route.path}
                        element={route.element}
                        key={route.element}
                    />
                )
            }
        </Routes>
    )
}

export default AppRouter;