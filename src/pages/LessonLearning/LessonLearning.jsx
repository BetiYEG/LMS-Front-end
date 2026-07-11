// src/pages/LessonLearning/LessonLearning.jsx
import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft,
  ArrowRight,
  BookOpen, 
  Clock, 
  PlayCircle,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Video,
  FileText,
  FileQuestion,
  Download,
  MessageSquare,
  HelpCircle,
  Settings,
  Info,
  File,
  Calendar,
  Award,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { VideoPlayer } from '@/components/dashboard/VideoPlayer'

export const LessonLearning = () => {
  const { courseId, lessonId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedModules, setExpandedModules] = useState(new Set([1]))

  // Mock lesson data
  const lesson = {
    id: 1,
    title: '1.5 Maala Leenji fi Barnootaa',
    description: 'Barnootai kun ogummaa hoggannaa barnootaa fi milkeesuummaa barnoota mikaneeseuuf gargaar.',
    duration: '22 min 36 sec',
    videoQuality: 'Aise(720)',
    lastUpdate: '22 min 35 sec',
    completed: false,
    progress: 75,
    type: 'video',
    content: {
      overview: [
        'Murteesuummaa fi filanno barbaachisoo',
        'Murteesuummaa fi filanno barbaachisoo',
        'Murteessuummaa fi filanno barbaachisoo',
        'Murteessuummaa fi fil anno barbaachisoo',
      ]
    },
    resources: [
      { id: 1, name: 'Barnoota_Maala_Leenji.pdf', size: '1.5 MB', type: 'PDF' },
      { id: 2, name: 'Barnoota_Maala_Leenji.pdf', size: '2.0 MB', type: 'PDF' },
      { id: 3, name: 'Barnoota_Maala_Leenji.pdf', size: '1.5 MB', type: 'PDF' },
    ],
    completedLessons: 4,
    totalLessons: 6,
  }

  // Mock course modules for sidebar
  const courseModules = [
    { 
      id: 1, 
      title: 'Seensa', 
      lessons: 6, 
      completed: 5, 
      active: false,
      lessonList: [
        { id: 1, title: 'Seensa Cufamee', duration: '16:30', completed: true },
        { id: 2, title: 'Seensa Cufamee', duration: '16:30', completed: true },
        { id: 3, title: 'Seensa Cufamee', duration: '16:30', completed: true },
        { id: 4, title: 'Seensa Cufamee', duration: '16:30', completed: true },
        { id: 5, title: 'Msta Leenji Bar', duration: '16:30', completed: true },
        { id: 6, title: 'Seensa Cufamee', duration: '16:30', completed: false },
      ]
    },
    { 
      id: 2, 
      title: 'Kufaa 1: Hoggarne Inaammata Barroottaa', 
      lessons: 8, 
      completed: 5, 
      active: false,
      lessonList: [
        { id: 7, title: 'Kufaa 1 Cufamee', duration: '20:00', completed: true },
        { id: 8, title: 'Kufaa 1 Cufamee', duration: '18:30', completed: true },
        { id: 9, title: 'Kufaa 1 Cufamee', duration: '22:00', completed: true },
        { id: 10, title: 'Kufaa 1 Cufamee', duration: '15:00', completed: true },
        { id: 11, title: 'Kufaa 1 Cufamee', duration: '25:00', completed: true },
        { id: 12, title: 'Kufaa 1 Cufamee', duration: '20:00', completed: false },
        { id: 13, title: 'Kufaa 1 Cufamee', duration: '18:00', completed: false },
        { id: 14, title: 'Kufaa 1 Cufamee', duration: '22:00', completed: false },
      ]
    },
    { 
      id: 3, 
      title: 'Kufaa 2: Hoggarne Inaammata Barroottaa', 
      lessons: 7, 
      completed: 0, 
      active: true,
      lessonList: [
        { id: 15, title: 'Kufaa 2 Cufamee', duration: '20:00', completed: false },
        { id: 16, title: 'Kufaa 2 Cufamee', duration: '18:30', completed: false },
        { id: 17, title: 'Kufaa 2 Cufamee', duration: '22:00', completed: false },
        { id: 18, title: 'Kufaa 2 Cufamee', duration: '15:00', completed: false },
        { id: 19, title: 'Kufaa 2 Cufamee', duration: '25:00', completed: false },
        { id: 20, title: 'Kufaa 2 Cufamee', duration: '20:00', completed: false },
        { id: 21, title: 'Kufaa 2 Cufamee', duration: '18:00', completed: false },
      ]
    },
    { 
      id: 4, 
      title: 'Kufaa 3: Hoggarne Inaammata Barroottaa', 
      lessons: 6, 
      completed: 0, 
      active: false,
      lessonList: [
        { id: 22, title: 'Kufaa 3 Cufamee', duration: '20:00', completed: false },
        { id: 23, title: 'Kufaa 3 Cufamee', duration: '18:30', completed: false },
        { id: 24, title: 'Kufaa 3 Cufamee', duration: '22:00', completed: false },
        { id: 25, title: 'Kufaa 3 Cufamee', duration: '15:00', completed: false },
        { id: 26, title: 'Kufaa 3 Cufamee', duration: '25:00', completed: false },
        { id: 27, title: 'Kufaa 3 Cufamee', duration: '20:00', completed: false },
      ]
    },
  ]

  const toggleModule = (moduleId) => {
    const newExpanded = new Set(expandedModules)
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId)
    } else {
      newExpanded.add(moduleId)
    }
    setExpandedModules(newExpanded)
  }

  const handleLessonClick = (lessonId) => {
    navigate(`/course/${courseId}/lesson/${lessonId}`)
  }

  return (
    <div className="flex h-full min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar - Course Content */}
      <div className="fixed lg:relative z-20 w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
        <div className="p-4">
          {/* Course Title */}
          <div className="mb-4">
            <Link to={`/course/${courseId}`} className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 mb-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Course
            </Link>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Course Content
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Misoma Gahumsa Hooggansa Barnootaa-KUTAA-1
            </p>
          </div>

          {/* Progress Summary */}
          <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Lesson Progress</span>
              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                {lesson.completedLessons}/{lesson.totalLessons} lessons
              </span>
            </div>
            <Progress value={lesson.progress} className="h-2 mt-1" />
          </div>

          {/* Module List */}
          <div className="space-y-2">
            {courseModules.map((module) => {
              const isExpanded = expandedModules.has(module.id)
              const progress = Math.round((module.completed / module.lessons) * 100)
              
              return (
                <div key={module.id} className="border rounded-lg overflow-hidden">
                  <div
                    className={cn(
                      "flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800",
                      module.active && "bg-indigo-50 dark:bg-indigo-900/20"
                    )}
                    onClick={() => toggleModule(module.id)}
                  >
                    <div className="flex items-center gap-2">
                      <button className="text-gray-500">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {module.title}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {module.completed}/{module.lessons}
                    </Badge>
                  </div>
                  
                  {isExpanded && (
                    <div className="border-t divide-y">
                      {module.lessonList.map((lessonItem) => (
                        <div
                          key={lessonItem.id}
                          className={cn(
                            "flex items-center justify-between px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer",
                            lessonItem.completed && "bg-green-50 dark:bg-green-900/10"
                          )}
                          onClick={() => handleLessonClick(lessonItem.id)}
                        >
                          <div className="flex items-center gap-2">
                            {lessonItem.completed ? (
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            ) : (
                              <PlayCircle className="h-3 w-3 text-gray-400" />
                            )}
                            <span className="text-xs text-gray-600 dark:text-gray-300">
                              {lessonItem.title}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {lessonItem.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Link to="/my-courses" className="hover:text-indigo-600">My Courses</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to={`/course/${courseId}`} className="hover:text-indigo-600">Course</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 dark:text-white">Seansa</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 dark:text-white font-medium">
              {lesson.title}
            </span>
          </div>

          {/* Lesson Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {lesson.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {lesson.duration}
              </span>
              <span className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                {lesson.videoQuality}
              </span>
              <span className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                Last Update: {lesson.lastUpdate}
              </span>
            </div>
          </div>

          {/* Video Player */}
          <div className="mb-6">
            <VideoPlayer 
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              title={lesson.title}
            />
          </div>

          {/* Lesson Info Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="w-full justify-start bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
                Overview
              </TabsTrigger>
              <TabsTrigger value="notes" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
                Notes
              </TabsTrigger>
              <TabsTrigger value="transcript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
                Transcript
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* About this lesson */}
              <Card>
                <CardHeader>
                  <CardTitle>About this lesson</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    {lesson.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 dark:text-gray-400">Level:</span>
                      <Badge>Intermediate</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                      <span className="text-gray-700 dark:text-gray-300">{lesson.duration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What you'll learn */}
              <Card>
                <CardHeader>
                  <CardTitle>In this lesson you will learn:</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {lesson.content.overview.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Lesson Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Lesson duration</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{lesson.duration}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Settings className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Video quality</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{lesson.videoQuality}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Calendar className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last Update</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{lesson.lastUpdate}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Your Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg min-h-[100px]">
                      <p className="text-gray-400 italic">Write your notes for this lesson...</p>
                    </div>
                    <Button>Save Notes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transcript">
              <Card>
                <CardHeader>
                  <CardTitle>Transcript</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p>[00:00] Welcome to this lesson on Maala Leenjii fi Barnootaa...</p>
                    <p>[05:30] In this section, we'll cover the key concepts...</p>
                    <p>[10:15] Understanding the fundamentals is crucial for...</p>
                    <p>[15:45] Let's summarize what we've learned so far...</p>
                    <p>[20:00] Thank you for watching this lesson!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Resources */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Resource</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lesson.resources.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-3">
                      <File className="h-5 w-5 text-indigo-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{resource.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{resource.type} Document: {resource.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View all resources
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Progress */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Lesson Progress</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {lesson.progress}%
                    </span>
                    <Progress value={lesson.progress} className="h-2 w-32" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {lesson.completedLessons}/{lesson.totalLessons} lessons completed
                  </p>
                </div>
                <Button variant="outline">
                  View course progress
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-indigo-100 dark:bg-indigo-900/30 p-2">
                  <HelpCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Tips</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Take notes and review the key points to better understanding.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Lesson
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Next Lesson
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonLearning