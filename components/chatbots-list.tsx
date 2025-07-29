"use client"

import * as React from "react"
import { format } from "date-fns"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  SearchIcon,
  BarChart3Icon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ChatbotsListProps {
  chatbots: any[]
  onSelectCustomer: (customerId: string) => void
}

export function ChatbotsList({ chatbots, onSelectCustomer }: ChatbotsListProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 10

  // Filter chatbots based on search term and status
  const filteredChatbots = React.useMemo(() => {
    return chatbots.filter((chatbot) => {
      const matchesSearch =
        chatbot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chatbot.chatbotId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chatbot.customerName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && chatbot.isActive) ||
        (statusFilter === "inactive" && !chatbot.isActive)

      return matchesSearch && matchesStatus
    })
  }, [chatbots, searchTerm, statusFilter])

  // Pagination
  const totalPages = Math.ceil(filteredChatbots.length / itemsPerPage)
  const paginatedChatbots = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredChatbots.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredChatbots, currentPage])

  // Format number with commas
  const formatNumber = (num = 0) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chatbots..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Chatbots</SelectItem>
            <SelectItem value="active">Active Only</SelectItem>
            <SelectItem value="inactive">Inactive Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chatbot Name</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Messages</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedChatbots.length > 0 ? (
                paginatedChatbots.map((chatbot) => (
                  <TableRow key={`${chatbot.customerId}-${chatbot.id}`} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{chatbot.name}</TableCell>
                    <TableCell>{chatbot.chatbotId}</TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        className="p-0 h-auto font-normal"
                        onClick={() => onSelectCustomer(chatbot.customerId)}
                      >
                        {chatbot.customerName}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          chatbot.isActive
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {chatbot.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell>{formatNumber(chatbot.messageCount)}</TableCell>
                    <TableCell>{chatbot.lastActive ? format(chatbot.lastActive, "MMM d, yyyy") : "N/A"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <BarChart3Icon className="h-4 w-4 mr-1" />
                        Stats
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No chatbots found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t px-4 py-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to{" "}
              <strong>{Math.min(currentPage * itemsPerPage, filteredChatbots.length)}</strong> of{" "}
              <strong>{filteredChatbots.length}</strong> chatbots
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                <ChevronsLeftIcon className="h-4 w-4" />
                <span className="sr-only">First page</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <div className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRightIcon className="h-4 w-4" />
                <span className="sr-only">Last page</span>
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
