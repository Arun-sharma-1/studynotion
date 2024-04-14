import React, { useState } from 'react'
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className='min-h-screen bg-richblack-900 flex flex-col'>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/signup' element={<SignupPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/dashboard' element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Dashboard />
          </PrivateRoute>
        } />
      </Routes>

    </div>
  )
}

export default App
