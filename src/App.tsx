import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RecruitmentForm from './components/RecruitmentForm';
import AuthLayout from './layouts/AuthLayout';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/recruitment" />} />

        <Route path="/recruitment" element={
          <AuthLayout
            text='40 and Fabulous Reality TV Show Recruitment Form' >
            <RecruitmentForm />
          </AuthLayout>}
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
