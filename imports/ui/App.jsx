import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout.jsx';
import { RegisterForm } from './RegisterForm';
import { Task } from './Task';
import { LoginForm } from './LoginForm.jsx';
import ProtectedRoute from './Routing/ProtectedRoute.jsx';
import PrivateRoute from './Routing/PrivateRoute.jsx';

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout hideCompleted={hideCompleted} setHideCompleted={setHideCompleted} />} >
          <Route path="/" index element={<ProtectedRoute> <Task hideCompleted={hideCompleted} /> </ProtectedRoute>} />
          <Route path="/login" element={<PrivateRoute> <LoginForm /> </PrivateRoute>} />
          <Route path="/register" element={<PrivateRoute> <RegisterForm /> </PrivateRoute>} />
        </Route>
      </Routes>
    </div>
  )
};


