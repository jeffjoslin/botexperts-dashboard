"use client"

import { DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "lucide-react"

interface Chatbot {
  id: string
  name: string
  status: "active" | "inactive" | "training"
  conversations: number
  lastActive: string
  responseTime: string
  category: string
}

interface AvailableBot {
  id: string
  name: string
  description: string
  category: string
  createdAt: string
  isActive: boolean
}

const availableBots: AvailableBot[] = [
  {
    id: "bot-1",
    name: "Customer Support Bot",
    description: "Handles general customer inquiries and support tickets",
    category: "Support",
    createdAt: "2024-01-15",
    isActive: true,
  },
  {
    id: "bot-2",
    name: "Sales Assistant Bot",
    description: "Helps with product recommendations and sales inquiries",
    category: "Sales",
    createdAt: "2024-01-20",
    isActive: true,
  },
  {
    id: "bot-3",
    name: "Technical Support Bot",
    description: "Provides technical assistance and troubleshooting",
    category: "Technical",
    createdAt: "2024-01-25",
    isActive: true,
  },
  {
    id: "bot-4",
    name: "FAQ Bot",
    description: "Answers frequently asked questions automatically",
    category: "Information",
    createdAt: "2024-02-01",
    isActive: true,
  },
  {
    id: "bot-5",
    name: "Booking Assistant Bot",
    description: "Manages appointments and booking requests",
    category: "Booking",
    createdAt: "2024-02-05",
    isActive: true,
  },
  {
    id: "bot-6",
    name: "Order Tracking Bot",
    description: "Helps customers track their orders and shipments",
    category: "Orders",
    createdAt: "2024-02-10",
    isActive: true,
  },
  {
    id: "bot-7",
    name: "Feedback Collection Bot",
    description: "Collects customer feedback and reviews",
    category: "Feedback",
    createdAt: "2024-02-15",
    isActive: true,
  },
  {
    id: "bot-8",
    name: "Lead Generation Bot",
    description: "Qualifies leads and captures contact information",
    category: "Marketing",
    createdAt: "2024-02-20",
    isActive: true,
  },
  {
    id: "bot-9",
    name: "Product Catalog Bot",
    description: "Provides detailed product information and specifications",
    category: "Information",
    createdAt: "2024-02-25",
    isActive: true,
  },
  {
    id: "bot-10",
    name: "HR Assistant Bot",
    description: "Handles HR inquiries and employee support",
    category: "HR",
    createdAt: "2024-03-01",
    isActive: true,
  },
]

const getCategoryColor = (category: string) => {
  const colors = {
    Support: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    Sales: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Technical: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    Information: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Booking: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    Orders: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    Feedback: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    Marketing: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    HR: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
  }
  return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
}

import * as React from "react"
import {
  BarChart3Icon,
  CalendarIcon,
  PlusIcon,
  TrashIcon,
  MessageSquareIcon,
  LineChartIcon,
  ChevronRightIcon,
  PencilIcon,
  SearchIcon,
} from "lucide-react"
import { format } from "date-fns"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast as sonnerToast } from "sonner"

interface ChatbotEntry {
  id: string
  name: string
  chatbotId: string
  activeDate: Date | undefined
  inactiveDate: Date | undefined
  isActive: boolean
  messageCount?: number
  lastActive?: Date
}

interface AvailableChatbot {
  id: string
  name: string
  description: string
  category: string
  isActive: boolean
  createdDate: Date
}

interface CustomerDetailsProps {
  customerId?: string
  customer?: any
  isNewCustomer?: boolean
  onUpdate?: (customer: any) => void
  onSave?: (customer: any) => void
  onCancel?: () => void
}

// Mock data for available chatbots
const availableChatbots: AvailableChatbot[] = [
  {
    id: "bot-001",
    name: "Customer Support Bot",
    description: "Handles general customer inquiries and support tickets",
    category: "Support",
    isActive: true,
    createdDate: new Date("2024-01-15"),
  },
  {
    id: "bot-002",
    name: "Sales Assistant Bot",
    description: "Helps with product recommendations and sales inquiries",
    category: "Sales",
    isActive: true,
    createdDate: new Date("2024-02-10"),
  },
  {
    id: "bot-003",
    name: "Technical Support Bot",
    description: "Provides technical assistance and troubleshooting",
    category: "Technical",
    isActive: true,
    createdDate: new Date("2024-01-20"),
  },
  {
    id: "bot-004",
    name: "FAQ Bot",
    description: "Answers frequently asked questions",
    category: "Information",
    isActive: true,
    createdDate: new Date("2024-03-05"),
  },
  {
    id: "bot-005",
    name: "Booking Assistant Bot",
    description: "Helps customers with appointments and bookings",
    category: "Booking",
    isActive: true,
    createdDate: new Date("2024-02-28"),
  },
  {
    id: "bot-006",
    name: "Product Catalog Bot",
    description: "Provides product information and catalog browsing",
    category: "Catalog",
    isActive: true,
    createdDate: new Date("2024-03-12"),
  },
  {
    id: "bot-007",
    name: "Order Tracking Bot",
    description: "Helps customers track their orders and shipments",
    category: "Orders",
    isActive: true,
    createdDate: new Date("2024-01-30"),
  },
  {
    id: "bot-008",
    name: "Feedback Collection Bot",
    description: "Collects customer feedback and reviews",
    category: "Feedback",
    isActive: true,
    createdDate: new Date("2024-02-15"),
  },
  {
    id: "bot-009",
    name: "Lead Generation Bot",
    description: "Qualifies leads and collects contact information",
    category: "Marketing",
    isActive: true,
    createdDate: new Date("2024-03-01"),
  },
  {
    id: "bot-010",
    name: "HR Assistant Bot",
    description: "Handles HR inquiries and employee support",
    category: "HR",
    isActive: false,
    createdDate: new Date("2024-01-10"),
  },
]

export function CustomerDetails({
  customerId,
  customer,
  isNewCustomer = false,
  onUpdate,
  onSave,
  onCancel,
}: CustomerDetailsProps) {
  // State for user information
  const [companyName, setCompanyName] = React.useState(customer?.companyName || "")
  const [username, setUsername] = React.useState(customer?.username || "")
  const [firstName, setFirstName] = React.useState(customer?.contactName?.split(" ")[0] || "")
  const [lastName, setLastName] = React.useState(customer?.contactName?.split(" ")[1] || "")
  const [email, setEmail] = React.useState(customer?.email || "")
  const [phone, setPhone] = React.useState(customer?.phone || "")
  const [chatbotAccount, setChatbotAccount] = React.useState(customer?.chatbotAccount || "")
  const [activeDate, setActiveDate] = React.useState<Date | undefined>(customer?.activeDate)
  const [inactiveDate, setInactiveDate] = React.useState<Date | undefined>(customer?.inactiveDate)
  const [isActive, setIsActive] = React.useState(customer?.isActive ?? true)

  // State for chatbot entries
  const [chatbots, setChatbots] = React.useState<ChatbotEntry[]>(customer?.chatbots || [])
  const [showStatusDialog, setShowStatusDialog] = React.useState(false)
  const [currentChatbotIndex, setCurrentChatbotIndex] = React.useState<number | null>(null)
  const [showChatbotsDialog, setShowChatbotsDialog] = React.useState(false)
  const [refreshDialogOpen, setRefreshDialogOpen] = React.useState(false)
  const [refreshChatbotIndex, setRefreshChatbotIndex] = React.useState<number | null>(null)
  const [refreshDate, setRefreshDate] = React.useState<Date>()
  const [refreshTime, setRefreshTime] = React.useState("12:00")
  const [selectedChatbot, setSelectedChatbot] = React.useState<string | null>(null)
  const [showChatbotDetails, setShowChatbotDetails] = React.useState(false)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)
  const [addChatbotOpen, setAddChatbotOpen] = React.useState(false)
  const [editChatbotOpen, setEditChatbotOpen] = React.useState(false)
  const [editingChatbotIndex, setEditingChatbotIndex] = React.useState<number | null>(null)

  // New chatbot form state
  const [newChatbotName, setNewChatbotName] = React.useState("")
  const [newChatbotId, setNewChatbotId] = React.useState("")
  const [newChatbotActive, setNewChatbotActive] = React.useState(true)
  const [newChatbotActiveDate, setNewChatbotActiveDate] = React.useState<Date>(new Date())
  const [newChatbotLastActive, setNewChatbotLastActive] = React.useState<Date>(new Date())

  // State for available chatbots dialog
  const [showAvailableBotsDialog, setShowAvailableBotsDialog] = React.useState(false)
  const [botSearchTerm, setBotSearchTerm] = React.useState("")

  // State for the confirmation dialog
  const [showLastActiveConfirmation, setShowLastActiveConfirmation] = React.useState(false)
  const [pendingActiveState, setPendingActiveState] = React.useState<boolean | null>(null)
  const [isEditMode, setIsEditMode] = React.useState(false)

  // Filter available chatbots based on search term and exclude already added ones
  const filteredAvailableBots = React.useMemo(() => {
    const existingBotIds = chatbots.map((bot) => bot.chatbotId)
    return availableChatbots.filter((bot) => {
      const matchesSearch =
        bot.name.toLowerCase().includes(botSearchTerm.toLowerCase()) ||
        bot.description.toLowerCase().includes(botSearchTerm.toLowerCase()) ||
        bot.category.toLowerCase().includes(botSearchTerm.toLowerCase())
      const notAlreadyAdded = !existingBotIds.includes(bot.id)
      return matchesSearch && notAlreadyAdded && bot.isActive
    })
  }, [botSearchTerm, chatbots])

  // Toggle customer active status
  const handleCustomerStatusChange = (checked: boolean) => {
    setIsActive(checked)
    sonnerToast.success(`Customer ${checked ? "activated" : "deactivated"} successfully`)

    // Update the appropriate date
    if (checked) {
      setActiveDate(new Date())
      setInactiveDate(undefined)
    } else {
      setInactiveDate(new Date())
    }
  }

  // Open add chatbot dialog (now shows available bots)
  const handleOpenAddChatbot = () => {
    setBotSearchTerm("")
    setShowAvailableBotsDialog(true)
  }

  // Add a chatbot from available list
  const handleAddAvailableBot = (availableBot: AvailableChatbot) => {
    const newChatbot: ChatbotEntry = {
      id: crypto.randomUUID(),
      name: availableBot.name,
      chatbotId: availableBot.id,
      activeDate: new Date(),
      inactiveDate: undefined,
      isActive: true,
      messageCount: 0,
      lastActive: new Date(),
    }

    setChatbots([...chatbots, newChatbot])
    sonnerToast.success(`${availableBot.name} added successfully`)
  }

  // Handle chatbot active toggle with confirmation
  const handleChatbotActiveToggle = (checked: boolean) => {
    // If toggling from active to inactive, show confirmation
    if (newChatbotActive && !checked) {
      setPendingActiveState(checked)
      setShowLastActiveConfirmation(true)
    } else {
      // If toggling from inactive to active, just update
      setNewChatbotActive(checked)
    }
  }

  // Handle confirmation dialog response
  const handleLastActiveConfirmation = (confirmed: boolean) => {
    setShowLastActiveConfirmation(false)

    // Update the active state to the pending value
    if (pendingActiveState !== null) {
      setNewChatbotActive(pendingActiveState)

      // If confirmed, update the last active date to today
      if (confirmed) {
        setNewChatbotLastActive(new Date())
        sonnerToast.success("Last Active date updated to today")
      }

      setPendingActiveState(null)
    }
  }

  // Add a new chatbot entry (manual entry)
  const handleAddChatbot = () => {
    if (!newChatbotName.trim()) {
      sonnerToast.error("Chatbot name is required")
      return
    }

    if (!newChatbotId.trim()) {
      sonnerToast.error("Chatbot ID is required")
      return
    }

    const newChatbot: ChatbotEntry = {
      id: crypto.randomUUID(),
      name: newChatbotName,
      chatbotId: newChatbotId,
      activeDate: newChatbotActiveDate,
      inactiveDate: undefined,
      isActive: newChatbotActive,
      messageCount: 0,
      lastActive: newChatbotLastActive,
    }

    setChatbots([...chatbots, newChatbot])
    setAddChatbotOpen(false)
    sonnerToast.success("Chatbot added successfully")
  }

  // Open edit chatbot dialog
  const handleOpenEditChatbot = (index: number) => {
    const chatbot = chatbots[index]
    setNewChatbotName(chatbot.name)
    setNewChatbotId(chatbot.chatbotId)
    setNewChatbotActive(chatbot.isActive)
    setNewChatbotActiveDate(chatbot.activeDate || new Date())
    setNewChatbotLastActive(chatbot.lastActive || new Date())
    setEditingChatbotIndex(index)
    setIsEditMode(true)
    setEditChatbotOpen(true)
  }

  // Save edited chatbot
  const handleSaveEditChatbot = () => {
    if (editingChatbotIndex === null) return

    if (!newChatbotName.trim()) {
      sonnerToast.error("Chatbot name is required")
      return
    }

    if (!newChatbotId.trim()) {
      sonnerToast.error("Chatbot ID is required")
      return
    }

    const updatedChatbots = [...chatbots]
    updatedChatbots[editingChatbotIndex] = {
      ...updatedChatbots[editingChatbotIndex],
      name: newChatbotName,
      chatbotId: newChatbotId,
      isActive: newChatbotActive,
      activeDate: newChatbotActiveDate,
      lastActive: newChatbotLastActive,
      inactiveDate: !newChatbotActive ? new Date() : undefined,
    }

    setChatbots(updatedChatbots)
    setEditChatbotOpen(false)
    sonnerToast.success("Chatbot updated successfully")
  }

  // Remove a chatbot entry
  const handleRemoveChatbot = (index: number) => {
    const newChatbots = [...chatbots]
    newChatbots.splice(index, 1)
    setChatbots(newChatbots)
    sonnerToast.success("Chatbot removed successfully")
  }

  // Update chatbot fields
  const updateChatbotField = (index: number, field: keyof ChatbotEntry, value: any) => {
    const newChatbots = [...chatbots]
    newChatbots[index] = {
      ...newChatbots[index],
      [field]: value,
    }
    setChatbots(newChatbots)
  }

  // Toggle chatbot active status
  const handleChatbotStatusChange = (index: number, checked: boolean) => {
    setCurrentChatbotIndex(index)

    const newChatbots = [...chatbots]
    newChatbots[index] = {
      ...newChatbots[index],
      isActive: checked,
    }

    // Update the appropriate date
    if (checked) {
      newChatbots[index].activeDate = new Date()
      newChatbots[index].inactiveDate = undefined
    } else {
      newChatbots[index].inactiveDate = new Date()
    }

    setChatbots(newChatbots)
    sonnerToast.success(`Chatbot ${checked ? "activated" : "deactivated"} successfully`)
  }

  // Handle save for customer information
  const handleSaveCustomer = () => {
    const updatedCustomer = {
      id: customerId,
      companyName,
      username,
      contactName: `${firstName} ${lastName}`.trim(),
      email,
      phone,
      chatbotAccount,
      activeDate,
      inactiveDate,
      isActive,
      chatbots,
    }

    if (isNewCustomer && onSave) {
      onSave(updatedCustomer)
    } else if (onUpdate) {
      onUpdate(updatedCustomer)
    }
  }

  // Handle refresh schedule
  const handleOpenRefreshDialog = (index: number) => {
    setRefreshChatbotIndex(index)
    setRefreshDialogOpen(true)
  }

  const handleSaveRefreshSchedule = () => {
    sonnerToast.success("Refresh schedule updated successfully")
    setRefreshDialogOpen(false)
  }

  // View chatbot details
  const handleViewChatbotDetails = (chatbotId: string) => {
    setSelectedChatbot(chatbotId)
    setShowChatbotDetails(true)
  }

  // Format number with commas
  const formatNumber = (num = 0) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Details</h1>
          <p className="text-muted-foreground">Manage customer information and chatbot assignments</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
          <TabsTrigger value="chatbots">Chatbots ({chatbots.length})</TabsTrigger>
        </TabsList>
        <div className="min-h-[500px]">
          <TabsContent value="profile" className="space-y-4 pt-4 h-full">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="myCompanyUser"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstName">Contact First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Contact Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chatbotAccount">Chatbot Account</Label>
                <Input
                  id="chatbotAccount"
                  value={chatbotAccount}
                  onChange={(e) => setChatbotAccount(e.target.value)}
                  placeholder="Enter Chatbot account email"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 pt-4 h-full">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="activeDate">Active Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {activeDate ? format(activeDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={activeDate} onSelect={setActiveDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="inactiveDate">Inactive Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-transparent"
                      disabled={isActive}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {inactiveDate ? format(inactiveDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={inactiveDate} onSelect={setInactiveDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="customerActive" checked={isActive} onCheckedChange={handleCustomerStatusChange} />
                <Label htmlFor="customerActive">Active</Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chatbots" className="space-y-4 pt-4 h-full">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Chatbot Management</h3>
              <Button onClick={handleOpenAddChatbot} className="gap-1">
                <PlusIcon className="h-4 w-4" />
                Add Chatbot
              </Button>
            </div>

            {chatbots.length > 0 ? (
              <div className="space-y-4">
                <Card>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="whitespace-nowrap min-w-[150px]">Name</TableHead>
                          <TableHead className="whitespace-nowrap min-w-[120px]">ID</TableHead>
                          <TableHead className="whitespace-nowrap min-w-[80px]">Status</TableHead>
                          <TableHead className="whitespace-nowrap min-w-[120px]">Active Since</TableHead>
                          <TableHead className="whitespace-nowrap min-w-[100px]">Messages</TableHead>
                          <TableHead className="whitespace-nowrap min-w-[120px]">Last Active</TableHead>
                          <TableHead className="text-right whitespace-nowrap min-w-[180px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {chatbots.map((chatbot, index) => (
                          <TableRow key={chatbot.id}>
                            <TableCell className="font-medium">{chatbot.name || "Unnamed Bot"}</TableCell>
                            <TableCell>{chatbot.chatbotId || "Not set"}</TableCell>
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
                            <TableCell>
                              {chatbot.activeDate ? format(chatbot.activeDate, "MMM d, yyyy") : "N/A"}
                            </TableCell>
                            <TableCell>{formatNumber(chatbot.messageCount)}</TableCell>
                            <TableCell>
                              {chatbot.lastActive ? format(chatbot.lastActive, "MMM d, yyyy") : "N/A"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewChatbotDetails(chatbot.id)}
                                >
                                  <BarChart3Icon className="h-4 w-4 mr-1" />
                                  Stats
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    updateChatbotField(index, "isActive", !chatbot.isActive)
                                    sonnerToast.success(
                                      `Chatbot ${!chatbot.isActive ? "activated" : "deactivated"} successfully`,
                                    )
                                  }}
                                >
                                  {chatbot.isActive ? "Deactivate" : "Activate"}
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <ChevronRightIcon className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleOpenEditChatbot(index)}>
                                      <PencilIcon className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleRemoveChatbot(index)}
                                      className="text-red-600 focus:text-red-600"
                                    >
                                      <TrashIcon className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="flex justify-center py-8 text-center text-gray-500 border rounded-lg">
                <div>
                  <MessageSquareIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No chatbots configured</p>
                  <p className="text-sm">Click 'Add Chatbot' to create your first chatbot</p>
                </div>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button onClick={handleSaveCustomer}>{isNewCustomer ? "Create Customer" : "Save Changes"}</Button>
      </div>

      {/* Available Chatbots Dialog */}
      <Dialog open={showAvailableBotsDialog} onOpenChange={setShowAvailableBotsDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Add Chatbot</DialogTitle>
            <DialogDescription>Search and select from available chatbots to add to this customer</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search chatbots by name, description, or category..."
                className="pl-8"
                value={botSearchTerm}
                onChange={(e) => setBotSearchTerm(e.target.value)}
              />
            </div>

            {/* Available Bots List */}
            <div className="max-h-[400px] overflow-y-auto space-y-2">
              {filteredAvailableBots.length > 0 ? (
                filteredAvailableBots.map((bot) => (
                  <Card key={bot.id} className="p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{bot.name}</h4>
                          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            {bot.category}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{bot.description}</p>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Bot ID:</span> {bot.id}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Created:</span> {format(bot.createdDate, "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                      <Button onClick={() => handleAddAvailableBot(bot)} size="sm" className="ml-4">
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquareIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No available chatbots found</p>
                  <p className="text-sm">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAvailableBotsDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Last Active Date Confirmation Dialog */}
      <AlertDialog open={showLastActiveConfirmation} onOpenChange={setShowLastActiveConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Last Active Date</AlertDialogTitle>
            <AlertDialogDescription>Do you want to update the Last Active Date to today's date?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleLastActiveConfirmation(false)}>No</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleLastActiveConfirmation(true)}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Chatbot Details Dialog */}
      <Dialog open={showChatbotDetails} onOpenChange={setShowChatbotDetails}>
        <DialogContent className="max-w-6xl w-[95vw]">
          <DialogHeader>
            <DialogTitle>Chatbot Analytics</DialogTitle>
            <DialogDescription>View detailed statistics for this chatbot</DialogDescription>
          </DialogHeader>

          {selectedChatbot && (
            <div className="space-y-6">
              {(() => {
                const chatbot = chatbots.find((c) => c.id === selectedChatbot)
                if (!chatbot) return null

                return (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{formatNumber(chatbot.messageCount)}</div>
                          <p className="text-xs text-muted-foreground">Last 30 days</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{Math.floor(Math.random() * 1000)}</div>
                          <p className="text-xs text-muted-foreground">Last 30 days</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">1.2s</div>
                          <p className="text-xs text-muted-foreground">Last 30 days</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">User Satisfaction</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">92%</div>
                          <p className="text-xs text-muted-foreground">Based on feedback</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="h-[200px] w-full bg-muted/30 rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <LineChartIcon className="h-10 w-10 mx-auto mb-2" />
                        <p>Analytics chart would appear here</p>
                      </div>
                    </div>
                  </>
                )
              })()}
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setShowChatbotDetails(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Refresh Schedule Dialog */}
      <Dialog open={refreshDialogOpen} onOpenChange={setRefreshDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Refresh Schedule</DialogTitle>
            <DialogDescription>Select when you would like the data to be refreshed</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="refreshDate">Refresh Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {refreshDate ? format(refreshDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={refreshDate} onSelect={setRefreshDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="refreshTime">Refresh Time</Label>
              <Input
                id="refreshTime"
                type="time"
                value={refreshTime}
                onChange={(e) => setRefreshTime(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setRefreshDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRefreshSchedule}>Save Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
