import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="bg-sidebar gap-5 p-5" dir="rtl">
      <AppSidebar />
      <main className="flex-1 flex flex-col gap-5">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
