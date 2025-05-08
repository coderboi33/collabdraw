"use client";
import { useOrganization } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import React from "react";

import EmptyOrg from "./_components/empty-org";
import BoardList from "./_components/board-list";

export default function Page() {
    const { organization } = useOrganization();
    const searchParams = useSearchParams(); // Use the hook to access searchParams

    const query = React.useMemo(() => ({
        search: searchParams.get("search") || undefined,
        favourites: searchParams.get("favourites") || undefined,
    }), [searchParams]); // Extract and memoize query parameters

    return (
        <div className=" flex-1 p-6 h-[calc(100vh-64px)] overflow-y-auto">
            {!organization ? (
                <EmptyOrg />
            ) : (
                <BoardList orgId={organization.id} query={query} />
            )}
        </div>
    );
}
