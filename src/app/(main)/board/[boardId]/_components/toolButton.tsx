"use client";

import Hint from "@/components/hint/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolButtonProps {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
}

export function ToolButton({
    label,
    icon: Icon,
    onClick,
    isActive = false,
    disabled = false,
}: ToolButtonProps) {
    return (
        <Hint label={label} side="top" sideOffset={20}>
            <Button disabled={disabled}
                onClick={onClick}
                size={"icon"}
                variant={isActive ? "boardActive" : "board"}
            >
                <Icon />
            </Button>
        </Hint>
    );
}