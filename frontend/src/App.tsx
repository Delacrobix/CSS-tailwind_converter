import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Principal from "./pages/principal";
import Result from "./pages/result";
import { useGlobalState } from "./context/globalContext";

function App() {
  const { isSubmitted } = useGlobalState();

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Principal />} />
        {/* <Route path='/result' element={<Result />} /> */}
        <Route
          path='/result'
          element={isSubmitted ? <Result /> : <Navigate to='/' />}
        />
      </Routes>
    </Router>
  );
}

export default App;
