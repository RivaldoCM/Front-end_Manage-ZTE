import { ReactElement, useEffect} from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { isLogged } from "./config/isLogged";
import { Login } from "./pages/Login";
import { Provisionamento } from "./pages/Provisionamento";
import { HandleManageOlt } from "./pages/admin/manageOlt";
import { HandleManageUsers } from "./pages/admin/users";
import { MenuDrawer } from "./components/DesktopMenu";
import { MobileDrawerMenu } from "./components/MobileMenu";
import { OnuDelete } from "./pages/OnuDelete";

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
            navigate('/provisionamento');
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
                    path="provisionamento"
                    element={<PrivateRoute element={<Provisionamento />} />}
                />
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
            </Route>
        </Routes>
    );
}
