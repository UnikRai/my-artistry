import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/frontend/home';
import ArtistProfile from './components/frontend/artistprofile';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artist" element={<ArtistProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;