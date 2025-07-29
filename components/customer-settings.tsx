"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { CheckIcon, Sun, Moon, Monitor } from "lucide-react"

export function CustomerSettings() {
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
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Billy" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Customer" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="customer@be.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="BotExperts Inc." />
              </div>
              <Button onClick={() => toast.success("Profile updated successfully")}>Save Changes</Button>
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
                      isSelected ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleThemeChange(themeOption.id)}
                  >
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                        <CheckIcon className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className={`h-20 w-full rounded-md ${themeOption.preview} flex items-center justify-center`}>
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
  )
}
