import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { MainRoutes as Routes} from './routes';
import { GlobalStyle } from "./styles/global";

export function App() {
  return (
    <div className="App">
      <Router>
      {
                    console.log('1')
                }
        <Routes />
        <GlobalStyle />
      </Router>
    </div>
  );
}