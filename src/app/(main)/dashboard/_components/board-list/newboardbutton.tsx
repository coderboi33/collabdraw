"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import Image from "next/image";
import { api } from "../../../../../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface newBoardButtonProps {
    orgId: string;
    disabled: boolean;
}

export function NewBoardButton({
    orgId,
    disabled,
}: newBoardButtonProps) {

    const create = useMutation(api.board.create);
    const router = useRouter();

    const handleCreateBoard = async () => {
        if (!orgId) {
            console.error("No organization ID found");
            return;
        }

        create({
            orgId: orgId,
            title: "New Board",
        }).then((id) => {
            toast.success("Board created successfully!");
            router.push(`/board/${id}`);
            console.log("Board created with ID:", id);
        }).catch((error) => {
            toast.error("Error creating board: ");
            console.error("Error creating board:", error);
        });
    }

    return (
        <div className="flex justify-center items-center h-full w-full">
            <Button
                disabled={disabled}
                onClick={handleCreateBoard}
                className={cn(
                    "col-span-1 h-[100px] w-[133px] bg-white hover:bg-white rounded-lg flex flex-col items-center justify-center py-6 mt-[-80px] transform transition-transform duration-300 hover:scale-110",
                    disabled && "opacity-75"
                )}>
                <Image
                    src={"/newboard.png"}
                    alt={"New Board"}
                    width={100}
                    height={100}
                />
            </Button>
        </div >
    );
}