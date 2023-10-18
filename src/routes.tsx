import { Routes, Route } from "react-router-dom";

import { Provisionamento } from "./pages/Provisionamento";
import { MenuDrawer } from "./pages/Menu";

export function AppRoutes(){
    return (
        <Routes>
            <Route path="/menu" element={ <MenuDrawer /> }>
                <Route path="Provisionamento" element={ <Provisionamento /> } />
            </Route >
        </Routes>
    )
};