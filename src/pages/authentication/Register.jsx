import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import RoleSelect from "../../components/auth/RoleSelect";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select a role first!");
      return;
    }

    try {
      const userData = await createUserWithEmailAndPassword(auth, email, password);

      // Save into redux (serializable only)
      dispatch(
        loginUser({
          uid: userData.user.uid,
          email: userData.user.email,
          username: username,
          role: role,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Email already exists! Please login.");
        navigate("/login");
      } else {
        alert(err.message);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col md:flex-row flex-1">
        
        {/* LEFT IMAGE SECTION */}
        <div
          className="relative hidden md:flex flex-1 h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/src/assets/img/bg.jpg')" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 p-8 rounded-lg border-2 border-sky-100 bg-transparent">
              <div className="bg-esorange p-6 rounded-full flex items-center justify-center">
                <img
                  src="/src/assets/img/img.png"
                  alt="Logo"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <span className="text-3xl font-extrabold text-esbrown dark:text-eswhite">
                LMS
              </span>
              <h1 className="text-5xl font-extrabold text-esblack dark:text-eswhite tracking-wide">
                EduSphere
              </h1>
            </div>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="flex flex-1 flex-col h-screen bg-white dark:bg-gray-900">
          <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
            <form
              onSubmit={handleRegister}
              className="w-full max-w-md rounded-lg p-6 shadow-md bg-slate-100 dark:bg-gray-700 flex flex-col space-y-4"
            >
              <h2 className="text-3xl font-bold text-esblack">Sign up your account</h2>
              <p className="text-gray-500 mt-1">Create your account to access EduSphere LMS</p>

              <div>
                <label>Username*</label>
                <input
                  className="w-full border p-3 rounded-md mt-1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label>Email*</label>
                <input
                  className="w-full border p-3 rounded-md mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label>Password*</label>
                <input
                  type="password"
                  className="w-full border p-3 rounded-md mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="w-full bg-esblue text-esorange p-3 rounded-lg mt-2 font-semibold">
                Sign me Up
              </button>

              <p className="text-center mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-esblue font-semibold">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* ROLE SELECTION */}
      <div className="w-full bg-white border-t border-gray-300 py-6 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4">
          <RoleSelect selectedRole={role} setSelectedRole={setRole} />
        </div>
      </div>
    </div>
  );
}
