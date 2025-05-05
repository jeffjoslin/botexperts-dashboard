"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    toast.success(`Theme changed to ${newTheme} mode`)
  }

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
                <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
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
                  <Card>
                    <CardHeader>
                      <CardTitle>Appearance Settings</CardTitle>
                      <CardDescription>Customize the appearance of the dashboard.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <Label>Screen Mode</Label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <div
                              className={`aspect-video cursor-pointer rounded-md border-2 ${theme === "dark" ? "border-primary" : "border-muted"} bg-[#1e1e2f] p-2 hover:border-primary`}
                              onClick={() => handleThemeChange("dark")}
                            >
                              <div className="h-full rounded bg-[#2a2a3c] p-2">
                                <div className="h-2 w-3/4 rounded-lg bg-[#6366f1]"></div>
                                <div className="mt-2 h-2 w-1/2 rounded-lg bg-[#8284f3]"></div>
                                <div className="mt-2 h-2 w-2/3 rounded-lg bg-[#a5a6f6]"></div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="dark-mode"
                                name="screen-mode"
                                className="h-4 w-4 cursor-pointer"
                                checked={theme === "dark"}
                                onChange={() => handleThemeChange("dark")}
                              />
                              <Label htmlFor="dark-mode" className="cursor-pointer text-sm">
                                Dark Mode
                              </Label>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div
                              className={`aspect-video cursor-pointer rounded-md border-2 ${theme === "dark-vibrant" ? "border-primary" : "border-muted"} bg-[#121212] p-2 hover:border-primary`}
                              onClick={() => handleThemeChange("dark-vibrant")}
                            >
                              <div className="h-full rounded bg-[#1a1a1a] p-2">
                                <div className="h-2 w-3/4 rounded-lg bg-[#0A84FF]"></div>
                                <div className="mt-2 h-2 w-1/2 rounded-lg bg-[#5AC8FA]"></div>
                                <div className="mt-2 h-2 w-2/3 rounded-lg bg-[#F1C40F]"></div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="dark-vibrant-mode"
                                name="screen-mode"
                                className="h-4 w-4 cursor-pointer"
                                checked={theme === "dark-vibrant"}
                                onChange={() => handleThemeChange("dark-vibrant")}
                              />
                              <Label htmlFor="dark-vibrant-mode" className="cursor-pointer text-sm">
                                Dark Vibrant
                              </Label>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div
                              className={`aspect-video cursor-pointer rounded-md border-2 ${theme === "light" ? "border-primary" : "border-muted"} bg-[#fafafa] p-2 hover:border-primary`}
                              onClick={() => handleThemeChange("light")}
                            >
                              <div className="h-full rounded bg-white p-2 shadow-sm">
                                <div className="h-2 w-3/4 rounded-lg bg-[#0A84FF]"></div>
                                <div className="mt-2 h-2 w-1/2 rounded-lg bg-[#5AC8FA]"></div>
                                <div className="mt-2 h-2 w-2/3 rounded-lg bg-[#F1C40F]"></div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="light-mode"
                                name="screen-mode"
                                className="h-4 w-4 cursor-pointer"
                                checked={theme === "light"}
                                onChange={() => handleThemeChange("light")}
                              />
                              <Label htmlFor="light-mode" className="cursor-pointer text-sm">
                                Light Mode
                              </Label>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Choose your preferred interface theme.</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="compact-view">Compact View</Label>
                          <p className="text-sm text-muted-foreground">Make the dashboard more compact.</p>
                        </div>
                        <Switch id="compact-view" />
                      </div>
                      <Button onClick={() => toast.success("Appearance settings saved")}>Save Changes</Button>
                    </CardContent>
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

