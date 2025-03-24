import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import Navigation from './components/Navigation';
import Rs5 from './pages/Rs5';
import Rs10 from './pages/Rs10';
import Rs20 from './pages/Rs20';
import Login from './pages/Login';
import Adminpage from './pages/Adminpage';
import JoinRoom from './pages/JoinrRoom';
import Room from './Room';
import Contect from './pages/Contect';

const App = () => {
  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rs5" element={<Rs5 />} />
        <Route path="/rs10" element={<Rs10 />} />
        <Route path="/rs20" element={<Rs20 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/joinroom" element={<JoinRoom />} />
        <Route path="/room" element={<Room />} />
        <Route path="/contect" element={<Contect />} />
        <Route path="/adminpage" element={<Adminpage />} />
      </Routes>
    </Router>
  );
};

export default App;
