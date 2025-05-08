import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface FooterProps {
    isFavourite?: boolean;
    title: string;
    authorLabel: string;
    createdAtLabel: string;
    onToggleFavourite: () => void; // New prop for toggling favorite
    disabled: boolean;
}

export function Footer({
    isFavourite,
    title,
    authorLabel,
    createdAtLabel,
    onToggleFavourite,
    disabled
}: FooterProps) {
    return (
        <div className="footer-container flex items-center justify-between p-4 border-t relative">
            <div className="info">
                <h3 className="title font-bold text-lg">{title}</h3>
                <p className="author text-sm text-gray-500">
                    {authorLabel} • {createdAtLabel}
                </p>
            </div>
            <button
                disabled={disabled}
                onClick={onToggleFavourite}
                className={cn(
                    "absolute text-muted-foreground",
                    disabled && "cursor-not-allowed opacity-75"
                )}
                style={{ right: "100px" }}
                aria-label="Toggle Favourite"
            >
                <Star className={cn(
                    "h-5 w-5",
                    isFavourite ? "text-yellow-500 fill-yellow-500" : "text-gray-400",
                    disabled && "cursor-not-allowed"
                )} />
            </button>
        </div>
    );
}