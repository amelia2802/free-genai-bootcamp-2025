
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Layout = () => {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="container max-w-7xl mx-auto">
          <SidebarTrigger className="mb-6" />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
