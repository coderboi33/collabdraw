import Hint from "@/components/hint/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
    name?: string;
    imageUrl?: string;
    fallback?: string;
    borderColor?: string;
}

export function UserAvatar({ name, imageUrl, fallback, borderColor }: UserAvatarProps) {
    return (
        <div>
            <Hint label={name || "Teammate"} side="bottom" sideOffset={10}>
                <Avatar className="h-8 w-8 border-3"
                    style={{ borderColor: borderColor }}>
                    <AvatarImage src={imageUrl} />
                    <AvatarFallback className="bg-transparent text-gray-600 font-bold">
                        {fallback}
                    </AvatarFallback>
                </Avatar>
            </Hint>
        </div>
    )
}