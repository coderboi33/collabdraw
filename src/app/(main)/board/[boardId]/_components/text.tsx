import { Indie_Flower } from 'next/font/google';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

import { TextLayer } from "../../../../../../types/canvas";
import { cn, colorToCSSColor } from '@/lib/utils';
import { useMutation } from '../../../../../../liveblocks.config';

const font = Indie_Flower({
    subsets: ['latin'],
    weight: '400',
});

interface TextProps {
    id: string;
    layer: TextLayer;
    onPointerdown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
}

export const Text = ({ id, layer, onPointerdown, selectionColor }: TextProps) => {
    const { x, y, width, height, fill, value } = layer;

    const calculateFontSize = (width: number, height: number, text: string) => {
        const maxFontSize = 96;
        const minFontSize = 10;

        // Estimate lines needed if wrapping (based on width and font size)
        let fontSize = maxFontSize;
        while (fontSize > minFontSize) {
            const charsPerLine = Math.max(Math.floor(width / (fontSize * 0.7)), 1);
            const estimatedLines = text
                .split('\n')
                .map(line => Math.max(1, Math.ceil(line.length / charsPerLine)))
                .reduce((a, b) => a + b, 0);
            const requiredHeight = estimatedLines * fontSize * 1.15;
            if (requiredHeight <= height) {
                break;
            }
            fontSize -= 1;
        }
        return Math.max(fontSize, minFontSize);
    }

    const updateValue = useMutation(({ storage }, value: string) => {
        const liveLayers = storage.get("layers");
        const layerToUpdate = liveLayers.get(id);
        if (layerToUpdate) {
            layerToUpdate.set("value", value);
        }
    }, [])

    const handleChange = (e: ContentEditableEvent) => {
        const newValue = e.target.value;
        updateValue(newValue);
    }
    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e) => { onPointerdown(e, id) }}
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
            }}>
            <ContentEditable
                html={value || ""}
                onChange={handleChange}
                className={cn(
                    "h-full w-full block text-center drop-shadow-md outline-none break-words whitespace-pre-wrap",
                    font.className,
                )}
                style={{
                    color: fill ? colorToCSSColor(fill) : "#000",
                    fontSize: calculateFontSize(width, height, value || ""),
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                    lineHeight: 1,
                    margin: 0,
                    padding: "8px 12px",
                    background: "transparent",
                    boxSizing: "border-box",
                }}
            />
        </foreignObject>
    );
}