import { Routes, Route } from "react-router-dom";

import { Provisionamento } from "./pages/Provisionamento";
import { HandleManageOlt } from "./pages/admin/manageOlt";

export function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={ <Provisionamento /> } />
            <Route path="/admin" element={ <HandleManageOlt /> } />
        </Routes>
    )
};