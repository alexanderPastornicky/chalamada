"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ListTodo } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  const tasksUrl = (() => {
    const params = new URLSearchParams()
    params.set("status", "todo,in-progress")
    return `/app/tasks?${params.toString()}`
  })()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/app"}
                >
                  <Link href="/app" onClick={handleLinkClick}>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/app/tasks")}
                >
                  <Link 
                    href={tasksUrl}
                    onClick={handleLinkClick}
                  >
                    <ListTodo />
                    <span>Tasks</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

