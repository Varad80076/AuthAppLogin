import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(true);
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    
      };

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:4000/auth/login",{
            email,
            password
          })
    
          if (!response) {
                throw new Error('Failed to Login');
            }
            const data = response.data;
            navigate('/next', {
              state: { email: data.email, name: data.name },
            });
          console.log(response.data);
          setEmail("");
          setpassword("");
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.error('Login endpoint not found:', error);
            alert('Login endpoint not found.'); 
          } else {
            console.error('Login error:', error);
            alert('Please! Check Your Credentials.'); 
          }
          setEmail("");
          setpassword("");
        }
        
      }

  return (
    <div className="w-[300px] h-fit m-2 p-5 justify-center flex flex-col border-black bg-[#887f7f] rounded-lg gap-4">
    <h1 className="text-black text-2xl text-center">Login Form</h1>
    <form onSubmit={handleLogin}>
      <ul className="flex flex-col flex-wrap items-start justify-center gap-2 ">
        <li className="flex flex-col items-start">
          <label>Email</label>
          <input
            className="rounded-md border-2 px-2 w-64"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </li>
        <li className="flex flex-col items-start">
          <label>Password</label>
          <input
            className="rounded-md border-2 px-2 w-64"
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </li>
        <button
          className="bg-[#383434] hover:bg-[#2c2929] text-white px-2 py-1 rounded-md"
          type="submit"
        >
          Login
        </button>
        <span>
          Dont have an account?{" "}
          <button
            type="submit"
            className="text-blue-600 hover:underline"
            onClick={toggleForm}
          >
            Sign Up
          </button>
        </span>
      </ul>
    </form>
  </div>
    
  )
}

export default Login