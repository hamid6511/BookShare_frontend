import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './assets/components/Login';
import HomePage from './assets/components/HomePage';
import Registrazione from './assets/components/Registrazione';
import BookList from './assets/components/BookList';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Registrazione" element={<Registrazione />} />
            <Route path='/BookList' element = {<BookList/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
