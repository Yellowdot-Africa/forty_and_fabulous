import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RecruitmentForm from './components/RecruitmentForm';
import AuthLayout from './layouts/AuthLayout';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/recruitment" element={
          <PrivateRoute>
          <AuthLayout
            text='40 and Fabulous Reality TV Show Recruitment Form' >
            <RecruitmentForm />
          </AuthLayout>
          </PrivateRoute>}
        />
        <Route path="login" element={
          <AuthLayout
            text='40 and Fabulous Reality TV Show Login Form' >
            <LoginForm />
          </AuthLayout>}
        />
      </Routes>
    </Router>
  );
};

export default App;
