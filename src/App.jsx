import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './assets/components/Login';
import ForgotPassword from './assets/components/ForgotPassword';
import HomePage from './assets/components/HomePage';
import Registrazione from './assets/components/Registrazione';
<<<<<<< HEAD
import BookList from './assets/components/BookList';
import "bootstrap/dist/css/bootstrap.min.css";

=======
import ResetPassword from './assets/components/ResetPassword';
import SuccessfulReset from './assets/components/SuccessfulReset.jsx';
>>>>>>> 8c45a1e4156331de69b4b1c33120ee76e6adf3a2

function App() {
  return (
    <div>
      <Router>
        <Routes>
<<<<<<< HEAD
          <Route>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Registrazione" element={<Registrazione />} />
            <Route path='/BookList' element = {<BookList/>}/>
          </Route>
=======
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/successful-reset" element={<SuccessfulReset />} />
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrazione" element={<Registrazione />} />
          <Route path="/reset-password" element={<ResetPassword />} />
>>>>>>> 8c45a1e4156331de69b4b1c33120ee76e6adf3a2
        </Routes>
      </Router>
    </div>
  );
}

export default App;
