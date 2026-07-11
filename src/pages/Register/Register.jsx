import React from 'react'
import { Link } from 'react-router-dom'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { Card, CardContent } from '@/components/ui/card'

export const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src="/logo.png" alt="Logo" className="h-12 w-12" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create Account
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Join us and start learning today
            </p>
          </div>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default Register