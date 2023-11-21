import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./routes";
import { AuthContextProvider } from "./contexts/AuthContext";
import { GlobalStyle } from "./globalStyles";

export function App() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <AppRoutes />
                <GlobalStyle />
            </BrowserRouter>
        </AuthContextProvider>
    );
}