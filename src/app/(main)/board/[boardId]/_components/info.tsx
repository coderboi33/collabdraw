"use client";

import { useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Hint from "@/components/hint/hint";
import { useRenameModel } from "../../../../../../store/use-rename-model";
import { Actions } from "@/components/Actions";
import { MenuIcon } from "lucide-react";

interface InfoProps {
    boardId: string;
}

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
})

export function Info({ boardId }: InfoProps) {

    const onOpen = useRenameModel((state) => state.onOpen);

    const data = useQuery(api.board.get, {
        id: boardId as Id<"boards">,
    });

    if (!data) {
        return <InfoSkeleton />;
    }

    return (
        <div className="flex items-center gap-2">
            <Hint label="Go to Dashboard" side="bottom" sideOffset={10}>
                <Button asChild variant="board" className="px-2 pl-2">
                    <Link href={`/dashboard`} className="flex items-center gap-2">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={50}
                            height={50}></Image>
                        <span className={cn(
                            "font-semibold text-xl text-black",
                            font.className,
                        )
                        }>
                            Collabdraw
                        </span>
                    </Link>
                </Button>
            </Hint>
            <span className="text-neutral-300 text-xl px-2 select-none">|</span>
            <Hint label="Change Board Title" side="bottom" sideOffset={10}>
                <Button
                    variant="board"
                    className={cn(
                        "px-4 py-1 text-base font-semibold rounded-md bg-neutral-100 hover:bg-neutral-200 transition-colors border border-neutral-200 shadow-sm",
                        font.className
                    )}
                    onClick={() => onOpen(data._id, data.title)}
                >
                    {data.title}
                </Button>
            </Hint>
            <span className="text-neutral-300 text-xl px-2 select-none">|</span>
            <Actions
                id={data._id}
                title={data.title}
                side="bottom"
                sideOffset={10}>
                <div>
                    <Hint label="Main menu" side="bottom" sideOffset={10}>
                        <Button className="bg-transparent hover:bg-neutral-200 transition-colors rounded-md p-2">
                            <MenuIcon className="size-5 text-neutral-500" />
                        </Button>
                    </Hint>
                </div>
            </Actions>
        </div>
    );
}


// Skeleton for Info
export const InfoSkeleton = () => (
    <div className="flex items-center gap-2">
        <Skeleton className="w-[50px] h-[50px] rounded" />
        <span className="text-neutral-300 text-xl px-2 select-none">|</span>
        <Skeleton className="h-8 w-32 rounded-md" />
        <span className="text-neutral-300 text-xl px-2 select-none">|</span>
        <Skeleton className="h-10 w-10 rounded-md" />
    </div>
);
