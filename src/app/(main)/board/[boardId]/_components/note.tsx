import { Roboto_Mono } from 'next/font/google'; // Use a clean, professional monospace font
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { Paperclip } from 'lucide-react'; // Add this import

import { NoteLayer } from "../../../../../../types/canvas";
import { cn, colorToCSSColor, getContrastingColor } from '@/lib/utils';
import { useMutation } from '../../../../../../liveblocks.config';

const font = Roboto_Mono({
    subsets: ['latin'],
    weight: '400',
});

interface NoteProps {
    id: string;
    layer: NoteLayer;
    onPointerdown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
}

export const Note = ({ id, layer, onPointerdown, selectionColor }: NoteProps) => {
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
                outline: selectionColor ? `2px solid ${selectionColor}` : 'none',
                backgroundColor: fill ? colorToCSSColor(fill) : "#FFF9B1", // sticky note yellow
                borderRadius: "12px",
                boxShadow: "0 4px 16px 0 rgba(0,0,0,0.10), 0 1.5px 0 0 #e6d267",
            }}
            className='drop-shadow-xl shadow-md'
        >
            <div style={{
                position: "relative",
                width: "100%",
                height: "100%",
            }}>
                {/* Paperclip icon in the top-left corner */}
                <span style={{
                    position: "absolute",
                    top: 8,
                    left: 10,
                    zIndex: 2,
                    pointerEvents: "none",
                    opacity: 0.7,
                }}>
                    <Paperclip size={20} color="#000" strokeWidth={2} />
                </span>
                <ContentEditable
                    html={value || ""}
                    onChange={handleChange}
                    className={cn(
                        "h-full w-full block text-left outline-none break-words whitespace-pre-wrap m-0",
                        font.className,
                    )}
                    style={{
                        color: fill ? getContrastingColor(fill) : "#444",
                        fontSize: calculateFontSize(width, height, value || ""),
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.2,
                        margin: 0,
                        padding: "16px 12px 14px 18px", // more padding for sticky note feel
                        background: "transparent",
                        minHeight: "100%",
                        minWidth: "100%",
                        boxSizing: "border-box",
                        position: "relative",
                        zIndex: 1,
                    }}
                />
            </div>
        </foreignObject>
    );
}






// import { Roboto_Mono } from 'next/font/google'; // Use a clean, professional monospace font
// import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

// import { NoteLayer } from "../../../../../../types/canvas";
// import { cn, colorToCSSColor, getContrastingColor } from '@/lib/utils';
// import { useMutation } from '../../../../../../liveblocks.config';

// const font = Roboto_Mono({
//     subsets: ['latin'],
//     weight: '400',
// });

// interface NoteProps {
//     id: string;
//     layer: NoteLayer;
//     onPointerdown: (e: React.PointerEvent, layerId: string) => void;
//     selectionColor?: string;
// }

// export const Note = ({ id, layer, onPointerdown, selectionColor }: NoteProps) => {
//     const { x, y, width, height, fill, value } = layer;

//     const calculateFontSize = (width: number, height: number, text: string) => {
//         const maxFontSize = 96;
//         const minFontSize = 10;
//         const lineLengths = text.split('\n').map(line => line.length);

//         // Estimate lines needed if wrapping (based on width and font size)
//         let fontSize = maxFontSize;
//         while (fontSize > minFontSize) {
//             const charsPerLine = Math.max(Math.floor(width / (fontSize * 0.7)), 1);
//             const estimatedLines = text
//                 .split('\n')
//                 .map(line => Math.max(1, Math.ceil(line.length / charsPerLine)))
//                 .reduce((a, b) => a + b, 0);
//             const requiredHeight = estimatedLines * fontSize * 1.15;
//             if (requiredHeight <= height) {
//                 break;
//             }
//             fontSize -= 1;
//         }
//         return Math.max(fontSize, minFontSize);
//     }

//     const updateValue = useMutation(({ storage }, value: string) => {
//         const liveLayers = storage.get("layers");
//         const layerToUpdate = liveLayers.get(id);
//         if (layerToUpdate) {
//             layerToUpdate.set("value", value);
//         }
//     }, [])

//     const handleChange = (e: ContentEditableEvent) => {
//         const newValue = e.target.value;
//         updateValue(newValue);
//     }
//     return (
//         <foreignObject
//             x={x}
//             y={y}
//             width={width}
//             height={height}
//             onPointerDown={(e) => { onPointerdown(e, id) }}
//             style={{
//                 outline: selectionColor ? `2px solid ${selectionColor}` : 'none',
//                 backgroundColor: fill ? colorToCSSColor(fill) : "#FFF9B1", // sticky note yellow
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 16px 0 rgba(0,0,0,0.10), 0 1.5px 0 0 #e6d267",
//             }}
//             className='drop-shadow-xl shadow-md'
//         >
//             <ContentEditable
//                 html={value || ""}
//                 onChange={handleChange}
//                 className={cn(
//                     "h-full w-full block text-left outline-none break-words whitespace-pre-wrap m-0",
//                     font.className,
//                 )}
//                 style={{
//                     color: fill ? getContrastingColor(fill) : "#444",
//                     fontSize: calculateFontSize(width, height, value || ""),
//                     wordBreak: "break-word",
//                     whiteSpace: "pre-wrap",
//                     lineHeight: 1.2,
//                     margin: 0,
//                     padding: "16px 12px 14px 18px", // more padding for sticky note feel
//                     background: "transparent",
//                 }}
//             />
//         </foreignObject>
//     );
// }