import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import MyLearning from '../pages/MyLearning';
import MyProgress from '../pages/MyProgress';
import CourseOverview from '../pages/CourseOverview';
import LessonLearning from '../pages/LessonLearning';
import ReadingContent from '../pages/ReadingContent';
import Attachments from '../pages/Attachments';
import AppLayout from '../layouts/AppLayout';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>
        
        <Route 
          path="/my-learning" 
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MyLearning />} />
        </Route>
        
        <Route 
          path="/my-progress" 
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MyProgress />} />
        </Route>
        
        <Route 
          path="/course-overview" 
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CourseOverview />} />
        </Route>
        
        <Route 
          path="/lesson-learning" 
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<LessonLearning />} />
        </Route>
        
        <Route 
          path="/reading-content" 
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ReadingContent />} />
        </Route>
        
        <Route 
          path="/attachments" 
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Attachments />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;