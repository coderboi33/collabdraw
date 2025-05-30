"use client";

import { useSelectionBounds } from "@/app/hooks/useSelectionBounds";
import { useMutation, useSelf } from "../../../../../../liveblocks.config";
import { Camera, color } from "../../../../../../types/canvas";
import { memo } from "react";
import { ColorPicker } from "./colorPicker";
import { useDeleteLayers } from "@/app/hooks/useDeleteLayers";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";
import Hint from "@/components/hint/hint";

interface SelectionToolsProps {
    camera: Camera,
    setLastUsedColor: (color: color) => void;
};

export const SelectionTools = memo(({ camera, setLastUsedColor }: SelectionToolsProps) => {

    const selection = useSelf((self) => self.presence.selection);

    const moveToBack = useMutation(({ storage }) => {
        const liveLayersIds = storage.get("layerIds");
        const indices: number[] = []

        const arr = liveLayersIds.toImmutable();
        for (let i = 0; i < arr.length; i++) {
            if (selection?.includes(arr[i])) {
                indices.push(i);
            }
        }

        for (let i = 0; i < indices.length; i++) {
            liveLayersIds.move(indices[i], i);
        }
    }, [selection]);

    const moveToFront = useMutation(({ storage }) => {
        const liveLayersIds = storage.get("layerIds");
        const indices: number[] = []

        const arr = liveLayersIds.toImmutable();
        for (let i = 0; i < arr.length; i++) {
            if (selection?.includes(arr[i])) {
                indices.push(i);
            }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
            liveLayersIds.move(indices[i], arr.length - 1 - (indices.length - 1 - i));
        }
    }, [selection]);


    const setFill = useMutation(({ storage }, fill: color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        if (selection) {
            selection.forEach((layerId) => {
                liveLayers.get(layerId)?.set("fill", fill);
            });
        }
    }, [selection, setLastUsedColor]);

    const deleteLayers = useDeleteLayers();

    const selectionBounds = useSelectionBounds();
    if (!selectionBounds)
        return null;
    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y; // top of selection

    return (
        <div className="fixed p-3 rounded-xl text-black bg-white/50 shadow-sm border flex select-none"
            style={{
                left: 0,
                top: 0,
                transform: `translate(calc(${x}px - 50%), calc(${y}px - 48px))`, // 48px above selection
                zIndex: 50,
            }}>
            <ColorPicker
                onChange={setFill} />
            <div className="flex flex-col gap-y-0.5">
                <Hint label="Bring to front" side="top">
                    <Button variant="board"
                        size={"icon"}
                        onClick={moveToFront}>
                        <BringToFront />
                    </Button>
                </Hint>
                <Hint label="Send to back" side="bottom">
                    <Button variant="board"
                        size={"icon"}
                        onClick={moveToBack}>
                        <SendToBack />
                    </Button>
                </Hint>

            </div>
            <div className="flex items-center gap-2">
                <Hint label="Delete">
                    <Button variant="board"
                        size={"icon"}
                        onClick={deleteLayers}>
                        <Trash2 />
                    </Button>
                </Hint>
            </div>
        </div>
    );
})
SelectionTools.displayName = "SelectionTools";