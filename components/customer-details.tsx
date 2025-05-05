"use client"

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
} from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

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

interface CustomerDetailsProps {
  customerId?: string
  customer?: any
  isNewCustomer?: boolean
  onUpdate?: (customer: any) => void
  onSave?: (customer: any) => void
  onCancel?: () => void
}

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

  // State for the confirmation dialog
  const [showLastActiveConfirmation, setShowLastActiveConfirmation] = React.useState(false)
  const [pendingActiveState, setPendingActiveState] = React.useState<boolean | null>(null)
  const [isEditMode, setIsEditMode] = React.useState(false)

  // Toggle customer active status
  const handleCustomerStatusChange = (checked: boolean) => {
    setIsActive(checked)
    toast.success(`Customer ${checked ? "activated" : "deactivated"} successfully`)

    // Update the appropriate date
    if (checked) {
      setActiveDate(new Date())
      setInactiveDate(undefined)
    } else {
      setInactiveDate(new Date())
    }
  }

  // Open add chatbot dialog
  const handleOpenAddChatbot = () => {
    setNewChatbotName("")
    setNewChatbotId("")
    setNewChatbotActive(true)
    setNewChatbotActiveDate(new Date())
    setNewChatbotLastActive(new Date())
    setIsEditMode(false)
    setAddChatbotOpen(true)
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
        toast.success("Last Active date updated to today")
      }

      setPendingActiveState(null)
    }
  }

  // Add a new chatbot entry
  const handleAddChatbot = () => {
    if (!newChatbotName.trim()) {
      toast.error("Chatbot name is required")
      return
    }

    if (!newChatbotId.trim()) {
      toast.error("Chatbot ID is required")
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
    toast.success("Chatbot added successfully")
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
      toast.error("Chatbot name is required")
      return
    }

    if (!newChatbotId.trim()) {
      toast.error("Chatbot ID is required")
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
    toast.success("Chatbot updated successfully")
  }

  // Remove a chatbot entry
  const handleRemoveChatbot = (index: number) => {
    const newChatbots = [...chatbots]
    newChatbots.splice(index, 1)
    setChatbots(newChatbots)
    toast.success("Chatbot removed successfully")
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
    toast.success(`Chatbot ${checked ? "activated" : "deactivated"} successfully`)
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
    toast.success("Refresh schedule updated successfully")
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
    <div className="space-y-6">
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
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
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
                      className="w-full justify-start text-left font-normal"
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
                                    toast.success(
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

      {/* Add Chatbot Dialog */}
      <Dialog open={addChatbotOpen} onOpenChange={setAddChatbotOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Chatbot</DialogTitle>
            <DialogDescription>Enter the details for the new chatbot</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="chatbotName">Chatbot Name</Label>
              <Input
                id="chatbotName"
                value={newChatbotName}
                onChange={(e) => setNewChatbotName(e.target.value)}
                placeholder="Enter chatbot name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chatbotId">Chatbot ID</Label>
              <Input
                id="chatbotId"
                value={newChatbotId}
                onChange={(e) => setNewChatbotId(e.target.value)}
                placeholder="Enter unique identifier"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chatbotActiveDate">Active Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newChatbotActiveDate ? format(newChatbotActiveDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newChatbotActiveDate}
                    onSelect={setNewChatbotActiveDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="chatbotLastActiveDate">Last Active Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newChatbotLastActive ? format(newChatbotLastActive, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newChatbotLastActive}
                    onSelect={setNewChatbotLastActive}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="chatbotActive" checked={newChatbotActive} onCheckedChange={handleChatbotActiveToggle} />
              <Label htmlFor="chatbotActive">Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddChatbotOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddChatbot}>Add Chatbot</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Chatbot Dialog */}
      <Dialog open={editChatbotOpen} onOpenChange={setEditChatbotOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Chatbot</DialogTitle>
            <DialogDescription>Update the chatbot details</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editChatbotName">Chatbot Name</Label>
              <Input
                id="editChatbotName"
                value={newChatbotName}
                onChange={(e) => setNewChatbotName(e.target.value)}
                placeholder="Enter chatbot name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editChatbotId">Chatbot ID</Label>
              <Input
                id="editChatbotId"
                value={newChatbotId}
                onChange={(e) => setNewChatbotId(e.target.value)}
                placeholder="Enter unique identifier"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editChatbotActiveDate">Active Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newChatbotActiveDate ? format(newChatbotActiveDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newChatbotActiveDate}
                    onSelect={setNewChatbotActiveDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editChatbotLastActiveDate">Last Active Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newChatbotLastActive ? format(newChatbotLastActive, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newChatbotLastActive}
                    onSelect={setNewChatbotLastActive}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="editChatbotActive" checked={newChatbotActive} onCheckedChange={handleChatbotActiveToggle} />
              <Label htmlFor="editChatbotActive">Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditChatbotOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEditChatbot}>Save Changes</Button>
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
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
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

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-h-[90vh] max-w-6xl w-[95vw] overflow-y-auto">
          <div>Test</div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Missing Table component
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

