import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../../firebase/config";

// Import images for bundler-safe paths
import LogoImg from '../../assets/img/img.png';
import BgImg from '../../assets/img/bg.jpg';

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
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">

      {/* LEFT IMAGE SECTION */}
      <div
        className="relative hidden md:flex flex-1 h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${BgImg})` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 p-8 rounded-lg border-2 border-sky-100 bg-transparent">
            <div className="bg-esorange p-6 rounded-full flex items-center justify-center">
              <img
                src={LogoImg}
                alt="Logo"
                className="w-24 h-24 object-contain"
              />
            </div>
            <span className="text-3xl font-extrabold text-esbrown dark:text-eswhite">LMS</span>
            <h1 className="text-5xl font-extrabold text-esblack dark:text-eswhite tracking-wide">
              EduSphere
            </h1>
          </div>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="flex flex-1 items-center justify-center p-8 bg-white dark:bg-gray-900">
        <form
          onSubmit={handleReset}
          className="w-full max-w-md rounded-lg p-6 shadow-md bg-slate-100 dark:bg-gray-700 flex flex-col space-y-4"
        >
          <h2 className="text-3xl font-bold text-esblack text-center">Reset Your Password</h2>
          <p className="text-gray-500 mt-1 text-center">
            Enter your new password to update your account.
          </p>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {successMsg && <p className="text-green-600 text-sm text-center">{successMsg}</p>}

          <div>
            <label className="block text-esblack font-medium mb-1">New Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-esblue focus:ring-1 focus:ring-esblue"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-esblack font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-esblue focus:ring-1 focus:ring-esblue"
              placeholder="Confirm new password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-esblue text-esorange p-3 rounded-lg mt-2 font-semibold hover:bg-esblack transition"
          >
            Update Password
          </button>

          <p className="text-center mt-4">
            Back to{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-esblue font-semibold hover:underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
