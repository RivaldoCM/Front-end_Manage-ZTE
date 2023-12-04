import { Routes, Route } from "react-router-dom";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Login } from "./pages/Login";
import { Provisionamento } from "./pages/Provisionamento";
import { HandleManageOlt } from "./pages/admin/manageOlt";
import { HandleManageUsers } from "./pages/admin/users";
import { MenuDrawer } from "./components/DesktopMenu";
import { MobileDrawerMenu } from "./components/MobileMenu";

export function AppRoutes(){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Routes>
            <Route path="login" element={ <Login /> } />
            <Route path="/" element={ matches == true ? <MobileDrawerMenu /> : <MenuDrawer /> }>
                <Route path="provisionamento" element={ <Provisionamento /> } />
                <Route path="olts" element={ <HandleManageOlt /> } />
                <Route path="users" element={ <HandleManageUsers /> } />
            </Route>
        </Routes>
    )
};