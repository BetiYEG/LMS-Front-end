import React, { useState } from 'react'
import { 
  BookOpen, 
  CheckCircle, 
  Circle, 
  ChevronDown,
  ChevronUp,
  FileText,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export const TextContent = ({ 
  content,
  title,
  onComplete,
  progress 
}) => {
  const [expandedSections, setExpandedSections] = useState(new Set([0]))

  const toggleSection = (index) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedSections(newExpanded)
  }

  // Mock content structure
  const sections = content || [
    {
      title: 'Introduction',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Key Concepts',
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      title: 'Summary',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title || 'Text Content'}
        </h2>
        {progress !== undefined && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Progress: {progress}%
            </span>
            <Progress value={progress} className="w-24 h-2" />
          </div>
        )}
      </div>

      <div className="space-y-4">
        {sections.map((section, index) => {
          const isExpanded = expandedSections.has(index)
          return (
            <Card key={index}>
              <CardContent className="p-0">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => toggleSection(index)}
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    )}
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                    {section.completed && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {section.duration || '10 min'}
                  </Badge>
                </div>

                {isExpanded && (
                  <div className="p-4 pt-0 border-t">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                    
                    {section.resources && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Resources:
                        </p>
                        {section.resources.map((resource, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                {resource.name}
                              </span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.quiz && (
                      <div className="mt-4">
                        <Button variant="outline" size="sm">
                          Take Quiz
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {onComplete && (
        <div className="flex justify-end">
          <Button onClick={onComplete}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark as Complete
          </Button>
        </div>
      )}
    </div>
  )
}

export default TextContent