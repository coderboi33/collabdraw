"use client"

import { memo } from "react";
import { useOther } from "../../../../../../liveblocks.config";
import { MousePointer2 } from "lucide-react";
import { getRandomColor } from "@/lib/utils";

interface CursorProps {
    connectionId: number;
}

export const Cursor = memo(({ connectionId }: CursorProps) => {

    const info = useOther(connectionId, (user) => {
        return user?.info;
    });

    const name = info?.name;
    const width = name ? name.length * 10 + 24 : 50;

    const cursor = useOther(connectionId, (user) => {
        return user?.presence?.cursor;
    });


    if (!cursor) {
        return null;
    }


    const { x, y } = cursor;

    return (
        <foreignObject style={{
            transform: `translateX(${x}px) translateY(${y}px)`
        }}
            height={50}
            width={width}
            className="relative drop-shadow-md" >
            <MousePointer2 className="h-5 w-5"
                style={{
                    fill: getRandomColor(connectionId),
                    color: getRandomColor(connectionId)
                }} />
            <div className="absolute top-0 left-5 px-1.5 py-0.5 rounded-md bg-white text-xs font-semibold text-white"
                style={{
                    backgroundColor: getRandomColor(connectionId)
                }}>
                {name}
            </div>
        </foreignObject>
    );
});

Cursor.displayName = "Cursor";


