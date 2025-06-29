import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { MessageSquareIcon, MailIcon, AlertCircleIcon, InfoIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function NotificationsPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
                <p className="text-muted-foreground">
                  Manage your notification preferences and view recent notifications.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose how and when you want to be notified.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Email Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-chatbot">Chatbot Activity</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications about chatbot activity and performance.
                            </p>
                          </div>
                          <Switch id="email-chatbot" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-account">Account Updates</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications about your account status and updates.
                            </p>
                          </div>
                          <Switch id="email-account" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-marketing">Marketing</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive marketing emails about new features and offers.
                            </p>
                          </div>
                          <Switch id="email-marketing" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Push Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="push-chatbot">Chatbot Activity</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive push notifications about chatbot activity.
                            </p>
                          </div>
                          <Switch id="push-chatbot" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="push-account">Account Updates</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive push notifications about your account.
                            </p>
                          </div>
                          <Switch id="push-account" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <Button>Save Preferences</Button>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Notifications</CardTitle>
                    <CardDescription>Your most recent notifications and alerts.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <MessageSquareIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">New message from customer</p>
                            <Badge variant="outline" className="text-xs">
                              New
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            A customer has sent a new message to your Sales Assistant chatbot.
                          </p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                          <InfoIcon className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">System Update</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            The system has been updated with new features. Check out what's new!
                          </p>
                          <p className="text-xs text-muted-foreground">Yesterday</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
                          <AlertCircleIcon className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Billing Reminder</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Your next billing cycle will begin in 3 days. Please review your subscription.
                          </p>
                          <p className="text-xs text-muted-foreground">2 days ago</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                          <MailIcon className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Welcome to BotExperts</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Welcome to BotExperts! Get started by setting up your first chatbot.
                          </p>
                          <p className="text-xs text-muted-foreground">1 week ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
