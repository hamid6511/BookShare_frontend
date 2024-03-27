import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './assets/components/Login';
import ForgotPassword from './assets/components/ForgotPassword';
import HomePage from './assets/components/HomePage';
import Registrazione from './assets/components/Registrazione';
import ResetPassword from './assets/components/ResetPassword';
import SuccessfulReset from './assets/components/SuccessfulReset.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/successful-reset" element={<SuccessfulReset />} />
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrazione" element={<Registrazione />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
