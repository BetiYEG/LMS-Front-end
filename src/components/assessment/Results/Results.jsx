import React from 'react'
import { Link } from 'react-router-dom'
import { 
  CheckCircle, 
  XCircle, 
  Award,
  Clock,
  FileQuestion,
  TrendingUp,
  BarChart3,
  Share2,
  Download,
  RotateCcw,
  Home
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export const Results = ({
  results,
  onRetry,
  onShare,
  onDownload,
  onHome,
}) => {
  // Mock results - replace with actual data
  const resultData = results || {
    score: 85,
    totalQuestions: 20,
    correctAnswers: 17,
    wrongAnswers: 3,
    timeTaken: '32:45',
    passingScore: 70,
    isPassed: true,
    answers: [
      { id: 1, isCorrect: true, selected: 1, correct: 1 },
      { id: 2, isCorrect: false, selected: 0, correct: 2 },
      { id: 3, isCorrect: true, selected: 2, correct: 2 },
      // ... more answers
    ],
    feedback: 'Great job! You have a strong understanding of the material.',
    suggestions: [
      'Review Chapter 2 for better understanding',
      'Practice more with similar questions',
      'Focus on key concepts in Section 3'
    ]
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400'
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getScoreBackground = (score) => {
    if (score >= 80) return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
    if (score >= 60) return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
    return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
  }

  const stats = [
    {
      icon: FileQuestion,
      label: 'Total Questions',
      value: resultData.totalQuestions,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: CheckCircle,
      label: 'Correct Answers',
      value: resultData.correctAnswers,
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      icon: XCircle,
      label: 'Wrong Answers',
      value: resultData.wrongAnswers,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
    },
    {
      icon: Clock,
      label: 'Time Taken',
      value: resultData.timeTaken,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Assessment Results
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Here's how you performed on this assessment
        </p>
      </div>

      {/* Score Card */}
      <Card className={cn("border-2", getScoreBackground(resultData.score))}>
        <CardContent className="p-6 text-center">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="h-32 w-32 rounded-full border-8 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <span className={cn("text-4xl font-bold", getScoreColor(resultData.score))}>
                    {resultData.score}%
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    {resultData.isPassed ? '✅ Passed' : '❌ Failed'}
                  </span>
                </div>
              </div>
              <div className="absolute -top-2 -right-2">
                <Badge className={cn(
                  resultData.isPassed 
                    ? "bg-green-500" 
                    : "bg-red-500",
                  "text-white"
                )}>
                  {resultData.isPassed ? 'PASSED' : 'FAILED'}
                </Badge>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-600 dark:text-gray-300">
                {resultData.feedback}
              </p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Passing Score: {resultData.passingScore}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={cn("rounded-lg p-2", stat.bg)}>
                    <Icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Answer Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
              Answer Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-300">Correct</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  {resultData.correctAnswers}
                </span>
              </div>
              <Progress 
                value={(resultData.correctAnswers / resultData.totalQuestions) * 100} 
                className="h-2 bg-gray-200 dark:bg-gray-700"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-300">Wrong</span>
                <span className="font-medium text-red-600 dark:text-red-400">
                  {resultData.wrongAnswers}
                </span>
              </div>
              <Progress 
                value={(resultData.wrongAnswers / resultData.totalQuestions) * 100} 
                className="h-2 bg-gray-200 dark:bg-gray-700"
              />
            </div>
          </CardContent>
        </Card>

        {/* Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {resultData.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <span className="mt-1 text-indigo-500">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-3 pt-4">
        <Button variant="outline" onClick={onRetry}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Retry Assessment
        </Button>
        <Button variant="outline" onClick={onShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share Results
        </Button>
        <Button variant="outline" onClick={onDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
        <Button onClick={onHome}>
          <Home className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}

export default Results