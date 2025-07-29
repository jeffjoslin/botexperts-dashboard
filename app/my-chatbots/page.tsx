import { CustomerSidebar } from "../../components/customer-sidebar"
import { ChatbotsGrid } from "../../components/chatbots-grid"
import { ParticleBackground } from "../../components/particle-background"
import { PageTransition } from "../../components/smooth-transitions"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function MyChatbotsPage() {
  return (
    <SidebarProvider>
      <CustomerSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <ParticleBackground className="min-h-screen">
          <PageTransition>
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
                  <ChatbotsGrid />
                </div>
              </div>
            </div>
          </PageTransition>
        </ParticleBackground>
      </SidebarInset>
    </SidebarProvider>
  )
}
