import { Routes, Route } from 'react-router-dom';
import NextComponent from '../Component/NextComponent';
import SignUp from '../Component/SignUp';
import Login from '../Component/Login';

function AllRoutes() {
  return (
    <div className='flex flex-col items-center justify-center h-fit gap-10 w-full min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 '> 
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/next" element={<NextComponent />} />
      </Routes>
    </div>
  )
}

export default AllRoutes;
