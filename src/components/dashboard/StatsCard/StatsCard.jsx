import React from 'react'
import { cn } from '@/lib/utils'

const StatsCard = ({ label, value, icon: Icon, color = 'purple' }) => {
  const colorClasses = {
    purple: 'bg-purple-50 text-[#5B3CC4]',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={cn("rounded-xl p-3", colorClasses[color])}>
          {Icon && <Icon size={24} />}
        </div>
      </div>
    </div>
  )
}

export default StatsCard