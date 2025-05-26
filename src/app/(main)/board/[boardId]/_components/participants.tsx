"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "./userAvatar";
import { useSelf, useOthers } from "../../../../../../liveblocks.config";
import { getRandomColor } from "@/lib/utils";

export function Participants() {

    const maxVisibleUsers = 2; // Maximum number of users to display

    const users = useOthers();
    const self = useSelf();
    const hasMoreUsers = users.length > maxVisibleUsers;

    return (
        <div className="absolute top-2 right-2 text-black bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            {self && (
                <UserAvatar
                    key={self.info?.imageUrl}
                    imageUrl={self.info?.imageUrl}
                    name={`${self.info?.name} (You)`}
                    fallback={self.info?.name?.[0]}
                    borderColor={getRandomColor(self.connectionId)}
                />
            )}
            {users.slice(0, maxVisibleUsers)
                .map(({ connectionId, info }) => {
                    return (
                        <UserAvatar
                            key={connectionId}
                            imageUrl={info?.imageUrl}
                            name={info?.name}
                            fallback={info?.name?.[0] || "T"}
                            borderColor={getRandomColor(connectionId)}
                        />
                    )
                })}
            {hasMoreUsers && (
                <UserAvatar
                    name={`+${users.length - maxVisibleUsers} more`}
                    fallback={`+${users.length - maxVisibleUsers}`}
                />
            )}
        </div>
    );
}

// Skeleton for Participants
export const ParticipantsSkeleton = () => (
    <div className="absolute top-2 right-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
        <Skeleton className="w-32 h-8 rounded" />
    </div>
);