import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { AppRoutes } from "./routes";
import { GlobalStyle } from "./globalStyles";

export function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
            <Analytics />
            <GlobalStyle />
        </BrowserRouter>
    );
}