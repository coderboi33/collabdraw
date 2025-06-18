"use client";

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Footer } from "./footer";
import { Actions } from "@/components/Actions";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { Id } from "../../../../../../convex/_generated/dataModel";

interface BoardCardProps {
    id: Id<"boards">;
    title: string;
    imageUrl: string;
    authorName: string;
    authorId: string;
    updatedAt: string;
    createdAt: string;
    orgId: string;
    isFavourite?: boolean;
}

export default function BoardCard({
    id,
    title,
    imageUrl,
    authorName,
    authorId,
    createdAt,
    orgId,
    isFavourite, }: BoardCardProps) {

    const { userId } = useAuth();
    const authorLabel = userId === authorId ? "You" : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true
    })


    return (
        <Link
            href={`/board/${id}`}>
            <div className="group border rounded-lg flex flex-col justify-between overflow-hidden h-[200px] w-[300px] bg-gradient-to-r from-gray-200 to-green-200 items-center cursor-pointer hover:scale-105 transition duration-300 ease-in-out relative">
                <Image
                    src={imageUrl}
                    alt={title}
                    width={200}
                    height={200}
                    className="object-fit" />
                <Overlay />
                <Actions
                    id={id}
                    title={title}
                    side="bottom"
                    sideOffset={10}
                    isFavourite={isFavourite}
                    orgId={orgId}
                >
                    <Button className="absolute top-2 right-2 bg-transparent hover:bg-gray-100/40 p-1 rounded-full transition z-10">
                        <MoreHorizontalIcon
                            className="text-black opacity-70 hover:opacity-100 size-7" />
                    </Button>
                </Actions>
            </div>
            <div>
                <Footer
                    id={id}
                    orgId={orgId}
                    title={title}
                    authorName={authorLabel}
                    createdAt={createdAtLabel}
                    isFavourite={isFavourite}
                />
            </div>
        </Link>
    )
}
