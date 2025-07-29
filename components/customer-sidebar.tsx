"use client"

import type * as React from "react"
import { Bot, Command, GalleryVerticalEnd, Settings2, SquareTerminal } from "lucide-react"

import { CustomerNavUser } from "@/components/customer-nav-user"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Billy",
    email: "customer@be.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "BotExperts Customer",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/customer-dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "My Chatbots",
      url: "/my-chatbots",
      icon: Bot,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/customer-settings",
      icon: Settings2,
    },
  ],
}

export function CustomerSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Command className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Bot Experts</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <CustomerNavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
