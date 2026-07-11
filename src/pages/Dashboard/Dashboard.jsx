// src/pages/Dashboard/Dashboard.jsx
import React from 'react'
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { RecentActivities } from '@/components/dashboard/RecentActivities'

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <WelcomeBanner />
      <QuickActions />
      <RecentActivities />
    </div>
  )
}

export default Dashboard