import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Principal from "./pages/principal";
import Result from "./pages/result";
import { useGlobalState } from "./context/globalContext";
import NavbarMenu from "./components/navbar";
import CustomFooter from "./components/footer";
import { useTheme } from "./context/themeState";

function App() {
  const { isSubmitted } = useGlobalState();
  const { isDarkMode } = useTheme();

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <div
              className={`h-full ${isDarkMode && "dark text-foreground bg-background"}`}>
              <NavbarMenu title={"CSS-Tailwind converter"} />
              <Principal />
              <CustomFooter />
            </div>
          }
        />
        <Route
          path='/result'
          element={
            isSubmitted ? (
              <div
                className={`h-full ${isDarkMode && "dark text-foreground bg-background"}`}>
                <NavbarMenu title={"Result"} />
                <Result />
                <CustomFooter />
              </div>
            ) : (
              <Navigate to='/' />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
