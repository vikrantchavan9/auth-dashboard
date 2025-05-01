import { useState, useEffect } from "react";

function App() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const fetchSession = async () => {
    const res = await fetch("http://localhost:3001/auth/session", {
      credentials: "include",
    });
    const data = await res.json();
    setSession(data);
  };

  const handleLogin = async () => {
    const res = await fetch("http://localhost:3001/auth/callback/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      credentials: "include",
      body: new URLSearchParams({ email, password }),
    });
    await fetchSession();
  };

  const handleLogout = async () => {
    await fetch("http://localhost:3001/auth/signout", {
      method: "POST",
      credentials: "include",
    });
    setSession(null);
  };

  const handleRegister = async () => {
    const res = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    alert(data.message);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Auth Dashboard</h2>
      {session && session.user ? (
        <>
          <p>Welcome, {session.user.name || session.user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Name (for register)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </>
      )}
    </div>
  );
}

export default App;
