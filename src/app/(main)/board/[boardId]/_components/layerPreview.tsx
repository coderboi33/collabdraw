"use client";

import { memo } from "react";
import { useStorage } from "../../../../../../liveblocks.config";
import { LayerType } from "../../../../../../types/canvas";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";
import { Text } from "./text";
import { Note } from "./note";
import { Path } from "./path";
import { colorToCSSColor } from "@/lib/utils";

interface LayerPreviewProps {
    id: string;
    onLayerPointerdown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
}

export const LayerPreview = memo(({ id, onLayerPointerdown, selectionColor }: LayerPreviewProps) => {

    const layer = useStorage((storage) => storage.layers.get(id));
    if (!layer) {
        return null; // or a placeholder if the layer is not found
    }

    switch (layer.type) {
        case LayerType.Rectangle:
            return (
                <Rectangle
                    id={id}
                    layer={layer}
                    onPointerdown={onLayerPointerdown}
                    selectionColor={selectionColor} />
            )
        case LayerType.Ellipse:
            return (
                <Ellipse
                    id={id}
                    layer={layer}
                    onPointerdown={onLayerPointerdown}
                    selectionColor={selectionColor}
                />
            )
        case LayerType.Text:
            return (
                <Text
                    id={id}
                    layer={layer}
                    onPointerdown={onLayerPointerdown}
                    selectionColor={selectionColor}
                />
            )
        case LayerType.Note:
            return (
                <Note
                    id={id}
                    layer={layer}
                    onPointerdown={onLayerPointerdown}
                    selectionColor={selectionColor}
                />
            )
        case LayerType.Path:
            return (
                <Path
                    id={id}
                    x={layer.x}
                    y={layer.y}
                    points={layer.points}
                    fill={(layer.fill) ? colorToCSSColor(layer.fill) : "#000"}
                    onPointerdown={(e) => onLayerPointerdown(e, id)}
                    selectionColor={selectionColor}
                />
            )
        default:
            console.warn(`Unsupported layer type`);
            return (
                null
            )
    }

})

LayerPreview.displayName = "LayerPreview";