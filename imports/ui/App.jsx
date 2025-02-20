import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout.jsx';
import { RegisterForm } from './Components/RegisterForm.jsx';
import { Task } from './Components/Task.jsx';
import { LoginForm } from './Components/LoginForm.jsx';
import PrivateRoute from './Routers/PrivateRoute.jsx';
import { VerifyEmail } from './Components/VerifyEmail.jsx';
import MenuContext from './Contexts/menu.jsx';
import ChangePassword from './Components/ChangePassword.jsx';
import ForgotPassword from './Components/ForgotPassword.jsx';
import { ResetPassword } from './Components/ResetPassword.jsx';
import RoleProtectedRoute from './Routers/RoleProtectedRoute.jsx';
import Dashboard from './Components/Admin/Dashboard.jsx';
import NotFound from './Components/Errors/NotFound.jsx';

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasRole, setHasRole] = useState(null);

  return (
    <MenuContext.Provider
      value={{
        setHideCompleted,
        setIsMenuOpen,
        setHasRole,
        state: {
          hideCompleted,
          isMenuOpen,
          hasRole
        }
      }}>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<RoleProtectedRoute roles={['user', 'admin']} > <Task /> </RoleProtectedRoute>} />
          <Route path="change-password" element={<RoleProtectedRoute roles={['user', 'admin']}> <ChangePassword /> </RoleProtectedRoute>} />

          <Route path="admin" >
            <Route index element={<RoleProtectedRoute roles={['admin']}> <Dashboard /></RoleProtectedRoute>} />
          </Route>

          <Route path="login" element={<PrivateRoute> <LoginForm /> </PrivateRoute>} />
          <Route path="register" element={<PrivateRoute> <RegisterForm /> </PrivateRoute>} />
          <Route path="forgot-password" element={<PrivateRoute> <ForgotPassword /> </PrivateRoute>} />
          <Route path="reset-password/:token" element={<PrivateRoute> <ResetPassword /> </PrivateRoute>} />

          <Route path="verify-email/:token" element={<VerifyEmail />} />

          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </MenuContext.Provider>
  )
};


