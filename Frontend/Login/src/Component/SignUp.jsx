import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Login from "../Component/Login";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);

  };
  

  const collectData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/signup", {
        //   method: 'POST',
        //   headers: {
              // 'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ name, email, password }),
        name,
        email,
        password,
      });

      // if (!response.ok) {
      //     throw new Error('Failed to send data');
      // }

      // const data = await response.json(data);
      console.log(response.data);

      if (response.status === 201) {
        // Handle successful signup (e.g., redirect, show success message)
        navigate("/login");
        console.log('Signup successful');
      } else if (response.status === 409) {
        // Handle 409 Conflict (email already exists)
        alert(response.data.alert); 
      } else {
        // Handle other errors
        console.error('Signup failed:', response.data);
        alert('An error occurred during signup.'); 
      }

      setName("");
      setEmail("");
      setpassword("");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message. Please try again later.");
      setName("");
      setEmail("");
      setpassword("");
    }
  };


  // const handleLogin = async(e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:4000/auth/login",{
  //       email,
  //       password
  //     })

  //     if (!response) {
  //           throw new Error('Failed to Login');
  //       }
  //       const data = response.data;
  //       navigate('/next', {
  //         state: { email: data.email, name: data.name },
  //       });
  //     console.log(response.data);
  //     setEmail("");
  //     setpassword("");
  //   } catch (error) {
  //     if (error.response && error.response.status === 404) {
  //       console.error('Login endpoint not found:', error);
  //       alert('Login endpoint not found.'); 
  //     } else {
  //       console.error('Login error:', error);
  //       alert('Please! Check Your Credentials.'); 
  //     }
  //     setEmail("");
  //     setpassword("");
  //   }
    
  // }

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
              <label className="text-gray-600 font-semibold">Username</label>
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
              <label className="text-gray-600 font-semibold">Email</label>
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
              <label className="text-gray-600 font-semibold">Password</label>
              <input
                className="rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 w-full text-gray-700 transition-all duration-200"
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </li>
    
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              type="submit"
            >
              Submit
            </button>
    
            <span className="text-gray-500 text-sm text-center w-full">
              Already have an account?{" "}
              <a
                href="#"
                className="text-blue-600 font-semibold hover:underline"
                onClick={toggleForm}
              >
                Login
              </a>
            </span>
          </ul>
        </form>
      </div>
      
):(
      //   <div className="w-[300px] h-fit m-2 p-5 justify-center flex flex-col border-black bg-[#887f7f] rounded-lg gap-4">
      //   <h1 className="text-black text-2xl text-center">Login Form</h1>
      //   <form onSubmit={handleLogin}>
      //     <ul className="flex flex-col flex-wrap items-start justify-center gap-2 ">
      //       <li className="flex flex-col items-start">
      //         <label>Email</label>
      //         <input
      //           className="rounded-md border-2 px-2 w-64"
      //           type="text"
      //           placeholder="Enter your email"
      //           value={email}
      //           onChange={(e) => {
      //             setEmail(e.target.value);
      //           }}
      //         />
      //       </li>
      //       <li className="flex flex-col items-start">
      //         <label>Password</label>
      //         <input
      //           className="rounded-md border-2 px-2 w-64"
      //           type="password"
      //           placeholder="Enter your Password"
      //           value={password}
      //           onChange={(e) => {
      //             setpassword(e.target.value);
      //           }}
      //         />
      //       </li>
      //       <button
      //         className="bg-[#383434] hover:bg-[#2c2929] text-white px-2 py-1 rounded-md"
      //         type="submit"
      //       >
      //         Login
      //       </button>
      //       <span>
      //         Dont have an account?{" "}
      //         <button
      //           type="submit"
      //           className="text-blue-600 hover:underline"
      //           onClick={toggleForm}
      //         >
      //           Sign Up
      //         </button>
      //       </span>
      //     </ul>
      //   </form>
      // </div>
      <Login/>
    ) } 
      </div>
  );
}

export default SignUp;
