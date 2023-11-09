import { Routes, Route } from "react-router-dom";

import { Provisionamento } from "./pages/Provisionamento";

export function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={ <Provisionamento /> } />
        </Routes>
    )
};