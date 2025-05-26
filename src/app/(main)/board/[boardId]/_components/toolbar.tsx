"use client";

import { Pencil, Square, Circle, Eraser, MousePointer2, StickyNote, Type, Undo, Redo } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ToolButton } from "./toolButton";
import { CanvasMode, CanvasState, LayerType } from "../../../../../../types/canvas";


interface ToolbarProps {
    canvasState?: CanvasState;
    setCanvasState?: (state: CanvasState) => void;
    undo?: () => void;
    redo?: () => void;
    canUndo?: boolean;
    canRedo?: boolean;
}

export function Toolbar({ canvasState, setCanvasState, undo, redo, canUndo, canRedo }: ToolbarProps) {

    return (
        <div className="fixed bottom-4 left-[52%] transform -translate-x-1/2 flex items-center gap-4">
            <div className="bg-[#e0e0e0] rounded-2xl px-8 py-2 h-auto flex items-center gap-8 shadow-2xl border border-[#e0e0e0]">
                <ToolButton
                    label="Select"
                    icon={MousePointer2}
                    onClick={() => {
                        setCanvasState?.({
                            mode: CanvasMode.None
                        });
                    }}
                    isActive={
                        canvasState?.mode === CanvasMode.None ||
                        canvasState?.mode === CanvasMode.Translating ||
                        canvasState?.mode === CanvasMode.SelectionNet ||
                        canvasState?.mode === CanvasMode.Pressing ||
                        canvasState?.mode === CanvasMode.Resizing

                    }
                />
                <ToolButton
                    label="Draw"
                    icon={Pencil}
                    onClick={() => {
                        setCanvasState?.({
                            mode: CanvasMode.Pencil,
                        })
                    }}
                    isActive={
                        canvasState?.mode === CanvasMode.Pencil
                    }
                />
                <ToolButton
                    label="Rectangle"
                    icon={Square}
                    onClick={() => {
                        setCanvasState?.({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Rectangle
                        })
                    }}
                    isActive={
                        canvasState?.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Rectangle
                    }
                />
                <ToolButton
                    label="Ellipse"
                    icon={Circle}
                    onClick={() => {
                        setCanvasState?.({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Ellipse
                        })
                    }}
                    isActive={
                        canvasState?.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Ellipse
                    }
                />
                <ToolButton
                    label="Eraser"
                    icon={Eraser}
                    onClick={() => console.log("Eraser tool clicked")}
                    isActive={false} // Assuming Eraser is not the active tool
                //TODO eraser funtionality
                />
                <ToolButton
                    label="Text"
                    icon={Type}
                    onClick={() => {
                        setCanvasState?.({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Text
                        });
                    }}
                    isActive={
                        canvasState?.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Text
                    }
                />
                <ToolButton
                    label="Sticky Note"
                    icon={StickyNote}
                    onClick={() => {
                        setCanvasState?.({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Note
                        })
                    }}
                    isActive={
                        canvasState?.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Note
                    }
                />
            </div>
            <div className="bg-[#e0e0e0] rounded-2xl px-4 py-1 h-auto flex items-center gap-4 shadow-2xl border border-[#e0e0e0]">
                <ToolButton
                    label="Undo"
                    icon={Undo}
                    onClick={() => console.log("Undo clicked")}
                    disabled={!canUndo}
                />
                <ToolButton
                    label="Redo"
                    icon={Redo}
                    onClick={() => console.log("Redo clicked")}
                    disabled={!canRedo}
                />
            </div>
        </div>
    );
}

export const ToolbarSkeleton = () => {
    return (
        <div className="fixed bottom-4 left-[52%] transform -translate-x-1/2 flex items-center gap-4">
            <div className="bg-[#f3f3f3] rounded-2xl px-8 py-2 h-auto flex items-center gap-8 shadow-2xl border border-[#e0e0e0]">
                {/* 7 tool skeletons for consistency with Toolbar */}
                <div className="toolbar-item flex flex-col items-center cursor-pointer p-2 rounded-md shadow-md">
                    <Skeleton className="w-7 h-7 rounded-full" />
                    <Skeleton className="w-12 h-4 mt-1 rounded" />
                </div>
                <div className="toolbar-item flex flex-col items-center cursor-pointer p-2 rounded-md shadow-md">
                    <Skeleton className="w-7 h-7 rounded-full" />
                    <Skeleton className="w-12 h-4 mt-1 rounded" />
                </div>
                <div className="toolbar-item flex flex-col items-center cursor-pointer p-2 rounded-md shadow-md">
                    <Skeleton className="w-7 h-7 rounded-full" />
                    <Skeleton className="w-12 h-4 mt-1 rounded" />
                </div>
                <div className="toolbar-item flex flex-col items-center cursor-pointer p-2 rounded-md shadow-md">
                    <Skeleton className="w-7 h-7 rounded-full" />
                    <Skeleton className="w-12 h-4 mt-1 rounded" />
                </div>
                <div className="toolbar-item flex flex-col items-center cursor-pointer p-2 rounded-md shadow-md">
                    <Skeleton className="w-7 h-7 rounded-full" />
                    <Skeleton className="w-12 h-4 mt-1 rounded" />
                </div>
                <div className="toolbar-item flex flex-col items-center cursor-pointer p-2 rounded-md shadow-md">
                    <Skeleton className="w-7 h-7 rounded-full" />
                    <Skeleton className="w-12 h-4 mt-1 rounded" />
                </div>
                <div className="toolbar-item flex flex-col items-center cursor-pointer p-2 rounded-md shadow-md">
                    <Skeleton className="w-7 h-7 rounded-full" />
                    <Skeleton className="w-12 h-4 mt-1 rounded" />
                </div>
            </div>
            <div className="bg-[#f3f3f3] rounded-2xl px-4 py-1 h-auto flex items-center gap-4 shadow-2xl border border-[#e0e0e0]">
                {/* 2 skeletons for undo/redo */}
                <div className="toolbar-item flex flex-col items-center cursor-pointer p-1 rounded-md shadow-md">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="w-10 h-3 mt-1 rounded" />
                </div>
                <div className="toolbar-item flex flex-col items-center cursor-pointer p-1 rounded-md shadow-md">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="w-10 h-3 mt-1 rounded" />
                </div>
            </div>
        </div>
    );
}