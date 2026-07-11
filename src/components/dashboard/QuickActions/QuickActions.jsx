// src/components/dashboard/QuickActions/QuickActions.jsx
import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight,
  Star,
  PlayCircle,
  BookOpen,
  GraduationCap,
  X
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { VideoPlayer } from '../VideoPlayer'  // ← Updated import path
import photo1 from '@/assets/images/auth/photo1.png'

// ... rest of your component code remains the same
export const QuickActions = ({ courses }) => {
  const [activeVideo, setActiveVideo] = useState(null)

  const continueCourses = [
    {
      id: 1,
      title: 'Maala Leenjii fi Barnootaa',
      subtitle: 'Zero to Hero',
      description: 'Dagaagina Ga\'umsa',
      progress: 18,
      instructor: 'Vijja Academy',
      color: 'from-indigo-500 to-purple-500',
      icon: PlayCircle,
      image: photo1,
      video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 2,
      title: 'Dagaagina Ga\'umsa',
      subtitle: 'Dagaagina - Ga\'umsa',
      description: 'Dagaagina - Ga\'umsaasaaa',
      progress: 30,
      instructor: 'Vijja Academy',
      color: 'from-blue-500 to-cyan-500',
      icon: BookOpen,
      image: photo1,
      video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 3,
      title: 'Dagaagina Ga\'umsa',
      subtitle: 'Dagaagina - Ga\'umsa',
      description: 'Dagaagina - Ga\'umsaasaaa',
      progress: 45,
      instructor: 'Vijja Academy',
      color: 'from-purple-500 to-pink-500',
      icon: GraduationCap,
      image: photo1,
      video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
  ]

  const recommendedCourses = [
    {
      id: 1,
      title: 'Dagaagina Ga\'umsa',
      subtitle: 'Dagaagina - Ga\'umsa',
      instructor: 'Vijja Academy',
      rating: 4.8,
      reviews: '12k',
      image: photo1,
    },
    {
      id: 2,
      title: 'Dagaagina Ga\'umsa',
      subtitle: 'Dagaagina - Ga\'umsa',
      instructor: 'Vijja Academy',
      rating: 4.8,
      reviews: '12k',
      image: photo1,
    },
    {
      id: 3,
      title: 'Dagaagina Ga\'umsa',
      subtitle: 'Dagaagina - Ga\'umsa',
      instructor: 'Vijja Academy',
      rating: 4.8,
      reviews: '12k',
      image: photo1,
    },
  ]

  const handlePlayVideo = (course) => {
    setActiveVideo(course)
  }

  const handleCloseVideo = () => {
    setActiveVideo(null)
  }

  return (
    <div className="space-y-8">
      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={handleCloseVideo}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="p-4">
              <h3 className="text-white text-lg font-semibold mb-2">
                {activeVideo.title}
              </h3>
              <VideoPlayer 
                src={activeVideo.video}
                title={activeVideo.title}
              />
            </div>
          </div>
        </div>
      )}

      {/* Continue Learning - 3 Cards */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Continue Learning
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {continueCourses.map((course) => {
            const Icon = course.icon
            return (
              <Card 
                key={course.id} 
                className="shadow-lg hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl overflow-hidden group hover:-translate-y-1 cursor-pointer"
                onClick={() => handlePlayVideo(course)}
              >
                <CardContent className="p-0">
                  {/* Video Thumbnail with Play Button */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors flex items-center justify-center">
                        <PlayCircle className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      05:24 / 22:35
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      1.25x
                    </div>
                  </div>
                  <div className="p-5">
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-3`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {course.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {course.subtitle}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-1">
                      {course.description}
                    </p>
                    <div className="mt-3 space-y-2">
                      <span className="text-xs text-gray-400 block">
                        {course.instructor}
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                          <div 
                            className="h-1.5 rounded-full bg-indigo-600 transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          {course.progress}%
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4 w-full gap-2 border-gray-300 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-400"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePlayVideo(course)
                      }}
                    >
                      Continue
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recommended Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recommended for you
          </h2>
          <Link to="/explore" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View all activity →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.map((course) => (
            <Card 
              key={course.id} 
              className="shadow-lg hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl overflow-hidden cursor-pointer group hover:-translate-y-1"
            >
              <CardContent className="p-0">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {course.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {course.subtitle}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {course.instructor}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {course.rating}
                      </span>
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-400">
                        ({course.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuickActions