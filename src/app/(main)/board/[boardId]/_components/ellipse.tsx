import { colorToCSSColor } from "@/lib/utils";
import { EllipseLayer } from "../../../../../../types/canvas";

interface EllipseProps {
    id: string;
    layer: EllipseLayer;
    onPointerdown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
}

export const Ellipse = ({ id, layer, onPointerdown, selectionColor }: EllipseProps) => {
    const { x, y, width, height, fill } = layer;

    return (
        <ellipse
            className="drop-shadow-md"
            onPointerDown={(e) => { onPointerdown(e, id) }}
            style={{
                transform: `translate(${x}px, ${y}px)`,
            }}
            cx={width / 2}
            cy={height / 2}
            rx={width / 2}
            ry={height / 2}
            strokeWidth={2}
            fill={fill ? colorToCSSColor(fill) : "#000"}
            stroke={selectionColor || "transparent"}
        />
    );
}