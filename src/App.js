import { Routes, Route } from "react-router-dom";
import Manna from "./pages/Manna.jsx";
import Event from "./pages/Event.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import RequireAuth from "./components/RequireAuth.js";

function App() {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
            <Route path="/" element={<Manna />} />
            <Route path="/manna" element={<Manna />} />
            <Route path="/event" element={<Event />} />
        </Route>
      
      
    </Routes>
  );  
}

export default App;
