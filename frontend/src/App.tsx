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
            <div className='h-[100vh]'>
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
              <div className='h-[100vh]'>
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
