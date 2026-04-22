import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data);
    } catch (err) {
      alert("Access Denied");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🔐 Dashboard</h1>

      <button onClick={getData}>Get Protected Data</button>
      <br /><br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;