// src/api/baseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Mock data for development
const MOCK_USERS = [
  {
    id: 1,
    user_name: 'OSU985240',
    email: 'osu@example.com',
    password: '2030',
    name: 'OSU User',
    role: 'student',
    token: 'mock-jwt-osu-12345'
  },
  {
    id: 2,
    user_name: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    token: 'mock-jwt-admin-12345'
  },
  {
    id: 3,
    user_name: 'teacher',
    email: 'teacher@example.com',
    password: 'teacher123',
    name: 'Teacher User',
    role: 'teacher',
    token: 'mock-jwt-teacher-12345'
  },
  {
    id: 4,
    user_name: 'student',
    email: 'student@example.com',
    password: 'student123',
    name: 'Student User',
    role: 'student',
    token: 'mock-jwt-student-12345'
  }
]

const MOCK_COURSES = [
  {
    id: 1,
    title: 'Misooma Gahumsa Hooggansa Barnootaa-KUTAA-1',
    description: 'Bannoani kun ogummaa hooggansa barnootaa fi mikeessummaa barnoota mirkaneessuuf gargaara.',
    level: 'Intermediate',
    duration: '18h 34m',
    modules: 12,
    language: 'Oromoo',
    certificate: false,
    progress: 75,
    completed_lessons: 9,
    total_lessons: 12,
    time_spent: '12h 45m',
    last_activity: 'May 8, 2024',
    instructor: {
      name: 'Chaltu waqo',
      title: 'Sankar Education Consultant',
      rating: 4.8,
      reviews: 24,
    },
    thumbnail: '/courses/1.jpg',
    enrolled_students: 156,
    rating: 4.7
  },
  {
    id: 2,
    title: 'Mobile Video Editing Course',
    description: 'Zero to Hero - Learn mobile video editing from scratch',
    level: 'Beginner',
    duration: '12h 30m',
    modules: 8,
    language: 'English',
    certificate: true,
    progress: 40,
    completed_lessons: 5,
    total_lessons: 12,
    time_spent: '5h 20m',
    last_activity: 'Today',
    instructor: {
      name: 'Abdi Ali',
      title: 'Video Production Expert',
      rating: 4.9,
      reviews: 89,
    },
    thumbnail: '/courses/2.jpg',
    enrolled_students: 234,
    rating: 4.9
  },
  {
    id: 3,
    title: 'Dagaagina Ga\'umsa',
    description: 'Dagaagina - Ga\'umsa - Comprehensive learning program',
    level: 'Intermediate',
    duration: '8h 45m',
    modules: 6,
    language: 'Oromoo',
    certificate: true,
    progress: 60,
    completed_lessons: 6,
    total_lessons: 10,
    time_spent: '4h 30m',
    last_activity: 'Yesterday',
    instructor: {
      name: 'Sara Ahmed',
      title: 'Education Consultant',
      rating: 4.6,
      reviews: 45,
    },
    thumbnail: '/courses/3.jpg',
    enrolled_students: 89,
    rating: 4.6
  }
]

const MOCK_LESSONS = [
  {
    id: 1,
    title: '1.5 Maala Leenjii fi Barnootaa',
    description: 'Barnoonii kun ogummaa hoopganaa barnootaa fi mikkeessummaa barnootaa mikkanessuul gargaara.',
    duration: '22 min 35 sec',
    videoQuality: 'Aero7201',
    lastUpdate: '22 min 35 sec',
    completed: false,
    progress: 67,
    type: 'video',
    content: {
      overview: [
        'Mutteessummaa fi flannoo tarbaachisoo',
        'Mutteessummaa fi flannoo tarbaachisoo',
        'Mutteeessummaa fi flannoo tarbaachisoo',
        'Mutteessummaa fi flannoo tarbaachisoo',
      ]
    },
    resources: [
      { id: 1, name: 'Barnootaa_Maala_Leenjii.pdf', size: '12MB', type: 'PDF' },
      { id: 2, name: 'Barnootaa_Maala_Leenjii.pdf', size: '13MB', type: 'PDF' },
      { id: 3, name: 'Barnootaa_Maala_Leenjii.pdf', size: '12MB', type: 'PDF' },
    ],
    notes: 'You are doing great',
    completedLessons: 4,
    totalLessons: 6,
  },
  {
    id: 2,
    title: 'Introduction to JavaScript',
    description: 'Learn the fundamentals of JavaScript programming',
    duration: '18 min 45 sec',
    videoQuality: 'HD1080p',
    lastUpdate: '15 min 30 sec',
    completed: false,
    progress: 30,
    type: 'video',
    content: {
      overview: [
        'Understanding variables and data types',
        'Working with functions and arrays',
        'DOM manipulation basics',
        'Event handling',
      ]
    },
    resources: [
      { id: 1, name: 'JavaScript_Basics.pdf', size: '8MB', type: 'PDF' },
      { id: 2, name: 'Code_Samples.zip', size: '5MB', type: 'ZIP' },
    ],
    notes: 'Practice coding daily',
    completedLessons: 2,
    totalLessons: 6,
  }
]

const MOCK_ASSESSMENTS = [
  {
    id: 1,
    title: 'Module 1 Quiz',
    description: 'Test your understanding of Module 1 concepts',
    type: 'quiz',
    totalQuestions: 20,
    duration: '30 min',
    passingScore: 70,
    attempts: 2,
    status: 'in-progress',
    progress: 60,
    score: 65,
    difficulty: 'medium',
    questions: [
      {
        id: 1,
        question: 'Qereqnyga barnootaa sirna barnootaa keessatti maal faayidaa qaba?',
        options: [
          'A. Barattoonni ogumma fi beekumsa argatan mirkanessuu',
          'B. Barattoonni sirritti hubannoo akka qaban hunda\'uu fi fooyyessuu',
          'C. Barnoonni sirritti kennamuu issa mirkanessuu qofa',
          'D. Gorattootaaf qofa odeeffannoo kennuu'
        ],
        correct: 1,
        explanation: 'Qereqnyga barnootaa barattoota hubannoo fi ogummaa isaanni fooyyessuuf gargaara.'
      }
    ]
  }
]

const MOCK_BOOKLETS = [
  {
    id: 1,
    title: 'Misooma Gahumsa Hooggansa Barnootaa',
    description: 'Comprehensive booklet on educational leadership',
    subject: 'Education',
    grade: '12',
    totalQuestions: 50,
    duration: '2 hours',
    difficulty: 'medium',
    status: 'in-progress',
    progress: 30,
    type: 'mock',
  }
]

const MOCK_PROGRESS = {
  overall: 65,
  courses: [
    { id: 1, progress: 75 },
    { id: 2, progress: 40 },
    { id: 3, progress: 60 }
  ],
  totalLessons: 34,
  completedLessons: 22,
  totalHours: 48.5,
  completedHours: 32.2,
  streak: 7,
  lastActivity: '2024-05-08'
}

const MOCK_ACHIEVEMENTS = [
  {
    id: 1,
    title: 'First Course Completed',
    description: 'Completed your first course',
    icon: 'trophy',
    points: 100,
    unlocked: true,
    unlockedAt: '2024-05-01',
    rarity: 'common',
    category: 'Course',
  },
  {
    id: 2,
    title: '10 Lessons Mastered',
    description: 'Completed 10 lessons',
    icon: 'star',
    points: 150,
    unlocked: true,
    unlockedAt: '2024-05-05',
    rarity: 'uncommon',
    category: 'Lessons',
  },
  {
    id: 3,
    title: '7 Day Streak',
    description: 'Active for 7 consecutive days',
    icon: 'zap',
    points: 200,
    unlocked: false,
    progress: 5,
    target: 7,
    rarity: 'rare',
    category: 'Streak',
  },
  {
    id: 4,
    title: 'Perfect Score',
    description: 'Scored 100% on an assessment',
    icon: 'target',
    points: 250,
    unlocked: false,
    progress: 80,
    target: 100,
    rarity: 'epic',
    category: 'Assessment',
  }
]

// Check if we're in development mode with mock enabled
const isMockEnabled = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === 'true'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || '/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
    // Add mock interceptor for development
    fetchFn: async (input, init) => {
      // If mock is enabled, intercept requests
      if (isMockEnabled) {
        const url = typeof input === 'string' ? input : input.url
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500))
        
        // Mock login endpoint
        if (url && url.includes('/login')) {
          // Parse body safely
          let body = {}
          if (init && init.body) {
            try {
              body = JSON.parse(init.body)
            } catch (e) {
              body = {}
            }
          }
          const { user_name, password } = body
          
          const user = MOCK_USERS.find(
            u => (u.user_name === user_name || u.email === user_name) && u.password === password
          )
          
          if (user) {
            return new Response(JSON.stringify({
              success: true,
              token: user.token,
              user: {
                id: user.id,
                user_name: user.user_name,
                email: user.email,
                name: user.name,
                role: user.role
              }
            }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            })
          }
          
          return new Response(JSON.stringify({
            success: false,
            error: 'Invalid credentials'
          }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          })
        }
        
        // Mock courses endpoints
        if (url && url.includes('/courses')) {
          // Get single course
          const match = url.match(/\/courses\/(\d+)/)
          if (match) {
            const id = parseInt(match[1])
            const course = MOCK_COURSES.find(c => c.id === id)
            return new Response(JSON.stringify({
              success: true,
              data: course || MOCK_COURSES[0]
            }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            })
          }
          
          // Get all courses
          if (url.includes('/my-courses')) {
            return new Response(JSON.stringify({
              success: true,
              data: MOCK_COURSES.slice(0, 2)
            }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            })
          }
          
          return new Response(JSON.stringify({
            success: true,
            data: MOCK_COURSES
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          })
        }
        
        // Mock lessons
        if (url && (url.includes('/lessons') || url.includes('/lesson-contents'))) {
          const match = url.match(/\/(\d+)$/)
          if (match) {
            const id = parseInt(match[1])
            const lesson = MOCK_LESSONS.find(l => l.id === id)
            return new Response(JSON.stringify({
              success: true,
              data: lesson || MOCK_LESSONS[0]
            }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            })
          }
          return new Response(JSON.stringify({
            success: true,
            data: MOCK_LESSONS
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          })
        }
        
        // Mock assessments
        if (url && (url.includes('/assessments') || url.includes('/assessment'))) {
          return new Response(JSON.stringify({
            success: true,
            data: MOCK_ASSESSMENTS
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          })
        }
        
        // Mock booklets
        if (url && url.includes('/booklets')) {
          return new Response(JSON.stringify({
            success: true,
            data: MOCK_BOOKLETS
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          })
        }
        
        // Mock progress
        if (url && url.includes('/my-progress')) {
          return new Response(JSON.stringify({
            success: true,
            data: MOCK_PROGRESS
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          })
        }
        
        // Mock achievements
        if (url && url.includes('/achievements')) {
          return new Response(JSON.stringify({
            success: true,
            data: MOCK_ACHIEVEMENTS
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          })
        }
        
        // Mock profile
        if (url && url.includes('/profile')) {
          return new Response(JSON.stringify({
            success: true,
            data: MOCK_USERS[0]
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          })
        }
        
        // Mock notifications
        if (url && (url.includes('/notifications') || url.includes('/my-notifications'))) {
          return new Response(JSON.stringify({
            success: true,
            data: [
              {
                id: 1,
                type: 'info',
                title: 'New Course Available',
                message: 'A new course "Advanced React" has been added to your learning path.',
                timestamp: '2 minutes ago',
                read: false,
                category: 'course'
              },
              {
                id: 2,
                type: 'success',
                title: 'Lesson Completed!',
                message: 'You have completed "Introduction to JavaScript" lesson.',
                timestamp: '15 minutes ago',
                read: false,
                category: 'lesson'
              }
            ]
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          })
        }
        
        // Mock register endpoint
        if (url && url.includes('/register')) {
          let body = {}
          if (init && init.body) {
            try {
              body = JSON.parse(init.body)
            } catch (e) {
              body = {}
            }
          }
          
          const newUser = {
            id: MOCK_USERS.length + 1,
            ...body,
            token: 'mock-jwt-new-user-12345'
          }
          MOCK_USERS.push(newUser)
          
          return new Response(JSON.stringify({
            success: true,
            message: 'User registered successfully',
            user: newUser
          }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
          })
        }
        
        // Mock logout
        if (url && url.includes('/logout')) {
          return new Response(JSON.stringify({
            success: true,
            message: 'Logged out successfully'
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          })
        }
      }
      
      // For production or non-mocked requests, use actual fetch
      return fetch(input, init)
    }
  }),
  tagTypes: ['User', 'Course', 'Lesson', 'Assessment', 'Progress', 'Booklet', 'Notification'],
  endpoints: (builder) => ({}),
})

export default apiSlice