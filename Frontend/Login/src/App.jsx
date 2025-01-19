import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Component/SignUp';
import NextComponent from './Component/NextComponent';
import Login from './Component/Login';

function App() {
  return (
    <Router>
      <div className='flex flex-col items-center justify-center w-full h-fit gap-10'> 
        <h1 className='text-3xl text-red-500'>Auth App</h1>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/next" element={<NextComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
