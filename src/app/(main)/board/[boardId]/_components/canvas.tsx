"use client";

import { useCallback, useState } from "react";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { Camera, CanvasMode, CanvasState, color, LayerType, Point } from "../../../../../../types/canvas";
import { useHistory, useCanRedo, useCanUndo, useMutation, useStorage } from "../../../../../../liveblocks.config";
import { CursorsPresence } from "./cursorsPresence";
import { pointerEventToCanvasPoint } from "@/lib/utils";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";


interface CanvasProps {
    boardId: string;
}

const MAX_LIMIT = 1000;

export default function Canvas({ boardId }: CanvasProps) {

    const layerIds = useStorage((storage) => storage.layerIds);

    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    });

    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
    const [lastUsedColor, setLastUsedColor] = useState<color>({
        r: 0,
        g: 0,
        b: 0,
    });

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const insertLayer = useMutation(({ storage, setMyPresence },
        layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
        position: Point
    ) => {
        const liveLayers = storage.get("layers");
        if (liveLayers.size >= MAX_LIMIT) {
            return;
        }
        const liveLayerId = storage.get("layerIds");
        const layerId = nanoid();
        const layer = new LiveObject({
            id: layerId,
            type: layerType,
            x: position.x,
            y: position.y,
            height: 100,
            width: 100,
            fill: lastUsedColor,
        });

        liveLayers.set(layerId, layer);
        liveLayerId.push(layerId);

        setMyPresence({ selection: [layerId] }, { addToHistory: true });
        setCanvasState({
            mode: CanvasMode.None,
        });
    }, [lastUsedColor]);

    const onWheel = useCallback((e: React.WheelEvent) => {

        console.log({
            x: e.deltaX,
            y: e.deltaY
        })

        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY

        }))
    }, [])

    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault();
        const current = pointerEventToCanvasPoint(e, camera);

        setMyPresence({ cursor: current })
    }, []);

    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null })
    }, []);

    return (
        <main className="h-full w-full touch-none relative text-white">
            <Info boardId={boardId} />
            <Participants />
            <Toolbar
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                canRedo={canRedo}
                canUndo={canUndo}
                undo={() => {
                    history.undo();
                }}
                redo={() => {
                    history.redo();
                }}
            />
            <svg className="h-[100vh] w-[100vw]"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
            >
                <g style={{
                    transform: `translate(${camera.x}px, ${camera.y}px)`
                }}>
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    );
}