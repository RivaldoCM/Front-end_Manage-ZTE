import { Routes, Route } from "react-router-dom";

import { Provisionamento } from "./pages/Provisionamento";
import { MenuDrawer } from "./pages/Menu";

export function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={ <Provisionamento /> } />
            <Route path="menu" element={ <MenuDrawer /> } />
        </Routes>
    )
};