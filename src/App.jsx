import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserNameProvider } from './assets/user/UserNameContext';
//import Login from './assets/components/Login';
import ForgotPassword from './assets/components/ForgotPassword';
import HomePage from './assets/components/HomePage';
//import Registrazione from './assets/components/Registrazione';
import BookList from './assets/components/BookList';
import SuccessfulReset from './assets/components/SuccessfulReset'
import ResetPassword from './assets/components/ResetPassword';
import BookCard from './assets/components/BookCard';
import BookDetail from './assets/components/bookDetail';
import UserHome from './assets/user/Home';
import ChatPage from './assets/user/ChatPage';
import UserBooks from './assets/user/UserBooks';
import AddBook from './assets/user/addBook';
import ProfilePage from './assets/user/ProfilePage';
import AdminBooks from './assets/admin/AdminBooks';
import EditBook from './assets/admin/editBook';
import AllUsers from './assets/admin/allUsers';
import EditUsers from './assets/admin/editUsers';


import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <div>
      <UserNameProvider>
        <Router>
          <Routes>

            <Route>
              <Route path="/" element={<HomePage />} />
              <Route path="/book/detail/:id" element={<BookDetail />} />
              <Route path='/BookList' element={<BookList />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/successful-reset" element={<SuccessfulReset />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/card" element={<BookCard />} />
              <Route path="/user-home" element={<UserHome />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/userBooks" element={<UserBooks />} />
              <Route path="/profilo" element={<ProfilePage />} />
              <Route path="/admin/books" element={<AdminBooks />} />
              <Route path="/books/edit/:id" element={<EditBook />} />
              <Route path="/admin/users" element={<AllUsers />} />
              <Route path="/admin/users/edit/:id" element={<EditUsers />} />
              <Route path="/addBook" element={<AddBook />} />
            </Route>
          </Routes>
        </Router>
      </UserNameProvider>
    </div>
  );
}

export default App;
