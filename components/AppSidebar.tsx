import { Sidebar, SidebarContent, SidebarMenu } from "@/components/ui/sidebar";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar side="right" className="bg-accent p-5" variant="sidebar">
      <SidebarContent className="bg-accent space-y-5">
        <SidebarMenu className="w-full p-2 bg-accent rounded-xl">
          <Link href="/">داشبورد</Link>
        </SidebarMenu>
        <SidebarMenu className="w-full p-2 bg-accent rounded-xl">
          <Link href="orders-managment">مدیریت گزارشات</Link>
        </SidebarMenu>
        <SidebarMenu className="w-full p-2 bg-accent rounded-xl">
          <Link href="/report">ایجاد گزارش</Link>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
