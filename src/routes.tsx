import { ReactElement, useEffect} from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
    element: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    return isLogged() ? element : <Navigate to='/login' />;
}

export function AppRoutes() {
    const navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const token = localStorage.getItem('Authorization');
    
        if(token && window.location.pathname === '/login' || token && window.location.pathname === '/'){
            navigate('/provisionamento');
        }

        if (!token && window.location.pathname !== '/login') {
            navigate('/login');
        }
      }, []);

    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/" element={matches ? <MobileDrawerMenu /> : <MenuDrawer />}>
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
            </Route>
        </Routes>
    );
}
