import { Routes, Route } from "react-router-dom";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { MenuDrawer } from "./components/DesktopMenu";
import { MobileDrawerMenu } from "./components/MobileMenu";
import { Provisionamento } from "./pages/Provisionamento";
import { Login } from "./pages/Login";

export function AppRoutes(){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Routes>
            <Route path="login" element={ <Login /> } />
            <Route path="/" element={ matches == true ? <MobileDrawerMenu /> : <MenuDrawer /> }>
                <Route path="provisionamento" element={ <Provisionamento /> } />
            </Route>
        </Routes>
    )
};