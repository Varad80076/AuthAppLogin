import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "../Component/Login";
import { signup } from "../util/allAPIs.js";
import { Link } from "react-router-dom";

function SignUp() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setpassword] = useState("");
   const [confpassword, setconfpassword] = useState("");
   const [isSignUp, setIsSignUp] = useState(true);
   const [showPassword, setShowPassword] = useState(false);
   const navigate = useNavigate();

   const toggleForm = () => {
      setIsSignUp(!isSignUp);
   };

   const collectData = async (e) => {
      e.preventDefault();
      if (password.trim().length == 0 || password == "") {
         alert("Password value should be in Integer or Number");
      }
      if (password.trim() != confpassword.trim()) {
         alert("please check password again");
      } else {
         try {
            const response = await axios.post(signup, {
               name,
               email,
               password,
            });

            if (response.status === 201) {
               // Handle successful signup (e.g., redirect, show success message)
               navigate("/");
            } else if (response.status === 409) {
               // Handle 409 Conflict (email already exists)
               alert(response.data.alert);
            } else {
               // Handle other errors
               alert("An error occurred during signup.");
            }

            setName("");
            setEmail("");
            setpassword("");
            setShowPassword("");
         } catch (error) {
            alert("Failed to send message. Please try again later.", error);
            setName("");
            setEmail("");
            setpassword("");
            setShowPassword("");
         }
      }
   };

   return (
      <div>
         {isSignUp ? (
            <div className="w-[350px] h-fit m-5 p-6 justify-center flex flex-col border border-gray-300 shadow-lg bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 rounded-2xl gap-6 transition-all duration-300 hover:shadow-2xl animate-floating">
               <h1 className="text-gray-800 text-3xl font-bold text-center mb-2">
                  Sign Up Form
               </h1>
               <form onSubmit={collectData} className="animate-slide-up">
                  <ul className="flex flex-col flex-wrap items-start justify-center gap-4">
                     <li className="flex flex-col items-start w-full">
                        <label className="text-gray-600 font-semibold">
                           Username
                        </label>
                        <input
                           className="rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 w-full text-gray-700 transition-all duration-200"
                           type="text"
                           name="username"
                           placeholder="Enter your username"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                        />
                     </li>
                     <li className="flex flex-col items-start w-full">
                        <label className="text-gray-600 font-semibold">
                           Email
                        </label>
                        <input
                           className="rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 w-full text-gray-700 transition-all duration-200"
                           type="text"
                           name="email"
                           placeholder="Enter your email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </li>
                     <li className="flex flex-col items-start w-full">
                        <label className="text-gray-600 font-semibold">
                           Password
                        </label>
                        <input
                           className="rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 w-full text-gray-700 transition-all duration-200"
                           type={showPassword ? "text" : "password"}
                           name="password"
                           placeholder="Enter your Password"
                           value={password}
                           onChange={(e) => setpassword(e.target.value)}
                        />
                     </li>
                     <li className="flex flex-col items-start w-full">
                        <label className="text-gray-600 font-semibold">
                           Confirm Password
                        </label>
                        <input
                           className="rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 w-full text-gray-700 transition-all duration-200"
                           type={showPassword ? "text" : "password"}
                           name="password"
                           placeholder="Enter your Password"
                           value={confpassword}
                           onChange={(e) => setconfpassword(e.target.value)}
                        />
                     </li>
                     <div className="flex justify-end gap-1 w-full">
                        <input
                           type="checkbox"
                           checked={showPassword}
                           onChange={() => setShowPassword(!showPassword)}
                           className="form-checkbox text-blue-500 cursor-pointer "
                        />
                        <p
                           className="cursor-pointer"
                           onClick={() => setShowPassword(!showPassword)}>
                           show
                        </p>
                     </div>
                     <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                        type="submit">
                        Submit
                     </button>

                     <span className="text-gray-500 text-sm text-center w-full">
                        Already have an account?{" "}
                        <Link
                           to="/"
                           className="text-blue-600 font-semibold hover:underline"
                           onClick={toggleForm}>
                           Login
                        </Link>
                     </span>
                  </ul>
               </form>
            </div>
         ) : (
            <Login />
         )}
      </div>
   );
}

export default SignUp;
