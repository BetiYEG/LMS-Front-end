// src/pages/CourseOverview/CourseOverview.jsx
import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft,
  ArrowRight,
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  PlayCircle,
  Award,
  MessageSquare,
  Calendar,
  Download,
  FileText,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Lock,
  Video,
  FileQuestion,
  BadgeCheck,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export const CourseOverview = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedModules, setExpandedModules] = useState(new Set([1]))

  // Mock course data - In real app, fetch based on id
  const course = {
    id: 1,
    title: 'Misoma Gahumsa Hooggansa Barnootaa-KUTAA-1',
    description: 'Barnoonki kun ogummaa hooggansa barnootaa fi mikeessummaa barnoota mirkaneesuuf gagerra.',
    level: 'Intermediate',
    duration: '18h 34m',
    modules: 12,
    language: 'Oromoo',
    certificate: 'Yes',
    progress: 75,
    completed_lessons: 9,
    total_lessons: 12,
    time_spent: '12h 45m',
    last_activity: 'May 5, 2024',
    instructor: {
      name: 'Chaltu waqo',
      title: 'Senior Education Consultant',
      rating: 4.8,
      reviews: 24,
    },
    what_you_learn: [
      'Hooggansa barnootaa sirnaan ilaaloo',
      'Murteessummaa fi filiannoo barbasachisoo',
      'Tarsilimoo barnootaa hojii irra oolchu',
      'Adeemsa qorannoo fi sakatta\'i',
      'Walhubannoo fi tajajila waliin galaa Milkeessummaa',
      'Adeemsa qorannoo fi sakatta\'i barnoota mirkaneesuu',
    ],
    modules_data: [
      {
        id: 1,
        title: 'Seensa',
        lessons: [
          { id: 1, title: 'Seensa Qabiyyee', type: 'video', duration: '15 min', completed: true },
          { id: 2, title: 'Kaayyoo Qabiyyee', type: 'reading', duration: '10 min', completed: true },
          { id: 3, title: 'Bu\'a Gahumsaa Egamu', type: 'video', duration: '20 min', completed: true },
          { id: 4, title: 'Caaseefamaa fi Gurmaa\'ina Moojuulicha', type: 'reading', duration: '25 min', completed: false },
          { id: 5, title: 'Maia Leenjii fi Barnootaa', type: 'video', duration: '15 min', completed: false },
          { id: 6, title: 'Qabeenya Barbaachisu', type: 'reading', duration: '10 min', completed: false },
        ],
        completed: 3,
        total: 6,
      },
      {
        id: 2,
        title: 'Kutaa 1: Hooggansa Imaammata Barnootaa',
        lessons: [
          { id: 7, title: 'Ibsa Kutaa', type: 'reading', duration: '20 min', completed: true },
          { id: 8, title: 'Bu\'uuraalee Imaammata', type: 'video', duration: '30 min', completed: true },
          { id: 9, title: 'Meeshaalee Xinxala Imaammataa', type: 'reading', duration: '25 min', completed: true },
          { id: 10, title: 'Dandeettii Hoggansa Imaammata', type: 'video', duration: '20 min', completed: false },
          { id: 11, title: 'Hojii Gaggeessa Imaammata', type: 'reading', duration: '45 min', completed: false },
          { id: 12, title: 'Qorannoo Kutaa 1', type: 'quiz', duration: '30 min', completed: false },
          { id: 13, title: 'Xumura Kutaa 1', type: 'reading', duration: '15 min', completed: false },
          { id: 14, title: 'Gabaasa Kutaa 1', type: 'assignment', duration: '60 min', completed: false },
        ],
        completed: 3,
        total: 8,
      },
      {
        id: 3,
        title: 'Kutaa 2: Hooggansa Tarsilimoo fi Sirna Barnootaa',
        lessons: [
          { id: 15, title: 'Ibsa Kutaa 2', type: 'reading', duration: '20 min', completed: false },
          { id: 16, title: 'Tarsilimoo Barnootaa', type: 'video', duration: '35 min', completed: false },
        ],
        completed: 0,
        total: 7,
      },
      {
        id: 4,
        title: 'Kutaa 3: Hojii Gaggeessaa fi Beekisisa',
        lessons: [
          { id: 17, title: 'Ibsa Kutaa 3', type: 'reading', duration: '20 min', completed: false },
          { id: 18, title: 'Hojii Gaggeessa', type: 'video', duration: '40 min', completed: false },
        ],
        completed: 0,
        total: 6,
      },
    ]
  }

  const toggleModule = (moduleId) => {
    const newExpanded = new Set(expandedModules)
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId)
    } else {
      newExpanded.add(moduleId)
    }
    setExpandedModules(newExpanded)
  }

  const getLessonIcon = (type) => {
    const icons = {
      video: Video,
      reading: FileText,
      quiz: FileQuestion,
      assignment: FileText,
    }
    return icons[type] || FileText
  }

  const getModuleProgress = (module) => {
    if (module.total === 0) return 0
    return Math.round((module.completed / module.total) * 100)
  }

  // Navigate to lesson
  const handleLessonClick = (lessonId) => {
    navigate(`/course/${id}/lesson/${lessonId}`)
  }

  // Navigate to first incomplete lesson or first lesson
  const handleContinueLearning = () => {
    // Find first incomplete lesson
    for (const module of course.modules_data) {
      for (const lesson of module.lessons) {
        if (!lesson.completed) {
          handleLessonClick(lesson.id)
          return
        }
      }
    }
    // If all completed, go to last lesson
    const lastModule = course.modules_data[course.modules_data.length - 1]
    const lastLesson = lastModule.lessons[lastModule.lessons.length - 1]
    handleLessonClick(lastLesson.id)
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/my-courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          My Courses
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900 dark:text-white font-medium truncate">
          {course.title}
        </span>
      </div>

      {/* Course Header */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <Badge className="mb-3 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-0">
              In Progress
            </Badge>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {course.title}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {course.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">
                Level {course.level}
              </Badge>
              <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <BookOpen className="h-4 w-4" />
                Nodes {course.modules}
              </span>
              <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Users className="h-4 w-4" />
                {course.language}
              </span>
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <BadgeCheck className="h-4 w-4" />
                Certificate {course.certificate}
              </span>
            </div>
          </div>

          {/* Progress Card */}
          <div className="lg:w-72">
            <Card className="bg-indigo-50 dark:bg-indigo-900/20 border-0">
              <CardContent className="p-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Progress
                </h4>
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {course.progress}%
                  </div>
                  <div className="flex-1">
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {course.completed_lessons} of {course.total_lessons} lessons completed
                </p>
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Time spent</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.time_spent}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500 dark:text-gray-400">Last activity</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.last_activity}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button 
            className="gap-2 bg-indigo-600 hover:bg-indigo-700"
            onClick={handleContinueLearning}
          >
            <PlayCircle className="h-4 w-4" />
            Continue learning
          </Button>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => {
              // Find last lesson
              const lastModule = course.modules_data[course.modules_data.length - 1]
              const lastLesson = lastModule.lessons[lastModule.lessons.length - 1]
              handleLessonClick(lastLesson.id)
            }}
          >
            <ArrowRight className="h-4 w-4" />
            Go to last lesson
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full justify-start bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
            Overview
          </TabsTrigger>
          <TabsTrigger value="curriculum" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
            Curriculum
          </TabsTrigger>
          <TabsTrigger value="reviews" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
            Reviews(20)
          </TabsTrigger>
          <TabsTrigger value="announcements" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
            Announcement
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* What you'll learn */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What you'll learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.what_you_learn.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Course Info Sidebar */}
            <div className="space-y-6">
              {/* Instructor */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {course.instructor.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {course.instructor.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {course.instructor.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {course.instructor.rating}
                          </span>
                        </div>
                        <span className="text-sm text-gray-400">
                          ({course.instructor.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What's included */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">This course includes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <BookOpen className="h-4 w-4 text-gray-400" />
                    {course.modules} Modules
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <FileText className="h-4 w-4 text-gray-400" />
                    {course.total_lessons} Lessons
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {course.duration} On-demand videos
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <FileText className="h-4 w-4 text-gray-400" />
                    Assignments
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <FileQuestion className="h-4 w-4 text-gray-400" />
                    Quizzes
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Download className="h-4 w-4 text-gray-400" />
                    Downloadable resources
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Award className="h-4 w-4 text-gray-400" />
                    Certificate of completion
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="curriculum">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.modules_data.map((module) => {
                  const isExpanded = expandedModules.has(module.id)
                  const progress = getModuleProgress(module)
                  
                  return (
                    <div key={module.id} className="border rounded-lg overflow-hidden">
                      {/* Module Header */}
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => toggleModule(module.id)}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <button className="text-gray-500">
                            {isExpanded ? (
                              <ChevronDown className="h-5 w-5" />
                            ) : (
                              <ChevronRight className="h-5 w-5" />
                            )}
                          </button>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {module.title}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                              <span>{module.completed}/{module.total} lessons</span>
                              <span>•</span>
                              <span>{progress}% complete</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={progress} className="h-2 w-24" />
                          <Badge variant="outline" className="text-xs">
                            {progress}%
                          </Badge>
                        </div>
                      </div>

                      {/* Module Lessons */}
                      {isExpanded && (
                        <div className="border-t divide-y">
                          {module.lessons.map((lesson, index) => {
                            const Icon = getLessonIcon(lesson.type)
                            return (
                              <div
                                key={lesson.id}
                                className={cn(
                                  "flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer",
                                  lesson.completed && "bg-green-50 dark:bg-green-900/10"
                                )}
                                onClick={() => handleLessonClick(lesson.id)}
                              >
                                <div className="flex items-center gap-3 flex-1">
                                  <span className="text-xs text-gray-400 w-6">
                                    {index + 1}
                                  </span>
                                  {lesson.completed ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <PlayCircle className="h-4 w-4 text-gray-400" />
                                  )}
                                  <Icon className="h-4 w-4 text-gray-400" />
                                  <span className={cn(
                                    "text-sm",
                                    lesson.completed 
                                      ? "text-gray-600 dark:text-gray-400" 
                                      : "text-gray-700 dark:text-gray-300"
                                  )}>
                                    {lesson.title}
                                  </span>
                                  {lesson.completed && (
                                    <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                                      Completed
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-gray-400">
                                    {lesson.duration}
                                  </span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reviews (20)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">4.8</div>
                  <div className="flex items-center gap-1 justify-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">24 reviews</p>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-8">5★</span>
                    <Progress value={80} className="h-2 flex-1" />
                    <span className="text-xs text-gray-500">80%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-8">4★</span>
                    <Progress value={15} className="h-2 flex-1" />
                    <span className="text-xs text-gray-500">15%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-8">3★</span>
                    <Progress value={3} className="h-2 flex-1" />
                    <span className="text-xs text-gray-500">3%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-8">2★</span>
                    <Progress value={1} className="h-2 flex-1" />
                    <span className="text-xs text-gray-500">1%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-8">1★</span>
                    <Progress value={1} className="h-2 flex-1" />
                    <span className="text-xs text-gray-500">1%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Announcements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">New Module Available</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Module 4 has been added to the course. Check it out now!
                </p>
                <p className="text-xs text-gray-400 mt-2">Posted 2 days ago</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CourseOverview