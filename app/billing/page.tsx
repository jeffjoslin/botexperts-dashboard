import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CreditCardIcon, CheckIcon, ArrowRightIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function BillingPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
                <p className="text-muted-foreground">Manage your subscription and billing information.</p>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>You are currently on the Pro plan.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Pro Plan</h3>
                        <p className="text-sm text-muted-foreground">$49/month</p>
                      </div>
                      <Badge>Current Plan</Badge>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h4 className="font-medium">Includes:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckIcon className="h-4 w-4 text-green-500" />
                          <span>Up to 10 chatbots</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckIcon className="h-4 w-4 text-green-500" />
                          <span>Advanced analytics</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckIcon className="h-4 w-4 text-green-500" />
                          <span>Priority support</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckIcon className="h-4 w-4 text-green-500" />
                          <span>Custom branding</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel Subscription</Button>
                    <Button>
                      Upgrade Plan
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Manage your payment methods and billing information.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted">
                        <CreditCardIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/2024</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h4 className="font-medium">Billing Address</h4>
                      <p className="text-sm text-muted-foreground">
                        123 Main St
                        <br />
                        San Francisco, CA 94103
                        <br />
                        United States
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Edit Billing Address</Button>
                    <Button>Update Payment Method</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>View your recent invoices and payment history.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Invoice #12345</p>
                          <p className="text-sm text-muted-foreground">April 1, 2025</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$49.00</p>
                          <Badge variant="outline" className="text-green-500">
                            Paid
                          </Badge>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Invoice #12344</p>
                          <p className="text-sm text-muted-foreground">March 1, 2025</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$49.00</p>
                          <Badge variant="outline" className="text-green-500">
                            Paid
                          </Badge>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Invoice #12343</p>
                          <p className="text-sm text-muted-foreground">February 1, 2025</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$49.00</p>
                          <Badge variant="outline" className="text-green-500">
                            Paid
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Invoices
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
