import React from "react";
import { Routes, Route } from "react-router-dom";

import { Provisionamento } from "./pages/Provisionamento";

export function MainRoutes(){
    return (
        <Routes>
            <Route  path="/" element={ <Provisionamento /> } />
        </Routes>
    )
}