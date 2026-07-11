// src/components/dashboard/WelcomeBanner/WelcomeBanner.jsx
import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import photo1 from '@/assets/images/auth/photo1.png'

export const WelcomeBanner = ({ user }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${photo1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Decorative circles */}
      <div className="absolute right-0 top-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-white/5" />
      
      <div className="relative z-10">
        <p className="text-sm font-medium text-white/80">LMS Platform</p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          Welcome back, {user?.name || 'Abbee'} 👋
        </h1>
        <p className="mt-2 text-white/80 text-lg max-w-2xl">
          Keep going! You are doing great. Continue learning and complete your courses.
        </p>
        
        <Button className="mt-4 bg-white text-indigo-600 hover:bg-white/90 font-medium">
          Continue learning
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default WelcomeBanner