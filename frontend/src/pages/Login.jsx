import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      // token save
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", email);

      alert("Login Success ✅");

      // dashboard redirect
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data || "Login Failed ❌");
    }
  };

  return (
    <div className="main">
      <div className="container">
        
        {/* LEFT */}
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

          <div className="options">
            <label>
              <input type="checkbox" /> Keep me login
            </label>
            <span>Forget password?</span>
          </div>

          {/* 🔥 IMPORTANT */}
          <button onClick={handleLogin}>Login</button>

          <p className="register" onClick={() => navigate("/register")}>
            Don't have an account? <span>Register</span>
          </p>
        </div>

        {/* RIGHT */}
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