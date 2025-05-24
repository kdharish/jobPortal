import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userType === "employee") {
      navigate("/");
    } else if (userType === "employer") {
      navigate("/agent");
    } else if (userType === "admin") {
      navigate("/admin");
    } else {
      alert("Please select a user type.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Select user type</option>
          <option value="employee">Employee</option>
          <option value="employer">Employer</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;