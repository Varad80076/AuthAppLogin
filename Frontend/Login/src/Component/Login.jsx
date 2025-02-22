import { useState,useEffect } from "react";
import axios from "axios";
import { login, verifyOtp, resendOtpUrl } from "../util/allAPIs.js";
import { useNavigate } from "react-router-dom";
import msg from "../messages/AllMessages";
import { Link } from "react-router-dom";
import { useLocation} from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
   const [email, setEmail] = useState(localStorage.getItem('email') ||"");
   const [name, setName] = useState(localStorage.getItem('name') ||"");
   const [password, setPassword] = useState(localStorage.getItem('password') ||"");
   const [showPassword, setShowPassword] = useState(false);
   const navigate = useNavigate();
   const [isOtpSent, setIsOtpSent] = useState(JSON.parse(localStorage.getItem('isOtpSent'))||false);
   const [otp, setOtp] = useState("");
   const [timer, setTimer] = useState(JSON.parse(localStorage.getItem('timer'))||0);
   const [isLoading, setIsLoading] = useState(false);
   const location = useLocation();
   const { Message} = location.state || {};
   const [token, setToken] = useState(localStorage.getItem('token') || '')
   
   

   //HANDEL LOGIN REQUEST
   const handleLogin = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
         const response = await axios.post(login, {
            email,
            password
         });

         if (!response) {
            toast.error("failed to login");
            throw new Error("Failed to Login");
         }
         setTimer(120); // 2 minutes in seconds
         toast.success("OTP sent successfully! Please check your mail box");
         setIsLoading(false)
         startTimer();
         setIsOtpSent(true);
         localStorage.setItem('isOtpSent',true);
         localStorage.removeItem('password');
         setEmail(response.data.email);
         setToken(response.data.jwtToken);
         localStorage.setItem('token',response.data.jwtToken);
         setPassword("");
      } catch (error) {
         if (error.response && error.response.status === 404) {
            toast.warn("check email and password again ");
            setEmail("")
            setPassword("");
            setIsLoading(false);
         } else {
            toast.warn("check email and password again");
            setEmail("")
            setPassword("");
            setIsLoading(false);
         }
         
      }
   };


   useEffect(() => {
      const handlePopState = () => {
         navigate("/login", { replace: true });
      };

      window.addEventListener("popstate", handlePopState);

      if (Message) {
         toast(Message); // Set the initial message
         navigate({state: null });
      }

      return () => {
         window.removeEventListener("popstate", handlePopState);
      };
   }, [navigate,Message]);

   useEffect(() => {
      // Handle email and name state from location.state
      if (location.state) {
        localStorage.setItem('email', location.state.email);
        localStorage.setItem('isOtpSent', JSON.stringify(location.state.isOtpSent));
        setEmail(location.state.email);
        setIsOtpSent(location.state.isOtpSent);
      } else {
        // Retrieve stored data
        const storedEmail = localStorage.getItem('email');
        const storedIsOtpSent = JSON.parse(localStorage.getItem('isOtpSent'));
        
        if (storedEmail && storedIsOtpSent) {
          setEmail(storedEmail);
          setIsOtpSent(storedIsOtpSent);
        } else {
          // Redirect to login if no data is available
          navigate('/');
        }
      }
    }, [location.state, navigate]);

   //HANDEL OTP VERIFICATION REQUEST
   const handleOtpVerification = async (e) => {
      e.preventDefault();
      console.log(token);
      try {
         const response = await axios.post(verifyOtp, { token, otp });
         if (response.data.success ) {
            navigate("/next", {
               state: { email: response.data.email, name: response.data.name},
            });
            setName(response.data.name);
            toast.success(`Welcome ${name}, Login Successfully!`);
            localStorage.removeItem('isOtpSent');
            localStorage.removeItem('token');
            setOtp('');
         } else {
            toast.warn("Invalid OTP. Please try again.");
         }

         if (!response.data.success) {
            toast.error("Invalid OTP. Please try again.");
         }
         setOtp("");
         setEmail("");
         setPassword("");
      } catch (error) {
         const errorMessage =
         error.response?.data?.message || "Failed to verify OTP. Please try again.";
         toast.warn(errorMessage);
         console.log(email)
         setIsOtpSent(true);
         setOtp("");
         setPassword("");
      }
   };

   //HANDEL RESET OTP REQUEST
   const resetOtp = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
         const response = await axios.post(resendOtpUrl, { email });
         if (!response) {
            toast.error("failed to login");
            throw new Error("Failed to Login");
         }
         setTimer(120);
         setOtp('');
         setIsLoading(false);
         toast.success("Otp reset! Check your mail.");

      } catch (error) {
         if (error.response && error.response.status === 404) {
            toast.error("Login Error:", msg.ENDPOINT);
            setOtp('');
         } else {
            toast.error("Login Error:", msg.CHECK_CREDENTIALS);
            setOtp('');
         }
      }
   };

   //HANDEL FORGET PASSWORD REQUEST
   const handleForgotClick = (e) => {
      e.preventDefault();
      navigate("/forget");
      
    };

    useEffect(() => {
      const savedTimer = localStorage.getItem("timer");
      if (savedTimer) {
        setTimer(Number(savedTimer)); // Restore saved timer value
      }
    
      if (savedTimer && Number(savedTimer) > 0) {
        startTimer(); // Resume the timer if it's still active
      }
    }, []);

    //HANDEL TIMER FOR OTP VERIFICATION
   const startTimer = () => {
      let isToastShown = false; 
      const interval = setInterval(() => {
         setTimer((prev) => {
            if (prev <= 1) {
               clearInterval(interval);
               if (!isToastShown) {
                  toast("OTP expired. Please login again.");
                  isToastShown = true; // Mark toast as shown
               }
               setIsOtpSent(false);
               localStorage.removeItem('isOtpSent')
               localStorage.removeItem('email')
               localStorage.removeItem('token');
               setPassword("");
               setEmail("");
               
               return 0;
               
            }
            localStorage.setItem('timer',prev-1)
            return prev - 1;
         });
         localStorage.removeItem('timer');
      }, 1000);
   };
   
   const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };
    

  

   return (
      <div className="w-[350px] h-fit m-5 p-6 justify-center flex flex-col border border-gray-300 shadow-lg bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 rounded-2xl gap-6 transition-all duration-300 hover:shadow-2xl animate-floating">
         {!isOtpSent ? (
            // login Form
            <>
               <h1 className="text-gray-800 text-3xl font-bold text-center mb-2">
                  Login Form
               </h1>
               <form onSubmit={handleLogin} className="animate-slide-up">
                  <ul className="flex flex-col flex-wrap items-start justify-center gap-4">
                     <li className="flex flex-col items-start w-full">
                        <label className="text-gray-600 font-semibold">
                           Email
                        </label>
                        <input
                           className="rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 w-full text-gray-700 transition-all duration-200"
                           type="text"
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
                           className="form-checkbox text-blue-500 cursor-pointer"
                        />
                        <p
                           className="cursor-pointer"
                           onClick={() => setShowPassword(!showPassword)}>
                           show
                        </p>
                     </div>
                     
                     <Link className="ml-20 text-center" onClick={handleForgotClick}>
                        <span className="mr-1">Forget</span> 
                        <span className="text-blue-600 ">Password ?</span> 
                     </Link>
                     <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                        type="submit"
                        disabled={isLoading} // Disable button while loading
                        >
                        {email==""||password =="" ?("Login"):(isLoading ? (
                        <>
                            Logging in...
                        </>
                    ) : (
                        "Login"
                    ))}
                     </button>
                     <span className="text-gray-500 text-sm text-center w-full">
                        Don't have an account?{" "}
                        <Link
                           to={"/signup"}
                           className="text-blue-600 hover:underline font-semibold px-1">
                           signup
                        </Link>
                     </span>
                  </ul>
               </form>
            </>
         ) : (
            //OTP Verification Form 
            <>
               <h1 className="text-gray-800 text-3xl font-bold text-center mb-2">
                  Enter OTP
               </h1>
               <form onSubmit={handleOtpVerification}>
                  <input
                     type="text"
                     placeholder="Enter OTP"
                     value={otp}
                     onChange={(e) => setOtp(e.target.value)}
                     className="rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 w-full text-gray-700 transition-all duration-200"
                  />
                  <p className="text-center mt-2">Time left: {formatTime(timer)}s</p>
                  <button
                     type="Reset"
                     onClick={resetOtp}
                     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 mt-4"
                     disabled={isLoading}
                  >
                    {isLoading ? (
                     <>
                         Resending...
                     </>
                 ) : (
                     "Reset OTP"
                 )} 
                  </button>
                  <button
                     type="submit"
                     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 mt-4"
                     disabled={isLoading}
                  >
                     {otp=="" ?("Verify OTP"):(isLoading ? (
                        <>
                            Verifying...
                        </>
                    ) : (
                        "Verify OTP"
                    ))}
                  </button>
               </form>
            </>
         )}
      </div>
   );
}

export default Login;
