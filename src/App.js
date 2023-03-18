import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Explore from './Pages/Explore';

// Page imports
import Home from './Pages/Home';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path='/explore' element={<Explore/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
