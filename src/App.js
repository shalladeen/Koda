import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/nav/Navbar';
import Home from './components/pages/Home/Home';
import Friends from './components/pages/Friends/Friends';
import Signup from './components/pages/signup/Signup';
import Settings from './components/pages/Settings/Settings';
import TimeTracker from './components/pages/TimeTracker/TimeTracker';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/TimeTracker" element={<TimeTracker />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Friends" element={<Friends />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
