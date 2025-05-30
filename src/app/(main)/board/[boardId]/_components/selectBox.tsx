"use client";

import { memo } from "react";
import { LayerType, Side, XYWH } from "../../../../../../types/canvas";
import { useSelf, useStorage } from "../../../../../../liveblocks.config";
import { useSelectionBounds } from "@/app/hooks/useSelectionBounds";

interface SelectBoxProps {
    onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
};

const HANDLE_SIZE = 8;

export const SelectBox = memo(({ onResizeHandlePointerDown }: SelectBoxProps) => {

    const selfLayerId = useSelf((self) => self.presence.selection.length === 1 ? self.presence.selection[0] : null);

    const isShowingHandle = useStorage((storage) =>
        selfLayerId && storage.layers.get(selfLayerId)?.type !== LayerType.Path
    );

    const bounds = useSelectionBounds();

    if (!bounds || !isShowingHandle) {
        return null;
    }


    return (
        <>
            <rect className="fill-transparent stroke-blue-600 stroke-2 pointer-events-none"
                style={{
                    transform: `translateX(${bounds.x}px) translateY(${bounds.y}px)`,
                }}
                x={0}
                y={0}
                width={bounds.width}
                height={bounds.height} />
            {isShowingHandle && (
                <>
                    {/* Bottom right corner */}
                    <rect className="fill-white stroke-1 stroke-blue-400 "
                        x={0}
                        y={0}
                        style={{
                            cursor: "nwse-resize",
                            width: `${HANDLE_SIZE}px`,
                            height: `${HANDLE_SIZE}px`,
                            transform: `translateX(${bounds.x + bounds.width - HANDLE_SIZE / 2}px) translateY(${bounds.y + bounds.height - HANDLE_SIZE / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds);
                        }} />
                    {/* Right side */}
                    <rect className="fill-white stroke-1 stroke-blue-400 "
                        x={0}
                        y={0}
                        style={{
                            cursor: "ew-resize",
                            width: `${HANDLE_SIZE}px`,
                            height: `${HANDLE_SIZE}px`,
                            transform: `translateX(${bounds.x + bounds.width - HANDLE_SIZE / 2}px) translateY(${bounds.y + bounds.height / 2 - HANDLE_SIZE / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Right, bounds);
                        }} />
                    {/* Bottom side */}
                    <rect className="fill-white stroke-1 stroke-blue-400 "
                        x={0}
                        y={0}
                        style={{
                            cursor: "ns-resize",
                            width: `${HANDLE_SIZE}px`,
                            height: `${HANDLE_SIZE}px`,
                            transform: `translateX(${bounds.x + bounds.width / 2 - HANDLE_SIZE / 2}px) translateY(${bounds.y + bounds.height - HANDLE_SIZE / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Bottom, bounds);
                        }} />
                </>
            )}
        </>
    )
})

SelectBox.displayName = "SelectBox";