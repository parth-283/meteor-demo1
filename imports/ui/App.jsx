import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout.jsx';
import { RegisterForm } from './RegisterForm';
import { Task } from './Task';
import { LoginForm } from './LoginForm.jsx';
import ProtectedRoute from './Routing/ProtectedRoute.jsx';
import PrivateRoute from './Routing/PrivateRoute.jsx';
import { VerifyEmail } from './VerifyEmail.jsx';
import MenuContext from './Context/menu.jsx';

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
        </Route>
      </Routes>
    </MenuContext.Provider>
  )
};


