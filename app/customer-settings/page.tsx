"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { CustomerSidebar } from "../../components/customer-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { CheckIcon, Sun, Moon, Monitor } from "lucide-react"

export default function CustomerSettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [compactView, setCompactView] = useState(false)

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
      <CustomerSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
              </div>

              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
                </TabsList>

                <TabsContent value="account" className="mt-6 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>Manage your account settings.</CardDescription>
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
                      <Button onClick={() => toast.success("Settings saved successfully")}>Save Changes</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="mt-6 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>Change your password to keep your account secure.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button onClick={() => toast.success("Password updated successfully")}>Update Password</Button>
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
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
