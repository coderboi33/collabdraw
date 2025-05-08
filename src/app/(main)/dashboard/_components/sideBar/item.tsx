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
        <div className="aspect-square relative w-[48px] flex items-center justify-center">
            <div className="relative w-[44px] h-[44px]">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="44px"
                    onClick={onClick}
                    className={cn(
                        "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition-all duration-300 object-cover",
                        idActive && "opacity-100"
                    )}
                />
            </div>
        </div>
    )
}
