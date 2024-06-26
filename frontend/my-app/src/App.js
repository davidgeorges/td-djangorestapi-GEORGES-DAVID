// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Chercheurs from './components/Chercheurs';
import Projets from './components/Projets';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/chercheurs">Chercheurs</Link>
            </li>
            <li>
              <Link to="/projets">Projets</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/chercheurs" element={<Chercheurs />} />
          <Route path="/projets" element={<Projets />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
