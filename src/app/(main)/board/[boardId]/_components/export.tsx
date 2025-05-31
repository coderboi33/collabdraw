"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { File, Images } from "lucide-react";

interface ExportComponentProps {
    children: React.ReactNode;
}


export function ExportComponent({ children }: ExportComponentProps) {
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
                    <File /> Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2 hover:bg-gray-100 cursor-pointer">
                    <Images /> Export as JPEG
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}