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
                width={300}
                height={300}
                priority
                className="pr-5 pb-3 pt-5 hidden md:block"
            />
            <h1 className="text-3xl font-bold pb-10">CREATE YOUR FIRST WHITEBOARD</h1>
            <Button
                className="w-[300px] bg-[#000000] hover:bg-[#ffffff] text-[#FFFFFF] hover:text-[#000000] border-black border-2 font-semibold text-xl rounded-md h-12 mt-4 transition-all duration-500 ease-in-out"
                onClick={handleCreateBoard}>
                Create Board
            </Button>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                You can create boards to organize your tasks and projects. Start by creating a board now!
            </p>
        </div>
    )
}