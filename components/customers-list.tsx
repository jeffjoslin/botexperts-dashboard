"use client"

import * as React from "react"
import { format } from "date-fns"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MessageSquareIcon,
  SearchIcon,
  UserPlusIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CustomerDetails } from "@/components/customer-details"
import { ChatbotsList } from "@/components/chatbots-list"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

// Sample customer data
const initialCustomers = [
  {
    id: "1",
    companyName: "Acme Corporation",
    username: "acmecorp",
    contactName: "John Smith",
    email: "john@acmecorp.com",
    phone: "(555) 123-4567",
    isActive: true,
    activeDate: new Date(2023, 1, 15),
    chatbots: [
      {
        id: "c1",
        name: "Sales Assistant",
        chatbotId: "acme-sales-01",
        activeDate: new Date(2023, 1, 20),
        inactiveDate: undefined,
        isActive: true,
        messageCount: 12450,
        lastActive: new Date(2023, 4, 15),
      },
      {
        id: "c2",
        name: "Support Bot",
        chatbotId: "acme-support-01",
        activeDate: new Date(2023, 2, 10),
        inactiveDate: undefined,
        isActive: true,
        messageCount: 8320,
        lastActive: new Date(2023, 4, 16),
      },
      {
        id: "c3",
        name: "Product Advisor",
        chatbotId: "acme-product-01",
        activeDate: new Date(2023, 3, 5),
        inactiveDate: undefined,
        isActive: true,
        messageCount: 5670,
        lastActive: new Date(2023, 4, 14),
      },
    ],
  },
  {
    id: "2",
    companyName: "Globex Industries",
    username: "globex",
    contactName: "Jane Doe",
    email: "jane@globex.com",
    phone: "(555) 987-6543",
    isActive: true,
    activeDate: new Date(2023, 3, 22),
    chatbots: [
      {
        id: "c4",
        name: "Customer Service",
        chatbotId: "globex-cs-01",
        activeDate: new Date(2023, 3, 25),
        inactiveDate: undefined,
        isActive: true,
        messageCount: 9870,
        lastActive: new Date(2023, 4, 16),
      },
      {
        id: "c5",
        name: "HR Assistant",
        chatbotId: "globex-hr-01",
        activeDate: new Date(2023, 3, 28),
        inactiveDate: undefined,
        isActive: true,
        messageCount: 2340,
        lastActive: new Date(2023, 4, 12),
      },
    ],
  },
  {
    id: "3",
    companyName: "Initech LLC",
    username: "initech",
    contactName: "Michael Bolton",
    email: "michael@initech.com",
    phone: "(555) 456-7890",
    isActive: false,
    activeDate: new Date(2022, 11, 5),
    inactiveDate: new Date(2023, 6, 30),
    chatbots: [
      {
        id: "c6",
        name: "TPS Reports Bot",
        chatbotId: "initech-tps-01",
        activeDate: new Date(2022, 11, 10),
        inactiveDate: new Date(2023, 6, 30),
        isActive: false,
        messageCount: 4560,
        lastActive: new Date(2023, 6, 29),
      },
    ],
  },
  {
    id: "4",
    companyName: "Umbrella Corp",
    username: "umbrella",
    contactName: "Alice Johnson",
    email: "alice@umbrella.com",
    phone: "(555) 222-3333",
    isActive: true,
    activeDate: new Date(2023, 5, 10),
    chatbots: [
      {
        id: "c7",
        name: "Research Assistant",
        chatbotId: "umbrella-research-01",
        activeDate: new Date(2023, 5, 15),
        inactiveDate: undefined,
        isActive: true,
        messageCount: 15670,
        lastActive: new Date(2023, 4, 16),
      },
      {
        id: "c8",
        name: "Security Bot",
        chatbotId: "umbrella-security-01",
        activeDate: new Date(2023, 5, 20),
        inactiveDate: undefined,
        isActive: true,
        messageCount: 8900,
        lastActive: new Date(2023, 4, 15),
      },
      {
        id: "c9",
        name: "Lab Assistant",
        chatbotId: "umbrella-lab-01",
        activeDate: new Date(2023, 5, 25),
        inactiveDate: undefined,
        isActive: true,
        messageCount: 7650,
        lastActive: new Date(2023, 4, 14),
      },
      {
        id: "c10",
        name: "Facility Management",
        chatbotId: "umbrella-facility-01",
        activeDate: new Date(2023, 6, 1),
        inactiveDate: undefined,
        isActive: true,
        messageCount: 3450,
        lastActive: new Date(2023, 4, 13),
      },
      {
        id: "c11",
        name: "HR Bot",
        chatbotId: "umbrella-hr-01",
        activeDate: new Date(2023, 6, 5),
        inactiveDate: undefined,
        isActive: true,
        messageCount: 2100,
        lastActive: new Date(2023, 4, 10),
      },
    ],
  },
  {
    id: "5",
    companyName: "Stark Industries",
    username: "stark",
    contactName: "Tony Stark",
    email: "tony@stark.com",
    phone: "(555) 444-5555",
    isActive: true,
    activeDate: new Date(2023, 2, 8),
    chatbots: [
      {
        id: "c12",
        name: "JARVIS",
        chatbotId: "stark-jarvis-01",
        activeDate: new Date(2023, 2, 10),
        inactiveDate: undefined,
        isActive: true,
        messageCount: 45670,
        lastActive: new Date(2023, 4, 16),
      },
      {
        id: "c13",
        name: "Customer Support",
        chatbotId: "stark-support-01",
        activeDate: new Date(2023, 2, 15),
        inactiveDate: undefined,
        isActive: true,
        messageCount: 23450,
        lastActive: new Date(2023, 4, 15),
      },
      {
        id: "c14",
        name: "R&D Assistant",
        chatbotId: "stark-rd-01",
        activeDate: new Date(2023, 2, 20),
        inactiveDate: undefined,
        isActive: true,
        messageCount: 18900,
        lastActive: new Date(2023, 4, 14),
      },
      {
        id: "c15",
        name: "Sales Bot",
        chatbotId: "stark-sales-01",
        activeDate: new Date(2023, 3, 1),
        inactiveDate: undefined,
        isActive: true,
        messageCount: 12340,
        lastActive: new Date(2023, 4, 13),
      },
      {
        id: "c16",
        name: "Marketing Assistant",
        chatbotId: "stark-marketing-01",
        activeDate: new Date(2023, 3, 5),
        inactiveDate: undefined,
        isActive: true,
        messageCount: 9870,
        lastActive: new Date(2023, 4, 12),
      },
      {
        id: "c17",
        name: "Inventory Manager",
        chatbotId: "stark-inventory-01",
        activeDate: new Date(2023, 3, 10),
        inactiveDate: undefined,
        isActive: true,
        messageCount: 7650,
        lastActive: new Date(2023, 4, 10),
      },
      {
        id: "c18",
        name: "HR Assistant",
        chatbotId: "stark-hr-01",
        activeDate: new Date(2023, 3, 15),
        inactiveDate: undefined,
        isActive: true,
        messageCount: 5430,
        lastActive: new Date(2023, 4, 9),
      },
    ],
  },
]

export function CustomersList() {
  const [customers, setCustomers] = React.useState(initialCustomers)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [selectedCustomer, setSelectedCustomer] = React.useState<string | null>(null)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)
  const [isAddingCustomer, setIsAddingCustomer] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("customers")
  const [allChatbots, setAllChatbots] = React.useState<any[]>([])
  const itemsPerPage = 10

  // Compute all chatbots across customers
  React.useEffect(() => {
    const chatbots = customers.flatMap((customer) =>
      customer.chatbots.map((chatbot) => ({
        ...chatbot,
        customerName: customer.companyName,
        customerId: customer.id,
      })),
    )
    setAllChatbots(chatbots)
  }, [customers])

  // Filter customers based on search term and status
  const filteredCustomers = React.useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && customer.isActive) ||
        (statusFilter === "inactive" && !customer.isActive)

      return matchesSearch && matchesStatus
    })
  }, [customers, searchTerm, statusFilter])

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const paginatedCustomers = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredCustomers.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredCustomers, currentPage])

  // Handle customer selection
  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomer(customerId)
    setIsDetailOpen(true)
  }

  // Handle customer update
  const handleUpdateCustomer = (updatedCustomer: any) => {
    setCustomers((prev) =>
      prev.map((customer) => (customer.id === updatedCustomer.id ? { ...customer, ...updatedCustomer } : customer)),
    )
    setIsDetailOpen(false)
    toast.success("Customer updated successfully")
  }

  // Handle adding a new customer
  const handleAddCustomer = (newCustomer: any) => {
    const customerWithId = {
      ...newCustomer,
      id: crypto.randomUUID(),
      chatbots: newCustomer.chatbots || [],
    }
    setCustomers((prev) => [...prev, customerWithId])
    setIsAddingCustomer(false)
    toast.success("Customer added successfully")
  }

  return (
    <div className="space-y-4 px-4 lg:px-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <TabsList>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="chatbots">All Chatbots</TabsTrigger>
          </TabsList>
          <Button onClick={() => setIsAddingCustomer(true)} className="gap-1">
            <UserPlusIcon className="h-4 w-4" />
            Add Customer
          </Button>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row mt-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={activeTab === "customers" ? "Search customers..." : "Search chatbots..."}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {activeTab === "customers" && (
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="inactive">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <TabsContent value="customers" className="mt-4">
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Active Since</TableHead>
                    <TableHead>Chatbots</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCustomers.length > 0 ? (
                    paginatedCustomers.map((customer) => (
                      <TableRow
                        key={customer.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleSelectCustomer(customer.id)}
                      >
                        <TableCell className="font-medium">{customer.companyName}</TableCell>
                        <TableCell>{customer.username}</TableCell>
                        <TableCell>{customer.contactName}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              customer.isActive
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                          >
                            {customer.isActive ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {customer.activeDate ? format(customer.activeDate, "MMM d, yyyy") : "N/A"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{customer.chatbots.length}</span>
                            <MessageSquareIcon className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSelectCustomer(customer.id)
                            }}
                          >
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No customers found.
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
                  <strong>{Math.min(currentPage * itemsPerPage, filteredCustomers.length)}</strong> of{" "}
                  <strong>{filteredCustomers.length}</strong> customers
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
        </TabsContent>

        <TabsContent value="chatbots" className="mt-4">
          <ChatbotsList chatbots={allChatbots} onSelectCustomer={handleSelectCustomer} />
        </TabsContent>
      </Tabs>

      {/* Customer Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-h-[90vh] max-w-6xl w-[95vw] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>View and edit customer information</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <CustomerDetails
              customerId={selectedCustomer}
              customer={customers.find((c) => c.id === selectedCustomer)}
              onUpdate={handleUpdateCustomer}
              onCancel={() => setIsDetailOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Add Customer Dialog */}
      <Dialog open={isAddingCustomer} onOpenChange={setIsAddingCustomer}>
        <DialogContent className="max-h-[90vh] max-w-6xl w-[95vw] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>Create a new customer account</DialogDescription>
          </DialogHeader>
          <CustomerDetails
            isNewCustomer={true}
            onSave={handleAddCustomer}
            onCancel={() => setIsAddingCustomer(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

