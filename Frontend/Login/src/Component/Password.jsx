import { useState,useEffect } from 'react'
import axios from "axios";
import { ForgetPASS } from "../util/allAPIs.js";
import { useNavigate } from "react-router-dom";
import { useLocation} from 'react-router-dom';

const Password = () => {
  const [password, setPassword] = useState('')
  const [token, setToken] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  
  



   // Extract email from query parameters
   useEffect(() => {
    const Token = window.location.pathname.split('/').pop();
    setToken(Token);
  }, [location.search]);




    //HANDLE RESET PASSWORD
  const handleResetSubmit = async(event) => { 
    event.preventDefault()

    try {
        const response = await axios.post(ForgetPASS, {
            token,
            password
         });
         if (!response) {
            alert(response.data.message);
            navigate("/");
            // throw new Error("Failed reset");
         }
         if (response.data.success) {
            navigate("/",
            {state: { Message: response.data.message}});
         } else {
            alert(response.data.message);
            navigate("/");
         }

    } catch{
            alert("Please check email again");
            navigate("/")
    }
    }   
    


  return (
    <div className="w-[350px] h-fit m-5 p-6 justify-center flex flex-col border border-gray-300 shadow-lg bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 rounded-2xl gap-6 transition-all duration-300 hover:shadow-2xl animate-floating">
   
      <h1 className="text-gray-800 text-3xl font-bold text-center mb-2">
        Forgot Password
      </h1>
      <h3 className="text-sm text-secondary m-0">Provide the email address associated with your account to recover your password.</h3>
      <form onSubmit={handleResetSubmit} className="animate-slide-up">
        <ul className="flex flex-col flex-wrap items-start justify-center gap-4">
          <li className="flex flex-col items-start w-full">
            <label className="text-gray-600 font-semibold">password </label>
            <input
              className="rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 w-full text-gray-700 transition-all duration-200"
              type="text"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </li>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
          >
            Send Reset Link
          </button>
        </ul>
      </form>
    
</div>
  )
}
;

export default Password;