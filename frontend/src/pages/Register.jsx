import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch("https://mern-project-p7sa.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered Successfully ✅");
        navigate("/");
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

          <h1>Create Account</h1>
          <p>Register to continue</p>

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

          <button onClick={handleRegister}>Register</button>

          <p className="register">
            Already have an account?{" "}
            <span onClick={() => navigate("/")}>Login</span>
          </p>
        </div>

        <div className="right">
          <h1>Join Us 🚀</h1>
          <p>Start your journey today.</p>

          <div className="chat-box">
            Create your account......
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;