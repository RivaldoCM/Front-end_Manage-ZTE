import { Routes, Route } from "react-router-dom";

import { Provisionamento } from "./pages/Provisionamento";
import { HandleManageOlt } from "./pages/admin/manageOlt";
import { HandleManageUsers } from "./pages/admin/users";

export function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={ <Provisionamento /> } />
            <Route path="/admin" element={ <HandleManageOlt /> } />
            <Route path="/users" element={ <HandleManageUsers />} />
        </Routes>
    )
};