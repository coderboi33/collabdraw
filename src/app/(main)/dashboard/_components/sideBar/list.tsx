"use client";

import { useOrganizationList } from "@clerk/clerk-react";
import SideBarItem from "./item";

export default function List() {

    const { userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });

    if (!userMemberships?.data?.length) return null;

    return (
        <ul className="flex flex-col items-center gap-y-4">
            {userMemberships.data?.map((mem) => (
                <SideBarItem
                    key={mem.organization.id}
                    id={mem.organization.id}
                    name={mem.organization.name}
                    imageUrl={mem.organization.imageUrl}
                />
            ))}
        </ul>
    )
}