import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { AppRoutes } from "./routes";
import { AuthContextProvider } from "./contexts/AuthContext";
import { GlobalStyle } from "./styles/globalStyles";
import { DataPickerContext } from "./contexts/DataPickerContext";
import { HandleResponseContextProvider } from "./contexts/handleResponseContext";

export function App() {
    return (
        <AuthContextProvider>
            <DataPickerContext>
                <HandleResponseContextProvider>
                    <BrowserRouter>
                        <AppRoutes />
                        <Analytics />
                        <GlobalStyle />
                    </BrowserRouter>
                </HandleResponseContextProvider>
            </DataPickerContext>
        </AuthContextProvider>
    );
}