"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import Image from "next/image";
import { api } from "../../../../../../convex/_generated/api";
import { useOrganization } from "@clerk/clerk-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EmptyBoards() {

    const { organization } = useOrganization();
    const create = useMutation(api.board.create);
    const router = useRouter();


    const handleCreateBoard = async () => {

        if (!organization) {
            console.error("No organization ID found");
            return;
        }

        create({
            orgId: organization.id!,
            title: "New Board",
        }).then((id) => {
            toast.success("Board created successfully!");
            router.push(`/board/${id}`);
            console.log("Board created with ID:", id);
        }).catch((error) => {
            console.error("Error creating board:", error);
            toast.error("Error creating board: " + error.message);
        });
    }

    return (
        <div className="flex-1 flex flex-col items-center justify h-full ">
            <Image
                src={"/whiteboard.svg"}
                alt={"No Boards"}
                width={240}
                height={240}
                priority
                className="mb-6 rounded-xl border border-gray-200 dark:border-[#232336] bg-white dark:bg-[#18181b]"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">
                No boards found
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mt-2 mb-2 font-medium">
                Start collaborating by creating your first board. Organize your tasks and projects with ease.
            </p>
            <Button
                className="w-full md:w-auto px-16 py-5 bg-gradient-to-r from-[#b7d2ff] to-[#e0c3fc] hover:from-[#e0c3fc] hover:to-[#b7d2ff] text-[#1E1E2F] font-extrabold text-2xl md:text-3xl rounded-2xl shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#b7d2ff]/40 mt-8 border-4 border-[#e0c3fc]"
                onClick={handleCreateBoard}
            >
                Create Board
            </Button>
        </div>
    )
}