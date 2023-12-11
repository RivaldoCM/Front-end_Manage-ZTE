import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { AppRoutes } from "./routes";
import { AuthContextProvider } from "./contexts/AuthContext";
import { GlobalStyle } from "./globalStyles";

export function App() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <AppRoutes />
                <Analytics />
                <GlobalStyle />
            </BrowserRouter>
        </AuthContextProvider>
    );
}