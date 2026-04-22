import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("https://mern-project-p7sa.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ save token & user
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.user.email);

        alert("Login Successful 🚀");
        navigate("/dashboard");
      } else {
        alert(data);
      }
    } catch (err) {
      alert("Server Error");
    }
  };

  return (
    <div className="main">
      <div className="container">
        
        <div className="left">
          <h2>✨ SYNTH.AI</h2>

          <h1>Welcome Back</h1>
          <p>Enter your email and password to access</p>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>

          <p className="register">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>Register</span>
          </p>
        </div>

        <div className="right">
          <h1>What Can I Help You!</h1>
          <p>I'm here to understand your needs.</p>

          <div className="chat-box">
            Ask me anything......
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;