import React, { useEffect, useState } from 'react';
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
import UserList from './Components/Admin/UserList.jsx';
import { useTracker } from 'meteor/react-meteor-data.js';
import Details from './Components/Admin/Details.jsx';
import AdminsList from './Components/Admin/AdminsList.jsx';

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasRole, setHasRole] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState([]);

  return (
    <MenuContext.Provider
      value={{
        setHideCompleted,
        setIsMenuOpen,
        setHasRole,
        setCurrentUserRole,
        state: {
          hideCompleted,
          isMenuOpen,
          hasRole,
          currentUserRole
        }
      }}>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<RoleProtectedRoute roles={['user', 'admin']} > <Task /> </RoleProtectedRoute>} />
          <Route path="change-password" element={<RoleProtectedRoute roles={['user', 'admin']}> <ChangePassword /> </RoleProtectedRoute>} />

          <Route path="admin">
            <Route index element={<RoleProtectedRoute roles={['admin']}><Dashboard /></RoleProtectedRoute>} />
            <Route path="users">
              <Route index element={<RoleProtectedRoute roles={['admin']}><UserList /></RoleProtectedRoute>} />
              <Route path=":id" element={<RoleProtectedRoute roles={['admin']}><Details /></RoleProtectedRoute>} />
            </Route>
            <Route path="list">
              <Route index element={<RoleProtectedRoute roles={['admin']}><AdminsList /></RoleProtectedRoute>} />
              <Route path=":id" element={<RoleProtectedRoute roles={['admin']}><Details /></RoleProtectedRoute>} />
            </Route>
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


