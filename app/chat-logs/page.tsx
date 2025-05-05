import { ChatLogViewer } from "@/components/chat-log-viewer"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function ChatLogsPage() {
  // Parse the example chat log
  const startDate = new Date("2025-04-02T19:16:00-07:00")
  const lastActive = new Date("2025-04-02T19:16:00-07:00")
  const exportDate = new Date("2025-04-02T19:16:00-07:00")

  const messages = [
    {
      timestamp: "07:16 PM PDT",
      sender: "MapD Agent",
      content: "Hi! What can I help you with?",
    },
    {
      timestamp: "07:16 PM PDT",
      sender: "Unknown User",
      content: "Hi",
    },
    {
      timestamp: "07:16 PM PDT",
      sender: "MapD Agent",
      content: "Hi! How can I help you today",
    },
  ]

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Chat Logs</h1>
            <p className="text-muted-foreground">View conversation history with MapD Agent</p>
          </div>

          <ChatLogViewer
            title="Conversation with MapD Agent"
            startDate={startDate}
            lastActive={lastActive}
            messages={messages}
            exportDate={exportDate}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

