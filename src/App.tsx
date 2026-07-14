// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import AppLayout from './components/layout/AppLayout'
import { useTeamColors } from './hooks/useTeamColors'

// Import pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import MyCourses from './pages/MyCourses'
import CourseOverview from './pages/CourseOverview'
import LessonLearning from './pages/LessonLearning'
import Assessments from './pages/Assessments'
import Booklets from './pages/Booklets'
import MyProgress from './pages/MyProgress'
import Achievements from './pages/Achievements'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function App() {
  // ✅ Apply team colors when app loads
  useTeamColors()
  
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/course/:id" element={<CourseOverview />} />
            <Route path="/course/:courseId/lesson/:lessonId" element={<LessonLearning />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/booklets" element={<Booklets />} />
            <Route path="/progress" element={<MyProgress />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App