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
                    )}>CollabDraw</span>
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
                            width: "100%",
                        },
                        organizationSwitcherTrigger: {
                            padding: "6px 12px ",
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

            <div className="w-full flex justify-center my-4">
                <div className="w-4/5 h-[2.5px] bg-[#B0B3B8] rounded-full shadow-sm" />
            </div>
            <div className="space-y-3 w-full mt-2">
                <Button
                    asChild
                    size="lg"
                    variant={favourites ? "ghost" : "secondary"}
                    className="flex items-center gap-3 font-semibold justify-start text-[#1E1E2F] bg-[#e6f7fa]/60 hover:bg-[#a1f9fc]/80 border border-[#E5E7EB] shadow-sm rounded-lg w-full h-[44px] transition-all duration-200 text-base group">
                    <Link href="/dashboard">
                        <span className="flex items-center gap-2">
                            <span className="flex items-center justify-center h-8 w-8 rounded bg-[#b2e6f2] group-hover:bg-[#76dde0] transition-colors duration-200">
                                <LayoutDashboard className="h-4 w-4 text-[#1E1E2F]" />
                            </span>
                            Team Boards
                        </span>
                    </Link>
                </Button>

                <Button
                    asChild
                    size="lg"
                    variant={favourites ? "secondary" : "ghost"}
                    className="flex items-center gap-3 font-semibold justify-start text-[#1E1E2F] bg-[#fff7e6]/60 hover:bg-[#FFD600]/70 border border-[#E5E7EB] shadow-sm rounded-lg w-full h-[44px] transition-all duration-200 text-base group">
                    <Link href={{
                        pathname: "/dashboard",
                        query: { favourites: true }
                    }}>
                        <span className="flex items-center gap-2">
                            <span className="flex items-center justify-center h-8 w-8 rounded bg-[#ffe299] group-hover:bg-[#FFD600] transition-colors duration-200">
                                <Star className="h-4 w-4 text-[#1E1E2F]" />
                            </span>
                            Favourites
                        </span>
                    </Link>
                </Button>
            </div>
        </div>
    );
}
