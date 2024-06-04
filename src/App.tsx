import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { AppRoutes } from "./routes";
import { AuthContextProvider } from "./contexts/AuthContext";
import { GlobalStyle } from "./styles/globalStyles";
import { DataPickerContext } from "./contexts/DataPickerContext";
import { HandleResponseContextProvider } from "./contexts/handleResponseContext";
import { SocketContextProvider } from "./contexts/SocketContext";
import { ThemesContextProvider } from "./contexts/ThemesContext";

export function App() {
    return (
        <AuthContextProvider>
            <SocketContextProvider>
                <DataPickerContext>
                    <HandleResponseContextProvider>
                        <ThemesContextProvider>
                            <BrowserRouter>
                                <AppRoutes />
                                <Analytics />
                                <GlobalStyle />
                            </BrowserRouter>
                        </ThemesContextProvider>
                    </HandleResponseContextProvider>
                </DataPickerContext>
            </SocketContextProvider>
        </AuthContextProvider>
    );
}