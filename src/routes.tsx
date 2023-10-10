import { Routes, Route } from "react-router-dom";

import { Provisionamento } from "./pages/Provisionamento";
import { Login } from "./pages/Login";

export function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={ <Provisionamento /> } />
            <Route path="Login" element={ <Login /> } />
        </Routes>
    )
};