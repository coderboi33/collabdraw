import { colorToCSSColor } from "@/lib/utils";
import { RectangleLayer } from "../../../../../../types/canvas";

interface RectangleProps {
    id: string;
    layer: RectangleLayer;
    onPointerdown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
}

export const Rectangle = ({ id, layer, onPointerdown, selectionColor }: RectangleProps) => {

    const { x, y, width, height, fill } = layer

    return (
        <rect className="drop-shadow-md"
            onPointerDown={(e) => { onPointerdown(e, id) }}
            style={{
                transform: `translate(${x}px, ${y}px)`,
            }}
            x={0}
            y={0}
            width={width}
            height={height}
            strokeWidth={2}
            fill={fill ? colorToCSSColor(fill) : "#000"}
            stroke={selectionColor || "transparent"} />
    )
}