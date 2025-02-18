import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout.jsx';
import { RegisterForm } from './RegisterForm';
import { Task } from './Task';
import { LoginForm } from './LoginForm.jsx';

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout hideCompleted={hideCompleted} setHideCompleted={setHideCompleted} />} >
          <Route path="/" index element={<Task hideCompleted={hideCompleted} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>
      </Routes>
    </div>
  )
};


