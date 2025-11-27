import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Link } from "react-router-dom";

// Import images for bundler-safe paths
import LogoImg from '../../assets/img/img.png';
import BgImg from '../../assets/img/bg.jpg';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMsg("Password reset email has been sent. Check your inbox.");
    } catch (err) {
      setError("No account found with this email.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">

      {/* LEFT SECTION */}
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

      {/* RIGHT SECTION */}
      <div className="flex flex-1 items-center justify-center p-8 bg-white dark:bg-gray-900">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-lg p-6 shadow-md bg-slate-100 dark:bg-gray-700 flex flex-col space-y-4"
        >
          <h2 className="text-3xl font-bold text-esblack text-center">Forgot Password</h2>
          <p className="text-gray-500 mt-1 text-center">
            Enter your email and we will send you a password reset link.
          </p>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {msg && <p className="text-green-600 text-sm text-center">{msg}</p>}

          <div>
            <label className="block text-esblack font-medium mb-1">Email*</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-esblue focus:ring-1 focus:ring-esblue"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-esblue text-esorange p-3 rounded-lg mt-2 font-semibold hover:bg-esblack transition"
          >
            Send Reset Link
          </button>

          <p className="text-center mt-4">
            Back to{" "}
            <Link to="/login" className="text-esblue font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
