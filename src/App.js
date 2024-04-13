import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard/Dashboard';
// import Header from './components/Header/Header';
// import Delete from './pages/Delete/Delete';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        {/* <Route path='/delete' element={<Delete />}></Route> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
