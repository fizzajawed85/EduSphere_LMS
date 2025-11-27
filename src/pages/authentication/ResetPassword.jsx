import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../../firebase/config";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const oobCode = queryParams.get("oobCode");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!newPassword || !confirmPass) {
      setError("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccessMsg("Password updated successfully!");
      
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setError("Invalid or expired reset link.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">

        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src="/src/assets/img/logo.png"
            alt="EduSphere Logo"
            className="w-16 mx-auto mb-2"
          />
          <h1 className="text-2xl font-bold text-gray-800">EduSphere LMS</h1>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Reset Your Password
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}
        {successMsg && (
          <p className="text-green-600 text-sm mb-3 text-center">{successMsg}</p>
        )}

        {/* Form */}
        <form onSubmit={handleReset}>

          <label className="text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full mt-1 mb-4 p-2 border rounded-md focus:outline-blue-500"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label className="text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            className="w-full mt-1 mb-6 p-2 border rounded-md focus:outline-blue-500"
            placeholder="Confirm new password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
          >
            Update Password
          </button>
        </form>

      </div>
    </div>
  );
};

export default ResetPassword;
