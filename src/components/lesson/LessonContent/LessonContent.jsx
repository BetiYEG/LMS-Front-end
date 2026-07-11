import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Clock, 
  FileText,
  Video,
  FileQuestion,
  Download,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  HelpCircle,
  CheckCircle,
  PlayCircle,
  Settings,
  Info,
  File
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { VideoPlayer } from '../VideoPlayer'
import { TextContent } from '../TextContent'
import { AttachmentList } from '../AttachmentList'
import { cn } from '@/lib/utils'

export const LessonContent = ({ 
  lesson, 
  course,
  onNext,
  onPrevious,
  onComplete,
}) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showSidebar, setShowSidebar] = useState(true)
  const navigate = useNavigate()

  // Mock lesson data - replace with actual data
  const lessonData = {
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
  }

  const courseModules = [
    { id: 1, title: 'Sezona', lessons: 6, completed: 5, active: false },
    { id: 2, title: 'Kutaa 1-3 Hoppaava Imasarttavaa', lessons: 8, completed: 3, active: false },
    { id: 3, title: 'Kutaa 2-3 Hoppaava Imasarttavaa', lessons: 7, completed: 0, active: true },
    { id: 4, title: 'Kutaa 3-3 Hoppaava Imasarttavaa', lessons: 6, completed: 0, active: false },
  ]

  return (
    <div className="flex h-full min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <div className={cn(
        "fixed lg:relative z-20 w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto transition-transform duration-300",
        showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-0 lg:border-0"
      )}>
        <div className="p-4">
          {/* Course Title */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Course Content
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {course?.title || 'Misooma Gahumsa Hooggansa Barnootaa'}
            </p>
          </div>

          {/* Progress Summary */}
          <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Progress</span>
              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                {lessonData.completedLessons}/{lessonData.totalLessons} lessons
              </span>
            </div>
            <Progress value={(lessonData.completedLessons / lessonData.totalLessons) * 100} className="h-2 mt-1" />
          </div>

          {/* Module List */}
          <div className="space-y-2">
            {courseModules.map((module) => (
              <div key={module.id} className="border rounded-lg overflow-hidden">
                <div className={cn(
                  "flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800",
                  module.active && "bg-indigo-50 dark:bg-indigo-900/20"
                )}>
                  <div className="flex items-center gap-2">
                    {module.completed === module.lessons ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : module.completed > 0 ? (
                      <PlayCircle className="h-4 w-4 text-indigo-500" />
                    ) : (
                      <BookOpen className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {module.title}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {module.completed}/{module.lessons}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Link to="/my-courses" className="hover:text-primary">My Courses</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/course/1" className="hover:text-primary">Misooma Gahumsa Hooggansa Barnootaa</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 dark:text-white">Sezona</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 dark:text-white font-medium">
              {lessonData.title}
            </span>
          </div>

          {/* Toggle Sidebar Button */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden mb-4"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? 'Hide' : 'Show'} Course Content
          </Button>

          {/* Lesson Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {lessonData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {lessonData.duration}
              </span>
              <span className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                {lessonData.videoQuality}
              </span>
              <span className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                Last Update: {lessonData.lastUpdate}
              </span>
            </div>
          </div>

          {/* Video Player */}
          <div className="mb-6">
            <VideoPlayer 
              src="https://example.com/video.mp4"
              title={lessonData.title}
            />
          </div>

          {/* Lesson Info Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* About this lesson */}
              <Card>
                <CardHeader>
                  <CardTitle>About this lesson</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    {lessonData.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 dark:text-gray-400">Level:</span>
                      <Badge>Intermediate</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                      <span className="text-gray-700 dark:text-gray-300">{lessonData.duration}</span>
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
                    {lessonData.content.overview.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Your Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300 italic">
                        "{lessonData.notes}"
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        {lessonData.completedLessons}/{lessonData.totalLessons} lessons completed
                      </span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        You are doing great! ✨
                      </Badge>
                    </div>
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
          <div className="mb-6">
            <AttachmentList attachments={lessonData.resources} />
          </div>

          {/* Need Help */}
          <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Need help?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Dhuuga gaaha qabaachuu yoo doone, nu quunnaama
                    </p>
                  </div>
                </div>
                <Button className="shrink-0">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onPrevious}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous Lesson
            </Button>
            <div className="flex gap-2">
              {!lessonData.completed && (
                <Button variant="outline" onClick={onComplete}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Complete
                </Button>
              )}
              <Button onClick={onNext}>
                Next Lesson
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonContent