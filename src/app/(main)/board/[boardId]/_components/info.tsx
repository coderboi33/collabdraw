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
        <div className="flex items-center gap-5 py-2 px-2">
            <Hint label="Go to Dashboard" side="bottom" sideOffset={10}>
                <Button asChild variant="board" className="px-3 pl-3 py-2">
                    <Link href={`/dashboard`} className="flex items-center gap-3">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={60}
                            height={60}></Image>
                        <span className={cn(
                            "font-semibold text-2xl text-black",
                            font.className,
                        )
                        }>
                            Collabdraw
                        </span>
                    </Link>
                </Button>
            </Hint>
            <span className="text-neutral-300 text-2xl px-3 select-none">|</span>
            <Hint label="Change Board Title" side="bottom" sideOffset={10}>
                <Button
                    variant="board"
                    className={cn(
                        "px-6 py-2 text-lg font-semibold rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors border border-neutral-200 shadow-sm",
                        font.className
                    )}
                    onClick={() => onOpen(data._id, data.title)}
                >
                    {data.title}
                </Button>
            </Hint>
            <span className="text-neutral-300 text-2xl px-3 select-none">|</span>
            <Actions
                id={data._id}
                title={data.title}
                side="bottom"
                sideOffset={10}
                orgId={data.orgId}>
                <div>
                    <Hint label="Main menu" side="bottom" sideOffset={10}>
                        <Button className="bg-transparent hover:bg-neutral-200 transition-colors rounded-lg p-3">
                            <MenuIcon className="size-6 text-neutral-500" />
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
