import React, { useState } from 'react'
import { 
  File, 
  Download, 
  Eye, 
  FileText, 
  FileImage,
  FileVideo,
  FileArchive,
  FileCode,
  FileSpreadsheet,
  ChevronDown,
  ChevronUp,
  Search,
  Filter
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export const AttachmentList = ({ 
  attachments,
  title = 'Resources',
  showDownload = true,
  onDownload,
  onPreview 
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [expanded, setExpanded] = useState(true)

  // Mock attachments - replace with actual data
  const resourceData = attachments || [
    { 
      id: 1, 
      name: 'Barnootaa_Maala_Leenjii.pdf', 
      size: '12MB', 
      type: 'PDF',
      uploadedAt: 'May 8, 2024',
      icon: FileText
    },
    { 
      id: 2, 
      name: 'Barnootaa_Maala_Leenjii.pdf', 
      size: '13MB', 
      type: 'PDF',
      uploadedAt: 'May 8, 2024',
      icon: FileText
    },
    { 
      id: 3, 
      name: 'Barnootaa_Maala_Leenjii.pdf', 
      size: '12MB', 
      type: 'PDF',
      uploadedAt: 'May 8, 2024',
      icon: FileText
    },
    { 
      id: 4, 
      name: 'Video_Lesson_1.mp4', 
      size: '245MB', 
      type: 'Video',
      uploadedAt: 'May 7, 2024',
      icon: FileVideo
    },
    { 
      id: 5, 
      name: 'Lesson_Notes.docx', 
      size: '2.4MB', 
      type: 'Document',
      uploadedAt: 'May 7, 2024',
      icon: FileText
    }
  ]

  const getFileIcon = (type) => {
    const icons = {
      'PDF': FileText,
      'Video': FileVideo,
      'Document': FileText,
      'Image': FileImage,
      'Archive': FileArchive,
      'Code': FileCode,
      'Spreadsheet': FileSpreadsheet,
    }
    return icons[type] || File
  }

  const getFileColor = (type) => {
    const colors = {
      'PDF': 'text-red-500',
      'Video': 'text-blue-500',
      'Document': 'text-indigo-500',
      'Image': 'text-green-500',
      'Archive': 'text-orange-500',
      'Code': 'text-purple-500',
      'Spreadsheet': 'text-emerald-500',
    }
    return colors[type] || 'text-gray-500'
  }

  const filteredAttachments = resourceData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDownload = (item) => {
    onDownload?.(item)
    // Simulate download
    console.log('Downloading:', item.name)
  }

  const handlePreview = (item) => {
    onPreview?.(item)
    console.log('Previewing:', item.name)
  }

  if (!resourceData || resourceData.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500 dark:text-gray-400">
          No resources available
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <File className="h-5 w-5 text-indigo-600" />
            {title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {expanded && (
          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search resources..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Badge variant="outline" className="self-start">
              {filteredAttachments.length} files
            </Badge>
          </div>
        )}
      </CardHeader>

      {expanded && (
        <CardContent>
          <div className="space-y-2">
            {filteredAttachments.map((item) => {
              const Icon = getFileIcon(item.type)
              const color = getFileColor(item.type)
              
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={cn(
                      "rounded-lg p-2 bg-gray-100 dark:bg-gray-800",
                      color
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span>{item.size}</span>
                        <span>•</span>
                        <span>{item.type}</span>
                        <span>•</span>
                        <span>Uploaded: {item.uploadedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handlePreview(item)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {showDownload && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-indigo-600 hover:text-indigo-700"
                        onClick={() => handleDownload(item)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {filteredAttachments.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No resources found matching your search
            </div>
          )}

          {/* Tips Section */}
          <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-indigo-100 dark:bg-indigo-900/30 p-2">
                <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Tips</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Take notes and review the key points to better understand.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default AttachmentList