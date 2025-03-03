import { useState, useEffect } from 'react'
import axios from "axios";
import { forgetID } from "../util/allAPIs.js";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
    setIsLoading(false);
    localStorage.removeItem('email');
  }

  useEffect(() => {
    localStorage.setItem('email', email);
  }, [email]);

  const handleResetSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(forgetID, {
        email,
      });

      if (!response) {
        toast.error(response.data.message);
        navigate("/");
        setIsLoading(false);
      } else if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
        localStorage.removeItem('email');
      } else {
        toast.error(response.data.message);
        navigate("/");
        setIsLoading(false);
      }
    } catch {
      toast.error("Please check email again");
      setIsLoading(false);
    }
  };  
    
  

  return (
    
    <div className="w-[350px] h-fit m-5 p-6 justify-center flex flex-col border border-gray-300 shadow-lg bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 rounded-2xl gap-6 transition-all duration-300 hover:shadow-2xl animate-floating">
      <div className='flex flex-row w-full'>
      <FontAwesomeIcon icon={faArrowLeft} size="x" className='p-3' onClick={handleBack} />
      <h1 className="text-gray-800 text-3xl font-bold text-center mb-2">
        Forgot Password
      </h1>
      </div>
      <h3 className="text-sm text-secondary m-0">Provide the email address associated with your account to recover your password.</h3>
      <form onSubmit={handleResetSubmit} className="animate-slide-up">
        <ul className="flex flex-col flex-wrap items-start justify-center gap-4">
          <li className="flex flex-col items-start w-full">
            <label className="text-gray-600 font-semibold">Email</label>
            <input
              className="rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 w-full text-gray-700 transition-all duration-200"
              type="text"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </li>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
            disabled={isLoading} // Disable button while loading
          >
            {email=="" ?("Send Email"):(isLoading ? (
                        <>
                            Sending...
                        </>
                    ) : (
                        "Send Email"
                    ))}
          </button>
        </ul>

      </form>
    
</div>
  )
}
;

export default ForgotPasswordForm;