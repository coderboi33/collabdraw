import { Loader } from "lucide-react";
import { ToolbarSkeleton } from "./toolbar";
import { ParticipantsSkeleton } from "./participants";
import { InfoSkeleton } from "./info";

export function Loading() {
    return (
        <main className="bg-white h-full w-full touch-none fixed flex items-center justify-center">
            <Loader className="animate-spin text-gray-400" size={32} />
            <InfoSkeleton />
            <ParticipantsSkeleton />
            <ToolbarSkeleton />
        </main>
    );
}
//TODO make the loading screen more beautiful and add a loading animation