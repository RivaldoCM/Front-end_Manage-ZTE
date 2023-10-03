import { Routes, Route } from "react-router-dom";

import { Provisionamento } from "./pages/Provisionamento";
import { GetDataClient } from "./pages/GetDataClient";

export function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={ <Provisionamento /> } />
            <Route path="/getClient" element= { <GetDataClient />} />
        </Routes>
    )
};