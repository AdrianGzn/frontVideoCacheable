import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SeeVideo from "./pages/SeeVideo";
import LogIn from "./pages/LogIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/video" element={<SeeVideo />} />
      </Routes>
    </Router>
  );
}

export default App;
