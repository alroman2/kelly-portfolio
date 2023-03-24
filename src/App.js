import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Explore from './Pages/Explore';
import Admin from './Pages/Admin';

// Page imports
import Home from './Pages/Home';
// eslint-disable-next-line 
import Layout from './Components/Layouts/Layout';
function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path='/explore/:category' element={<Explore/>} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
