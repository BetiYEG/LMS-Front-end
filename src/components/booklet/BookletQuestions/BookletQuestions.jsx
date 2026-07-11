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
  X,
  FileText,
  Download,
  Printer
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export const BookletQuestions = ({
  questions,
  bookletInfo,
  onSubmit,
  onComplete,
  timeLimit,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [markedForReview, setMarkedForReview] = useState(new Set())
  const [showAnswer, setShowAnswer] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(timeLimit || 3600) // 1 hour default
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState('questions')

  // Mock questions - replace with actual data
  const bookletQuestions = questions || [
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
      type: 'multiple-choice',
      marks: 1,
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
      type: 'multiple-choice',
      marks: 1,
    },
    {
      id: 3,
      question: 'Barnoota keessatti maalif qorannoon barbaachisaa dha?',
      options: [
        'A. Barattoonni beekumsa argatan mirkanessuuf',
        'B. Barnoota fooyyessuuf',
        'C. Barattoonni hubannoo qabaachuu mirkanessuuf',
        'D. Hunduu isaanii'
      ],
      correct: 3,
      explanation: 'Qorannoon beekumsa argachuu, barnoota fooyyessuu fi hubannoo qabaachuuf barbaachisaa dha.',
      type: 'multiple-choice',
      marks: 1,
    },
    {
      id: 4,
      question: 'Barnoota keessatti maalif qorannoon barbaachisaa dha?',
      options: [
        'A. Barattoonni beekumsa argatan mirkanessuuf',
        'B. Barnoota fooyyessuuf',
        'C. Barattoonni hubannoo qabaachuu mirkanessuuf',
        'D. Hunduu isaanii'
      ],
      correct: 3,
      explanation: 'Qorannoon beekumsa argachuu, barnoota fooyyessuu fi hubannoo qabaachuuf barbaachisaa dha.',
      type: 'multiple-choice',
      marks: 1,
    },
    {
      id: 5,
      question: 'Barnoota keessatti maalif qorannoon barbaachisaa dha?',
      options: [
        'A. Barattoonni beekumsa argatan mirkanessuuf',
        'B. Barnoota fooyyessuuf',
        'C. Barattoonni hubannoo qabaachuu mirkanessuuf',
        'D. Hunduu isaanii'
      ],
      correct: 3,
      explanation: 'Qorannoon beekumsa argachuu, barnoota fooyyessuu fi hubannoo qabaachuuf barbaachisaa dha.',
      type: 'multiple-choice',
      marks: 1,
    },
    {
      id: 6,
      question: 'Barnoota keessatti maalif qorannoon barbaachisaa dha?',
      options: [
        'A. Barattoonni beekumsa argatan mirkanessuuf',
        'B. Barnoota fooyyessuuf',
        'C. Barattoonni hubannoo qabaachuu mirkanessuuf',
        'D. Hunduu isaanii'
      ],
      correct: 3,
      explanation: 'Qorannoon beekumsa argachuu, barnoota fooyyessuu fi hubannoo qabaachuuf barbaachisaa dha.',
      type: 'multiple-choice',
      marks: 1,
    },
  ]

  const totalQuestions = bookletQuestions.length
  const currentQ = bookletQuestions[currentQuestion]
  const selectedAnswer = selectedAnswers[currentQuestion]

  useEffect(() => {
    if (timeLimit && timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeLimit, isSubmitted])

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
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowAnswer(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowAnswer(false)
    }
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    const results = {
      answers: selectedAnswers,
      totalQuestions: totalQuestions,
      answered: Object.keys(selectedAnswers).length,
      markedForReview: markedForReview.size,
    }
    onSubmit?.(results)
    onComplete?.()
  }

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  const getQuestionStatus = (index) => {
    if (selectedAnswers[index] !== undefined) return 'answered'
    if (markedForReview.has(index)) return 'review'
    return 'unanswered'
  }

  const getAnsweredCount = () => Object.keys(selectedAnswers).length
  const getProgress = () => (getAnsweredCount() / totalQuestions) * 100

  // Booklet info
  const info = bookletInfo || {
    title: 'Misooma Gahumsa Hooggansa Barnootaa',
    subject: 'Education',
    totalMarks: 20,
    duration: '1 hour',
    instructions: [
      'Read each question carefully before answering',
      'Select the best answer from the options provided',
      'You can mark questions for review and come back later',
      'Submit your answers when you have completed all questions',
    ],
  }

  return (
    <div className="space-y-6">
      {/* Booklet Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {info.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  {totalQuestions} Questions
                </span>
                <span className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  Total Marks: {info.totalMarks}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {info.duration}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {timeLimit && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className={cn(
                    "font-medium",
                    timeLeft < 300 ? "text-red-500" : "text-gray-700 dark:text-gray-300"
                  )}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
              )}
              <Badge variant="outline" className="text-xs">
                {getAnsweredCount()}/{totalQuestions} Answered
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Area */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
            </TabsList>

            <TabsContent value="questions" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Question {currentQuestion + 1} of {totalQuestions}
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        {Math.round(getProgress())}% Complete
                      </Badge>
                      <span className="text-xs text-gray-400">
                        {currentQ.marks} mark{currentQ.marks > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <Progress value={getProgress()} className="h-1" />
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
                  {showAnswer && (
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
                          Submit Booklet
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
            </TabsContent>

            <TabsContent value="instructions" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {info.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                        <span className="text-indigo-500 font-bold">{index + 1}.</span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                          Important Note
                        </p>
                        <p className="text-sm text-yellow-700 dark:text-yellow-400">
                          Once you submit your answers, you cannot change them. Please review all questions carefully.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - Question Navigator */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Question Navigator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: totalQuestions }, (_, i) => {
                  const status = getQuestionStatus(i)
                  return (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className={cn(
                        "h-10 w-full p-0 text-sm font-medium",
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

          {/* Progress Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Answered</span>
                <span className="font-medium">{getAnsweredCount()}/{totalQuestions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Marked for Review</span>
                <span className="font-medium">{markedForReview.size}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Remaining</span>
                <span className="font-medium">{totalQuestions - getAnsweredCount()}</span>
              </div>
              <Progress value={getProgress()} className="h-2 mt-2" />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print Booklet
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookletQuestions