"use client";

import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";

interface SideBarItemProps {
    id: string;
    name: string;
    imageUrl: string;
};



export default function SideBarItem({
    id,
    name,
    imageUrl
}: SideBarItemProps) {

    const { organization } = useOrganization();
    const { setActive } = useOrganizationList();

    const idActive = organization?.id === id;
    const onClick = () => {
        if (!setActive) return;

        setActive({ organization: id });
    };

    return (
        <div className="aspect-square relative w-[48px] flex items-center justify-center group">
            <div className={cn(
                "relative w-[44px] h-[44px] shadow-md overflow-hidden transition-all duration-300",
                idActive
                    ? "border-2 border-green-600 ring-2 ring-green-500 bg-green-50 rounded-xl"
                    : "border-0 rounded-none"
            )}>
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="44px"
                    onClick={onClick}
                    className={cn(
                        "object-cover w-full h-full cursor-pointer opacity-90 group-hover:opacity-100 transition-all duration-300 rounded-none",
                        idActive && "opacity-100"
                    )}
                />
            </div>
        </div>
    )
}
