"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { Camera, CanvasMode, CanvasState, color, Layer, LayerType, Point, Side, XYWH } from "../../../../../../types/canvas";
import { useHistory, useCanRedo, useCanUndo, useMutation, useStorage, useOthersMapped, useSelf } from "../../../../../../liveblocks.config";
import { CursorsPresence } from "./cursorsPresence";
import { colorToCSSColor, findIntersectingLayers, getRandomColor, penPointToPathLayer, pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layerPreview";
import { SelectBox } from "./selectBox";
import { SelectionTools } from "./selectionTools";
import { Path } from "./path";
import { UseDisableScrollBounce } from "@/app/hooks/useDisableScrollBounce";
import { useDeleteLayers } from "@/app/hooks/useDeleteLayers";


interface CanvasProps {
    boardId: string;
}

const MAX_LIMIT = 100;

export default function Canvas({ boardId }: CanvasProps) {

    const layerIds = useStorage((storage) => storage.layerIds);

    const pencilDraft = useSelf((self) => self.presence.pencilDraft)

    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    });

    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
    const [lastUsedColor, setLastUsedColor] = useState<color>({
        r: 0,
        g: 0,
        b: 0,
    });


    UseDisableScrollBounce();
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
        const layer: LiveObject<Layer> = new LiveObject<Layer>(
            layerType === LayerType.Note
                ? {
                    type: LayerType.Note,
                    x: position.x,
                    y: position.y,
                    height: 100,
                    width: 100,
                    fill: lastUsedColor,
                    value: "", // NoteLayer requires value
                }
                : layerType === LayerType.Text
                    ? {
                        type: LayerType.Text,
                        x: position.x,
                        y: position.y,
                        height: 100,
                        width: 100,
                        fill: lastUsedColor,
                        value: "", // TextLayer allows value
                    }
                    : {
                        type: layerType as LayerType.Rectangle | LayerType.Ellipse,
                        x: position.x,
                        y: position.y,
                        height: 100,
                        width: 100,
                        fill: lastUsedColor,
                    }
        );

        liveLayerId.push(layerId);
        liveLayers.set(layerId, layer);

        setMyPresence({ selection: [layerId] }, { addToHistory: true });
        setCanvasState({
            mode: CanvasMode.None,
        });
    }, [lastUsedColor]);

    const updateSelectionNet = useMutation(({ storage, setMyPresence }, current: Point, origin: Point) => {

        const layers = storage.get("layers").toImmutable();
        setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });

        const ids = findIntersectingLayers(layerIds ?? [], layers, origin, current);
        console.log("updateSelectionNet", ids);

        setMyPresence({ selection: ids });

    }, [layerIds])

    const multiSelection = useCallback((current: Point, origin: Point) => {
        if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
            setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });
            console.log("multiSelection", {
                current,
                origin,
                mode: CanvasMode.SelectionNet
            });
        }
    }, [])

    const startDrawing = useMutation(({ setMyPresence }, point: Point, pressure: number) => {
        if (canvasState.mode !== CanvasMode.Pencil) {
            return;
        }

        setMyPresence({
            pencilDraft: [[point.x, point.y, pressure]],
            pencilColor: lastUsedColor,
        })
    }, [canvasState.mode, lastUsedColor]);


    const insertPath = useMutation(({ storage, self, setMyPresence }) => {
        console.log("insertPath");
        const liveLayers = storage.get("layers");
        const { pencilDraft } = self.presence;
        if (pencilDraft == null || pencilDraft.length < 2 || liveLayers.size >= MAX_LIMIT) {
            setMyPresence({ pencilDraft: null });
            return;
        }

        const layerId = nanoid();
        liveLayers.set(
            layerId, new LiveObject(penPointToPathLayer(pencilDraft, lastUsedColor))
        );

        const liveLayerIds = storage.get("layerIds");
        liveLayerIds.push(layerId);
        setMyPresence({
            pencilDraft: null,
        });
        setCanvasState({
            mode: CanvasMode.Pencil,
        });



    }, [lastUsedColor]);

    const continueDrawing = useMutation(({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
        console.log("continueDrawing");
        const { pencilDraft } = self.presence;
        if (canvasState.mode !== CanvasMode.Pencil || e.buttons !== 1 || pencilDraft == null) {
            return;
        }

        setMyPresence({
            cursor: point,
            pencilDraft:
                pencilDraft.length === 1 &&
                    pencilDraft[0][0] === point.x &&
                    pencilDraft[0][1] === point.y
                    ? pencilDraft
                    : [...pencilDraft, [point.x, point.y, e.pressure]],
        });

    }, [canvasState.mode]);

    const resizeLayer = useMutation(({ storage, self }, point: Point) => {
        if (canvasState.mode !== CanvasMode.Resizing) {
            return;
        }

        const bounds = resizeBounds(canvasState.initialBounds, canvasState.corner, point);

        const liveLayers = storage.get("layers");
        const layers = liveLayers.get(self.presence.selection[0]);

        if (layers) {
            layers.update(bounds);
        }
    }, [canvasState]);

    const unselectLayer = useMutation(({ self, setMyPresence }) => {
        if (self.presence) {
            setMyPresence({ selection: [] }, { addToHistory: true })
        }
    }, [])

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

    const translateLayer = useMutation(({ storage, self }, point: Point) => {
        if (canvasState.mode !== CanvasMode.Translating) {
            return;
        }

        const offset = {
            x: point.x - canvasState.current.x,
            y: point.y - canvasState.current.y
        };

        const liveLayers = storage.get("layers");
        for (const layerId of self.presence.selection) {
            const layer = liveLayers.get(layerId);
            if (layer) {
                layer.update({
                    x: layer.get('x') + offset.x,
                    y: layer.get('y') + offset.y,
                });
            }
        }

        setCanvasState({ mode: CanvasMode.Translating, current: point });

    }, [canvasState]);

    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault();
        const current = pointerEventToCanvasPoint(e, camera);

        if (canvasState.mode === CanvasMode.Pressing) {
            multiSelection(current, canvasState.origin);
        }

        else if (canvasState.mode === CanvasMode.SelectionNet) {
            updateSelectionNet(current, canvasState.origin);
        }

        else if (canvasState.mode === CanvasMode.Translating) {
            translateLayer(current);
        }

        else if (canvasState.mode === CanvasMode.Resizing) {
            resizeLayer(current);
            return;
        }
        else if (canvasState.mode === CanvasMode.Pencil) {
            continueDrawing(current, e);
        }

        setMyPresence({ cursor: current })
    }, [canvasState, resizeLayer, camera, translateLayer, continueDrawing, multiSelection, updateSelectionNet]);

    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null })
    }, []);

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        const point = pointerEventToCanvasPoint(e, camera);

        if (canvasState.mode === CanvasMode.Inserting) {
            return;
        }

        if (canvasState.mode === CanvasMode.Pencil) {
            startDrawing(point, e.pressure);
            return;
        }

        setCanvasState({ origin: point, mode: CanvasMode.Pressing });

    }, [canvasState.mode, camera, setCanvasState, startDrawing]);

    const onPointerUp = useMutation(({ }, e) => {
        e.preventDefault();
        const point = pointerEventToCanvasPoint(e, camera);

        if (canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing) {

            unselectLayer();

            setCanvasState({
                mode: CanvasMode.None
            })
        }

        else if (canvasState.mode === CanvasMode.Pencil) {
            insertPath();
        }

        else if (
            canvasState.mode === CanvasMode.Inserting &&
            (
                canvasState.layerType === LayerType.Rectangle ||
                canvasState.layerType === LayerType.Ellipse ||
                canvasState.layerType === LayerType.Text ||
                canvasState.layerType === LayerType.Note
            )
        ) {
            insertLayer(canvasState.layerType, point);
        } else {
            setCanvasState({
                mode: CanvasMode.None,
            })
        }
        history.resume();
    }, [camera, canvasState, history, insertLayer, setCanvasState, history, insertPath]);

    const getSelectionColor = useOthersMapped((other) => other.presence.selection)

    const layerIdToColorSelector = useMemo(() => {
        const layerIdToColor: Record<string, string> = {};
        for (const user of getSelectionColor) {

            const [connectionId, selection] = user;

            for (const layerId of selection) {
                layerIdToColor[layerId] = getRandomColor(connectionId);
            }
        }

        return layerIdToColor;
    }, [getSelectionColor]);

    const onLayerPointerdown = useMutation(({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
        if (canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Inserting) {
            return;
        }

        history.pause();
        e.stopPropagation();

        const point = pointerEventToCanvasPoint(e, camera);
        if (!self.presence.selection.includes(layerId)) {
            setMyPresence({
                selection: [layerId],
            }, {
                addToHistory: true
            })
        }
        setCanvasState({ mode: CanvasMode.Translating, current: point });

    }, [canvasState.mode, setCanvasState, camera, history]);

    const onResizeHandlePointerDown = useCallback((corner: Side, initialBounds: XYWH) => {
        console.log("onResizeHandlePointerDown", corner, initialBounds);
        history.pause();
        setCanvasState({
            mode: CanvasMode.Resizing,
            initialBounds,
            corner,
        })
    }, [history]);

    const deleteLayers = useDeleteLayers();

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            switch (e.key) {
                case "Escape": {
                    unselectLayer();
                    setCanvasState({ mode: CanvasMode.None });
                    break;
                }
                case "Delete":
                case "Backspace": {
                    deleteLayers();
                    break;
                }
                case "z": {
                    if (e.ctrlKey || e.metaKey) {
                        if (e.shiftKey) {
                            if (canRedo) {
                                history.redo();
                            }
                        } else {
                            if (canUndo) {
                                history.undo();
                            }
                        }
                    }
                    break;
                }
                //TODO: Add more shortcuts Ctrl + C, Ctrl + V, Ctrl + X
            }
        }
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        }
    }, [canRedo, canUndo, canvasState.mode, deleteLayers, history, unselectLayer]);

    return (
        <main className="h-full w-full touch-none relative text-white">
            <Info boardId={boardId} />
            <Participants />
            {/* <ExportComponent>
                <div className="absolute top-24 right-6 z-30 flex items-center gap-3 bg-white/90 backdrop-blur-lg shadow-2xl shadow-blue-200/60 rounded-xl px-4 py-2 min-h-12 transition-all border border-blue-300">
                    <Upload className="text-blue-900 w-5 h-5" />
                    <span className="font-bold text-blue-900 text-sm md:text-base tracking-wide select-none drop-shadow-sm">Export</span>
                </div>
            </ExportComponent> */}
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
            <SelectionTools
                camera={camera}
                setLastUsedColor={setLastUsedColor} />
            <svg className="h-[100vh] w-[100vw] bg-gray-100"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                onPointerUp={onPointerUp}
                onPointerDown={onPointerDown}
            >
                <g style={{
                    transform: `translate(${camera.x}px, ${camera.y}px)`
                }}>
                    {layerIds?.map((layerId) => (
                        <LayerPreview
                            key={layerId}
                            id={layerId}
                            onLayerPointerdown={(e, id) => { onLayerPointerdown(e, id) }}
                            selectionColor={layerIdToColorSelector[layerId]} />
                    ))}
                    <SelectBox
                        onResizeHandlePointerDown={onResizeHandlePointerDown} />

                    {canvasState.mode === CanvasMode.SelectionNet && canvasState.current != null && (
                        <rect className="fill-blue-400/5 stroke-blue-500 stroke-1"
                            x={Math.min(canvasState.origin.x, canvasState.current?.x)}
                            y={Math.min(canvasState.origin.y, canvasState.current?.y)}
                            width={Math.abs(canvasState.origin.x - canvasState.current?.x)}
                            height={Math.abs(canvasState.origin.y - canvasState.current?.y)}
                        />
                    )}
                    <CursorsPresence />
                    {pencilDraft != null && pencilDraft.length > 0 && (
                        <Path
                            points={pencilDraft}
                            fill={colorToCSSColor(lastUsedColor)}
                            x={0}
                            y={0}
                        />
                    )}
                </g>
            </svg>
        </main>
    );
}