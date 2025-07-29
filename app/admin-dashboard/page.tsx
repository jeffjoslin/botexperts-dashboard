import { AppSidebar } from "../../components/app-sidebar"
import { EnhancedSectionCards } from "../../components/enhanced-section-cards"
import { EnhancedSecondSectionCards } from "../../components/enhanced-second-section-cards"
import { EnhancedChartAreaInteractive } from "../../components/enhanced-chart-area"
import { ParticleBackground } from "../../components/particle-background"
import { PageTransition } from "../../components/smooth-transitions"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function AdminDashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <ParticleBackground className="min-h-screen">
          <PageTransition>
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <EnhancedSectionCards />
                  <EnhancedSecondSectionCards />
                  <div className="px-4 lg:px-6">
                    <EnhancedChartAreaInteractive />
                  </div>
                </div>
              </div>
            </div>
          </PageTransition>
        </ParticleBackground>
      </SidebarInset>
    </SidebarProvider>
  )
}
