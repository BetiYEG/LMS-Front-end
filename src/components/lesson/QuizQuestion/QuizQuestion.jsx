import React, { useState } from 'react'
import { 
  CheckCircle, 
  XCircle, 
  Circle,
  ArrowRight,
  ArrowLeft,
  Clock,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export const QuizQuestion = ({ 
  questions,
  onComplete,
  onNext,
  onPrevious,
  currentIndex = 0,
  timeLimit
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(currentIndex)
  const [timeLeft, setTimeLeft] = useState(timeLimit || 300) // 5 minutes default

  // Mock questions - replace with actual data
  const quizQuestions = questions || [
    {
      id: 1,
      question: 'What is the main purpose of this lesson?',
      options: [
        'To understand basic concepts',
        'To learn advanced techniques',
        'To review previous material',
        'To prepare for the exam'
      ],
      correct: 0,
      explanation: 'The main purpose is to understand the basic concepts covered in this lesson.'
    },
    {
      id: 2,
      question: 'Which of the following is a key concept discussed?',
      options: [
        'Concept A',
        'Concept B',
        'Concept C',
        'All of the above'
      ],
      correct: 3,
      explanation: 'All of the above concepts were discussed in the lesson.'
    },
    {
      id: 3,
      question: 'How does this topic relate to the overall course?',
      options: [
        'It builds on previous lessons',
        'It introduces new concepts',
        'It reviews fundamentals',
        'It prepares for advanced topics'
      ],
      correct: 0,
      explanation: 'This topic builds on the concepts covered in previous lessons.'
    }
  ]

  const totalQuestions = quizQuestions.length
  const currentQ = quizQuestions[currentQuestion]
  const selectedAnswer = selectedAnswers[currentQuestion]
  const isAnswered = selectedAnswer !== undefined

  const handleSelectAnswer = (optionIndex) => {
    if (!showResults) {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion]: optionIndex
      })
    }
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
      onComplete?.()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    quizQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        correct++
      }
    })
    return {
      correct,
      total: totalQuestions,
      percentage: Math.round((correct / totalQuestions) * 100)
    }
  }

  if (showResults) {
    const score = calculateScore()
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {score.percentage}%
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              You got {score.correct} out of {score.total} questions correct
            </p>
            <div className="mt-4">
              <Progress value={score.percentage} className="h-3" />
            </div>
          </div>

          <div className="space-y-4">
            {quizQuestions.map((q, index) => {
              const isCorrect = selectedAnswers[index] === q.correct
              return (
                <div
                  key={index}
                  className={cn(
                    "p-4 rounded-lg border",
                    isCorrect 
                      ? "border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800"
                      : "border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {q.question}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Your answer: {q.options[selectedAnswers[index]]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                          Correct answer: {q.options[q.correct]}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <Button className="w-full" onClick={onComplete}>
            Complete Quiz
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            Question {currentQuestion + 1} of {totalQuestions}
          </CardTitle>
          {timeLimit && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
            </div>
          )}
        </div>
        <Progress 
          value={((currentQuestion + 1) / totalQuestions) * 100} 
          className="h-1" 
        />
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Question */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {currentQ.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            return (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all",
                  isSelected
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                )}
                onClick={() => handleSelectAnswer(index)}
              >
                <div className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full border",
                  isSelected
                    ? "border-indigo-500 bg-indigo-500 text-white"
                    : "border-gray-300 dark:border-gray-600"
                )}>
                  {isSelected && <Circle className="h-3 w-3 fill-current" />}
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  {option}
                </span>
              </div>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isAnswered}
          >
            {currentQuestion === totalQuestions - 1 ? (
              'Submit Quiz'
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-1">
          {quizQuestions.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 w-6 rounded-full transition-colors",
                selectedAnswers[index] !== undefined
                  ? "bg-indigo-500"
                  : "bg-gray-200 dark:bg-gray-700"
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default QuizQuestion