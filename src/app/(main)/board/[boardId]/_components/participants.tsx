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
        <div className="absolute top-4 right-4 z-20 flex items-center gap-3 bg-blue-200/90 backdrop-blur-md shadow-3xl shadow-blue-300/60 rounded-2xl px-5 py-2 min-h-14 transition-all">
            <span className="font-bold text-blue-900 text-base md:text-lg tracking-wide mr-4 select-none drop-shadow-sm">Participants</span>
            {!self && !users && (
                <div></div>
            )}
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