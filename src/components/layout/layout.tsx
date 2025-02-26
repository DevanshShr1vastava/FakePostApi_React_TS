import AppSidebar from "../AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { Toaster } from "@/components/ui/sonner"

const Layout = ({children} : {children : React.ReactNode}) => {
  return(
    <SidebarProvider>
        
        <AppSidebar />
        <SidebarTrigger />
        <main>
            {children}
        </main>
        <Toaster />
    </SidebarProvider>
  );
};

export default Layout;
