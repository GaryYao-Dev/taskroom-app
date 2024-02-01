import React from 'react';
import { HashRouter as Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Project from './pages/Project';
import TaskBoardHeader from './pages/TaskBoardHeader';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ForgotPasswordPage from './pages/LoginPage/components/ForgotPasswordPage';
import ResetPasswordPage from './pages/LoginPage/components/ResetPasswordPage'; 
import JoinProjectPage from './pages/JoinProjectPage/JoinProjectPage'
import Projects from './pages/Projects';

function AppRouter() {
  const Router = [
    { path: '/', component: HomePage, header: true },
    { path: '/register', component: RegisterPage },
    { path: '/login', component: LoginPage },
    { path: '/login/:token', component: LoginPage },
    { path: '/project', component: Project, header: true },
    { path: '/verifyEmail/:token', component: VerifyEmailPage, header: false },
    { path: '/forgotPassword', component: ForgotPasswordPage, header: false },
    { path: '/resetPassword/:token', component: ResetPasswordPage, header: false }, 
    { path: '/join/:token', component: JoinProjectPage, header: false },
    { path: '/projects', component: Projects, header: true },
  ];
  return (
    <Routes>
      {Router.map(({ path, component: Component, header }) => (
        <Route
          key={path}
          path={path}
          element={
            header ? (
              <TaskBoardHeader sx={{ display: 'flex' }}>
                <Component />
              </TaskBoardHeader>
            ) : (
              <Component />
            )
          }
        />
      ))}
    </Routes>
  );
}

export default AppRouter;
