"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/clerk-react";
import { LayoutDashboard, Star } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const font = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    variable: '--font-poppins',
});

export default function OrgSidebar() {

    const searchParams = useSearchParams();
    const favourites = searchParams.get("favourites") === "false";


    return (
        <div className="hidden lg:flex flex-col space-y-6 w-[206px] min-w-[206px] pl-5 pt-5 pb-5 bg-[#F9FAFB] h-screen sticky top-0">
            <Link href="/dashboard">
                <div className="flex items-center gap-x-2">
                    <Image
                        src={"/logo.svg"}
                        alt="Logo"
                        height={60}
                        width={60}></Image>
                    <span className={cn(
                        font.className,
                        "text-2xl text-[#1E1E2F] font-semibold"
                    )}>Board</span>
                </div>
            </Link>
            <OrganizationSwitcher
                hidePersonal
                appearance={{
                    elements: {
                        rootBox: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            with: "100%",
                        },
                        organizationSwitcherTrigger: {
                            padding: "6px 12px",
                            borderRadius: "8px",
                            width: "100%",
                            border: "1px solid #000000",
                            backgroundColor: "#F9FAFB",
                            color: "#1E1E2F",
                            maxWidth: "186px"
                        }
                    }
                }
                } />
            <div className="space-y-1 w-full">
                <Button
                    asChild
                    size={"lg"}
                    variant={favourites ? "ghost" : "secondary"}
                    className="font-normal justify-start text-[#1E1E2F] bg-[#a1f9fc] hover:bg-[#76dde0] border border-[#000000] shadow-sm rounded-md w-full h-[44px]">
                    <Link href="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Team Boards
                    </Link>
                </Button>

                <Button
                    asChild
                    size={"lg"}
                    variant={favourites ? "secondary" : "ghost"}
                    className="font-normal justify-start text-[#1E1E2F] bg-[#FFC300] hover:bg-[#c69802] border border-[#000000] shadow-sm rounded-md w-full h-[44px]">
                    <Link href={{
                        pathname: "/dashboard",
                        query: { favourites: true }
                    }
                    }>
                        <Star className="mr-2 h-4 w-4" />
                        Favourite Boards
                    </Link>
                </Button>
            </div>
        </div>
    );
}
