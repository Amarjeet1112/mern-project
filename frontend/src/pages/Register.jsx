import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/register", {
        email,
        password,
      });

      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data || "Error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>📝 Register</h1>

        <input
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleRegister} style={styles.btn}>
          Register
        </button>

        <p>
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    width: "300px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },
  btn: {
    width: "100%",
    padding: "10px",
    background: "#ff7e5f",
    color: "#fff",
    border: "none",
  },
};

export default Register;