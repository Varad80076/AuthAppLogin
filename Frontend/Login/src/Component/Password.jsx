import { useState,useEffect } from 'react'
import axios from "axios";
import { forgetPASS } from "../util/allAPIs.js";
import { useNavigate } from "react-router-dom";
import { useLocation} from 'react-router-dom';
import { toast } from 'react-toastify';

const Password = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [checkpass, setCheckpass] = useState("");


  

   // Extract email from query parameters
   useEffect(() => {
    const Token = window.location.pathname.split('/').pop();
    setToken(Token);
  }, [location.search]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setCheckpass("Passwords do not match");
    } else if (confirmPassword && e.target.value === confirmPassword) {
      setCheckpass("✓ Passwords match!");
    } else {
      setCheckpass("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && password !== e.target.value) {
      setCheckpass("Passwords do not match");
    } else if (password && password === e.target.value) {
      setCheckpass("✓ Passwords match!");
    } else {
      setCheckpass("");
    }
  };

    //HANDLE RESET PASSWORD
  const handleResetSubmit = async(event) => { 
    event.preventDefault()
    if (password.trim().length == 0 || password == "") {
      toast.warn("Password value should be in Integer or Number");
   }
   if (password.trim() != confirmPassword.trim()) {
    toast.warn("please check password again");
   }else{
    try {
      setIsLoading(true)
        const response = await axios.post(forgetPASS, {
            token,
            password
         });
         if (!response) {
          toast.error(response.data.message);
            navigate("/");
            // throw new Error("Failed reset");
         }
         if (response.data.success) {
            navigate("/");
            toast.success(response.data.message);
         } else {
          toast.error(response.data.message);
            navigate("/");
         }

    } catch{
      toast.error("Failed to reset password");
      setConfirmPassword("");
      setPassword("");
      setIsLoading(false);
      
    }
    }}   
    
    
   


  return (
    <div className="w-[350px] h-fit m-5 p-6 justify-center flex flex-col border border-gray-300 shadow-lg bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 rounded-2xl gap-6 transition-all duration-300 hover:shadow-2xl animate-floating">
   
      <h1 className="text-gray-800 text-3xl font-bold text-center mb-2">
        Reset Password
      </h1>
      <h3 className="text-sm text-secondary m-0">Provide the password to recover your account.</h3>
      <form onSubmit={handleResetSubmit} className="animate-slide-up">
        <ul className="flex flex-col flex-wrap items-start justify-center gap-4">
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
                           onChange={handlePasswordChange}
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
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            
                        />
            </li>
            <div className='flex flex-col  w-full'>
                    <div className=' justify-start text-sm text-green-500'>
                        {checkpass && (
                              <p
                                className={`mt-2 justify-center items-center text-xs font-bold ${
                                  checkpass === "✓ Passwords match!"
                                    ? "text-green-700"
                                    : "text-red-700"
                                }`}
                              >
                                {checkpass}
                              </p>
                    )}
                    </div>
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
            </div>
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                disabled={isLoading} // Disable button while loading
            >
                  {password == ""||confirmPassword == "" ?("Set Password"):(isLoading ? (
                        <>
                            Reseting...
                        </>
                    ) : (
                        "Set Password"
                    ))}
            </button>
        </ul>
      </form>
    
</div>
  )
}
;

export default Password;