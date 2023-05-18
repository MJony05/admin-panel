import { useState } from "react";
import "./styles.css";
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="box">
      <h1 className="header">Login</h1>
      <form className="forma" onSubmit={handleSubmit}>
        <label for="login">Username:</label>
        <input
          className="inputjon"
          id="login"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label for="password">Password:</label>
        <input
          className="inputjon"
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="buttonbek" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
