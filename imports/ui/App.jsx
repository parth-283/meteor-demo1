import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout.jsx';
import { RegisterForm } from './Components/RegisterForm.jsx';
import { Task } from './Components/Task.jsx';
import { LoginForm } from './Components/LoginForm.jsx';
import ProtectedRoute from './Routers/ProtectedRoute.jsx';
import PrivateRoute from './Routers/PrivateRoute.jsx';
import { VerifyEmail } from './Components/VerifyEmail.jsx';
import MenuContext from './Contexts/menu.jsx';

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <MenuContext.Provider
      value={{
        setHideCompleted,
        setIsMenuOpen,
        state: {
          hideCompleted,
          isMenuOpen
        }
      }}>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" index element={<ProtectedRoute> <Task /> </ProtectedRoute>} />
          <Route path="/login" element={<PrivateRoute> <LoginForm /> </PrivateRoute>} />
          <Route path="/register" element={<PrivateRoute> <RegisterForm /> </PrivateRoute>} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
        </Route>
      </Routes>
    </MenuContext.Provider>
  )
};


