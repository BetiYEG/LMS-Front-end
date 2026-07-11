import React from 'react'
import CourseCard from '../CourseCard'

const CourseGrid = ({ courses, type = 'continue', title = 'Continue Learning', onViewAll }) => {
  if (!courses || courses.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-gray-500">No courses available</p>
      </div>
    )
  }

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          {title}
        </h2>
        <button 
          onClick={onViewAll}
          className="text-[#5B3CC4] font-semibold hover:underline text-sm"
        >
          View All →
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} type={type} />
        ))}
      </div>
    </div>
  )
}

export default CourseGrid