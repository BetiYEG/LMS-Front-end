// src/pages/MyCourses/MyCourses.jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  Search, 
  Plus, 
  Clock, 
  TrendingUp,
  Calendar,
  CheckCircle,
  PlayCircle,
  ArrowRight,
  Star,
  BookOpen,
  Award,
  Flame,
  Bell,
  X,
  Archive
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export const MyCourses = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  // Mock data
  const courses = [
    {
      id: 1,
      title: 'Misoma Gahumsa Hooggansa Barnootaa-KUTAA-1',
      description: 'Barnoonki kun ogummaa hooggansa barnootaa fi mikeessummaa barnoota mirkaneesuuf gagerra.',
      progress: 75,
      completedLessons: 9,
      totalLessons: 12,
      instructor: 'Chaltu waqo',
      rating: 4.8,
      reviews: 24,
      level: 'Intermediate',
      duration: '18h 34m',
      modules: 12,
      language: 'Oromoo',
      certificate: 'Yes',
      image: '/courses/1.jpg',
      color: 'from-indigo-500 to-purple-500',
      status: 'in-progress',
      streak: 2,
    },
    {
      id: 2,
      title: 'Mobile Video Editing Course',
      description: 'Zero to Hero - Learn mobile video editing from scratch',
      progress: 46,
      completedLessons: 23,
      totalLessons: 50,
      instructor: 'Vijja Academy',
      rating: 4.8,
      reviews: 12000,
      level: 'Intermediate',
      duration: '12h 30m',
      modules: 8,
      language: 'English',
      certificate: 'Yes',
      image: '/courses/2.jpg',
      color: 'from-blue-500 to-cyan-500',
      status: 'in-progress',
      streak: 5,
    },
    {
      id: 3,
      title: 'Dagaagina Ga\'umsa',
      description: 'Dagaagina - Ga\'umsa - Comprehensive learning program',
      progress: 30,
      completedLessons: 15,
      totalLessons: 50,
      instructor: 'Vijja Academy',
      rating: 4.6,
      reviews: 8000,
      level: 'Intermediate',
      duration: '8h 45m',
      modules: 6,
      language: 'Oromoo',
      certificate: 'Yes',
      image: '/courses/3.jpg',
      color: 'from-purple-500 to-pink-500',
      status: 'in-progress',
      streak: 1,
    },
  ]

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`)
  }

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Learning
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Track your progress and continue learning
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all">All courses</TabsTrigger>
            <TabsTrigger value="list">My List</TabsTrigger>
            <TabsTrigger value="whitelist">Whitelist</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Learning tools
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search for courses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <TabsContent value="all" className="space-y-6">
          {/* Streak Card */}
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Flame className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Start a weekly streak</h3>
                    <p className="text-white/80 text-sm">
                      One ring down! Now, watch your course(s)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-xs text-white/80">weeks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">🔥</p>
                    <p className="text-xs text-white/80">Current streak</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Learning */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Schedule learning time
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                      decades, but also the leap into electronic typesetting, running essentially unchanged. 
                      It was popularised thanks to these sheets.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        3/10 course min
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        2/1 visit
                      </span>
                      <span className="text-xs text-gray-400">
                        jun 13-20
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue Learning Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Continue learning
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <Card 
                  key={course.id} 
                  className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl overflow-hidden group cursor-pointer"
                  onClick={() => handleCourseClick(course.id)}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Thumbnail */}
                      <div className={`md:w-48 h-48 md:h-auto bg-gradient-to-br ${course.color} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-white/90 text-gray-700">
                            {course.progress}% complete
                          </Badge>
                        </div>
                        <div className="absolute bottom-2 left-2">
                          <Badge variant="secondary" className="bg-white/90 text-gray-700">
                            {course.level}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                              {course.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {course.instructor}
                            </p>
                          </div>
                          {course.streak && (
                            <Badge variant="outline" className="text-orange-500 border-orange-200">
                              <Flame className="h-3 w-3 mr-1" />
                              {course.streak} week streak
                            </Badge>
                          )}
                        </div>
                        
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-300">
                              {course.completedLessons}/{course.totalLessons} lessons
                            </span>
                            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                              {course.progress}% complete
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {course.rating}
                            </span>
                            <span>({course.reviews})</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {course.duration}
                            </span>
                          </div>
                          <Button 
                            size="sm" 
                            className="gap-2"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCourseClick(course.id)
                            }}
                          >
                            Continue
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              My List
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Courses you've saved to your list will appear here.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="whitelist">
          <div className="text-center py-12">
            <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Whitelist
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Courses you've whitelisted will appear here.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="archived">
          <div className="text-center py-12">
            <Archive className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Archived
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Archived courses will appear here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MyCourses