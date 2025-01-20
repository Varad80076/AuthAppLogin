import {BrowserRouter } from 'react-router-dom';

import AllRoutes from './Component/AllRoutes';

function App() {
  return (
      // <Router>
      //   <div className='flex flex-col items-center justify-center  h-fit gap-10 w-full min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 '> 
      //     <Routes>
      //       <Route path="/" element={<SignUp />} />
      //       {/* <Route path="/signup" element={<SignUp />} /> */}
      //       <Route path="/login" element={<Login />} />
      //       <Route path="/next" element={<NextComponent />} />
      //     </Routes>
      //   </div>
      // </Router>
      <div className='App'>

      <BrowserRouter>
      <AllRoutes />
      </BrowserRouter>
      </div>

  );
}

export default App;
