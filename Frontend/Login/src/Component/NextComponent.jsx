import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState,useEffect } from "react";

const NextComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [name, setName] = useState(localStorage.getItem("name") || "");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedName = localStorage.getItem("name");
  
    if (storedEmail && storedName) {
      setEmail(storedEmail);
      setName(storedName);
    } else if (location.state) {
      localStorage.setItem("email", location.state.email);
      localStorage.setItem("name", location.state.name);
      setEmail(location.state.email);
      setName(location.state.name);
    } else {
      navigate("/");
    }
  }, [location.state, navigate]);
  

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    setEmail('');
    setName('');
    navigate("/");
    toast.success("Logout Successfully!");
  };

  if (!email || !name) {
    navigate("/");
    return null;
  }

  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 justify-center items-center">
        <div className="w-[400px] p-6 bg-white rounded-lg shadow-lg border border-gray-200 space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Welcome, {name}!
          </h1>
          <p className="text-lg text-gray-600 text-center">
            Your email is: <span className="font-semibold text-blue-600">{email}</span>
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300"
              >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NextComponent;
