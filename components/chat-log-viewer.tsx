"use client"
import { format } from "date-fns"
import { CalendarIcon, DownloadIcon, UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ChatMessage {
  timestamp: string
  sender: string
  content: string
}

interface ChatLogProps {
  title?: string
  startDate: Date
  lastActive: Date
  messages: ChatMessage[]
  exportDate?: Date
}

export function ChatLogViewer({ title = "Conversation", startDate, lastActive, messages, exportDate }: ChatLogProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Started on {format(startDate, "MM/dd/yyyy, hh:mm a")} PDT</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <DownloadIcon className="h-4 w-4" />
            Export
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Start Date</span>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>{format(startDate, "MM/dd/yyyy, hh:mm a")} PDT</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Last Active</span>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>{format(lastActive, "MM/dd/yyyy, hh:mm a")} PDT</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <UserIcon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{message.sender}</span>
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                </div>
                <div className="text-sm">{message.content}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      {exportDate && (
        <CardFooter className="text-xs text-muted-foreground">
          Exported from MapD Agent on {format(exportDate, "MM/dd/yyyy, hh:mm a")} PDT
        </CardFooter>
      )}
    </Card>
  )
}
