import { ReactNode, } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { isLogged } from "./config/isLogged";

import { Login } from "./pages/Login";
import { Provisionamento } from "./pages/Provisionamento";
import { HandleManageOlt } from "./pages/admin/manageOlt";
import { HandleManageUsers } from "./pages/admin/users";
import { MenuDrawer } from "./components/DesktopMenu";
import { MobileDrawerMenu } from "./components/MobileMenu";


interface PrivateRouteProps {
    children: ReactNode;
}  

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
    const location = useLocation();

    return isLogged() ? 
        children : 
        <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} />
}

export function AppRoutes(){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Routes>
            <Route path="login" element={ <Login /> } />
            <Route path="/" element={ matches == true ? <MobileDrawerMenu /> : <MenuDrawer /> }>
                <Route path="provisionamento" element={
                    <PrivateRoute>
                        <Provisionamento />
                    </PrivateRoute>
                } />
                <Route path="olts" element={
                    <PrivateRoute>
                        <HandleManageOlt /> 
                    </PrivateRoute>
                } />
                <Route path="users" element={
                    <PrivateRoute>
                        <HandleManageUsers /> 
                    </PrivateRoute>
                } />
            </Route>
        </Routes>
    )
};