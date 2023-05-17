import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./components/Dashboard";
import LoginPage from "./pages/LoginPage";

function App() {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");

  const handleLogin = (username, password) => {
    // validate username and password
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      setUserType("admin");
      navigate("admin");
    } else if (username === "user" && password === "user123") {
      setIsLoggedIn(true);
      setUserType("user");
      navigate("dashboard");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType("");
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          {isLoggedIn && userType === "admin" && (
            <li>
              <a href="/admin">Admin</a>
            </li>
          )}
          {isLoggedIn && userType === "user" && (
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <a href="/login">Login</a>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        {isLoggedIn && userType === "admin" && (
          <Route path="/admin" element={<AdminPage />} />
        )}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        {isLoggedIn && userType === "user" && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
        {/* {!isLoggedIn && (
            <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
          )} */}
      </Routes>
    </div>
  );
}

export default App;
