import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// Pages and components
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import HeaderBar from "./components/HeaderBar";
import Footer from "./components/Footer";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <BrowserRouter>
      <HeaderBar />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
