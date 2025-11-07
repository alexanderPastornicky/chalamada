import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import {
    SidebarProvider,
    SidebarInset,
} from "@/components/ui/sidebar";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1">
                <Header />
                <div className="max-w-7xl mx-auto px-6">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}

