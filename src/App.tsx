import { BrowserRouter } from "react-router-dom";

import { ChakraProvider } from '@chakra-ui/react'


import { AppRoutes } from "./routes";
import { GlobalStyle } from "./globalStyles";

export function App() {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <AppRoutes />
                <GlobalStyle />
            </BrowserRouter>
        </ChakraProvider>

    );
}