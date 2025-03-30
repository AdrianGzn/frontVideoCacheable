
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SeeVideo from "./pages/SeeVideo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<SeeVideo/>} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;