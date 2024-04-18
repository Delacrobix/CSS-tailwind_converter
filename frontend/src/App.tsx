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

function App() {
  const { isSubmitted } = useGlobalState();

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <NavbarMenu title={"CSS-Tailwind converter"} />
              <Principal />
              <CustomFooter />
            </>
          }
        />
        <Route
          path='/result'
          element={
            isSubmitted ? (
              <>
                <NavbarMenu title={"Result"} />
                <Result />
                <CustomFooter />
              </>
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
