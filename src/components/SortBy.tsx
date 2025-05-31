"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUpAZ, ArrowDownAZ, ArrowUp01, ArrowDown01 } from "lucide-react";

interface SortByProps {
    children: React.ReactNode;
}

export function SortBy({ children }: SortByProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="bottom"
                align="end"
                onClick={(e) => { e.stopPropagation() }}
                className="w-36 bg-white text-gray-900 rounded-lg shadow-xl p-1 border border-gray-200"
            >
                <DropdownMenuItem className="p-2 hover:bg-gray-100 cursor-pointer">
                    <ArrowUpAZ className="mr-2 w-4 h-4" /> Name Ascending
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2 hover:bg-gray-100 cursor-pointer">
                    <ArrowDownAZ className="mr-2 w-4 h-4" /> Name Descending
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2 hover:bg-gray-100 cursor-pointer">
                    <ArrowUp01 className="mr-2 w-4 h-4" /> Created At Ascending
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2 hover:bg-gray-100 cursor-pointer">
                    <ArrowDown01 className="mr-2 w-4 h-4" /> Created At Descending
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
