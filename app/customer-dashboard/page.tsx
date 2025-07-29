"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CustomerSidebar } from "../../components/customer-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { CustomerSectionCards } from "../../components/customer-section-cards"
import { CustomerChart } from "../../components/customer-chart"
import { CustomerSettings } from "../../components/customer-settings"

function CustomerDashboardContent() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    if (tab === "settings") {
      setActiveTab("settings")
    } else {
      setActiveTab("dashboard")
    }
  }, [tab])

  return (
    <SidebarProvider>
      <CustomerSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {activeTab === "settings" ? (
              <CustomerSettings />
            ) : (
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold tracking-tight">Customer Dashboard</h1>
                  <p className="text-muted-foreground">Welcome back, Billy! Here's your chatbot overview.</p>
                </div>

                <CustomerSectionCards />

                <div className="grid gap-4 md:gap-6">
                  <CustomerChart />
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function CustomerDashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomerDashboardContent />
    </Suspense>
  )
}
