import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Principal from "./pages/principal";
import Result from "./pages/result";

//TODO: block access to /result if no data is available

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Principal />} />
        <Route path='/result' element={<Result />} />
        {/* <Route
        path='/result'
        element={submitted ? <Result /> : <Navigate to='/' />}
      /> */}
      </Routes>
    </Router>
  );
}

export default App;
