import React from 'react'
import { WelcomeBanner, StatsCard, CourseGrid } from '@/components/dashboard'
import { BookOpen, Award, Clock, TrendingUp } from 'lucide-react'

const Dashboard = () => {
  // Stats data
  const stats = [
    { label: 'Enrolled Courses', value: '12', icon: BookOpen, color: 'purple' },
    { label: 'Hours Watched', value: '48.5', icon: Clock, color: 'blue' },
    { label: 'Achievements', value: '24', icon: Award, color: 'orange' },
    { label: 'Completion Rate', value: '76%', icon: TrendingUp, color: 'green' },
  ]

  // Continue Learning Courses
  const continueLearning = [
    {
      id: 1,
      title: 'Mobile Video Editing Course',
      subtitle: 'Zero to Hero',
      description: 'Dagaagina Ga\'umsa',
      instructor: 'Vega Academy',
      progress: 16,
    },
    {
      id: 2,
      title: 'Dagaagina Ga\'umsa',
      subtitle: 'Dagaagina - Ga\'umsa',
      description: 'Dagaagina - Ga\'umsaasaaa',
      instructor: 'Vega Academy',
      progress: 30,
    },
    {
      id: 3,
      title: 'Misooma Gahumsa Hooggansa',
      subtitle: 'Barnootaa-KUTAA-1',
      description: 'Dagaagina Ga\'umsa',
      instructor: 'Vega Academy',
      progress: 60,
    },
  ]

  // Recommended Courses
  const recommendedCourses = [
    {
      id: 4,
      title: 'Dagaagina Ga\'umsa',
      subtitle: 'Dagaagina - Ga\'umsa',
      description: 'Dagaagina - Ga\'umsa',
      instructor: 'Vega Academy',
      rating: 4.6,
    },
    {
      id: 5,
      title: 'Dagaagina Ga\'umsa',
      subtitle: 'Dagaagina - Ga\'umsa',
      description: 'Dagaagina - Ga\'umsa',
      instructor: 'Vega Academy',
      rating: 4.6,
    },
    {
      id: 6,
      title: 'Dagaagina Ga\'umsa',
      subtitle: 'Dagaagina - Ga\'umsa',
      description: 'Dagaagina - Ga\'umsa',
      instructor: 'Vega Academy',
      rating: 4.6,
    },
  ]

  const handleViewAll = (type) => {
    console.log(`View all ${type} courses`)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
        {/* Welcome Banner */}
        <WelcomeBanner />

        {/* Stats Cards */}
        <section className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </section>

        {/* Continue Learning Section */}
        <section className="mt-8">
          <CourseGrid 
            courses={continueLearning} 
            type="continue" 
            title="Continue Learning"
            onViewAll={() => handleViewAll('continue')}
          />
        </section>

        {/* Recommended Section */}
        <section className="mt-10">
          <CourseGrid 
            courses={recommendedCourses} 
            type="recommended" 
            title="Recommended for you"
            onViewAll={() => handleViewAll('recommended')}
          />
        </section>
      </div>
    </div>
  )
}

export default Dashboard