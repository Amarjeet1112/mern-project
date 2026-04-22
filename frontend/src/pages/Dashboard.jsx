import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="card">

        <h1>🎉 Dashboard</h1>
        <p>Welcome <b>{user.email}</b></p>

        <div className="box-container">

          <div className="box">
            <h3>👤 Profile</h3>
            <p>{user.email}</p>
          </div>

          <div className="box">
            <h3>📊 Status</h3>
            <p>Logged In ✅</p>
          </div>

          <div className="box">
            <h3>🔒 Security</h3>
            <p>{user.id}</p>
          </div>

        </div>

        <button onClick={handleLogout}>Logout</button>

      </div>
    </div>
  );
};

export default Dashboard;