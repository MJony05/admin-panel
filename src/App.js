import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./components/Dashboard";
import LoginPage from "./pages/LoginPage";
import SadminPage from "./pages/SadminPage";

function App() {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const { pathname } = useLocation();
  console.log(pathname);
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
    } else if (username === "sadmin" && password === "sadmin123") {
      setIsLoggedIn(true);
      setUserType("sadmin");
      navigate("sadmin");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType("");
  };

  return (
    <div>
      {pathname === "/login" ? (
        <></>
      ) : (
        <nav className="navbar">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>

            {!isLoggedIn && (
              <li>
                <a className="logoutBtn" href="/login">
                  Login
                </a>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <a href="/login" className="logoutBtn" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            )}
          </ul>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        {isLoggedIn && userType === "admin" && (
          <Route path="/admin" element={<AdminPage />} />
        )}
        {isLoggedIn && userType === "sadmin" && (
          <Route path="/sadmin" element={<SadminPage />} />
        )}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        {isLoggedIn && userType === "user" && (
          <Route path="/dashboard" element={<Dashboard userId={userType} />} />
        )}
        {/* {!isLoggedIn && (
            <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
          )} */}
      </Routes>
    </div>
  );
}

export default App;
