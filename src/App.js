import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard/Dashboard';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
// import Header from './components/Header/Header';
// import Delete from './pages/Delete/Delete';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/settings' element={<Settings />}></Route>
        <Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
        {/* <Route path='/delete' element={<Delete />}></Route> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
