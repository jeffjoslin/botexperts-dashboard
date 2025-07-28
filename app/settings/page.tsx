"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { PlusIcon, Trash2Icon, PencilIcon, CheckIcon, Sun, Moon, Monitor } from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [compactView, setCompactView] = useState(false)
  const [admins, setAdmins] = useState([
    {
      id: "1",
      firstName: "Admin",
      lastName: "User",
      username: "admin",
      email: "admin@botexperts.com",
      isActive: true,
      createdAt: "2025-01-01T00:00:00.000Z",
    },
  ])

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    toast.success(
      `Theme changed to ${newTheme === "dark-vibrant" ? "Dark Vibrant" : newTheme.charAt(0).toUpperCase() + newTheme.slice(1)}`,
    )
  }

  const themes = [
    {
      id: "light",
      name: "Light Mode",
      description: "Clean light theme",
      icon: Sun,
      preview: "bg-white border-gray-200",
    },
    {
      id: "dark",
      name: "Dark Mode",
      description: "Dark theme with subtle colors",
      icon: Moon,
      preview: "bg-gray-900 border-gray-700",
    },
    {
      id: "dark-vibrant",
      name: "Dark Vibrant",
      description: "Dark theme with vibrant accents",
      icon: Monitor,
      preview: "bg-gray-900 border-blue-500",
    },
  ]

  if (!mounted) {
    return null
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
              </div>

              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
                  <TabsTrigger value="admin">Admin Accounts</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="mt-6 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>General Settings</CardTitle>
                      <CardDescription>Manage your general account settings.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="shadcn" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="m@example.com" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketing">Marketing emails</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about new products, features, and more.
                          </p>
                        </div>
                        <Switch id="marketing" defaultChecked />
                      </div>
                      <Button onClick={() => toast.success("Settings saved successfully")}>Save Changes</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="appearance" className="mt-6 space-y-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Theme</h3>
                      <p className="text-sm text-muted-foreground">Choose how the dashboard looks and feels.</p>
                    </div>
                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {themes.map((themeOption) => {
                        const Icon = themeOption.icon
                        const isSelected = resolvedTheme === themeOption.id || theme === themeOption.id

                        return (
                          <div
                            key={themeOption.id}
                            className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:scale-105 ${
                              isSelected
                                ? "border-primary ring-2 ring-primary/20"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => handleThemeChange(themeOption.id)}
                          >
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                                <CheckIcon className="h-4 w-4 text-primary-foreground" />
                              </div>
                            )}

                            <div className="space-y-3">
                              <div
                                className={`h-20 w-full rounded-md ${themeOption.preview} flex items-center justify-center`}
                              >
                                <Icon className="h-8 w-8 text-foreground/60" />
                              </div>

                              <div className="space-y-1">
                                <Label className="text-sm font-medium cursor-pointer">{themeOption.name}</Label>
                                <p className="text-xs text-muted-foreground">{themeOption.description}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Display</CardTitle>
                        <CardDescription>Customize how information is displayed.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="compact-view">Compact View</Label>
                            <p className="text-sm text-muted-foreground">Make the dashboard more compact.</p>
                          </div>
                          <Switch id="compact-view" checked={compactView} onCheckedChange={setCompactView} />
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex justify-end">
                      <Button onClick={() => toast.success("Appearance settings saved")}>Save Changes</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="admin" className="mt-6 space-y-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Administrator Accounts</CardTitle>
                        <CardDescription>Manage administrator accounts for the system.</CardDescription>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="flex items-center gap-1">
                            <PlusIcon className="h-4 w-4" />
                            Add Admin
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Administrator</DialogTitle>
                            <DialogDescription>Create a new administrator account for the system.</DialogDescription>
                          </DialogHeader>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault()
                              const formData = new FormData(e.currentTarget)
                              const newAdmin = {
                                id: crypto.randomUUID(),
                                firstName: formData.get("firstName") as string,
                                lastName: formData.get("lastName") as string,
                                username: formData.get("username") as string,
                                email: formData.get("email") as string,
                                isActive: true,
                                createdAt: new Date().toISOString(),
                              }
                              setAdmins([...admins, newAdmin])
                              toast.success("Administrator added successfully")
                              ;(e.target as HTMLFormElement).reset()
                            }}
                          >
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="firstName">First Name</Label>
                                  <Input id="firstName" name="firstName" required />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="lastName">Last Name</Label>
                                  <Input id="lastName" name="lastName" required />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" name="username" required />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" required />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">Create Account</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {admins.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                No administrator accounts found. Add your first admin using the button above.
                              </TableCell>
                            </TableRow>
                          ) : (
                            admins.map((admin) => (
                              <TableRow key={admin.id}>
                                <TableCell>
                                  {admin.firstName} {admin.lastName}
                                </TableCell>
                                <TableCell>{admin.username}</TableCell>
                                <TableCell>{admin.email}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Switch
                                      checked={admin.isActive}
                                      onCheckedChange={(checked) => {
                                        setAdmins(
                                          admins.map((a) => (a.id === admin.id ? { ...a, isActive: checked } : a)),
                                        )
                                        toast.success(`Administrator ${checked ? "enabled" : "disabled"} successfully`)
                                      }}
                                    />
                                    <span className={admin.isActive ? "text-green-600" : "text-red-600"}>
                                      {admin.isActive ? "Active" : "Disabled"}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                                          <PencilIcon className="h-4 w-4" />
                                          <span className="sr-only">Edit</span>
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Edit Administrator</DialogTitle>
                                          <DialogDescription>Update administrator account details.</DialogDescription>
                                        </DialogHeader>
                                        <form
                                          onSubmit={(e) => {
                                            e.preventDefault()
                                            const formData = new FormData(e.currentTarget)
                                            const updatedAdmin = {
                                              ...admin,
                                              firstName: formData.get("firstName") as string,
                                              lastName: formData.get("lastName") as string,
                                              username: formData.get("username") as string,
                                              email: formData.get("email") as string,
                                            }
                                            setAdmins(admins.map((a) => (a.id === admin.id ? updatedAdmin : a)))
                                            toast.success("Administrator updated successfully")
                                          }}
                                        >
                                          <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-2 gap-4">
                                              <div className="space-y-2">
                                                <Label htmlFor={`edit-firstName-${admin.id}`}>First Name</Label>
                                                <Input
                                                  id={`edit-firstName-${admin.id}`}
                                                  name="firstName"
                                                  defaultValue={admin.firstName}
                                                  required
                                                />
                                              </div>
                                              <div className="space-y-2">
                                                <Label htmlFor={`edit-lastName-${admin.id}`}>Last Name</Label>
                                                <Input
                                                  id={`edit-lastName-${admin.id}`}
                                                  name="lastName"
                                                  defaultValue={admin.lastName}
                                                  required
                                                />
                                              </div>
                                            </div>
                                            <div className="space-y-2">
                                              <Label htmlFor={`edit-username-${admin.id}`}>Username</Label>
                                              <Input
                                                id={`edit-username-${admin.id}`}
                                                name="username"
                                                defaultValue={admin.username}
                                                required
                                              />
                                            </div>
                                            <div className="space-y-2">
                                              <Label htmlFor={`edit-email-${admin.id}`}>Email</Label>
                                              <Input
                                                id={`edit-email-${admin.id}`}
                                                name="email"
                                                type="email"
                                                defaultValue={admin.email}
                                                required
                                              />
                                            </div>
                                          </div>
                                          <DialogFooter>
                                            <Button type="submit">Save Changes</Button>
                                          </DialogFooter>
                                        </form>
                                      </DialogContent>
                                    </Dialog>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          className="h-8 w-8 text-red-600 bg-transparent"
                                        >
                                          <Trash2Icon className="h-4 w-4" />
                                          <span className="sr-only">Delete</span>
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Delete Administrator</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Are you sure you want to delete this administrator account? This action
                                            cannot be undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction
                                            className="bg-red-600 hover:bg-red-700"
                                            onClick={() => {
                                              setAdmins(admins.filter((a) => a.id !== admin.id))
                                              toast.success("Administrator deleted successfully")
                                            }}
                                          >
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                      <p className="text-sm text-muted-foreground">
                        Administrators have full access to manage the system, including customers, chatbots, and other
                        administrators.
                      </p>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
