import React, { useState, useEffect } from 'react'
import { 
  CheckCircle, 
  XCircle, 
  Circle,
  AlertCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Flag,
  Bookmark,
  Check,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { AttachmentList } from '@/components/lesson/AttachmentList'

export const Question = ({
  questions,
  currentIndex = 0,
  onNext,
  onPrevious,
  onSubmit,
  onMarkForReview,
  timeLimit,
  showExplanation = true,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [markedForReview, setMarkedForReview] = useState(new Set())
  const [showAnswer, setShowAnswer] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(currentIndex)
  const [timeLeft, setTimeLeft] = useState(timeLimit || 1800) // 30 minutes default
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Mock questions - replace with actual data
  const assessmentQuestions = questions || [
    {
      id: 1,
      question: 'Qereqnyga barnootaa sirna barnootaa keessatti maal faayidaa qaba?',
      options: [
        'A. Barattoonni ogumma fi beekumsa argatan mirkanessuu',
        'B. Barattoonni sirritti hubannoo akka qaban hunda\'uu fi fooyyessuu',
        'C. Barnoonni sirritti kennamuu issa mirkanessuu qofa',
        'D. Gorattootaaf qofa odeeffannoo kennuu'
      ],
      correct: 1,
      explanation: 'Qereqnyga barnootaa barattoota hubannoo fi ogummaa isaanni fooyyessuuf gargaara.',
      userAnswer: null,
      isCorrect: false,
    },
    {
      id: 2,
      question: 'Barnoota keessatti maalif qorannoon barbaachisaa dha?',
      options: [
        'A. Barattoonni beekumsa argatan mirkanessuuf',
        'B. Barnoota fooyyessuuf',
        'C. Barattoonni hubannoo qabaachuu mirkanessuuf',
        'D. Hunduu isaanii'
      ],
      correct: 3,
      explanation: 'Qorannoon beekumsa argachuu, barnoota fooyyessuu fi hubannoo qabaachuuf barbaachisaa dha.',
      userAnswer: null,
      isCorrect: false,
    }
  ]

  const totalQuestions = assessmentQuestions.length
  const currentQ = assessmentQuestions[currentQuestion]
  const selectedAnswer = selectedAnswers[currentQuestion]

  useEffect(() => {
    if (timeLimit && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeLimit])

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hrs > 0) {
      return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const handleSelectAnswer = (optionIndex) => {
    if (!isSubmitted) {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion]: optionIndex
      })
      // Update question with user answer
      const updatedQuestions = [...assessmentQuestions]
      updatedQuestions[currentQuestion].userAnswer = optionIndex
    }
  }

  const handleMarkForReview = () => {
    const newMarked = new Set(markedForReview)
    if (newMarked.has(currentQuestion)) {
      newMarked.delete(currentQuestion)
    } else {
      newMarked.add(currentQuestion)
    }
    setMarkedForReview(newMarked)
    onMarkForReview?.(currentQuestion)
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowAnswer(false)
    }
    onNext?.(currentQuestion)
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowAnswer(false)
    }
    onPrevious?.(currentQuestion)
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    onSubmit?.(selectedAnswers)
  }

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  const getQuestionStatus = (index) => {
    if (selectedAnswers[index] !== undefined) return 'answered'
    if (markedForReview.has(index)) return 'review'
    return 'unanswered'
  }

  // Mock resources
  const resources = [
    { id: 1, name: 'Barmoota_Maala_Leenji.pdf', size: '12MB', type: 'PDF' },
    { id: 2, name: 'Barmoota_Maala_Leenji.pdf', size: '12MB', type: 'DOCX' },
    { id: 3, name: 'Barmoota_Maala_Leenji.pdf', size: '12MB', type: 'PDF' },
  ]

  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Question {currentQuestion + 1} of {totalQuestions}
              </CardTitle>
              <div className="flex items-center gap-4">
                {timeLimit && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className={cn(
                      "font-medium",
                      timeLeft < 300 ? "text-red-500" : "text-gray-600 dark:text-gray-300"
                    )}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                )}
                <Badge variant="outline" className="text-xs">
                  {Math.round(progress)}% Complete
                </Badge>
              </div>
            </div>
            <Progress value={progress} className="h-1" />
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Question Text */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {currentQ.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrect = currentQ.correct === index
                const showCorrect = showAnswer && isCorrect
                const showWrong = showAnswer && isSelected && !isCorrect

                return (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all",
                      isSelected && !showAnswer
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                        : showCorrect
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : showWrong
                        ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                    )}
                    onClick={() => handleSelectAnswer(index)}
                  >
                    <div className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border shrink-0",
                      isSelected && !showAnswer
                        ? "border-indigo-500 bg-indigo-500 text-white"
                        : showCorrect
                        ? "border-green-500 bg-green-500 text-white"
                        : showWrong
                        ? "border-red-500 bg-red-500 text-white"
                        : "border-gray-300 dark:border-gray-600"
                    )}>
                      {isSelected && !showAnswer && <Circle className="h-3 w-3 fill-current" />}
                      {showCorrect && <Check className="h-3 w-3" />}
                      {showWrong && <X className="h-3 w-3" />}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {option}
                    </span>
                    {showCorrect && (
                      <Badge className="ml-auto bg-green-500 text-white">Correct</Badge>
                    )}
                    {showWrong && (
                      <Badge className="ml-auto bg-red-500 text-white">Incorrect</Badge>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Explanation */}
            {showAnswer && showExplanation && (
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-1.5">
                    <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Explanation
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkForReview}
                  className={cn(
                    markedForReview.has(currentQuestion) && "bg-yellow-50 border-yellow-500 text-yellow-700 dark:bg-yellow-900/20"
                  )}
                >
                  <Flag className={cn(
                    "mr-2 h-4 w-4",
                    markedForReview.has(currentQuestion) && "fill-yellow-500 text-yellow-500"
                  )} />
                  {markedForReview.has(currentQuestion) ? 'Unmark' : 'Mark for Review'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShowAnswer}
                >
                  {showAnswer ? 'Hide' : 'Show'} Answer
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                {currentQuestion === totalQuestions - 1 ? (
                  <Button onClick={handleSubmit}>
                    Submit Assessment
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <AttachmentList attachments={resources} title="Resources" />
      </div>

      {/* Sidebar - Question Navigator */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Question Navigator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: totalQuestions }, (_, i) => {
                const status = getQuestionStatus(i)
                return (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-10 w-10 p-0 text-sm font-medium",
                      i === currentQuestion && "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20",
                      status === 'answered' && "bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20",
                      status === 'review' && "bg-yellow-50 border-yellow-500 text-yellow-700 dark:bg-yellow-900/20",
                      status === 'unanswered' && i !== currentQuestion && "bg-gray-50 dark:bg-gray-800"
                    )}
                    onClick={() => setCurrentQuestion(i)}
                  >
                    {i + 1}
                  </Button>
                )
              })}
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-gray-600 dark:text-gray-400">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="text-gray-600 dark:text-gray-400">Marked for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600" />
                <span className="text-gray-600 dark:text-gray-400">Unanswered</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Quiz Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {Math.round(progress)}%
            </div>
            <Progress value={progress} className="h-2 mt-2" />
            <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{Object.keys(selectedAnswers).length} Answered</span>
              <span>{markedForReview.size} Reviewed</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Question