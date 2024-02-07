import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { AppRoutes } from "./routes";
import { AuthContextProvider } from "./contexts/AuthContext";
import { GlobalStyle } from "./styles/globalStyles";
import { DataPickerContext } from "./contexts/DataPickerContext";

export function App() {
    return (
        <AuthContextProvider>
            <DataPickerContext>
                <BrowserRouter>
                    <AppRoutes />
                    <Analytics />
                    <GlobalStyle />
                </BrowserRouter>
            </DataPickerContext>
        </AuthContextProvider>
    );
}