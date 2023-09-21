
import { BrowserRouter as Router } from "react-router-dom";

import { MainRoutes as Routes} from './routes';
import { GlobalStyle } from "./styles/global";

export function App() {
  return (
    <div className="App">
        <Router>
          <Routes />
          <GlobalStyle />
        </Router>
    </div>
  );
}