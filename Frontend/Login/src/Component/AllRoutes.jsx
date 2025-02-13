import { Routes, Route } from 'react-router-dom';
import NextComponent from '../Component/NextComponent';
import SignUp from '../Component/SignUp';
import Login from '../Component/Login';
import Forget from '../Component/Forget';
import Password from '../Component/Password';

function AllRoutes() {
  return (
    <div className='flex flex-col items-center justify-center h-fit gap-10 w-full min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 '> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/next" element={<NextComponent />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/reset-password/:id" element={<Password />} />
      </Routes>
    </div>
  )
}

export default AllRoutes;
