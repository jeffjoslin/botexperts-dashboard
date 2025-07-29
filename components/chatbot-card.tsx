"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"

interface ChatbotCardProps {
  id: string
  name: string
  status: "active" | "inactive"
  messageCount: number
  lastActive: string
}

export function ChatbotCard({ id, name, status, messageCount, lastActive }: ChatbotCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Geometric Icon */}
          <div className="relative">
            {/* Blue 3D Cube */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg transform rotate-12 shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white/30 rounded transform rotate-45"></div>
              </div>
            </div>

            {/* Pink Diamond Shapes */}
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded transform rotate-45 shadow-md">
              <div className="w-full h-full bg-gradient-to-br from-pink-300 to-pink-500 rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-white/40 rounded"></div>
              </div>
            </div>

            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded transform rotate-45 shadow-md">
              <div className="w-full h-full bg-gradient-to-br from-pink-300 to-pink-500 rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-white/40 rounded"></div>
              </div>
            </div>

            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded rotate-45 shadow-md">
              <div className="w-full h-full bg-gradient-to-br from-pink-300 to-pink-500 rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-white/40 rounded"></div>
              </div>
            </div>
          </div>

          {/* Chatbot Name */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center">{name}</h3>

          {/* Status Badge */}
          <Badge
            variant={status === "active" ? "default" : "secondary"}
            className={`${
              status === "active"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
            }`}
          >
            <div className={`w-2 h-2 rounded-full mr-2 ${status === "active" ? "bg-green-500" : "bg-gray-500"}`} />
            {status === "active" ? "Public" : "Private"}
          </Badge>

          {/* Stats */}
          <div className="text-center space-y-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">{messageCount.toLocaleString()} messages</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">Last active: {lastActive}</p>
          </div>
        </div>

        {/* Actions Dropdown */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}
