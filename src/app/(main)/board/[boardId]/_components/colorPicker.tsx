"use client";

import { useMutation } from "../../../../../../liveblocks.config";
import { color } from "../../../../../../types/canvas";
import { colorToCSSColor } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ColorPickerProps {
    onChange: (color: color) => void;
}

export function ColorPicker({ onChange }: ColorPickerProps) {
    return (
        <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
            <ColorButton
                color={{ r: 243, g: 30, b: 10 }}
                onClick={onChange}
                hint="Red/Orange"
            />
            <ColorButton
                color={{ r: 34, g: 197, b: 94 }}
                onClick={onChange}
                hint="Green"
            />
            <ColorButton
                color={{ r: 59, g: 130, b: 246 }}
                onClick={onChange}
                hint="Blue"
            />
            <ColorButton
                color={{ r: 250, g: 204, b: 21 }}
                onClick={onChange}
                hint="Yellow"
            />
            <ColorButton
                color={{ r: 0, g: 0, b: 0 }}
                onClick={onChange}
                hint="Black"
            />
            <ColorButton
                color={{ r: 255, g: 255, b: 255 }}
                onClick={onChange}
                hint="White"
            />
            <ColorButton
                color={{ r: 168, g: 85, b: 247 }}
                onClick={onChange}
                hint="Purple"
            />
            <ColorButton
                color={{ r: 251, g: 146, b: 60 }}
                onClick={onChange}
                hint="Orange"
            />
        </div>
    )
}

interface ColorButtonProps {
    color: color;
    onClick: (color: color) => void;
    hint?: string;
}
function ColorButton({ color, onClick, hint }: ColorButtonProps) {


    const unselectLayer = useMutation(({ self, setMyPresence }) => {
        if (self.presence) {
            setMyPresence({ selection: [] }, { addToHistory: true })
        }
    }, [])

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
                    onClick={() => {
                        onClick(color);
                        unselectLayer();
                    }}
                >
                    <div className="h-8 w-8 rounded-md border border-neutral-300"
                        style={{
                            background: colorToCSSColor(color),
                        }} />
                </button>
            </TooltipTrigger>
            {hint && (
                <TooltipContent side="top">
                    {hint}
                </TooltipContent>
            )}
        </Tooltip>
    )
}