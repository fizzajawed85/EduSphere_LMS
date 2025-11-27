import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Link, useNavigate } from "react-router-dom";

// Import images from src for bundler-friendly paths
import LogoImg from '../../assets/img/img.png';
import BgImg from '../../assets/img/bg.jpg';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      const role = userData.user.displayName || "student";

      dispatch(
        loginUser({
          uid: userData.user.uid,
          email: userData.user.email,
          role,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/wrong-password") alert("Incorrect password!");
      else if (err.code === "auth/user-not-found") alert("User not found!");
      else if (err.code === "auth/invalid-email") alert("Invalid email!");
      else alert(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const role = result.user.displayName || "student";

      dispatch(
        loginUser({
          uid: result.user.uid,
          email: result.user.email,
          role,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      alert("Google login failed: " + err.message);
    }
  };

  return (
    <div className="h-screen md:flex overflow-hidden">
      {/* LEFT SIDE */}
      <div
        className="relative hidden md:flex flex-1 h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${BgImg})` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 p-8 rounded-lg border-2 border-sky-100 bg-transparent">
            <div className="bg-esorange p-6 rounded-full flex items-center justify-center">
              <img src={LogoImg} alt="Logo" className="w-24 h-24 object-contain" />
            </div>
            <span className="text-3xl font-bold text-esblack dark:text-eswhite">LMS</span>
            <h1 className="text-5xl font-extrabold text-esblack dark:text-eswhite tracking-wide">
              EduSphere
            </h1>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex flex-1 h-screen items-center justify-center p-8 bg-white dark:bg-gray-900">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-lg p-6 shadow-md bg-sky-50 dark:bg-gray-700 overflow-hidden"
        >
          <h2 className="text-3xl font-bold text-esblack">Sign in your account</h2>
          <p className="text-gray-500 mt-1">
            Welcome back! Login with your email or Google account.
          </p>

          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full border p-3 rounded-lg mt-5"
            onClick={handleGoogle}
          >
            <FcGoogle size={18} /> Login with Google
          </button>

          <div className="mt-5">
            <label>Email*</label>
            <input
              className="w-full border p-3 rounded-md mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label>Password*</label>
            <input
              type="password"
              className="w-full border p-3 rounded-md mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember my preference
            </label>
            <Link to="/forgot-password" className="text-esblue">Forgot?</Link>
          </div>

          <button className="w-full bg-esblue text-esorange p-3 rounded-lg mt-5 font-semibold">
            Sign me in
          </button>

          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-esblue font-semibold">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
