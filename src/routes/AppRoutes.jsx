import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import all pages - Each must have export default
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import MyLearning from '../pages/MyLearning';
import MyProgress from '../pages/MyProgress';
import CourseOverview from '../pages/CourseOverview';
import LessonLearning from '../pages/LessonLearning';
import ReadingContent from '../pages/ReadingContent';
import Attachments from '../pages/Attachments';
import AppLayout from '../layouts/AppLayout';

// Protected Route Component
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
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-learning" element={<MyLearning />} />
          <Route path="my-progress" element={<MyProgress />} />
          <Route path="course-overview" element={<CourseOverview />} />
          <Route path="lesson-learning" element={<LessonLearning />} />
          <Route path="reading-content" element={<ReadingContent />} />
          <Route path="attachments" element={<Attachments />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;