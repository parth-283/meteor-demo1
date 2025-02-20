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
import ChangePassword from './Components/ChangePassword.jsx';
import ForgotPassword from './Components/ForgotPassword.jsx';
import { ResetPassword } from './Components/ResetPassword.jsx';
import RoleProtectedRoute from './Routers/RoleProtectedRoute.jsx';

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
          <Route path="/" index element={<RoleProtectedRoute roles={['user', 'admin', 'moderator']}> <Task /> </RoleProtectedRoute>} />
          <Route path="/change-password" element={<RoleProtectedRoute roles={['user', 'admin', 'moderator']}> <ChangePassword /> </RoleProtectedRoute>} />

          <Route path="/login" element={<PrivateRoute> <LoginForm /> </PrivateRoute>} />
          <Route path="/register" element={<PrivateRoute> <RegisterForm /> </PrivateRoute>} />
          <Route path="/forgot-password" element={<PrivateRoute> <ForgotPassword /> </PrivateRoute>} />
          <Route path="/reset-password/:token" element={<PrivateRoute> <ResetPassword /> </PrivateRoute>} />

          <Route path="/verify-email/:token" element={<VerifyEmail />} />
        </Route>
      </Routes>
    </MenuContext.Provider>
  )
};


