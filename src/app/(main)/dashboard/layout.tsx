"use client";

import { Authenticated, AuthLoading } from "convex/react";
import OrgSidebar from "./_components/orgSIdebar";
import { Sidebar } from "./_components/sideBar";
import Loading from "@/components/Loading";
import NavBar from "./_components/navBar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <main className="h-full">
            <Sidebar />
            <div className=" h-full pl-[60px]">
                <div className="flex gap-x-3 h-full">
                    <OrgSidebar />
                    <div className="flex-1 h-full">
                        <NavBar></NavBar>
                        <Authenticated>
                            {children}
                        </Authenticated>
                        <AuthLoading>
                            <Loading />
                        </AuthLoading>
                    </div>
                </div>
            </div>
        </main>
    );
}
