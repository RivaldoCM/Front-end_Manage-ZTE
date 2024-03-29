import { ReactElement, useEffect} from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { isLogged } from "./config/isLogged";

import { Login } from "./pages/Login";
import { HandleManageOlt } from "./pages/admin/manageOlt";
import { HandleManageUsers } from "./pages/admin/users";
import { OnuDelete } from "./pages/onuDelete";
import { LogsOnu } from "./pages/logs/onu";
import { AuthOnuController } from "./pages/Provisionamento";
import { MyAuthorizedOnus } from "./pages/MyAuthorizedOnus";

import { MenuDrawer } from "./components/DesktopMenu";
import { MobileDrawerMenu } from "./components/MobileMenu";

import { AuthOnuContextProvider } from "./contexts/AuthOnuContext";
import { MyAuthorizedOnusMobile } from "./pages/MyAuthorizedOnus/mobile";

interface PrivateRouteProps {
    element: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    return isLogged() ? element : <Navigate to='/login' />;
}

export function AppRoutes() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const token = localStorage.getItem('Authorization');
    
        if(token && location.pathname === '/login' || token && location.pathname === '/'){
            navigate('/auth_onu');
        }
        
        if (!token && location.pathname !== '/login') {
            navigate('/login');
        }
    }, [navigate, location]);

    return (
        <Routes>
            <Route index path="login" element={<Login />} />
            <Route path="" element={matches ? <MobileDrawerMenu /> : <MenuDrawer />}>
                <Route
                    path="olts"
                    element={<PrivateRoute element={<HandleManageOlt />} />}
                />
                <Route
                    path="users"
                    element={<PrivateRoute element={<HandleManageUsers />} />}
                />
                <Route
                    path="onuDelete"
                    element={<PrivateRoute element={<OnuDelete />} />}
                />
                <Route
                    path="logs_onu"
                    element={<PrivateRoute element={<LogsOnu />} />}
                />
                <Route
                    path="auth_onu"
                    element={
                        <AuthOnuContextProvider>
                            <PrivateRoute
                                element={<AuthOnuController />}
                            />
                        </AuthOnuContextProvider>
                    }
                />
                <Route
                    path="my_auth_onus"
                    element={<PrivateRoute element={matches ? <MyAuthorizedOnusMobile /> : <MyAuthorizedOnus />} />}
                />
            </Route>
        </Routes>
    );
}
