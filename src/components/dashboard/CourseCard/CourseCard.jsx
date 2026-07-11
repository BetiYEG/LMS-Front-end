import React from 'react'
import { Progress } from '@/components/ui/progress'
import { ArrowRight } from 'lucide-react'

const CourseCard = ({ course, type = 'continue' }) => {
  const { title, subtitle, description, instructor, progress, rating } = course

  if (type === 'continue') {
    return (
      <div className="rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
        
        {/* Description & Instructor */}
        <div className="mt-3 space-y-0.5">
          <p className="text-sm text-gray-600">{description}</p>
          <p className="text-sm text-[#5B3CC4] font-medium">{instructor}</p>
        </div>
        
        {/* Progress */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-sm font-medium text-gray-700">{progress}% complete</span>
            <Progress value={progress} className="flex-1 h-2 bg-gray-200" />
          </div>
          <button className="flex items-center gap-1 text-sm font-medium text-[#5B3CC4] hover:text-[#4C31AE] whitespace-nowrap ml-3">
            Continue
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    )
  }

  // Recommended course card
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
        
        {/* Description */}
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        
        {/* Instructor & Rating */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-[#5B3CC4] font-medium">{instructor}</span>
          {rating && (
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-700">{rating}</span>
              <span className="text-yellow-400">★</span>
              <span className="text-xs text-gray-400">(12k)</span>
            </div>
          )}
        </div>
        
        {/* Button */}
        <button className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#F3F0FF] py-2.5 text-sm font-medium text-[#5B3CC4] hover:bg-[#E8E3FF] transition-colors">
          View Course
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default CourseCard