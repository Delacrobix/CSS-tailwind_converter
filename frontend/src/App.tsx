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

function App() {
  const { isSubmitted } = useGlobalState();

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <NavbarMenu />
              <Principal />
            </>
          }
        />
        <Route
          path='/result'
          element={
            <>
              <NavbarMenu />
              <Result />
            </>
          }
        />
        {/* <Route
          path='/result'
          element={
            isSubmitted ? (
              <>
                <NavbarMenu />
                <Result />
              </>
            ) : (
              <Navigate to='/' />
            )
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
