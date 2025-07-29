"use client"

import { useState } from "react"
import { ChatbotCard } from "./chatbot-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const sampleChatbots = [
  {
    id: "1",
    name: "MapD Agent",
    status: "active" as const,
    messageCount: 1247,
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Support Bot",
    status: "active" as const,
    messageCount: 892,
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "Sales Assistant",
    status: "inactive" as const,
    messageCount: 456,
    lastActive: "3 days ago",
  },
  {
    id: "4",
    name: "FAQ Helper",
    status: "active" as const,
    messageCount: 2103,
    lastActive: "5 minutes ago",
  },
]

export function ChatbotsGrid() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredChatbots = sampleChatbots.filter((chatbot) => {
    const matchesSearch = chatbot.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || chatbot.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Chatbots</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and monitor your chatbots</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Chatbot
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search chatbots..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      {filteredChatbots.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredChatbots.map((chatbot) => (
            <ChatbotCard key={chatbot.id} {...chatbot} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Plus className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No chatbots found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Get started by creating your first chatbot"}
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New Chatbot
          </Button>
        </div>
      )}
    </div>
  )
}
