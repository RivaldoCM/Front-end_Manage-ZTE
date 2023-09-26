import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./routes";
import { GlobalStyle } from "./globalStyles";

export function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
            <GlobalStyle />
        </BrowserRouter>
    );
}