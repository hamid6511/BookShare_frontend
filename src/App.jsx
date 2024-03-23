import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './assets/components/Login';
import HomePage from './assets/components/HomePage';
import Registrazione from './assets/components/Registrazione';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrazione" element={<Registrazione />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
