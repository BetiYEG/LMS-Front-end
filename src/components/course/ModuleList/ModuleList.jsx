import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  ChevronDown, 
  ChevronRight, 
  PlayCircle, 
  Lock, 
  CheckCircle,
  Clock,
  FileText,
  Video,
  FileQuestion,
  Download,
  BookOpen
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const ModuleList = ({ modules, onLessonClick }) => {
  const [expandedModules, setExpandedModules] = useState(new Set([modules?.[0]?.id]))

  const toggleModule = (moduleId) => {
    const newExpanded = new Set(expandedModules)
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId)
    } else {
      newExpanded.add(moduleId)
    }
    setExpandedModules(newExpanded)
  }

  const getLessonIcon = (type) => {
    const icons = {
      video: Video,
      reading: FileText,
      quiz: FileQuestion,
      assignment: Download,
      pdf: FileText,
    }
    const Icon = icons[type] || BookOpen
    return Icon
  }

  const getStatusIcon = (lesson) => {
    if (lesson.locked) {
      return <Lock className="h-4 w-4 text-gray-400" />
    }
    if (lesson.completed) {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    }
    return <PlayCircle className="h-4 w-4 text-indigo-500" />
  }

  if (!modules || modules.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500 dark:text-gray-400">
          No modules available
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          {modules.map((module) => {
            const isExpanded = expandedModules.has(module.id)
            const completedLessons = module.lessons?.filter(l => l.completed).length || 0
            const totalLessons = module.lessons?.length || 0
            const moduleProgress = totalLessons > 0 
              ? Math.round((completedLessons / totalLessons) * 100) 
              : 0

            return (
              <div key={module.id} className="border rounded-lg overflow-hidden">
                {/* Module Header */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <button className="text-gray-500">
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                    </button>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {module.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span>{totalLessons} Lessons</span>
                        <span>•</span>
                        <span>{module.duration || '2h 30m'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:block">
                      <Progress value={moduleProgress} className="h-2 w-24" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {moduleProgress}%
                    </Badge>
                  </div>
                </div>

                {/* Module Lessons */}
                {isExpanded && (
                  <div className="border-t divide-y">
                    {module.lessons?.map((lesson, index) => {
                      const Icon = getLessonIcon(lesson.type)
                      const StatusIcon = getStatusIcon(lesson)

                      return (
                        <div
                          key={lesson.id}
                          className={cn(
                            "flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer",
                            lesson.completed && "bg-green-50 dark:bg-green-900/10"
                          )}
                          onClick={() => !lesson.locked && onLessonClick?.(lesson.id)}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-xs text-gray-400 w-6">
                              {index + 1}
                            </span>
                            {StatusIcon}
                            <Icon className="h-4 w-4 text-gray-400" />
                            <span className={cn(
                              "text-sm",
                              lesson.completed 
                                ? "text-gray-600 dark:text-gray-400" 
                                : "text-gray-700 dark:text-gray-300"
                            )}>
                              {lesson.title}
                            </span>
                            {lesson.locked && (
                              <Badge variant="secondary" className="text-xs">
                                Locked
                              </Badge>
                            )}
                            {lesson.completed && (
                              <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                                Completed
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-400">
                              {lesson.duration || '15 min'}
                            </span>
                            {!lesson.locked && !lesson.completed && (
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <PlayCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default ModuleList