import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard/Dashboard';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Weather from './pages/Weather/Weather';
import Alerts from './pages/Alerts/Alerts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Weather />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/alerts' element={<Alerts />}></Route>
        <Route path='/settings' element={<Settings />}></Route>
        <Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
