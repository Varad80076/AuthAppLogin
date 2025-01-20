import { useState } from "react";
import axios from "axios";
import {login} from'../util/allAPIs.js';
import { useNavigate } from "react-router-dom";
import msg from "../messages/AllMessages"
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
 
  

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(login, {

        email,
        password,
      });

      if (!response) {
        throw new Error("Failed to Login");
      }
      const data = response.data;
      navigate("/next", {
        state: { email: data.email, name: data.name },
      });
      console.log(response.data);
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error(msg.ENDPOINT, error);
        alert(msg.ENDPOINT);
      } else {
        console.error("Login error:", error);
        alert(msg.CHECK_CREDENTIALS);
      }
      setEmail("");
      setPassword("");
    }
  };

  return (
    
      <div className="w-[350px] h-fit m-5 p-6 justify-center flex flex-col border border-gray-300 shadow-lg bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 rounded-2xl gap-6 transition-all duration-300 hover:shadow-2xl animate-floating">
        <h1 className="text-gray-800 text-3xl font-bold text-center mb-2">
          Login Form
        </h1>
        <form onSubmit={handleLogin} className="animate-slide-up">
          <ul className="flex flex-col flex-wrap items-start justify-center gap-4">
            <li className="flex flex-col items-start w-full">
              <label className="text-gray-600 font-semibold">Email</label>
              <input
                className="rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 w-full text-gray-700 transition-all duration-200"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </li>
            <li className="flex flex-col items-start w-full">
              <label className="text-gray-600 font-semibold">Password</label>
              <input
                className="rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 w-full text-gray-700 transition-all duration-200"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>
            <div className="flex justify-end gap-1 w-full">
            <input
               type="checkbox"
               checked={showPassword}
               onChange={() => setShowPassword(!showPassword)}
               className="form-checkbox text-blue-500  "
             />Show
        </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              type="submit"
            >
              Login
            </button>
            <span className="text-gray-500 text-sm text-center w-full">
              Don t have an account?{" "}
              <Link to={"/"} className="text-blue-900 hover:underline font-semibold px-1">
                signup
              </Link>
            </span> 
          </ul>
        </form>
      </div>
  );
}

export default Login;
